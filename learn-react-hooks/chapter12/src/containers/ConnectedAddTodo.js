import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTodo } from '../actions'
import AddTodo from '../components/AddTodo'

const mapStateToProps = () => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  //  bindActionCreators to wrap the action creator with the dispatch function
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)