import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import { getGames } from "../services/api"

function Home() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames()

      const formatted = data.map(game => ({
        id: game.id,
        title: game.name,
        price: Math.floor(Math.random() * 200) + 50,
        image: game.background_image
      }))

      setGames(formatted)
    }

    fetchGames()
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h1>PixelStore</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default Home