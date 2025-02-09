import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
