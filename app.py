'''
Created on Aug 7, 2020

@author: Alaa
'''
from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import sys
from werkzeug.exceptions import HTTPException
import os

db = SQLAlchemy()


class Todo(db.Model):
    # default if this is not mentioned will be class's name lowercased
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    def __repr__(self):
        return f'<Todo ID: {self.id}, description: {self.description} , completed : {self.completed}>'

def create_app(test_config=None):
    app = Flask(__name__)
    database_filename = "database.db"
    project_dir = os.path.dirname(os.path.abspath(__file__))
    database_path = "sqlite:///{}".format(os.path.join(project_dir, database_filename))

    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)
    db.create_all()
    CORS(app)

    @app.route('/todos', methods=['POST'])
    def createTodo():
        error = False
        body = {'success': True}
        try:
            description = request.get_json()['description']
            if(len(description) > 0):
                todo = Todo(description=description, completed=False)
                db.session.add(todo)
                db.session.commit()
                body['description'] = todo.description
                body['id'] = todo.id
                body['completed'] = todo.completed
            else:
                raise NotImplementedError()
        except NotImplementedError:
            abort(422)
        except:
            error = True
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        if error:
            abort(400)
        else:
            return(jsonify(body))
    

    @app.route('/todos/<todo_id>', methods=['PATCH'])
    def editTodo(todo_id):
        error = False
        try:
            jsonRequest = request.get_json()

            todo = Todo.query.get(todo_id)
            if(todo is None):

                raise NotImplementedError
            if "completed" in jsonRequest :
                completed = jsonRequest['completed']
                todo.completed = completed
            else:
                raise Exception("")
            db.session.commit()
        except NotImplementedError:
            abort(404)
        except:
            error = True
            abort(400)
            db.session.rollback()
            print(sys.exc_info())
        finally:
            db.session.close()
        return(jsonify({"success": not error}))


    @app.route('/todos/<todo_id>', methods=['DELETE'])
    def deleteTodo(todo_id):
        error = False
        try:
            todo = Todo.query.get(todo_id)
            db.session.delete(todo)
            db.session.commit()
        except Exception as e:
            error = True
            print(e)
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            abort(404)
        else:
            return jsonify({'success': True})


    @app.route('/todos')
    def todosGet():
        try:
            return(jsonify({"success": True, 'todos': [{"id": todo.id, "description": todo.description, "completed": todo.completed } for todo in Todo.query.order_by('id').all()]}))
        except Exception as e:
            print(e)

    @app.errorhandler(HTTPException)
    def genericErrorHandler(e):
        print("generic error handler")
        return jsonify({
            "success": False,
            "error": e.code,
            "message": e.name
        }), e.code
    return app
