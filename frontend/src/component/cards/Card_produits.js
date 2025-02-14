import React from 'react';
import './Cards.css';

function Card_produits(props) {
  console.log("Image reçue :", props.image); // Vérifie si l'image est bien transmise
  return (
    <div className='card-produit'>
      <h3>{props.titre}</h3>
      <img src={props.image} alt={props.titre} onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+Introuvable"} />
      <p>{props.description}</p>
      <p className='prix'>{props.prix} DA</p>
    </div>
  );
}


export default Card_produits;
