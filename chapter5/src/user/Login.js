import React, {useState, useContext} from 'react'
import { StateContext } from '../contexts'

const Login = () => {
  const { dispatch } = useContext(StateContext)
  const [username, setUsername]=useState('');

  const handleUsername = evt => {
    setUsername(evt.target.value);
  }

  return (
    <form onSubmit={e => {e.preventDefault(); dispatch ({ type: 'LOGIN', username }); }}>
      <label htmlFor="login-username">Username:</label>
      <input type="text" value={username} onChange={handleUsername} name="login-username" id="login-username" />
      <label htmlFor="login-password">Password:</label>
      <input type="password" name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  )
}

export default Login;