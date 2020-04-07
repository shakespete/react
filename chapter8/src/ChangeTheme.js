import React, { useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'

const ThemeItem = ({ theme, active, onClick }) => {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer', paddingLeft: 8, fontWeight: active ? 'bold' : 'normal' }}>
      <span style={{ color: theme.primaryColor }}>Primary</span> / <span style={{ color: theme.secondaryColor }}>Secondary</span>
    </span>
  ) 
}

const ChangeTheme = ({ theme, setTheme }) => {
  // const [ themes, setThemes ] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:3001/themes')
  //     .then(result => result.json())
  //     .then(setThemes) // equals to:  .then(themes => setThemes(themes))
  // }, [])

  const [ themes, getThemes ] = useResource(() => ({
    url: '/themes',
    method: 'get'
  }));
  const { data, isLoading } = themes;
  useEffect(getThemes, [])


  const isActive = (t) => {
    return t.primaryColor === theme.primaryColor && t.secondaryColor === theme.secondaryColor
  }

  return (
    <div>
        {isLoading && ' Loading themes...'}
        Change theme:
        {data && data.map((t, i) =>
          <ThemeItem key={'theme-' + i} theme={t} active={isActive(t)} onClick={() => setTheme(t)} />
        )}
    </div>
  )
}

export default ChangeTheme