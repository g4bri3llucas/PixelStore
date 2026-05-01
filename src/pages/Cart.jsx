import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
  const { cart, removeFromCart, total } = useContext(CartContext)

  return (
    <div style={{ padding: "40px", backgroundColor: "#020617", minHeight: "100vh" }}>
      <h1>Carrinho</h1>

      {cart.length === 0 && (
  <div className="empty-cart">
    <p>Seu carrinho está vazio.</p>
    <Link to="/" className="back-button">Explorar Games</Link>
  </div>
)}

      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <h3>{item.title}</h3>
          <p>R$ {item.price}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remover
          </button>
        </div>
      ))}

      <h2>Total: R$ {total}</h2>
    </div>
  )
}

export default Cart