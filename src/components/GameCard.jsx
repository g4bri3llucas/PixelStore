import "./GameCard.css"
import { Link } from "react-router-dom"

function GameCard({ game }) {
  return (
    <div className="card">
      <img src={game.image} alt={game.title} />

      <div className="card-info">
        <h3>{game.title}</h3>
        <p>R$ {game.price}</p>

        <Link to={`/game/${game.id}`}>
          <button>Ver mais</button>
        </Link>
      </div>
    </div>
  )
}

export default GameCard