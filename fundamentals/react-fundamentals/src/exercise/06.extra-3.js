// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React, {useState} from 'react'

const UsernameForm = ({onSubmitUsername}) => {
  const [inputVal, setInputVal] = useState('')

  const handleChange = e => {
    const {value} = e.target
    setInputVal(value.toLowerCase())
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmitUsername(inputVal)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          value={inputVal}
        />
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
