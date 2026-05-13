import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import "./NotFound.css";

const suggestions = [
  { label: "🔥 Ofertas", path: "/" },
  { label: "🎮 Ação", path: "/?genre=action" },
  { label: "🧩 RPG", path: "/?genre=role-playing-games-rpg" },
  { label: "🏆 Mais Populares", path: "/" },
  { label: "🛒 Carrinho", path: "/cart" },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <div className="not-found__icon">🕹️</div>

      <h1 className="not-found__title">Página não encontrada</h1>
      <p className="not-found__desc">
        Parece que este nível não existe no jogo. A página que você procura
        foi removida, renomeada ou nunca existiu.
      </p>

      <div className="not-found__actions">
        <Link to="/" className="not-found__btn-primary">
          <FiHome size={16} />
          Ir para o Início
        </Link>
        <button
          className="not-found__btn-secondary"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={16} />
          Voltar
        </button>
      </div>

      <div className="not-found__suggestions">
        <div className="not-found__suggestions-title">
          Talvez você esteja procurando
        </div>
        <div className="not-found__suggestions-links">
          {suggestions.map((s) => (
            <Link
              key={s.label}
              to={s.path}
              className="not-found__suggestion-link"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;