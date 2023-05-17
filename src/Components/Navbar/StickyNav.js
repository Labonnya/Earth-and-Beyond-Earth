import React from 'react'
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';

const StickyNav = () => {
  return (
    <div>
      <Navbar>
            <Container>
              <Navbar.Brand href="#home">
                <Link to="auth"><button className="login-btn mt-2">Login or Register</button></Link>
              </Navbar.Brand>
            </Container>
          </Navbar>
    </div>
  )
}

export default StickyNav
