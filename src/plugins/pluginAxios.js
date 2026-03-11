import axios from 'axios';
import { useAuthStore } from "../stores/Auth.js";

const axiosInstance = axios.create({
  baseURL: 'https://joshua-jos-proyect-backend.onrender.com/api',
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

