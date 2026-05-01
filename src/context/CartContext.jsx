import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (game) => {
    setCart((prev) => [...prev, game])
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  )
}