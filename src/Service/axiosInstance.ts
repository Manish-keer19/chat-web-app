// src/services/axiosInstance.ts
import axios from "axios";



// console.log("BACKEND_URL is ", import.meta.env.VITE_BACKEND_LOCAL_URL);
// Create an Axios instance with the base URL and any configuration you need
const axiosInstance = axios.create({
  
  
  // baseURL:import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
  // baseURL:import.meta.env.VITE_BACKEND_LOCAL_URL, // Replace with your API base URL
  baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
  },
});

export default axiosInstance;
