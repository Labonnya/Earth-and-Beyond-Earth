import React from "react";
import "./Menu.css";
import { Card } from 'react-bootstrap';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { GiGamepad } from 'react-icons/gi';
import { GiEarthAsiaOceania } from 'react-icons/gi';

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
      <div className="row">
        <div className="col-4">
        <Link to='/quizPage' className="link-decoration">
          <Card body className="text-center mx-auto mt-4 menu-card">
            <BsFillPatchQuestionFill size="80px" className="my-3" />
            <h3>Quiz</h3>
          </Card>
        </Link>
        </div>
        <div className="col-4">
        <Link to='/gamePage' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <GiGamepad size="80px" className="my-3" />
          <h3>Game</h3>
        </Card>
        </Link>
        </div>
        <div className="col-6">

        </div>
        </div>

        <div className="row">
          <div className="col-6">
            
          </div>
        <div className="col-6">
          <div className="row">
           
  
            <div className="col-6">
              <div className="ocean">Dive into the mysteries of the deep blue and uncover the secrets that lie within the enchanting realms of our magnificent oceans!</div>
              <br />
              <Link to="/map">
                <button className="oceanBtn">Dive into Ocean!</button>
              </Link>
            </div>

            <div className="col-6 oceanPic">
              <img src="./ocean.png" alt="" width="300px" height="300px" style={{ animation: 'rotation 9s infinite linear' }} />
            </div>
          </div>
        </div>

        <div className="col-4">
          <Link className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiEarthAsiaOceania size="80px" className="my-3" />
              <h3>Leaderboard</h3>
            </Card>

          </Link>
          <Link to='/chat' className="link-decoration">
            <p>Chat</p>
          </Link>
          <Link to='/quizMode' className="link-decoration">
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
      </div>
      </div>
      </>
  );
  
};

export default Menu;