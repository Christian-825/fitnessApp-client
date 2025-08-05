import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://fitnessapp-api-ln8u.onrender.com",
});

export default api;
