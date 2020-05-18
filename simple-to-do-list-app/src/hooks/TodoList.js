import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import TodoItem from './TodoItem'

const todosSelector = state => state.todos
const filterSelector = state => state.filter

const selectFilteredTodos = createSelector(
  todosSelector,
  filterSelector,
  (todos, filter) => {
    switch (filter) {
        case 'active':
          return todos.filter(t => t.completed === false)
        
        case 'completed':
          return todos.filter(t => t.completed === true)
        
        default:
        case 'all':
          return todos
    }
  }
)

const TodoList = () => {
  // Using reselect:
  const filteredTodos = useSelector(selectFilteredTodos)

  // const filter = useSelector(state => state.filter)
  // const todos = useSelector(state => state.todos)
  // const filteredTodos = useMemo(() => {
  //   switch (filter) {
  //     case 'active':
  //       return todos.filter(t => t.completed === false)
      
  //     case 'completed':
  //       return todos.filter(t => t.completed === true)
      
  //     default:
  //     case 'all':
  //       return todos
  //   }
  // }, [ filter, todos ])
  
  return filteredTodos.map(item =>
    <TodoItem {...item} key={item.id} />
  )
}

export default TodoList;