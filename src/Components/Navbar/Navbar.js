import React, {useContext} from "react";
import "./Navbar.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";
import axios from 'axios';

const Navigation = () => {

  const authContext = useContext(AuthContext);

  const handleSync = () => {
    axios.post("http://localhost:8000/sync")
      .then(response => {
        console.log(response.data); // Optional: handle the response from the server
      })
      .catch(error => {
        console.error(error); // Optional: handle any errors that occur
      });
  };

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <>
      <div className="row home">
        <div className="row independent">
          {authContext.token ? (
            <div>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
              <button className="login-btn">{authContext.username}</button>
            </div>
            ) : (
              <Link to="/login">
                <button className="login-btn">Login/Signup</button>
              </Link>
            )}
        </div>
      <div className="row main-bg">
        <div className="col-6 beauty">
          <br></br><br></br><br></br><br></br><br></br>
          <img src="./starss.png" width="600px" style={{
          animation: 'glow 1s ease-in-out infinite alternate, jump 5s ease-in-out infinite alternate',
        }} alt="menu"/>
          {/* <img src="logo.png" alt="logo" width="300px" id="logo-img"/>
          <button className="btn" onClick={handleClick}>Start Exploring!</button>
          <Link to='/space-menu'><button className="btn">Explore Space!</button></Link> */}
        </div>
        <div className='col-4 real-nav'>
          <div style={{
            paddingTop: "100px",
          }}>
            <button className='btn-space-menu' style={{ 
              fontSize: "30px", 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s' }}>
              Earth, and Beyond Earth
            </button>
            <p>Welcome to our extraordinary online portal, a captivating destination where the wonders of space, the beauty of Earth, and the pursuit of knowledge converge. Immerse yourself in a realm where the vastness of the cosmos meets the intricate details of our planet. Explore the mysteries of the universe, unravel the secrets of celestial bodies, and deepen your understanding of the cosmos.</p>
            <Link to='/spaceMenu'>
              <button className='btn-space-menu' style={{ 
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
              Explore Beyond Earth
            </button>
            </Link>
          </div>
        </div>
        <div className="col-2">
          <Menu/>
          {authContext.email === 'a@a.com' ? (
            <div className="real-nav-menu">
              <button className='sync-btn' onClick={handleSync}>Sync Now</button>
            </div>
            ) : (
              <>
              </>
            )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Navigation;