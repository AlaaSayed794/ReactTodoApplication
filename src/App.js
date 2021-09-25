import React, { Component } from 'react';
import { getTodos } from './actions/todosActions'
import { connect } from 'react-redux';
import Todos from './componenets/Todos';
import AddTodo from './componenets/AddTodo';
class App extends Component {
  state = { loading: true }
  componentDidMount() {
    this.props.getTodos()
    this.setState({ loading: false })
  }
  render() {
    return (
      this.state.loading ? <h1>loading</h1> :
        <>
          <h1>Todo app</h1>
          <AddTodo />
          <Todos />
        </>
    );
  }
}




export default connect(null, { getTodos })(App);