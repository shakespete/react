// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'

const UsernameForm = ({onSubmitUsername}) => {
  const inputRef = React.useRef()

  const handleSubmit = event => {
    event.preventDefault()
    console.log(inputRef.current.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" ref={inputRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
