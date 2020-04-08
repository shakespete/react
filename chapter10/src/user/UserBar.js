import React from 'react'
import { useUserState } from '../hooks'

import Login from './Login'
import Register from './Register'
const Logout = React.lazy(() => import('./Logout'))
/**
 * React.lazy is another form of performance optimization. It lets us load a
 * component dynamically in order to reduce the bundle size. Sometimes we
 * want to avoid loading all of the components during the initial render,
 * and only request certain components when they are needed.
 * 
 * The import() function dynamically loads the Logout component
 * from the Logout.js file. In contrast to the static import
 * statement, this function only gets called when React.lazy
 * triggers it, which means it will only be imported when the
 * component is needed.
 */

const UserBar = () => {
  const user = useUserState()
  
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