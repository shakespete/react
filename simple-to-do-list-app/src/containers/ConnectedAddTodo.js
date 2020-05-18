import { connect } from 'react-redux'

import { addTodo } from '../actions'
import AddTodo from '../components/AddTodo'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (...args) => dispatch(addTodo(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)