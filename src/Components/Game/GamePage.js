import React, { useState, useEffect, useContext } from "react";
import LoggedNav from "../Navbar/LoggedNav";
// import "./Quiz.css";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import LoginForm from '../Auth/Login';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Hooks/AuthContext';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import Game from "./Game";
import GameMode from "./GameMode";

const GamePage = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [token, setToken] = useState(null);
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
        console.log(authContext.email);
        setEmail(authContext.email);
        setPassword(authContext.password);
        setToken(authContext.token);
      }
    }, [authContext.token]);
  
    useEffect(() => {
      if (email && password) {
        console.log(email);
        console.log(password);
        console.log(token);
        setUser({ token, email, secret: password });
      }
    }, [token, email, password]);
  
    useEffect(() => {
      if (user) {
        console.log(user,"yoo");
        console.log(authContext.isLoggedIn);
      }
    }, [user]);
  
    if (!user) {
      return <LoginForm />;
    } else {
      return <GameMode  />;
    }
  };
  
  export default GamePage;