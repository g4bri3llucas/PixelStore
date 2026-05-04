import { createContext, useState, useEffect, useContext, useCallback } from "react";

export interface Game {
  id: number;
  title: string;
  price: number;
  image: string;
  genre?: string;
  rating?: number;
}

interface CartItem extends Game {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  total: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("pixelstore_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pixelstore_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((game: Game) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === game.id);
      if (existing) {
        return prev.map((i) =>
          i.id === game.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decreaseQty = useCallback((id: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isInCart = useCallback(
    (id: number) => cart.some((i) => i.id === id),
    [cart]
  );

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isInCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};