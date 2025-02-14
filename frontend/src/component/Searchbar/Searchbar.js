import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import Fuse from "fuse.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // ✅ Ajout de l'icône

function Searchbar() {
  const [produits, setProduits] = useState([]);

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
    const Recherche = document.getElementById("input").value.trim();
    const Resultas = document.getElementById("partie_de_resultas");
    Resultas.innerHTML = "";

    const options = {
      keys: ["titre"],
      threshold: 0.4,
    };

    const fuse = new Fuse(produits, options);
    const resultats = fuse.search(Recherche);

    if (resultats.length > 0) {
      resultats.forEach(({ item }) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = `
          <div class="container_card">
            <h3>${item.title}</h3>
            <img src="${item.image}" alt="${item.titre}">
            <p>${item.description}</p>
            <p>Prix : ${item.prix} €</p>
          </div>
        `;
        Resultas.appendChild(productCard);
      });
    } else {
      Resultas.textContent = "Aucun résultat trouvé pour cette recherche.";
    }
  };

  return (
<div className="search_bar">
  <input type="search" className="search-input" placeholder="Search..." />
  <button onClick={search}>
    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#FFD43B" }} />
  </button>
</div>

  );
}

export default Searchbar;
