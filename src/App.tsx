import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import GameDetails from "./pages/GameDetails"
import Cart from "./pages/Cart"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App