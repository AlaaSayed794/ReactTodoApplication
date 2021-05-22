import React, { Component } from 'react'

export default class AddTodos extends Component {
    state = {
        description: ""
    }
    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.description.length > 0) {
            this.props.addTodo(this.state.description)
            this.setState({
                description: ""
            }
            )
        }
        else {
            alert("empty")
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }
        )
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="add todo" name="description" onChange={this.onChange} value={this.state.description} />
                <input type="submit" value={this.props.buttonText} />
            </form>
        )
    }
}
