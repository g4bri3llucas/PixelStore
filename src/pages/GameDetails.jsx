import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "../services/api"

function GameDetails() {
  const { id } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGameById(id)

      setGame({
        title: data.name,
        description: data.description_raw,
        image: data.background_image,
        rating: data.rating
      })
    }

    fetchGame()
  }, [id])

  if (!game) return <p style={{ padding: "40px" }}>Carregando...</p>

  return (
    <div style={{ padding: "40px" }}>
      <img src={game.image} style={{ width: "100%" }} />
      <h1>{game.title}</h1>
      <p>⭐ {game.rating}</p>
      <p>{game.description}</p>
    </div>
  )
}

export default GameDetails