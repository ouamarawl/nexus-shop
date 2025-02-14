import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>Nexus Shop est votre boutique en ligne de confiance pour les dernières tendances technologiques.</p>
        </div>

        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Produits</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">À propos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email : contact@nexusshop.com</p>
          <p>Téléphone : +213 123 456 789</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Nexus Shop. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
