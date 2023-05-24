import React, { useContext, useEffect, useState } from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Hooks/AuthContext';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const ChatsPage = (props) => {
  const authContext = useContext(AuthContext);

  console.log(props.user.username)
  console.log(props.user.secret)

  useEffect(() => {
    if (authContext.token) {
      console.log("chole?");
    }
  }, []);

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <div className='world-map'>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <Link to="/">
                <button className="login-btn mt-2 arrow-back-btn">
                  <TbArrowBackUp size="40px" />
                </button>
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
            <div style={{ height: "100vh", width: "100vw" }}>
                <PrettyChatWindow
                  projectId="aa67eab9-95be-4d97-936f-f7e35fe4aa28"
                  username={props.user.username} // adam
                  secret={props.user.secret} // pass1234
                  style={{ height: "100vh" }}
                >
      
                </PrettyChatWindow>
            </div>
          <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatsPage;
