import { describe, it, expect } from 'vitest'



interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

const addToCart = (cart: CartItem[], game: Omit<CartItem, 'quantity'>): CartItem[] => {
  const existing = cart.find((i) => i.id === game.id)
  if (existing) {
    return cart.map((i) =>
      i.id === game.id ? { ...i, quantity: i.quantity + 1 } : i
    )
  }
  return [...cart, { ...game, quantity: 1 }]
}

const removeFromCart = (cart: CartItem[], id: number): CartItem[] =>
  cart.filter((i) => i.id !== id)

const increaseQty = (cart: CartItem[], id: number): CartItem[] =>
  cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))

const decreaseQty = (cart: CartItem[], id: number): CartItem[] =>
  cart
    .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
    .filter((i) => i.quantity > 0)

const getTotal = (cart: CartItem[]): number =>
  cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

const getTotalItems = (cart: CartItem[]): number =>
  cart.reduce((sum, i) => sum + i.quantity, 0)



const makeGame = (id: number, price = 99): Omit<CartItem, 'quantity'> => ({
  id,
  title: `Game ${id}`,
  price,
  image: 'https://example.com/img.jpg',
})



describe('Cart — addToCart', () => {
  it('adds a new game to empty cart', () => {
    const cart = addToCart([], makeGame(1))
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(1)
  })

  it('increases quantity if game already in cart', () => {
    let cart = addToCart([], makeGame(1))
    cart = addToCart(cart, makeGame(1))
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(2)
  })

  it('adds multiple different games', () => {
    let cart = addToCart([], makeGame(1))
    cart = addToCart(cart, makeGame(2))
    expect(cart).toHaveLength(2)
  })
})

describe('Cart — removeFromCart', () => {
  it('removes a game by id', () => {
    let cart = addToCart([], makeGame(1))
    cart = addToCart(cart, makeGame(2))
    cart = removeFromCart(cart, 1)
    expect(cart).toHaveLength(1)
    expect(cart[0].id).toBe(2)
  })

  it('does nothing if id not found', () => {
    const cart = addToCart([], makeGame(1))
    const result = removeFromCart(cart, 99)
    expect(result).toHaveLength(1)
  })
})

describe('Cart — quantity controls', () => {
  it('increases quantity', () => {
    let cart = addToCart([], makeGame(1))
    cart = increaseQty(cart, 1)
    expect(cart[0].quantity).toBe(2)
  })

  it('decreases quantity', () => {
    let cart = addToCart([], makeGame(1))
    cart = increaseQty(cart, 1)
    cart = decreaseQty(cart, 1)
    expect(cart[0].quantity).toBe(1)
  })

  it('removes item when quantity reaches 0', () => {
    let cart = addToCart([], makeGame(1))
    cart = decreaseQty(cart, 1)
    expect(cart).toHaveLength(0)
  })
})

describe('Cart — totals', () => {
  it('calculates total price correctly', () => {
    let cart = addToCart([], makeGame(1, 100))
    cart = addToCart(cart, makeGame(2, 50))
    expect(getTotal(cart)).toBe(150)
  })

  it('multiplies price by quantity', () => {
    let cart = addToCart([], makeGame(1, 100))
    cart = increaseQty(cart, 1)
    expect(getTotal(cart)).toBe(200)
  })

  it('counts total items including quantities', () => {
    let cart = addToCart([], makeGame(1))
    cart = addToCart(cart, makeGame(1))
    cart = addToCart(cart, makeGame(2))
    expect(getTotalItems(cart)).toBe(3)
  })

  it('returns 0 for empty cart', () => {
    expect(getTotal([])).toBe(0)
    expect(getTotalItems([])).toBe(0)
  })
})