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
    <>
    <LoggedNav />
    <div className="container">
      <div className="row my-5">
        {/* <div className="col-4">
          <Link to="/quizCategory" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Quiz Categories</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/quiz" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdSportsVolleyball size="80px" className="my-3" />
              <h3>Practice Sets</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link to='/union' className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <GiUnionJack size="80px" className="my-3" />
              <h3>Mutiplayer Quiz</h3>
            </Card>
          </Link>
        </div> */}

        <div className="col-4">
          <Link to="/userLevelSpecificMCQ" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Play MCQ</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/leaderboard-quiz" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Leaaderboard</h3>
            </Card>
          </Link>
        </div>
        {email === "a@a.com" &&
        <div className="col-4">
          <Link to="/addMCQ" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Add MCQ</h3>
            </Card>
          </Link>
        </div>}

        {email === "a@a.com" &&
        <div className="col-4">
          <Link to="/deleteMCQ" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Delete MCQ</h3>
            </Card>
          </Link>
        </div>}

        {email === "a@a.com" &&
        <div className="col-4">
          <Link to="/updateMCQ" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Update MCQ</h3>
            </Card>
          </Link>
        </div>}

      </div>
    </div>

    </>
    );

};

export default QuizMode
