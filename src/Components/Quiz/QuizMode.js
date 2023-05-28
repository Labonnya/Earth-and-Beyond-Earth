import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import "./Quiz.css";
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
import UserLevelSpecificMCQ from "./UserLevelSpecificMCQ";

const QuizMode = () => {
  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };
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
    <div className="quiz-bg">
      <Navbar>
        <Container>
          <Navbar.Brand>
            <button className="login-btn mt-2 arrow-back-btn-quiz" onClick={goBack}>
              <TbArrowBackUp size="40px" />
            </button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    <div className="container">
      <div className="row my-5">
        <div className="col-6">

        </div>
        <div className="col-6">
        <Link to='/userLevelSpecificMCQ'>
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
              Play Quiz
            </button>
            </Link>
            <br></br>
          <Link to="/leaderboard-quiz" className="link-decoration">
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
          <br></br>

          {authContext.email === "a@a.com" &&
          <Link to="/addMCQ" className="link-decoration" style={{
            marginRight: "20px"
          }}>
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
              Add Quiz
            </button>
          </Link>
          }
        

        {authContext.email === "a@a.com" &&
          <Link to="/deleteMCQ" className="link-decoration" style={{
            marginRight: "20px"
          }}>
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
              Delete Quiz
            </button>
          </Link>
       }
        {authContext.email === "a@a.com" &&
          <Link to="/updateMCQ" className="link-decoration" style={{
            marginRight: "20px"
          }}>
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
              Update Quiz
            </button>
          </Link>
        }
        </div>
      </div>
    </div>

    </div>
    );

};

export default QuizMode
