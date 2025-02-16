import Card_panier from "../../component/cards/Card_panier";
import Card_resume_panier from "../../component/cards/Card_resume_panier";
import "./Panier.css";
import Card_produits from "../../component/cards/Card_produits";
import React, { useEffect, useState } from "react";

function Panier() {
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
  return (
    <div className="panier">
      <div className="container-panier">
      <h1>panier</h1>

        <div className="container-cards-panier">
          <Card_panier />
          <Card_panier />
          <Card_panier />
          <Card_panier />
        </div>
        <div className="container-cards-resume-panier">
          <Card_resume_panier />
        </div>
      </div>
      <div className="panier-section-produits">
      <h1 style={{ marginBottom: '4%' }}>continuer vos achats</h1>

        <div className="container-produits">
          {produits.map((produit) => (
            <Card_produits
              key={produit.id}
              titre={produit.titre}
              image={produit.image}
              description={produit.description}
              prix={produit.prix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Panier;
