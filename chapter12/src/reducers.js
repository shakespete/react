import { generateID } from './api'
import { combineReducers } from 'redux'

/**
 * 
 * Each reducer needs to set its initial state by defining a default
 * value in the function definition
 * Each reducer needs to return the current state for unhandled actions
 */

const filter = (state = 'all', action) => {
  if (action.type === 'FILTER_TODOS') {
    return action.filter
  } else {
    return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TODOS':
      console.log(action);
      return action.todos

    case 'ADD_TODO':
      const newTodo = {
        id: generateID(),
        title: action.title,
        completed: false
      }
      return [ newTodo, ...state ]

    case 'TOGGLE_TODO':
      return state.map(t => {
        if (t.id === action.id) {
          return { ...t, completed: !t.completed }
        }
        return t
      }, [])

    case 'REMOVE_TODO':
      return state.filter(t => {
        if (t.id === action.id) {
          return false
        }
        return true
      })

    default:
      return state
  }
}

const appReducer = combineReducers({ todos, filter })
export default appReducer
