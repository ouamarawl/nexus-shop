import React from "react";
import test from "../Assets/nexus.jpg";
import "./cards.css";

function Card_panier() {
  return (
    <div className="container-card-panier">
      <div className="classe-superieur">
        <div className="partie-L">
          <img src={test} alt="Produit" className="image-produit" />
          <div className="enfant-l">
            <p className="titre">Titre du produit</p>
            <p className="disponibilite">En stock</p>
            <h3 className="logo">Nexus Shop</h3>
          </div>
        </div>
        <div className="partie-R">
          <p className="prix">9999 DA</p>
        </div>
      </div>

      <div className="classe-inferieur">
        <button className="supprimer">🗑 Supprimer</button>
        <div className="button-dajout">
          <button className="ajouter">+</button>
          <span className="quantite">9</span>
          <button className="reduire">-</button>
        </div>
      </div>
    </div>
  );
}

export default Card_panier;