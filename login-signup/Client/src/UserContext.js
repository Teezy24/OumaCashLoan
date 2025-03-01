import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './axiosConfig'; // Import Axios instance

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/session');
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
