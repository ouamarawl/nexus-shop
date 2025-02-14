import React from "react";
import './Cards.css'
function Card_categories({ titre, image }) {
  return (
    <div className="card-category">
      <img src={image} alt={titre} />
      <h3>{titre}</h3>
    </div>
  );
}

export default Card_categories;
