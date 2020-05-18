import React, { useState, useContext } from 'react'
import { StateContext } from '../contexts'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const UserBar = () => {
  const { state } = useContext(StateContext)
  const { user } = state
  
  if (user) {
    return <Logout />
  } else {
    return (
      <React.Fragment>
        <Login />
        <Register />
      </React.Fragment>

    )
  }
}

/*
  React.Fragment
  
  Keeps UI tree clean as the components will simply be rendered
  side by side instead of being wrapped in another element
*/


export default UserBar;