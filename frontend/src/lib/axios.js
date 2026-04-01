import axios from "axios";

const apiHost =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development" ? "http://localhost:8080" : "");

const BASE_URL = apiHost
  ? `${apiHost.replace(/\/$/, "")}/todox/api`
  : "/todox/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;