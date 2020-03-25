import React, { useState, useReducer, useEffect } from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'

import ThemeContext from './contexts'
import ChangeTheme from './ChangeTheme'
import appReducer from './reducers'

const defaultPosts  = [
  {title: '1', content: 'hello', author: 'obiwan'},
  {title: '2', content: 'there', author: 'kenobi'}
];


const App = () => {
  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: defaultPosts })
  const { user, posts } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks`;
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{padding: 8}}>
        <Header text="React Hooks" />
        <ChangeTheme theme={theme} setTheme={setTheme} />
        <br />
        <UserBar user={user} dispatch={dispatch} />
        <br />
        {user && <CreatePost user={user} posts={posts} dispatch={dispatch} /> }
        <br />
        <hr />
        <PostList posts={posts} />
      </div>
    </ThemeContext.Provider>
  )
}

export default App;