import React from "react";
import { useLocation } from "react-router-dom";
import Card_produits from "../cards/Card_produits";
import "./Searchbar.css";

function Resulta_serching() {
  const location = useLocation();
  const resultats = location.state?.resultats || [];

  console.log("Données reçues :", location.state); // Vérifier ce qui est reçu

  return (
    <div className="resulta">
      <h1 style={{ marginBottom: "4%" }}>Résultats de la recherche</h1>

      <div className="container-produits">
        {resultats.length > 0 ? (
          resultats.map((produit, index) => (
            <Card_produits
              key={index}
              titre={produit.titre}
              image={produit.image}
              description={produit.description}
              prix={produit.prix}
            />
          ))
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Resulta_serching;
