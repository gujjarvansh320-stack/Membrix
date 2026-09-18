// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://membrix-backend.onrender.com", // Points to your Express backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;