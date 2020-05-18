import { connect } from 'react-redux'

import { toggleTodo, removeTodo } from '../actions'
import TodoItem from '../components/TodoItem'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: (...args) => dispatch(toggleTodo(...args)),
    removeTodo: (...args) => dispatch(removeTodo(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)