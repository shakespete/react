import React, { useState } from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'

const defaultPosts  = [
  {title: '1', content: 'hello', author: 'obiwan'},
  {title: '2', content: 'there', author: 'kenobi'}
];

const App = () => {
  const [ user, setUser ] = useState('')
  const [ posts, setPosts ] = useState(defaultPosts)

  return (
    <div style={{padding: 8}}>
      <UserBar user={user} setUser={setUser} />
      <br />
      {user && <CreatePost user={user} posts={posts} setPosts={setPosts} /> }
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}

export default App;