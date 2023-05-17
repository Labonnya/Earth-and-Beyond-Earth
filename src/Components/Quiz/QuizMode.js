import React from "react";
import Card from "react-bootstrap/Card";
import "./Quiz.css";
import {
  GiUnionJack,
} from "react-icons/gi";
import {MdHistoryEdu, MdSportsVolleyball } from "react-icons/md"
import { Link } from "react-router-dom";
import LoggedNav from "../Navbar/LoggedNav";

const QuizMode = () => {
  return (
    <>
    <LoggedNav />
    <div className="container">
      <div className="row my-5">
        <div className="col-4">
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
        </div>
      </div>
    </div>

    </>
      );
};

export default QuizMode
