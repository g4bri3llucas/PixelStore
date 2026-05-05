import { useNavigate, Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart, total, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="cart__empty">
          <div className="cart__empty-icon">🛒</div>
          <h2 className="cart__empty-title">Seu carrinho está vazio</h2>
          <p className="cart__empty-desc">
            Adicione jogos ao carrinho para continuar.
          </p>
          <button
            className="cart__empty-btn"
            onClick={() => navigate("/")}
          >
            <FiShoppingBag size={16} style={{ marginRight: 8 }} />
            Ver Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      {/* Header */}
      <div className="cart__header">
        <h1 className="cart__title">Carrinho</h1>
        <span className="cart__count">{totalItems} {totalItems === 1 ? "item" : "itens"}</span>
      </div>

      <div className="cart__layout">
        {/* Lista de itens */}
        <div className="cart__items">
          {cart.map((item, i) => (
            <div
              className="cart__item"
              key={item.id}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Imagem */}
              <Link to={`/game/${item.id}`}>
                <img
                  className="cart__item-img"
                  src={item.image}
                  alt={item.title}
                />
              </Link>

              {/* Info */}
              <div className="cart__item-info">
                <Link to={`/game/${item.id}`}>
                  <div className="cart__item-title">{item.title}</div>
                </Link>
                {item.genre && (
                  <div className="cart__item-genre">
                    {item.genre.split(",")[0]}
                  </div>
                )}
              </div>

              {/* Quantidade */}
              <div className="cart__item-qty">
                <button
                  className="cart__qty-btn"
                  onClick={() => decreaseQty(item.id)}
                  aria-label="Diminuir"
                >
                  <FiMinus size={12} />
                </button>
                <span className="cart__qty-value">{item.quantity}</span>
                <button
                  className="cart__qty-btn"
                  onClick={() => increaseQty(item.id)}
                  aria-label="Aumentar"
                >
                  <FiPlus size={12} />
                </button>
              </div>

              {/* Preço */}
              <div className="cart__item-price">
                R$ {(item.price * item.quantity).toLocaleString("pt-BR")}
              </div>

              {/* Remover */}
              <button
                className="cart__item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover"
              >
                <FiTrash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <aside className="cart__summary">
          <h2 className="cart__summary-title">Resumo do Pedido</h2>

          <div className="cart__summary-row">
            <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})</span>
            <span>R$ {total.toLocaleString("pt-BR")}</span>
          </div>

          <div className="cart__summary-row">
            <span>Desconto</span>
            <span style={{ color: "var(--green)" }}>— R$ 0</span>
          </div>

          <div className="cart__summary-divider" />

          <div className="cart__summary-total">
            <span className="cart__summary-total-label">Total</span>
            <span className="cart__summary-total-value">
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>

          <button className="cart__checkout-btn">
            Finalizar Compra
          </button>

          <button className="cart__clear-btn" onClick={clearCart}>
            Limpar Carrinho
          </button>

          <div className="cart__guarantees">
            <div className="cart__guarantee">✓ Pagamento 100% seguro</div>
            <div className="cart__guarantee">✓ Chaves entregues imediatamente</div>
            <div className="cart__guarantee">✓ Suporte 24h</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;