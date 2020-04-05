import React, { useState, useContext } from 'react'
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'

const CreatePost = () => {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ , createPost ] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }));

  const handleTitle = evt => setTitle(evt.target.value)
  const handleContent = evt => setContent(evt.target.value)
  const handleCreate = () => {
    createPost({ title, content, author: user })
    dispatch({ type: 'CREATE_POST', title, content, author: user })
  }

  return (
    <form onSubmit={e => { e.preventDefault(); handleCreate(); }}>
      <div>Author: <b>{user}</b></div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
      </div>
      <textarea value={content} onChange={handleContent} />
      <input type="submit" value="Create" />
    </form>
  )
}

export default CreatePost;