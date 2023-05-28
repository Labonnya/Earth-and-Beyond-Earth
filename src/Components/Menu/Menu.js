import React from "react";
import "./Menu.css";

import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="row real-nav-menu">
        
        <div style={{
          paddingTop: "120px",
        }}>
          <Link to='/map' className="link-decoration">
            <p>Countries</p>
          </Link>
          <Link to='/ocean' className="link-decoration">
            <p>Ocean</p>
          </Link> 
          <Link to='/union' className="link-decoration">
            <p>Union</p>
          </Link>
          <Link to='/travel' className="link-decoration">
            <p>Travel</p>
          </Link>
          <Link to='/climate' className="link-decoration">
            <p>Climate</p>
          </Link>
          <Link to='/sports' className="link-decoration">
            <p>Sports</p>
          </Link>
          <Link to='/chat' className="link-decoration">
            <p>Chat</p>
          </Link>
          <Link to='/quizPage' className="link-decoration">
            <p>Quiz</p>
          </Link>
          <Link to='/gamePage' className="link-decoration">
            <p>Game</p>
          </Link>
          <Link to='/download' className="link-decoration">
            <p>Download</p>
          </Link>
        </div>
      </div>
      </>
  );
  
};

export default Menu;