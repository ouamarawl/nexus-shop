
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Panier from './pages/panier/Panier';
import About from './pages/about/About';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/about" element={<About/>} />
           <Route path="/panier" element={<Panier/>} />
         </Routes>
         <Footer/>
      </Router>
    </div>
  );
}

export default App;
