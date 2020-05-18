import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'

import ConnectedApp from './containers/ConnectedApp'
import App from './hooks/App'

import * as serviceWorker from './serviceWorker'
import store from './configureStore'

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedApp /> */}
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
