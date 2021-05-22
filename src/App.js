import './App.css';
import TodosComponent from './Components/Todos'
import AddTodoForm from './Components/AddTodos'

import React, { Component } from 'react'

export default class App extends Component {
  //mounting methods
  constructor(props) {
    super(props)
    this.state = { todos: [] }

  }
  componentDidMount() {
    this.getTodos()
  }

  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <AddTodoForm buttonText="parent button text" addTodo={this.addTodo} />
        <TodosComponent todos={this.state.todos} />
      </div >
    )
  }
  addTodo = async (description) => {
    await fetch("todos", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description })
    }).then(res => res.json()).then(jsonRes => {
      console.log(jsonRes)
      this.setState(
        {
          todos: [...this.state.todos, jsonRes]
        }
      )
    })
  }
  async getTodos() {
    const response = await fetch("todos")
    const jsonResponse = await response.json()
    this.setState({
      todos: jsonResponse.todos
    })

  }


}

