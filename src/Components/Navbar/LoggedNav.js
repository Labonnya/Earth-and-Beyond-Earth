import React from 'react'
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../Hooks/ScrollToTop';

const LoggedNav = () => {
  return (
    <>
    <ScrollToTop />
    <div className='nav-map'>
      <Navbar>
            <Container>
              <Navbar.Brand href="#home">
                <Link to="/"><button className="login-btn mt-2"><TbArrowBackUp size="40px"/></button></Link>
              </Navbar.Brand>
            </Container>
      </Navbar>
    </div>
    </>
  )
}

export default LoggedNav
