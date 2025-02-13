import React from 'react'
import { Link } from 'react-router-dom'
import nexus from '../Assets/nexus.jpg'
import './Header.css'
import Searchbar from '../Searchbar/Searchbar'
function Header() {
  return (
<div className='navbar'>
    <img src={nexus} alt='nexus'/>
    <div className='list-navbar' style={{ textDecoration: 'none' }}>
        <Link to='/'><li>home</li></Link>
        <Link to='/about'><li>about</li></Link>
        <Link to='/compt'><li>compt</li></Link>
        <Link to='/panier'><li>panier</li></Link>
    </div>
        <Searchbar/> 
    </div>

  )
}

export default Header