import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/me')
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  };

  const register = async (userData) => {
    await axios.post('/api/auth/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
