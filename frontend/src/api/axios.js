// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Points to your Express backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;