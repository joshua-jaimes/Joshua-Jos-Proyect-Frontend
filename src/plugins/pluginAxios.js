import axios from 'axios';
import { useAuthStore } from "../stores/Auth.js";

const axiosInstance = axios.create({
  // Desarrollo: VITE_API_URL=http://localhost:3000/api  (en .env.local del frontend)
  // Producción: VITE_API_URL=https://tu-backend.onrender.com/api  (en Vercel env vars)
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

