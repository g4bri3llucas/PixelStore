import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar toggleMenu={toggleMenu} isOpen={isMenuOpen} />
        <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetail />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;