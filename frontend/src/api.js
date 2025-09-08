import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAuthToken = () => localStorage.getItem("admin_token") || "";
export const setAuthToken = (token) => localStorage.setItem("admin_token", token);
export const clearAuthToken = () => localStorage.removeItem("admin_token");

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


