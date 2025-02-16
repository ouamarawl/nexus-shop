import React, { useEffect, useState } from "react";
import Card_produits from "../../component/cards/Card_produits";
import "./Home.css";
import Card_categories from "../../component/cards/Card_ctaegories";

const categories = [
  { id: 1, titre: "Montres", image: "https://picsum.photos/300/200?random=21" },
  { id: 2, titre: "Casques Audio", image: "https://picsum.photos/300/200?random=22" },
  { id: 3, titre: "Smartphones", image: "https://picsum.photos/300/200?random=23" },
];

function Home() {
  // ✅ Déplacement des hooks à l'intérieur du composant
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
    <div className="Home">
       <div id="partie_de_resultas"></div>

      <div className="section-categories">
        <h1>Catégories</h1>
        <div className="container-categories">
          {categories.map((categorie) => (
            <Card_categories
              key={categorie.id}
              titre={categorie.titre}
              image={categorie.image}
            />
          ))}
        </div>
      </div>

      <div className="section-produits">
        <h1>Nos Produits</h1>
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

export default Home;
