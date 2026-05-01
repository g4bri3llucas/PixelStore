import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
})

export const getGames = async () => {
  const response = await api.get(
    `/games?key=${API_KEY}&page_size=10`
  )
  return response.data.results
}