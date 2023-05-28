import React, { useContext, useEffect } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { AuthContext } from '../../Hooks/AuthContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const ChatsPage = (props) => {
  const authContext = useContext(AuthContext);

  console.log(props.user.username);
  console.log(props.user.secret);

  useEffect(() => {
    if (authContext.token) {
      console.log('chole?');
    }
  }, []);

  const handleLogout = () => {
    authContext.logout();
  };

  const renderSuggestion = (user) => {
    // Customize the suggestion box to display user's full name instead of username
    return <div>{user.first_name + ' ' + user.last_name}</div>;
  };

  return (
    <div className="world-map">
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
      <div style={{ height: '100vh', width: '100vw' }}>
        <PrettyChatWindow
          projectId="91f4b983-71c1-4c75-82ee-b40437b9e2b9"
          username={props.user.username}
          secret={props.user.secret}
          style={{ height: '100vh' }}
          renderSuggestion={renderSuggestion} // Pass the custom renderSuggestion function
        ></PrettyChatWindow>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatsPage;