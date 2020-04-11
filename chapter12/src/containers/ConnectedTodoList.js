import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

const mapStateToProps = state => {
  const { filter, todos } = state
  return { filter, todos }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)