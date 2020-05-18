import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import appReducer from './reducers'

const store = createStore(appReducer, applyMiddleware(thunk))

export default store

/**
 * redux-thunk checks if an action creator returned
 * a function, rather than a plain object, and if that is
 * the case, it executes that function, while passing the
 * dispatch function to it as an argument.
 * 
 * Using the redux-thunk middleware, we can now dispatch
 * functions that will later dispatch actions, which means
 * that our asynchronous action creator is going to work
 * fine now.
 */