import React from "react";
import Card from "react-bootstrap/Card";
import "./Quiz.css";
import {
  GiEarthAsiaOceania,
  GiUnionJack,
} from "react-icons/gi";
import { RiGovernmentFill } from "react-icons/ri";
import {MdHistoryEdu, MdSportsVolleyball, MdAgriculture} from "react-icons/md"
import { Link } from "react-router-dom";
import LoggedNav from "../Navbar/LoggedNav";

const QuizCategory = () => {
  return (
    <>
    <LoggedNav />
    <div className="container">
      <div className="row my-5">
        <div className="col-4">
          <Link to="/map" className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdHistoryEdu size="80px" className="my-3" />
              <h3>History</h3>
            </Card>
          </Link>
        </div>
        <div className="col-4">
          <Link className="link-decoration">
            <Card body className="text-center mx-auto mt-4 menu-card">
              <MdSportsVolleyball size="80px" className="my-3" />
              <h3>Sports</h3>
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
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-4">
        <Link to='/quiz' className="link-decoration">
          <Card body className="text-center mx-auto mt-4 menu-card">
            <MdAgriculture size="80px" className="my-3" />
            <h3>Culture</h3>
          </Card>
        </Link>
        </div>
        <Card body className="text-center mx-auto mt-4 menu-card">
          <GiEarthAsiaOceania size="80px" className="my-3" />
          <h3>Oceans</h3>
        </Card>
        <Card body className="text-center mx-auto mt-4 menu-card">
          <RiGovernmentFill size="80px" className="my-3" />
          <h3>Government Forms</h3>
        </Card>
      </div>
    </div>

    </>
      );
};

export default QuizCategory;
