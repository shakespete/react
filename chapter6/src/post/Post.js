import React, { useContext } from 'react'
import { ThemeContext } from '../contexts'

const Post = ({ title, content, author }) => {
  console.log('rendering Post')
  const { secondaryColor } = useContext(ThemeContext)

  return (
    <div>
      <h3 style={{color: secondaryColor}}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by <b>{author}</b></i>
    </div>
  )
}

export default React.memo(Post)

/*
With class components we had shouldComponentUpdate, which would prevent
components from re-rendering if the props did not change.

With function components, we can do the same using React.memo,
which is a higher-order component. React.memo memoizes the result,
which means that it will remember the last rendered result, and, in
cases where the props did not change, it will skip re-rendering the
component
*/