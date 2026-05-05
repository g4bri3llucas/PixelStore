import { Link } from "react-router-dom";
import { FiShoppingCart, FiCheck, FiMonitor } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import type { Game } from "../../context/CartContext";
import "./GameCard.css";

interface GameCardProps {
  game: Game;
  discount?: number | null;
  isNew?: boolean;
  delay?: number;
}

const GameCard = ({ game, discount, isNew, delay = 0 }: GameCardProps) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  const finalPrice = discount
    ? Math.round(game.price * (1 - discount / 100))
    : game.price;

  const starsCount = Math.round((game.rating ?? 4) / 2);
  const stars = "★".repeat(starsCount) + "☆".repeat(5 - starsCount);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
  };

  return (
    <div className="game-card" style={{ animationDelay: `${delay}ms` }}>

      {/* Imagem */}
      <Link to={`/game/${game.id}`} className="game-card__image-wrap">
        <img
          className="game-card__image"
          src={game.image}
          alt={game.title}
          loading="lazy"
        />
        {discount && (
          <span className="game-card__discount">-{discount}%</span>
        )}
        {isNew && (
          <span className="game-card__new-badge">Novo</span>
        )}
        <div className="game-card__quick-add">
          <button
            className={`game-card__quick-btn ${inCart ? "in-cart" : ""}`}
            onClick={handleAddToCart}
          >
            {inCart ? <FiCheck size={15} /> : <FiShoppingCart size={15} />}
            {inCart ? "Adicionado!" : "Adicionar"}
          </button>
        </div>
      </Link>

      {/* Body */}
      <Link to={`/game/${game.id}`} className="game-card__body">
        <div className="game-card__platforms">
          <FiMonitor className="game-card__platform-icon" size={13} />
        </div>
        <h3 className="game-card__title">{game.title}</h3>
        {game.genre && (
          <span className="game-card__genre">{game.genre.split(",")[0]}</span>
        )}
        <div className="game-card__rating">
          <span className="game-card__stars">{stars}</span>
          <span className="game-card__rating-value">
            {game.rating?.toFixed(1) ?? "—"}
          </span>
        </div>
      </Link>

      {/* Footer */}
      <div className="game-card__footer">
        <div className="game-card__price-block">
          {discount && (
            <span className="game-card__price-original">
              R$ {game.price.toLocaleString("pt-BR")}
            </span>
          )}
          <span className={`game-card__price-final ${discount ? "has-discount" : ""}`}>
            R$ {finalPrice.toLocaleString("pt-BR")}
          </span>
        </div>
        <button
          className={`game-card__cart-btn ${inCart ? "in-cart" : ""}`}
          onClick={handleAddToCart}
          aria-label={inCart ? "No carrinho" : "Adicionar ao carrinho"}
        >
          {inCart ? <FiCheck size={15} /> : <FiShoppingCart size={15} />}
        </button>
      </div>

    </div>
  );
};

export default GameCard;