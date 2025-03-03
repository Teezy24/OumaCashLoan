import axios from 'axios';
import { logoutUser } from './authUtils'; // A function to handle logout (we will define it next)

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your API base URL
  withCredentials: true, // Ensures cookies are sent with requests
});

// Axios Interceptor: Handle session expiration automatically
api.interceptors.response.use(
  response => response, // Pass successful responses through
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired, logging out...");
      logoutUser(); // Call the function to log out the user
    }
    return Promise.reject(error);
  }
);

export default api;
