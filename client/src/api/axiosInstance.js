import axios from "axios";


console.log(process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000")
const axiosInstance = axios.create({
  // Bitcoin
  // baseURL: "http://localhost:5000",
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
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
