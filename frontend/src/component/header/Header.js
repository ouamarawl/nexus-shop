import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        Header
        <Link to='/' ><li>home</li></Link>
        <Link to='/about' ><li>about</li></Link>
        <Link to='/panier' ><li>panier</li></Link>
    </div>
  )
}

export default Header