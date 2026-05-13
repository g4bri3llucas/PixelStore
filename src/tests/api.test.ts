import { describe, it, expect } from 'vitest'
import { generatePrice, generateDiscount } from '../services/api'
import type { RawgGame } from '../services/api'

// Fixture mínima de um jogo RAWG
const makeRawgGame = (overrides: Partial<RawgGame> = {}): RawgGame => ({
  id: 1,
  name: 'Test Game',
  background_image: 'https://example.com/img.jpg',
  rating: 4.0,
  ratings_count: 1000,
  metacritic: 80,
  released: '2022-01-01',
  genres: [],
  platforms: [],
  short_screenshots: [],
  esrb_rating: null,
  ...overrides,
})

describe('generatePrice', () => {
  it('returns higher price for highly rated games', () => {
    const highRated = makeRawgGame({ rating: 4.5, released: '2023-01-01' })
    const lowRated = makeRawgGame({ rating: 2.0, released: '2023-01-01' })
    expect(generatePrice(highRated)).toBeGreaterThan(generatePrice(lowRated))
  })

  it('returns lower price for older games', () => {
    const recent = makeRawgGame({ rating: 4.0, released: '2024-01-01' })
    const old = makeRawgGame({ rating: 4.0, released: '2010-01-01' })
    expect(generatePrice(recent)).toBeGreaterThan(generatePrice(old))
  })

  it('never returns price below R$19', () => {
    const veryOld = makeRawgGame({ rating: 1.0, released: '1995-01-01' })
    expect(generatePrice(veryOld)).toBeGreaterThanOrEqual(19)
  })

  it('returns a number ending in 9', () => {
    const game = makeRawgGame({ rating: 4.0, released: '2022-01-01' })
    expect(generatePrice(game) % 10).toBe(9)
  })
})

describe('generateDiscount', () => {
  it('returns 40% for poorly rated but very popular games', () => {
    const game = makeRawgGame({ rating: 3.5, ratings_count: 6000 })
    expect(generateDiscount(game)).toBe(40)
  })

  it('returns 20% for moderately popular games', () => {
    const game = makeRawgGame({ rating: 4.5, ratings_count: 2000 })
    expect(generateDiscount(game)).toBe(20)
  })

  it('returns a number or null', () => {
    const game = makeRawgGame({ rating: 4.0, ratings_count: 100 })
    const result = generateDiscount(game)
    expect(result === null || typeof result === 'number').toBe(true)
  })
})