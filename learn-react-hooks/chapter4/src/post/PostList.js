import React from 'react'

import Post from './Post'

const PostList = ({ posts=[] }) => {
  return (
    <div>
      {posts.map((p,i)=> (
        <React.Fragment key={'post-'+i}>
          <Post {...p} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  )
}

export default PostList