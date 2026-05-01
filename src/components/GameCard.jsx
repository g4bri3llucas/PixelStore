import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import "./GameCard.css"
import { Link } from "react-router-dom"

function GameCard({ game }) {
  const { addToCart } = useContext(CartContext)

  return (
    <div className="card">
      <img src={game.image} alt={game.title} />

      <div className="card-info">
        <h3>{game.title}</h3>
        <p>R$ {game.price}</p>

        <button onClick={() => addToCart(game)}>
          Adicionar ao carrinho
        </button>

        <Link to={`/game/${game.id}`}>
          <button>Ver mais</button>
        </Link>
      </div>
    </div>
  )
}

export default GameCard