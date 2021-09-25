import React from 'react';
import { editTodo, deleteTodo } from '../actions/todosActions'
import { Table } from 'react-bootstrap/';
import { connect } from 'react-redux';

const TodosTable = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr style={{ backgroundColor: "red" }}>
                    <th>completed</th>
                    <th>description</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.todos.map(todo => <tr key={todo.id}>
                        <td><input type="checkbox" onChange={() => props.editTodo(todo.id, todo.completed)} checked={todo.completed} /></td>
                        <td style={todo.completed ? { textDecoration: "line-through" } : {}}>{todo.description}</td>
                        <td><button onClick={() => props.deleteTodo(todo.id)}>x</button></td>
                    </tr>)
                }
            </tbody>
        </Table >
    );
}


export default connect(null, { editTodo, deleteTodo })(TodosTable);