import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Backend API URL
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
