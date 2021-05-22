import React, { Component } from 'react'

export default class AddTodos extends Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="add todo" />
                <input type="submit" value={this.props.buttonText} />
            </form>
        )
    }
}
