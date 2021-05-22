import React from 'react'

export default function Todos(props) {
    return (
        <div>
            <h1>Todos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Description</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todos.map(todo =>
                            <tr key={todo.id}>
                                <td><input onChange={() => props.editTodo(todo)} type="checkbox" checked={todo.completed} /></td>
                                <td>{todo.description}</td>
                                <td><button onClick={() => props.delTodo(todo.id)}>x</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


