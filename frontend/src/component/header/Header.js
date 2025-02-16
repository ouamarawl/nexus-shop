import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nexus from "../Assets/nexus.jpg";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHouse, faAddressCard, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Vérifie si l'écran est petit

  // Met à jour la valeur isMobile lorsque la taille de l'écran change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {/* Affiche la barre de recherche seulement si ce n'est pas un mobile */}
      {!isMobile && <Searchbar />}

      <div className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>

        {/* Searchbar affichée uniquement dans la sidebar sur mobile */}
        {isMobile && (
          <div className="sidebar-search">
            <Searchbar />
          </div>
        )}

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
