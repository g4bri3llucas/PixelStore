import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import "./GameCard.css"
import { Link } from "react-router-dom"

function GameCard({ game }) {
  const { addToCart } = useContext(CartContext)
  const discount = "-73%"; 

  return (
    <div className="card">
      <Link to={`/game/${game.id}`} className="card-link">
        <div className="image-container">
          <img src={game.image} alt={game.title} />
        </div>

        <div className="card-info">
          <h3>{game.title}</h3>
          
          <div className="price-container">
            <span className="discount-badge">{discount}</span>
            <span className="price-value">R$ {game.price}</span>
          </div>
        </div>
      </Link>

      <div className="card-action">
        <button className="buy-button" onClick={(e) => {
          e.preventDefault();
          addToCart(game);
        }}>
          <span className="cart-icon">🛒</span> Comprar
        </button>
      </div>
    </div>
  )
}

export default GameCard