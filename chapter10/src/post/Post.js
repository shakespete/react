import React, { useContext } from 'react'
import { useTheme } from '../hooks'
import { Link } from 'react-navi'

const Post = ({ id, title, content, author, short = false }) => {
  const { secondaryColor } = useTheme()

  let processedContent = content
  if (short) {
    if (content.length > 30) {
      processedContent = content.substring(0, 30) + '...'
    }
  }

  return (
    <div>
      <h3 style={{color: secondaryColor}}>{title}</h3>
      <div>{processedContent}</div>
        {short &&
          <div>
            <br />
            <Link href={`/view/${id}`}>View full post</Link>
          </div>
      }
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