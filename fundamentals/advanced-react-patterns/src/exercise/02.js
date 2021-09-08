// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      id: `i-am-child-${index}`,
      on: on,
      toggle: toggle,
    })
  })
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = props => (props.on ? props.children : null)

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = props => (!props.on ? props.children : null)

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = props => {
  return <Switch on={props.on} onClick={props.toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
