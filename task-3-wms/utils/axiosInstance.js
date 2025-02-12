import axios from 'axios';

const api = axios.create({
  baseURL: 'https://i-stage.mkwms.dev/api/v1',
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    config.headers['macaddress'] = '646EE0E68240';
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
