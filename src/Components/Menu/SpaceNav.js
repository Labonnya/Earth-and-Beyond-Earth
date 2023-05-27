import React from "react";
import "./Menu.css";

import { Link } from "react-router-dom";

const SpaceBar = () => {
  return (
    <>
      <div className="row real-nav-menu">
        
        <div style={{
          paddingTop: "120px",
        }}>
          <Link to='/SpaceConcept' className="link-decoration">
            <p>Concept of Space</p>
          </Link>
          <Link to='/space' className="link-decoration">
            <p>Explore Solar System</p>
          </Link>
          <Link to='/spaceTravel' className="link-decoration">
            <p>Union</p>
          </Link>
          <Link to='/spaceMission' className="link-decoration">
            <p>Travel</p>
          </Link>
        </div>
      </div>
    </>
  );
  
};

export default SpaceBar;
