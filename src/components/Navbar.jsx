import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">PixelStore</h1>

      <div className="links">
        <Link to="/">Início</Link>
        <Link to="/cart">Carrinho</Link>
      </div>
    </nav>
  )
}

export default Navbar