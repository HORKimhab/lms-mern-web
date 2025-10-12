import axios from "axios";

const envVite = import.meta.env; 

const axiosInstance = axios.create({
  baseURL:envVite.VITE_BACKEND_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
