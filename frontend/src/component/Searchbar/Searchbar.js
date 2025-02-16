import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate(); // Utilisation de useNavigate()

  useEffect(() => {
    fetch("http://localhost:5050/api/produits")
      .then((response) => response.json())
      .then((data) => {
        console.log("Produits chargés :", data);
        setProduits(data);
      })
      .catch((error) => console.error("Erreur de chargement :", error));
  }, []);

  const search = () => {
    const recherche = document.getElementById("input").value.trim();
    const options = {
      keys: ["titre"],
      threshold: 0.4,
    };
  
    const fuse = new Fuse(produits, options);
    const resultatsTrouves = fuse.search(recherche).map((res) => res.item);
  
    console.log("Résultats trouvés :", resultatsTrouves); // Vérifie si des produits sont trouvés
  
    navigate("/resulta_produit", { state: { resultats: resultatsTrouves } });
  };
  

  return (
    <div className="search-container">
      <div className="search_bar">
        <input type="search" id="input" placeholder="Rechercher un produit..." />
        <button onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#FFD43B" }} />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
