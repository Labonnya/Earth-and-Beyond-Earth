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
    <div className="container pb-5">
      <br></br>
      <div className="row my-5">
        <div className="col-4">
          <Link to="/map" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiBlackFlag size="80px" className="my-3" />
              <h3>Countries</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiEarthAsiaOceania size="80px" className="my-3" />
              <h3>Oceans</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link to='/union' className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiUnionJack size="80px" className="my-3" />
              <h3>Unions</h3>
            </Card>
          </Link>
        </div>
      </div>
      
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
        <Link to='game' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <GiGamepad size="80px" className="my-3" />
          <h3>Game</h3>
        </Card>
        </Link>
        </div>
        <div className="col-4">
        <Link to='chat' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <RiChatSmile3Fill size="80px" className="my-3" />
          <h3>Chat</h3>
        </Card>
        </Link>
        </div>
        </div>

        <div className="row">
        <div className="col-4">
        <Link to='chat' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <RiChatSmile3Fill size="80px" className="my-3" />
          <h3>Sports</h3>
        </Card>
        </Link>
        </div>
        <div className="col-4">
        <Link to='chat' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <RiChatSmile3Fill size="80px" className="my-3" />
          <h3>Travel</h3>
        </Card>
        </Link>
        </div>
        <div className="col-4">
        <Link to='download' className="link-decoration">
        <Card body className="text-center mx-auto mt-4 menu-card">
          <RiChatSmile3Fill size="80px" className="my-3" />
          <h3>Download</h3>
        </Card>
        </Link>
        </div>
        </div>
       
      </div>
   
  );
};

export default Menu;
