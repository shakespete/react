import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  FILTER_TODOS,
  FETCH_TODOS
} from './constants'
import { fetchAPITodos } from './api'

export const addTodo = title => {
  return { type: ADD_TODO, title }
}

export const toggleTodo = id => {
  return { type: TOGGLE_TODO, id }
}

export const removeTodo = id => {
  return { type: REMOVE_TODO, id }
}

export const filterTodos = filter => {
  return { type: FILTER_TODOS, filter }
}

export const fetchTodos = () => {
  return async (dispatch) => {
    const todos = await fetchAPITodos()
    dispatch({ type: FETCH_TODOS, todos })
  }
}