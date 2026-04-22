import axios from 'axios';
import { useAuthStore } from "../stores/Auth.js";

// URL del backend: se lee de VITE_API_URL (variable de entorno en Vercel/local).
// Si no está definida, usa la URL real de Render como garantía.
// ⚠️ SIEMPRE define VITE_API_URL en Vercel → Settings → Environment Variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://joshua-jos-proyect-backend.onrender.com/api'

if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️ VITE_API_URL no definida. Usando fallback:', API_BASE_URL)
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


// Interceptor para añadir el header x-token
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;

