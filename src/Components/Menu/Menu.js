import React from "react";
import Card from "react-bootstrap/Card";
import "./Menu.css";
import {
  GiBlackFlag,
  GiEarthAsiaOceania,
  GiUnionJack,
  GiGamepad,
} from "react-icons/gi";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { RiChatSmile3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="row">
        <div className="col-4">
        <Link to='/quizMode' className="link-decoration">
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
        </div>

        <div className="col-4">
          <Link to='/chat' className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiEarthAsiaOceania size="80px" className="my-3" />
              <h3>Chat</h3>
            </Card>
          </Link>
        </div>

        </div>

    </>
  );
  
};

export default Menu;
