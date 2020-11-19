// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (
  key,
  value = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [local, setLocal] = React.useState(() => {
    const storageValue = window.localStorage.getItem(key) || value
    if (storageValue) {
      return deserialize(storageValue)
    }
    return value
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(local))
  }, [key, local, serialize])

  return [local, setLocal]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
