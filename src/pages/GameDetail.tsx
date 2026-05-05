import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart, FiCheck } from "react-icons/fi";
import { getGameById, generatePrice, generateDiscount } from "../services/api";
import type { RawgGame } from "../services/api";
import { useCart } from "../context/CartContext";

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [game, setGame] = useState<RawgGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getGameById(id)
      .then(setGame)
      .catch(() => setError("Jogo não encontrado."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ color: "var(--text)", padding: "80px", textAlign: "center" }}>
      Carregando...
    </div>
  );

  if (error || !game) return (
    <div style={{ color: "var(--text)", padding: "80px", textAlign: "center" }}>
      <p>{error ?? "Jogo não encontrado."}</p>
      <button onClick={() => navigate(-1)} style={{ color: "var(--accent-light)", marginTop: 16, cursor: "pointer" }}>
        ← Voltar
      </button>
    </div>
  );

  const price = generatePrice(game);
  const discount = generateDiscount(game);
  const finalPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  const cartGame = {
    id: game.id,
    title: game.name,
    price: finalPrice,
    image: game.background_image,
    genre: game.genres?.map(g => g.name).join(", "),
    rating: game.rating,
  };

  const inCart = isInCart(game.id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      {/* Voltar */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          color: "var(--text-muted)", marginBottom: 24,
          fontSize: "0.875rem", fontWeight: 600, cursor: "pointer"
        }}
      >
        <FiArrowLeft size={16} /> Voltar
      </button>

      {/* Hero */}
      <div style={{
        width: "100%", height: 360, borderRadius: "var(--r-xl)",
        overflow: "hidden", marginBottom: 32, position: "relative"
      }}>
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(0deg, rgba(5,8,19,0.9) 0%, transparent 60%)"
        }} />
      </div>

      {/* Layout */}
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            fontWeight: 900, color: "var(--text-bright)", marginBottom: 12
          }}>
            {game.name}
          </h1>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {game.genres?.map(g => (
              <span key={g.id} style={{
                background: "var(--bg-elevated)", border: "1px solid var(--border)",
                borderRadius: 99, padding: "3px 12px",
                fontSize: "0.75rem", color: "var(--text-muted)"
              }}>
                {g.name}
              </span>
            ))}
          </div>

          <p style={{
            fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.8,
            marginBottom: 24
          }}>
            {game.description_raw?.slice(0, 600) ?? "Descrição não disponível."}
            {(game.description_raw?.length ?? 0) > 600 ? "..." : ""}
          </p>

          {/* Specs */}
          {[
            { label: "Lançamento", value: game.released ? new Date(game.released).toLocaleDateString("pt-BR") : "—" },
            { label: "Metacritic", value: game.metacritic ?? "—" },
            { label: "Desenvolvedor", value: game.developers?.[0]?.name ?? "—" },
            { label: "Publisher", value: game.publishers?.[0]?.name ?? "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: "flex", gap: 16, padding: "10px 0",
              borderBottom: "1px solid var(--border)", fontSize: "0.875rem"
            }}>
              <span style={{ width: 140, color: "var(--text-muted)", flexShrink: 0 }}>{label}</span>
              <span style={{ color: "var(--text-bright)" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Card de compra */}
        <div style={{
          width: 280, flexShrink: 0,
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)", padding: 24,
          display: "flex", flexDirection: "column", gap: 16,
          alignSelf: "flex-start", position: "sticky", top: 80
        }}>
          {/* Preço */}
          <div style={{
            background: "var(--bg-secondary)", border: "1px solid var(--border)",
            borderRadius: "var(--r-md)", padding: 16
          }}>
            {discount && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  background: "var(--green)", color: "#fff",
                  fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                  fontWeight: 700, padding: "2px 8px", borderRadius: "var(--r-sm)"
                }}>
                  -{discount}%
                </span>
                <span style={{
                  color: "var(--text-muted)", textDecoration: "line-through",
                  fontFamily: "var(--font-mono)", fontSize: "0.85rem"
                }}>
                  R$ {price.toLocaleString("pt-BR")}
                </span>
              </div>
            )}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "2rem",
              fontWeight: 700, color: "var(--text-bright)"
            }}>
              R$ {finalPrice.toLocaleString("pt-BR")}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
              Chave digital • Entrega imediata
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={() => addToCart(cartGame)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, width: "100%", height: 48,
              background: inCart ? "var(--green)" : "var(--accent)",
              color: "#fff", fontSize: "0.95rem", fontWeight: 700,
              borderRadius: "var(--r-md)", cursor: "pointer",
              transition: "all 0.2s", border: "none"
            }}
          >
            {inCart ? <><FiCheck size={17} /> Adicionado!</> : <><FiShoppingCart size={17} /> Adicionar ao Carrinho</>}
          </button>

          {/* Garantias */}
          {["✓ Ativação garantida", "✓ Suporte 24h", "✓ Pagamento seguro"].map(g => (
            <div key={g} style={{ fontSize: "0.8rem", color: "var(--green)" }}>{g}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameDetail;