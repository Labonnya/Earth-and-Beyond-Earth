import React, { useContext, useState } from "react";
import styled from "styled-components";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";
import Navbar from 'react-bootstrap/Navbar';
import { TbArrowBackUp } from 'react-icons/tb';
import Menu from "../Menu/Menu";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  margin-left: 150px;
  margin-top: 150px;
`;

const Form = styled.form`
  width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
`;

const Button = styled.button`
  -webkit-border-radius: 14;
  -moz-border-radius: 14;
  border-radius: 14px;
  color: #e4dfda;
  font-size: 16px;
  background: rgb(4, 51, 75);
  background: radial-gradient(
    circle,
    rgba(4, 51, 75, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  padding: 10px 20px 10px 20px;
  border: solid #e4dfda 4px;
  text-decoration: none;
  width: 100px;
  height: 50px;
  margin-top: 20px;
  margin-left: 8px;

  &:hover {
    background: rgb(228, 223, 218);
    background: radial-gradient(
      circle,
      rgba(228, 223, 218, 1) 0%,
      rgba(4, 51, 75, 1) 100%
    );
    border: solid #e4dfda 4px;
    text-decoration: none;
    color: #000;
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: #ff0000;
  font-size: 16px;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    fetch("http://localhost:8000/login/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          authContext.tokenize(data.access_token)
          authContext.nameHandle(data.username);
          authContext.emailHandle(email);
          authContext.passHandle(password);
          setMessage("Login successful!");
          setIsLogin(true)
          authContext.login();
          setTimeout(() => {
            navigate("/");
          }, 3000);
          // Do something else (e.g. redirect to dashboard)
        } else if (data.detail === "Invalid Credentials") {
          setMessage(
            "Invalid credentials. Please check your email and password and try again."
          );
          console.log(message);
        } else if (data.detail === "Invalid password Credentials") {
          setMessage(
            "The password you entered is incorrect. Please try again."
          );
          console.log(message);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <>
    <Container className="bg">
      <div className="login-no-overlay">
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Label>
              Email:
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
            <Label>
              Password:
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Login</Button>
            {isLogin && (
              <div className="success-message text-success">
                <b>Login successful!</b>
              </div>
            )}
            {!isLogin && message && <Message>{message}</Message>}
          </Form>
        </FormContainer>
        <div className="reg">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="regtxt">Register Now!</span>
          </Link>
        </div>

        {/* <div className="forget-pass">
          <Link to="/forgetPassCodeSend">
            <span className="regtxt">Forgot Your Password?</span>
          </Link>
        </div> */}
      </div>
      <div className="row">
      <div className="col-6 planet-prev">
        <div className="planet-container">
        <img src="./planet-prev.png" alt="planet" width="200px"/>
        </div>
      </div>
      <div className="col-6"><Menu /></div>
      </div>
    </Container>
    </>
  );
}

export default LoginForm;