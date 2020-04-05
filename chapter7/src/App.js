import React, { useState, useReducer, useEffect } from 'react'
import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'

import { ThemeContext, StateContext } from './contexts'
import appReducer from './reducers'

const App = () => {
  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(
    appReducer,
    { 
      user: '',
      posts: [],
      error: ''
    }
  )
  const { user, error } = state;

  // useEffect(() => {
  //   fetch('http://localhost:3001/posts')
  //     .then(result => result.json())
  //     .then(posts => dispatch({ type: 'FETCH_POSTS', posts }))
  // }, []);

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks`;
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{padding: 8}}>
          <HeaderBar setTheme={setTheme} />
          <hr />
          <PostPage id={'react-hooks'} />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}

export default App;


// npx json-server --watch server/db.json

// json-server --watch db.json --port 3001 --routes routes.json