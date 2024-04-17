import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // Adding a loading state
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Getting the jwtToken stored in the local storage
    const jwtToken = localStorage.getItem("jwtToken");
    setToken(jwtToken);
    // Marking loading as complete after saving the token
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null); 
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};