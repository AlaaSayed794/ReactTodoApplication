import './App.css';
import TodosComponent from './Components/Todos'
import AddTodoForm from './Components/AddTodos'

import React, { Component } from 'react'

export default class App extends Component {
  //mounting methods
  constructor(props) {
    super(props)
    this.state = { todos: [], count: 0 }
    console.log("constructor called")
  }
  componentDidMount() {
    console.log("component did mount called")
  }
  //updating methods
  shouldComponentUpdate(nextProps, nextState) {

    console.log("should update called")
    console.log(nextState)
    return (nextState.count < 5)
  }
  componentDidUpdate() {
    console.log("did update called")
  }
  render() {
    console.log("render called")
    return (
      <div className="App">
        <AddTodoForm buttonText="parent button text" />
        <TodosComponent />
        <div>{this.state.count}</div>
        <button onClick={this.onClick}>click me</button>
      </div >
    )
  }
  onClick = () => {

    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
  }

}

