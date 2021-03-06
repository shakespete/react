import React, { useEffect } from 'react'
import { useUserState, useDispatch, useAPICreatePost } from '../hooks'
import { useInput } from 'react-hookedup'

import { useNavigation } from 'react-navi'

const CreatePost = () => {
  const user = useUserState()
  const dispatch = useDispatch()

  const { value: title, bindToInput: bindTitle } = useInput('')
  const { value: content, bindToInput: bindContent } = useInput('')

  const [ post, createPost ] = useAPICreatePost();

  const navigation = useNavigation()

  useEffect(() => {
    if (post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data })
      navigation.navigate(`/view/${post.data.id}`)
    }
  }, [post])

  const handleCreate = () => {
    createPost({ title, content, author: user })
  }

  return (
    <form onSubmit={e => { e.preventDefault(); handleCreate(); }}>
      <div>Author: <b>{user}</b></div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input type="text" value={title} {...bindTitle} name="create-title" id="create-title" />
      </div>
      <textarea value={content} {...bindContent} />
      <input type="submit" value="Create" />
    </form>
  )
}

export default CreatePost;