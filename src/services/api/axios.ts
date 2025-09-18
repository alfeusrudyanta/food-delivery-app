import getCookie from '@/lib/getCookies';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getCookie('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
