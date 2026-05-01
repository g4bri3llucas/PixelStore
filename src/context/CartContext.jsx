import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

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