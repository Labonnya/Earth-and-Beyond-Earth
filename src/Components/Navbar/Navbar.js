import React, {useContext} from "react";
import "./Navbar.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";

const Navigation = () => {

  const authContext = useContext(AuthContext);

  const handleClick = () => {
    console.log("click");
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
            paddingTop: "140px",
          }}>
            <button className='btn-space-menu' style={{ 
              fontSize: "30px", 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s' }}>
              Earth, and Beyond Earth
            </button>
            <p>Welcome to our extraordinary online portal, a captivating destination where the wonders of space, the beauty of Earth, and the pursuit of knowledge converge. Immerse yourself in a realm where the vastness of the cosmos meets the intricate details of our planet. Explore the mysteries of the universe, unravel the secrets of celestial bodies, and deepen your understanding of the cosmos.</p>
          </div>
        </div>
        <div className="col-2">
          <Menu/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navigation;