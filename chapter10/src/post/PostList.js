import React from 'react'
import { usePostsState } from '../hooks'

import Post from './Post'

const PostList = () => {
  const posts = usePostsState()
  
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