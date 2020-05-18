import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { filterTodos } from '../actions'

const TodoFilterItem = ({ name }) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  function handleFilter () {
    dispatch(filterTodos(name))
  }

  const style = {
    color: 'blue',
    cursor: 'pointer',
    fontWeight: (filter === name) ? 'bold' : 'normal'
  }

  return <span style={style} onClick={handleFilter}>{name}</span>
}

const TodoFilter = () => {
  return (
    <div>
      <TodoFilterItem name="all" />{' / '}
      <TodoFilterItem name="active" />{' / '}
      <TodoFilterItem name="completed" />
    </div>
  )
}

export default TodoFilter