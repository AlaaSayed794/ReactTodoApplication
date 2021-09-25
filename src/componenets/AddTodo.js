import React, { Component } from 'react';
import { ADDTODO } from '../actions/type';
import { addTodo } from '../actions/todosActions'
import { connect } from 'react-redux';
class AddTodo extends Component {
    state = {
        description: ""
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.description) {
            this.props.addTodo(this.state.description)
            this.setState({ description: "" })
        }
        else {
            alert("empty description")
        }

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state.description)
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
                <button type="submit">add todo</button>
            </form>
        );
    }
}

export default connect(null, { addTodo })(AddTodo);
