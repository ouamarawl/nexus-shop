import React, { useState } from "react";
import { Link } from "react-router-dom";
import nexus from "../Assets/nexus.jpg";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHouse, faAddressCard, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="navbar">
      <p className="logo">
        Nexus <img src={nexus} alt="nexus" /> Shop
      </p>

      <div className="list-navbar">
        <Link to="/">
          <li>
            <FontAwesomeIcon icon={faHouse} /> Home
          </li>
        </Link>
        <Link to="/about">
          <li>
            <FontAwesomeIcon icon={faAddressCard} /> About
          </li>
        </Link>
        <Link to="/admin">
          <li>
            <FontAwesomeIcon icon={faUser} /> Admin
          </li>
        </Link>
        <Link to="/panier">
          <li>
            <FontAwesomeIcon icon={faCartShopping} /> Basket
          </li>
        </Link>
      </div>

      <Searchbar />

      <div className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>

        {/* Searchbar inside Sidebar */}
        <div className="sidebar-search">
          <Searchbar />
        </div>

        <ul>
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faAddressCard} /> About
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faUser} /> Admin
            </Link>
          </li>
          <li>
            <Link to="/panier" onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faCartShopping} /> Basket
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
