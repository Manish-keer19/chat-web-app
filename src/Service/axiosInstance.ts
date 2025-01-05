// src/services/axiosInstance.ts
import axios from "axios";

// Create an Axios instance with the base URL and any configuration you need
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
    
  }
});

export default axiosInstance;
