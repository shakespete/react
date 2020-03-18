import React from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'

const user = 'Pete'
const posts = [
  {title: '1', content: 'hello', author: 'obiwan'},
  {title: '2', content: 'there', author: 'kenobi'}
];

const App = () => {
  return (
    <div style={{padding: 8}}>
      <UserBar />
      <br />
      <CreatePost user={user} />
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}

export default App;