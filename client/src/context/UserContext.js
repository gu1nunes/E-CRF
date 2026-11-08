import React, { createContext, useState, useContext } from 'react';
import { loginRequest, meRequest } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('ecrf_token');
    if (!token) {
      return;
    }

    meRequest(token)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('ecrf_token');
        setCurrentUser(null);
      });
  }, []);

  const login = async (email, password) => {
    const response = await loginRequest({ email, password });
    localStorage.setItem('ecrf_token', response.data.token);
    setCurrentUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem('ecrf_token');
    setCurrentUser(null);
  };

  const value = {
    user: currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};