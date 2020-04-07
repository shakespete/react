import React, { useContext } from 'react'
import CreatePost from '../post/CreatePost'
import UserBar from '../user/UserBar'
import Header from '../Header'
import ChangeTheme from '../ChangeTheme'
import useWindowSize from '@rehooks/window-size'

import { ThemeContext, StateContext } from '../contexts'

export default function HeaderBar ({ setTheme }) {
  const theme = useContext(ThemeContext)
  const { state } = useContext(StateContext)
  const { innerWidth } = useWindowSize()
  const mobilePhone = innerWidth < 640

  const { user } = state

  return (
    <div>
      <Header text="React Hooks" />
      {!mobilePhone && <ChangeTheme theme={theme} setTheme={setTheme} />}
      {!mobilePhone && <br />}
      {!mobilePhone && <React.Suspense fallback={"Loading..."}>
          <UserBar />
      </React.Suspense>}
      {!mobilePhone && <br />}
      {user && <CreatePost /> }
    </div>
  )
}

/**
 * React Suspense allows us to let components wait before rendering.
 * At the moment, React Suspense only allows us to dynamically load
 * components with React.lazy.
 */