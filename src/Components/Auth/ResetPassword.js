import React, { useContext, useState } from "react";
import styled from "styled-components";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";




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

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const location = useLocation();

  // Extracting the email from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedOtp = parseInt(otp, 10);
    const formData = new FormData();
    formData.append("email", email);
    // formData.append("otp", parsedOtp); 
    formData.append("password", password);
    console.log(email);
    fetch(`http://localhost:8000/user/resetPassword`, {
      method: "PUT",
      body: formData,
    })
    .then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else if (response.status === 400) {
        setErrorMessage("Invalid OTP");
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
                  OTP:
                  <Input
                    type="number" step="1"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                <button onClick={handleSubmit}>Submit</button>
              </Form>
            </FormContainer>

    
          </div>
        </Container>
      ); 
}

export default ResetPassword;

