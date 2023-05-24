import React, { useContext, useEffect, useState } from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Hooks/AuthContext';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import LoginForm from '../Auth/Login';
import ChatsPage from './chatsPage';

const Chat = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(authContext.token)

  useEffect(() => {
    if(!authContext.isLoggedIn) {
      console.log("ekhane ashi")
      navigate("/login");
    }
  }, [authContext.isLoggedIn, navigate]);

  useEffect(() => {
    if (authContext.token) {
      console.log(authContext.username);
      setUsername(authContext.username);
      setPassword(authContext.password);  // Fetch current level using token
    }
  }, [authContext.token]);

  useEffect(() => {
    if (username && password) {
      console.log(username);
      console.log(password);  // Fetch current level using token
      setUser({ username, secret: password });
    }
  }, [username, password]);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  if (!user) {
    return <LoginForm />;
  } else {
    return <ChatsPage user={user} />;
  }
};

export default Chat;
