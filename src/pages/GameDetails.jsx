import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=SUA_API_KEY_AQUI`
        );
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!game) return <div className="error">Game not found.</div>;

  return (
    <div className="game-details">
      <div className="game-header" style={{ backgroundImage: `url(${game.background_image})` }}>
        <div className="header-content">
          <h1>{game.name}</h1>
        </div>
      </div>
      
      <div className="game-content">
        <div className="main-info">
          <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
        </div>
        
        <div className="side-info">
          <div className="info-box">
            <span>Rating</span>
            <strong>{game.rating} / 5</strong>
          </div>
          <div className="info-box">
            <span>Released</span>
            <strong>{game.released}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;