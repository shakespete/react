import React, { useState, useEffect } from 'react'
import { useDispatch, useAPILogin } from '../hooks'
import { useInput } from 'react-hookedup'

const useLoginEffect = (user, dispatch, setLoginFailed) => {
  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false)
        dispatch({ type: 'LOGIN', username: user.data[0].username })
      } else {
        setLoginFailed(true)
      }
    }
    if (user && user.error) {
      setLoginFailed(true)
    }
  }, [user, dispatch, setLoginFailed]);
}

const Login = () => {
  const dispatch = useDispatch()
  const { value: username, bindToInput: bindUsername } = useInput('')
  const { value: password, bindToInput: bindPassword } = useInput('')

  const [ loginFailed, setLoginFailed ] = useState(false)
  const [ user, login ] = useAPILogin()
  useLoginEffect(user, dispatch, setLoginFailed)
  

  return (
    <form onSubmit={e => {e.preventDefault(); login(username, password); }}>
      <label htmlFor="login-username">Username:</label>
      <input type="text" value={username} {...bindUsername} name="login-username" id="login-username" />
      <label htmlFor="login-password">Password:</label>
      <input type="password" value={password} {...bindPassword} name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
      {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </form>
  )
}

export default Login;