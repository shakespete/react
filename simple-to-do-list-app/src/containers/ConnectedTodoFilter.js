import { connect } from 'react-redux'

import { filterTodos } from '../actions'
import TodoFilter from '../components/TodoFilter'

const mapStateToProps = state => {
  const { filter } = state
  return { filter }
}

const mapDispatchToProps = dispatch => {
  return {
    filterTodos: (...args) => dispatch(filterTodos(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter)