import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your Flask backend base URL
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true, // Optional if you use cookies (not needed for token auth)
});

export default API;
