import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Panier from './pages/panier/Panier';
import About from './pages/about/About';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Admin from './pages/Admin_dashboard/Admin';
import Resulta_serching from './component/Searchbar/Resulta_serching';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/about" element={<About/>} />
           <Route path="/panier" element={<Panier/>} />
           <Route path="/admin" element={<Admin/>} />
           <Route path="/resulta_produit" element={<Resulta_serching/>} />
         </Routes>
         <Footer/>
      </Router>
    </div>
  );
}

export default App;
