import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {
  const [produits, setProduits] = useState([]);
  const [resultats, setResultats] = useState([]);

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

    setResultats(resultatsTrouves);
  };

  return (
    <div className="search-container">
      <div className="search_bar">
        <input type="search" id="input" placeholder="Rechercher un produit..." />
        <button onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#FFD43B" }} />
        </button>
      </div>

      <div className="resultats">
        {resultats.length > 0 ? (
          resultats.map((produit, index) => (
            <div className="card-produit" key={index}>
              <h3>{produit.titre}</h3>
              <img
                src={produit.image}
                alt={produit.titre}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x200?text=Image+Introuvable")}
              />
              <p>{produit.description}</p>
              <p className="prix">{produit.prix} DA</p>
            </div>
          ))
        ) : (
          <p>Aucun résultat trouvé pour cette recherche.</p>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
