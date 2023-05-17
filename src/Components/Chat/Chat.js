import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatsPage from "./chatsPage";

function Chat() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch token from local storage
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch current level using token
      fetch(`http://localhost:8000/user/${email}/username-password`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch username and password');
          }
          return response.json();
        })
        .then(data => {
          setUsername(data.username);
          setPassword(data.password);
          setUser({ username: data.username, password: data.password }); // Update the user state
        })
        .catch(error => console.error(error));
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (user) {
    return <ChatsPage user={user} />;
  }

  return null;
}

export default Chat;

