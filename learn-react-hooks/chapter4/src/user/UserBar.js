import React, { useState } from 'react'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const UserBar = ({ user, dispatch }) => {

  if (user) {
    return <Logout user={user} dispatch={dispatch} />
  } else {
    return (
      <React.Fragment>
        <Login dispatch={dispatch} />
        <Register dispatch={dispatch} />
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