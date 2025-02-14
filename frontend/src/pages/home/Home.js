import React from "react";
import Card_produits from "../../component/cards/Card_produits";
import "./Home.css";
import Card_categories from "../../component/cards/Card_ctaegories";

const categories = [
  { id: 1, titre: "Montres", image: "https://picsum.photos/300/200?random=21" },
  { id: 2, titre: "Casques Audio", image: "https://picsum.photos/300/200?random=22" },
  { id: 3, titre: "Smartphones", image: "https://picsum.photos/300/200?random=23" },
];

const produits = [
  {
    id: 1,
    titre: "Montre Classique",
    image: "https://picsum.photos/300/200?random=1",
    description: "Une montre élégante en cuir.",
    prix: 5000,
  },
  {
    id: 2,
    titre: "Casque Audio",
    image: "https://picsum.photos/300/200?random=2",
    description: "Casque sans fil avec réduction de bruit.",
    prix: 12000,
  },
  {
    id: 3,
    titre: "Chaussures Sport",
    image: "https://picsum.photos/300/200?random=3",
    description: "Baskets confortables pour le sport.",
    prix: 8000,
  },
  {
    id: 4,
    titre: "Smartphone",
    image: "https://picsum.photos/300/200?random=4",
    description: "Un téléphone puissant et rapide.",
    prix: 70000,
  },
  {
    id: 5,
    titre: "Ordinateur Portable",
    image: "https://picsum.photos/300/200?random=5",
    description: "PC portable performant pour le travail.",
    prix: 95000,
  },
  {
    id: 6,
    titre: "Clavier Mécanique",
    image: "https://picsum.photos/300/200?random=6",
    description: "Clavier RGB ultra réactif.",
    prix: 15000,
  },
  {
    id: 7,
    titre: "Souris Gamer",
    image: "https://picsum.photos/300/200?random=7",
    description: "Souris sans fil avec capteur haute précision.",
    prix: 7000,
  },
  {
    id: 8,
    titre: "Écouteurs Bluetooth",
    image: "https://picsum.photos/300/200?random=8",
    description: "Écouteurs sans fil avec autonomie longue durée.",
    prix: 6000,
  },
  {
    id: 9,
    titre: "Télévision 4K",
    image: "https://picsum.photos/300/200?random=9",
    description: "Écran LED ultra haute définition.",
    prix: 120000,
  },
  {
    id: 10,
    titre: "Console de Jeux",
    image: "https://picsum.photos/300/200?random=10",
    description: "Console de nouvelle génération.",
    prix: 180000,
  },
  {
    id: 11,
    titre: "Appareil Photo",
    image: "https://picsum.photos/300/200?random=11",
    description: "Appareil photo reflex haute qualité.",
    prix: 130000,
  },
  {
    id: 12,
    titre: "Lampe de Bureau",
    image: "https://picsum.photos/300/200?random=12",
    description: "Lampe LED avec plusieurs modes de luminosité.",
    prix: 4000,
  },
  {
    id: 13,
    titre: "Chaise Gaming",
    image: "https://picsum.photos/300/200?random=13",
    description: "Chaise ergonomique pour gamer.",
    prix: 25000,
  },
  {
    id: 14,
    titre: "Tablette Tactile",
    image: "https://picsum.photos/300/200?random=14",
    description: "Tablette fluide avec grand écran.",
    prix: 55000,
  },
  {
    id: 15,
    titre: "Ventilateur USB",
    image: "https://picsum.photos/300/200?random=15",
    description: "Ventilateur compact et portable.",
    prix: 3000,
  },
  {
    id: 16,
    titre: "Sac à Dos",
    image: "https://picsum.photos/300/200?random=16",
    description: "Sac à dos robuste et imperméable.",
    prix: 9000,
  },
  {
    id: 17,
    titre: "Disque Dur Externe",
    image: "https://picsum.photos/300/200?random=17",
    description: "1 To de stockage sécurisé.",
    prix: 18000,
  },
  {
    id: 18,
    titre: "Enceinte Bluetooth",
    image: "https://picsum.photos/300/200?random=18",
    description: "Son puissant et connectivité sans fil.",
    prix: 14000,
  },
  {
    id: 19,
    titre: "Lunettes de Soleil",
    image: "https://picsum.photos/300/200?random=19",
    description: "Protection UV avec style.",
    prix: 6000,
  },
  {
    id: 20,
    titre: "Tapis de Souris XXL",
    image: "https://picsum.photos/300/200?random=20",
    description: "Surface lisse pour un meilleur contrôle.",
    prix: 5000,
  },
];

function Home() {
  return (
    <div className="Home">
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
