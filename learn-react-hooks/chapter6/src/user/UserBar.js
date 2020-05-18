import React, { useState, useContext } from 'react'
import { StateContext } from '../contexts'

import Login from './Login'
import Register from './Register'
const Logout = React.lazy(() => import('./Logout'))
/*
The import() function dynamically loads the Logout component
from the Logout.js file. In contrast to the static import
statement, this function only gets called when React.lazy
triggers it, which means it will only be imported when the
component is needed.
*/

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