// src/api/axiosClient.ts
import axios from "axios";

// Resolve API base URL and ensure it includes the /api prefix.
const rawBase =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000/api";
const baseURL = rawBase.endsWith("/api") ? rawBase : `${rawBase.replace(/\/$/, "")}/api`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (import.meta.env.DEV) {
  console.info("axiosClient baseURL:", axiosClient.defaults.baseURL);
}

// Add token automatically if exists
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
