import React, { useContext, useState } from "react";
import styled from "styled-components";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";
import ResetPassword from "./ResetPassword";


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

function ForgetPassCodeSend() {
    const [email, setEmail] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      fetch(`http://localhost:8000/user/${email}/otpSend`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            authContext.emailHandle(email);
            console.log(data);
            navigate(`/resetPassword?email=${email}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
      return (
        <Container>
          <div className="imageee"></div>
          <div className="bg">
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
                <button type="submit">Send Code</button>
                
              </Form>
            </FormContainer>

    
          </div>
        </Container>
      ); 
}

export default ForgetPassCodeSend;

