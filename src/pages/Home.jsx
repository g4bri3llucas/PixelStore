import { useEffect, useState } from "react";
import GameCard from "../components/GameCard/GameCard";
import Banner from "../components/Banner/Banner";
import { getGames } from "../services/api";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        const formatted = data.map(game => ({
          id: game.id,
          title: game.name,
          price: Math.floor(Math.random() * 200) + 50,
          image: game.background_image,
          genre: game.genres?.map(g => g.name).join(", "),
          rating: game.rating,
        }));
        setGames(formatted);
      } catch (err) {
        console.error("Erro na API PixelStore:", err);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="home-content">
      {games.length > 0 && <Banner games={games} />}

      <h2 style={{ color: "white", margin: "40px 0 20px" }}>Jogos Populares</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "30px"
      }}>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Home;