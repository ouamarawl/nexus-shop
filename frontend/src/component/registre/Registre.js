import './registre.css';
import { useRef, useState, useEffect } from 'react';
import Acces from '../registre/Acces';
import { useNavigate } from "react-router-dom"; 
function Registre() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate();


  // Récupération des utilisateurs depuis l'API
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Utilisateurs chargés :", data);
        setUsers(data);
      })
      .catch((error) => console.error("Erreur de chargement :", error));
  }, []);

  const handleRegisterClick = () => {
    containerRef.current.classList.add("active");
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove("active");
  };

  const ajouterUtilisateur = () => {
    const userData = { name: nom, email, password };

    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Utilisateur ajouté avec succès:", data);
        setUsers([...users, data]);
      })
      .catch((error) => console.error("Erreur d'ajout :", error));
  };

  const verification_id = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      const users = await response.json();
  
      const user = users.find(u =>  u.email === email && u.password === password);
      
      if (user) {
        console.log("Connexion réussie !");
        navigate('/Acces'); // Rediriger vers Acces.js
      } else {
        console.log("Échec de connexion, vérifiez vos informations !");
        alert('Échec de connexion, vérifiez vos informations !')
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  

  return (
    
      <div className="container" ref={containerRef}>
        <div className="form-container sign-up">
          <form>
            <h1>Créer un compte</h1>
            <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={ajouterUtilisateur}>S'inscrire</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Se connecter</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={verification_id}>Se connecter</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Bienvenue !</h1>
              <p>Entrez vos informations personnelles pour utiliser toutes les fonctionnalités du site</p>
              <button className="hidden" onClick={handleLoginClick}>Se connecter</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Salut, ami !</h1>
              <p>Inscrivez-vous avec vos informations personnelles pour utiliser toutes les fonctionnalités</p>
              <button className="hidden" onClick={handleRegisterClick}>S'inscrire</button>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Registre;
