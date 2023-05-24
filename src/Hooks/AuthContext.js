import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  const tokenize = (givenToken) => {
    // Perform logout logic here
    console.log(givenToken)
    setToken(givenToken);
  };

  const nameHandle = (givenName) => {
    setUsername(givenName)
  }

  const passHandle = (givenPass) => {
    setPassword(givenPass)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, tokenize, username, nameHandle, password, passHandle }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
