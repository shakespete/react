import React, { useState } from 'react'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const UserBar = () => {
  const user = 'Pete'

  if (user) {
    return <Logout user={user} />
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