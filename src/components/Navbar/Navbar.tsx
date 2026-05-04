import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { searchGames, generatePrice, generateDiscount } from "../../services/api";
import "./Navbar.css";

interface NavbarProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

interface SearchResult {
  id: number;
  title: string;
  image: string;
  price: number;
  discount: number | null;
}

const Navbar = ({ toggleMenu, isOpen }: NavbarProps) => {
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowResults(false); return; }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await searchGames(query);
        setResults(
          data.slice(0, 6).map((g) => ({
            id: g.id,
            title: g.name,
            image: g.background_image,
            price: generatePrice(g),
            discount: generateDiscount(g),
          }))
        );
        setShowResults(true);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleResultClick = (id: number) => {
    setShowResults(false);
    setQuery("");
    navigate(`/game/${id}`);
  };

  const formatPrice = (price: number, discount: number | null) => {
    const final = discount ? Math.round(price * (1 - discount / 100)) : price;
    return `R$ ${final.toLocaleString("pt-BR")}`;
  };

  return (
    <nav className="navbar">
      <button className="navbar__toggle" onClick={toggleMenu} aria-label="Menu">
        {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      <Link to="/" className="navbar__logo">
        <div className="navbar__logo-icon">🎮</div>
        <span className="navbar__logo-text">Pixel<span>Store</span></span>
      </Link>

      <nav className="navbar__links">
        <Link to="/" className="navbar__link">Início</Link>
        <span className="navbar__link">Ofertas</span>
        <span className="navbar__link">Lançamentos</span>
        <span className="navbar__link">Gift Cards</span>
      </nav>

      <div className="navbar__search" ref={searchRef}>
        <FiSearch className="navbar__search-icon" size={14} />
        <input
          className="navbar__search-input"
          type="text"
          placeholder="Buscar jogos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setShowResults(true)}
        />

        {showResults && (
          <div className="navbar__search-results">
            {searching ? (
              <div className="navbar__search-empty">Buscando...</div>
            ) : results.length === 0 ? (
              <div className="navbar__search-empty">Nenhum jogo encontrado</div>
            ) : (
              results.map((r) => (
                <div
                  key={r.id}
                  className="navbar__search-result-item"
                  onClick={() => handleResultClick(r.id)}
                >
                  <img className="navbar__search-result-img" src={r.image} alt={r.title} />
                  <span className="navbar__search-result-title truncate">{r.title}</span>
                  <span className="navbar__search-result-price">
                    {formatPrice(r.price, r.discount)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="navbar__actions">
        <Link to="/cart" className="navbar__cart-btn">
          <FiShoppingCart size={16} />
          <span>Carrinho</span>
          {totalItems > 0 && (
            <span className="navbar__cart-badge">{totalItems}</span>
          )}
        </Link>
        <button className="navbar__login-btn">Entrar</button>
      </div>
    </nav>
  );
};

export default Navbar;