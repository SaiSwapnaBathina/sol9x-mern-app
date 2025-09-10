import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "/api", // uses proxy for localhost:4000
});

// Add JWT token to every request if available
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("sol9x_user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
