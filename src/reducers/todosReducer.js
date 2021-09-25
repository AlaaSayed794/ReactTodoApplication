import { GETTODOS, DELETETODO, ADDTODO, EDITTODO } from '../actions/type'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETETODO:
            return state.filter(todo => todo.id !== action.payload)

        case EDITTODO:
            return state.map(todo => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        case GETTODOS:
            return [...state, ...action.payload]
        case ADDTODO:
            return [...state, action.payload]
        default:
            return state
    }
}