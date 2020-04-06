import React from 'react'
import { useCurrentRoute } from 'react-navi'

const FooterBar = () => {
  const { url } = useCurrentRoute()
  return (
    <div>
      <a href={url.href}>{url.href}</a>
    </div>
  )
}

export default FooterBar