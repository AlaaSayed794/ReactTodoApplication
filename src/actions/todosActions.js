import { GETTODOS, ADDTODO, DELETETODO, EDITTODO } from './type'
//helper function
const modifiedFetch = (uri, method = "GET", body) => {
    let fetchObj = {
        method: method.toUpperCase(),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    if (body && typeof body === "object" && method.toLowerCase() !== "get") {
        console.log("adding body")
        fetchObj.body = JSON.stringify(body)
    }
    return fetch(uri, fetchObj)
}


//************************************************our actions *************************************************/

export const deleteTodo = (id) => dispatch => {
    modifiedFetch("todos/" + id, "DELETE").then(data => {
        console.log(data)
        return data.json()
    }).then(data => {
        dispatch({
            type: DELETETODO,
            payload: id
        })
    })
}


export const editTodo = (id, completed) => dispatch => {
    modifiedFetch("todos/" + id, "PATCH", { completed: !completed }).then(data => {
        dispatch({
            type: EDITTODO,
            payload: id
        })
    })
}


export const addTodo = (description) => dispatch => modifiedFetch("todos", "POST", { description }).then(res => res.json()).then(data => {
    dispatch({
        type: ADDTODO,
        payload: data
    })
})



export const getTodos = () => dispatch => {
    fetch("/todos").then(res => res.json()).then(data => dispatch({
        type: GETTODOS,
        payload: data.todos
    }))
}