import { useEffect, useState, useCallback } from "react";
import { FiRefreshCw, FiAlertCircle, FiX } from "react-icons/fi";
import GameCard from "../components/GameCard/GameCard";
import Banner from "../components/Banner/Banner";
import { SkeletonGrid } from "../components/SkeletonCard/SkeletonCard";
import { getGames, getGenres, generatePrice, generateDiscount } from "../services/api";
import "./Home.css";

const ORDERINGS = [
  { label: "Mais Populares", value: "-rating" },
  { label: "Lançamentos", value: "-released" },
  { label: "Melhor Avaliados", value: "-metacritic" },
  { label: "A–Z", value: "name" },
];

function Home() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenres, setActiveGenres] = useState([]); // ← agora é array
  const [activeOrdering, setActiveOrdering] = useState("-rating");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => {});
  }, []);

  const fetchGames = useCallback(async (reset = true) => {
    try {
      reset ? setLoading(true) : setLoadingMore(true);
      setError(null);

      const currentPage = reset ? 1 : page + 1;
      const currentYear = new Date().getFullYear();

      const data = await getGames({
        page: currentPage,
        page_size: 20,
        // RAWG aceita múltiplos gêneros separados por vírgula
        genres: activeGenres.length > 0 ? activeGenres.join(",") : undefined,
        ordering: activeOrdering,
      });

      const formatted = data.map((g) => {
        const discount = generateDiscount(g);
        const releaseYear = g.released ? new Date(g.released).getFullYear() : 0;
        return {
          id: g.id,
          title: g.name,
          price: generatePrice(g),
          image: g.background_image,
          genre: g.genres?.map((x) => x.name).join(", "),
          rating: g.rating,
          discount,
          isNew: releaseYear >= currentYear - 1,
        };
      });

      if (reset) {
        setGames(formatted);
        setPage(1);
      } else {
        setGames((prev) => [...prev, ...formatted]);
        setPage(currentPage);
      }
    } catch (err) {
      setError(err?.message || "Erro ao carregar jogos. Verifique sua VITE_API_KEY.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeGenres, activeOrdering, page]);

  useEffect(() => {
    fetchGames(true);
  }, [activeGenres, activeOrdering]); // eslint-disable-line

  // Alterna gênero: adiciona se não está, remove se já está
  const toggleGenre = (slug) => {
    setActiveGenres((prev) =>
      prev.includes(slug)
        ? prev.filter((g) => g !== slug)
        : [...prev, slug]
    );
  };

  const clearGenres = () => setActiveGenres([]);

  const bannerGames = games.filter((g) => g.image).slice(0, 5);
  const onSaleGames = games.filter((g) => g.discount);

  // Label da seção principal
  const sectionTitle = activeGenres.length === 0
    ? "Catálogo Completo"
    : activeGenres.length === 1
    ? genres.find((g) => g.slug === activeGenres[0])?.name ?? "Jogos"
    : `${activeGenres.length} gêneros selecionados`;

  return (
    <div className="home">
      {/* Banner */}
      {loading
        ? <div className="banner-skeleton" />
        : <Banner games={bannerGames} />
      }

      {/* Filtros */}
      <div className="home__filters">
        <div className="home__genre-filters">
          {/* Botão "Todos" — limpa seleção */}
          <button
            className={`home__genre-btn ${activeGenres.length === 0 ? "active" : ""}`}
            onClick={clearGenres}
          >
            Todos
          </button>

          {genres.slice(0, 8).map((g) => {
            const isActive = activeGenres.includes(g.slug);
            return (
              <button
                key={g.id}
                className={`home__genre-btn ${isActive ? "active" : ""}`}
                onClick={() => toggleGenre(g.slug)}
              >
                {g.name}
                {isActive && (
                  <FiX size={11} style={{ marginLeft: 5, verticalAlign: "middle" }} />
                )}
              </button>
            );
          })}
        </div>

        <select
          className="home__ordering"
          value={activeOrdering}
          onChange={(e) => setActiveOrdering(e.target.value)}
        >
          {ORDERINGS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Tags dos gêneros ativos */}
      {activeGenres.length > 0 && (
        <div className="home__active-filters">
          <span className="home__active-filters-label">Filtrando por:</span>
          {activeGenres.map((slug) => {
            const genre = genres.find((g) => g.slug === slug);
            return (
              <span key={slug} className="home__active-tag">
                {genre?.name ?? slug}
                <button
                  className="home__active-tag-remove"
                  onClick={() => toggleGenre(slug)}
                >
                  <FiX size={11} />
                </button>
              </span>
            );
          })}
          <button className="home__clear-filters" onClick={clearGenres}>
            Limpar tudo
          </button>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="home__error">
          <FiAlertCircle size={18} />
          <span>{error}</span>
          <button className="home__error-retry" onClick={() => fetchGames(true)}>
            <FiRefreshCw size={14} /> Tentar novamente
          </button>
        </div>
      )}

      {/* Seção Em Oferta */}
      {!loading && onSaleGames.length > 0 && (
        <section className="home__section">
          <div className="home__section-header">
            <h2 className="home__section-title">🔥 Em Oferta</h2>
            <span className="home__section-count">{onSaleGames.length} jogos</span>
          </div>
          <div className="games-grid">
            {onSaleGames.slice(0, 4).map((game, i) => (
              <GameCard
                key={game.id}
                game={game}
                discount={game.discount}
                isNew={game.isNew}
                delay={i * 60}
              />
            ))}
          </div>
        </section>
      )}

      {/* Catálogo Principal */}
      <section className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">{sectionTitle}</h2>
          {!loading && (
            <span className="home__section-count">{games.length} jogos</span>
          )}
        </div>

        {loading ? (
          <SkeletonGrid count={8} />
        ) : games.length === 0 ? (
          <div className="home__empty">
            <span style={{ fontSize: "2.5rem" }}>🎮</span>
            <p>Nenhum jogo encontrado para este filtro.</p>
            <button
              className="home__genre-btn"
              style={{ marginTop: 12 }}
              onClick={clearGenres}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="games-grid">
              {games.map((game, i) => (
                <GameCard
                  key={game.id}
                  game={game}
                  discount={game.discount}
                  isNew={game.isNew}
                  delay={i * 40}
                />
              ))}
            </div>

            <div className="home__load-more">
              <button
                className="home__load-more-btn"
                onClick={() => fetchGames(false)}
                disabled={loadingMore}
              >
                {loadingMore
                  ? <><FiRefreshCw size={15} className="spin" /> Carregando...</>
                  : "Carregar mais jogos"
                }
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;