import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dreamai-api.vercel.app/api/v1",
});

export default axiosInstance;
