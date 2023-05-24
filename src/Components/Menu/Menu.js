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
        <div className="col-6">
          <div className="row">
            <div className="col-7">
              <img src="./countries.png" alt="" width="300px" className="world" height="300px" style={{ animation: 'rotation 9s infinite linear' }} />
            </div>
  
            <div className="col-5">
              <div className="country">Embark on a global journey with just a click and explore the world at your fingertips with our captivating clickable world map!</div>
              <br />
              <Link to="/map">
                <button className="menuBtn">Start your journey!</button>
              </Link>
            </div>
          </div>
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
        </div>

    </>
  );
  
};

export default Menu;
