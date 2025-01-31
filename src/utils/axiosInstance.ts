import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dreamai-api.vercel.app/api/v1",
  // baseURL: "http://localhost:8080/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request headers if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
