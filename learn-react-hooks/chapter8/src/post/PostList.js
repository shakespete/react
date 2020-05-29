import React, { useContext } from 'react'
import { StateContext } from '../contexts'

import Post from './Post'

const PostList = () => {
  const { state } = useContext(StateContext)
  const { posts } = state
  
  return (
    <div>
      {posts.map((p,i)=> (
        <React.Fragment key={'post-'+i}>
          <Post {...p} short={true} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  )
}

export default PostList