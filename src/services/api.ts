import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
});

// ── Tipagens da RAWG ──────────────────────────────────
export interface RawgGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  ratings_count: number;
  metacritic: number | null;
  released: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
  short_screenshots: { id: number; image: string }[];
  description_raw?: string;
  developers?: { name: string }[];
  publishers?: { name: string }[];
  esrb_rating?: { name: string } | null;
  website?: string;
}

// ── Helpers ───────────────────────────────────────────

/** Gera preço baseado no rating e ano de lançamento */
export const generatePrice = (game: RawgGame): number => {
  const base = game.rating >= 4 ? 199 : game.rating >= 3 ? 149 : 99;
  const year = game.released ? new Date(game.released).getFullYear() : 2020;
  const ageFactor = Math.max(0, 2025 - year) * 10;
  return Math.max(19, Math.floor((base - ageFactor) / 10) * 10 + 9);
};

/** Gera desconto baseado em popularidade */
export const generateDiscount = (game: RawgGame): number | null => {
  if (game.ratings_count > 5000 && game.rating < 4) return 40;
  if (game.ratings_count > 1000) return 20;
  if (Math.random() > 0.6) return Math.floor(Math.random() * 3 + 1) * 10;
  return null;
};

/** Retorna true se o jogo tem conteúdo adulto/sensível */
export const isMatureContent = (game: RawgGame): boolean => {
  const rating = game.esrb_rating?.name?.toLowerCase() ?? "";
  return ["adults only", "mature"].some((k) => rating.includes(k));
};

// ── Endpoints ─────────────────────────────────────────

export const getGames = async (params?: {
  page?: number;
  page_size?: number;
  genres?: string;
  ordering?: string;
  search?: string;
}): Promise<RawgGame[]> => {
  const response = await api.get("/games", {
    params: {
      key: API_KEY,
      page_size: 20,
      ordering: "-rating",
      ...params,
    },
  });
  return response.data.results;
};

export const getGameById = async (id: string | number): Promise<RawgGame> => {
  const response = await api.get(`/games/${id}`, {
    params: { key: API_KEY },
  });
  return response.data;
};

export const getGameScreenshots = async (id: string | number) => {
  const response = await api.get(`/games/${id}/screenshots`, {
    params: { key: API_KEY },
  });
  return response.data.results as { id: number; image: string }[];
};

export const getGenres = async () => {
  const response = await api.get("/genres", {
    params: { key: API_KEY },
  });
  return response.data.results as {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
};

export const searchGames = async (query: string): Promise<RawgGame[]> => {
  return getGames({ search: query, page_size: 12 });
};