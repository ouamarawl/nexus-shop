import React from 'react';
import { Link } from 'react-router-dom';
import nexus from '../Assets/nexus.jpg';
import './Header.css';
import Searchbar from '../Searchbar/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAddressCard, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'; 

function Header() {
  return (
    <div className='navbar'>
      <img src={nexus} alt='nexus' />
      <div className='list-navbar' style={{ textDecoration: 'none' }}>
        <Link to='/'>
          <li>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#FFD43B" }} /> home
          </li>
        </Link>
        <Link to='/about'>
          <li>
            <FontAwesomeIcon icon={faAddressCard} style={{ color: "#FFD43B" }} /> About
          </li>
        </Link>
        <Link to='/admin'>
          <li>
            <FontAwesomeIcon icon={faUser} style={{ color: "#FFD43B" }} /> Admin
          </li>
        </Link>
        <Link to='/panier'>
          <li>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "#FFD43B" }} /> Basket
          </li>
        </Link>
      </div>
      <Searchbar />
    </div>
  );
}

export default Header;
