import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiInfo } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import type { Game } from "../../context/CartContext";
import "./Banner.css";

interface BannerProps {
  games: Game[];
}

const Banner = ({ games }: BannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  const slides = games.slice(0, 5);
  const current = slides[activeIndex];

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  // Autoplay a cada 5s
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!current) return <div className="banner-skeleton" />;

  const discount = 20;
  const finalPrice = Math.round(current.price * (1 - discount / 100));
  const starsCount = Math.round((current.rating ?? 4) / 2);
  const stars = "★".repeat(starsCount) + "☆".repeat(5 - starsCount);

  return (
    <div className="banner">
      <img
        key={current.id}
        className="banner__bg animate-fade-in"
        src={current.image}
        alt={current.title}
      />

      <div className="banner__overlay" />

      {/* Rating */}
      <div className="banner__rating">
        <span className="banner__rating-value">
          {current.rating?.toFixed(1) ?? "4.0"}
        </span>
        <span className="banner__rating-stars">{stars}</span>
        <span className="banner__rating-count">RAWG</span>
      </div>

      {/* Conteúdo */}
      <div className="banner__content">
        <span className="banner__tag">🔥 Destaque</span>

        {current.genre && (
          <div className="banner__genres">
            {current.genre.split(",").slice(0, 3).map((g) => (
              <span key={g} className="banner__genre">{g.trim()}</span>
            ))}
          </div>
        )}

        <h1 className="banner__title">{current.title}</h1>

        <div className="banner__actions">
          <div className="banner__price-block">
            <span className="banner__price-label">A partir de</span>
            <div className="banner__price-row">
              <span className="banner__discount-badge">-{discount}%</span>
              <span className="banner__price-original">
                R$ {current.price.toLocaleString("pt-BR")}
              </span>
              <span className="banner__price-final">
                R$ {finalPrice.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          <button
            className="banner__btn-primary"
            onClick={() => addToCart(current)}
          >
            <FiShoppingCart size={16} />
            {isInCart(current.id) ? "No Carrinho ✓" : "Adicionar ao Carrinho"}
          </button>

          <button
            className="banner__btn-secondary"
            onClick={() => navigate(`/game/${current.id}`)}
          >
            <FiInfo size={14} /> Ver Detalhes
          </button>
        </div>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="banner__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`banner__dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;