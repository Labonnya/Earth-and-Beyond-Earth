import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import {
  GiUnionJack,
} from "react-icons/gi";
import {MdHistoryEdu, MdSportsVolleyball } from "react-icons/md"
import { Link } from "react-router-dom";
import LoggedNav from "../Navbar/LoggedNav";
import LoginForm from '../Auth/Login';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Hooks/AuthContext';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";


const GameMode = () => {

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  // console.log(props.user.email)
  // console.log(props.user.secret)

  useEffect(() => {
    if (authContext.token) {
      console.log("chole?");
      setToken(authContext.token);
      setEmail(authContext.email);
      setPassword(authContext.password);
    }
  }, []);

  const handleLogout = () => {
    authContext.logout();
  };



  return (
    <>
        <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
          <button className="login-btn mt-2 arrow-back-btn">
            <TbArrowBackUp size="40px" />
          </button>
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
    <div className="container">
      <div className="row my-5">
        <div className='col-6'>
        <Link to="/game" className="link-decoration">
          <button className='btn-space-menu-quiz' style={{ 
              fontSize: "20px",
              backgroundColor: "#4158D0",
              backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              // webkitBorderOrderRadius: "28";
              MozBorderRadius: "28",
              WebkitBorderRadius: "28",
              borderRadius: "28px",
              padding: '10px 20px 10px 20px', 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Play Game
            </button>
          </Link>
        <br></br>
          <Link to="/leaderboard-game" className="link-decoration">
          <button className='btn-space-menu-quiz' style={{ 
              fontSize: "20px",
              backgroundColor: "#4158D0",
              backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              // webkitBorderOrderRadius: "28";
              MozBorderRadius: "28",
              WebkitBorderRadius: "28",
              borderRadius: "28px",
              padding: '10px 20px 10px 20px', 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Leaderboard
            </button>
          </Link>
        </div>
        <div className="col-6">
          <img src="./leaderboard.png" alt="alt" width='500px' style={{
            marginTop: "40px"
          }}/>
        </div>
      </div>
    </div>

    </>
    );

};

export default GameMode
