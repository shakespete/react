import { connect } from 'react-redux'

import { fetchTodos } from '../actions'
import App from '../components/App'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: (...args) => dispatch(fetchTodos(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)