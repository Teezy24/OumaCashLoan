import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './axiosConfig'; // Import Axios instance
import { logoutUser } from './authUtils'; // A function to handle logout (we will define it next)

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/session');
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.response && error.response.status === 401) {
          logoutUser(); // Log out the user if session is expired
        } else {
          setUser(null); // Ensure user is set to null on other errors
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
