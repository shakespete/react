import React from 'react'

const Logout = ({ user }) => {
  return (
    <form onSubmit={e=>e.preventDefault()}>
      Logged in as: <b>{user}</b>
      <input type="submit" value="Logout" />
    </form>
  )
}

export default Logout