import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Importamos o sistema de roteamento
import { CartProvider } from "./context/CartContext"; 

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
// Por enquanto, vamos criar um componente temporário para não quebrar o código
const GameDetailsPlaceholder = () => <div style={{color: 'white', padding: '100px'}}>Página de Detalhes em breve...</div>;

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
            {/* Rota principal: Catálogo de jogos */}
            <Route path="/" element={<Home />} />
            
            {/* Rota dinâmica: :id captura o ID do jogo na URL */}
            <Route path="/game/:id" element={<GameDetailsPlaceholder />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;