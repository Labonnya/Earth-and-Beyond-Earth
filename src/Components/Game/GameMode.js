import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
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


const GameMode = () => {

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
        <div className="col-4">
          <Link to="/game" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Play Game</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/leaderboard-game" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>Leaaderboard</h3>
            </Card>
          </Link>
        </div>

      </div>
    </div>

    </>
    );

};

export default GameMode
