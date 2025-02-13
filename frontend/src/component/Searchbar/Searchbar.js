import React from 'react';
import './Searchbar.css';
import Fuse from 'fuse.js';
import  { useEffect, useState } from "react";

function Searchbar() {
   const [produits, setProduits] = useState([]);
    // Fonction pour récupérer les produits depuis l'API
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
    const Recherche = document.getElementById('input').value.trim(); 
    const Resultas = document.getElementById('partie_de_resultas');
    Resultas.innerHTML = ""; 

    // Configuration de Fuse.js
    const options = {
      keys: ['titre'], // Rechercher uniquement dans les titres des produits
      threshold: 0.4, // Tolérance pour les fautes (0 : strict, 1 : très tolérant)
    };

    const fuse = new Fuse(produits, options);
    const resultats = fuse.search(Recherche); 

    if (resultats.length > 0) {
      resultats.forEach(({ item }) => {
      
        const productCard = document.createElement('div');
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
    <div className='search_bar' >
        <div className='container_search_bar'>
        <div className='partie_de_recheres'>
         <input id='input' type="search" placeholder="search"/>
         {/* <button id='btn' onClick={search}><p id='text_btn'>Rechercher</p></button> */}
        </div> 
        <div className='partie_de_resultas' id='partie_de_resultas'>
        </div>
        </div>
    </div>
  )
}

export default Searchbar