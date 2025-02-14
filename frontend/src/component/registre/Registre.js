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
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        console.log("Connexion réussie !");
        navigate('/Acces');
      } else {
        console.log("Échec de connexion, vérifiez vos informations !");
        alert('Échec de connexion, vérifiez vos informations !');
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className='registre'>
      <div className="container" ref={containerRef}>
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={nom} onChange={(e) => setNom(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={ajouterUtilisateur}>Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin"></i></a>
            </div>
            <span>or use your email and password</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Forgot your password?</a>
            <button type="button" onClick={verification_id}>Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site's features</p>
              <button className="hidden" onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of the site's features</p>
              <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registre;
