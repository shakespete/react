import React from 'react'

const Post = ({ title, content, author }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by <b>{author}</b></i>
    </div>
  )
}

export default Post