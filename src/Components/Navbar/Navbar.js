import React from "react";
import "./Navbar.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  const handleClick = () => {
    console.log("click");
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <div className="row">
        <div className="col-6 beauty" style={{
          background: "rgb(4,51,75)",
          background: "linear-gradient(90deg, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 30%)"
        }}>
          <img src="logo.png" alt="logo" width="300px" id="logo-img"/>
          <button className="btn" onClick={handleClick}>Start Exploring!</button>
          <Link to='/space'><button className="btn">Explore Space!</button></Link>
        </div>
        <div className="col-6">
          <Link to="/login"><button className="login-btn">Login/Signup?</button></Link>
          <video src="global-48101.mp4" autoPlay loop muted />
        </div>
      </div>
      <div id="menu" style={{
          background: "rgb(4,51,75)",
          background: "linear-gradient(90deg, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 15%)"
      }}>
        <Menu/>
      </div>
    </div>
  );
};

export default Navigation;
