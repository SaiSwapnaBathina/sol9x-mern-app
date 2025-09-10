
import axios from "axios";

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || "/api",
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("sol9x_user");
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
