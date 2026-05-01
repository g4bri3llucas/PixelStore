import "./Banner.css"

function Banner({ game }) {
  if (!game) return null

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${game.image})` }}
    >
      <div className="overlay">
        <h1>{game.title}</h1>
        <p>Disponível agora</p>
        <button>Comprar</button>
      </div>
    </div>
  )
}

export default Banner