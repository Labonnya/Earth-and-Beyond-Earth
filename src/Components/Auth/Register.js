import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/createUser",
        {
          fullName,
          userName,
          email,
          country,
          password,
        }
      );
      console.log(response.data);
      setIsRegistered(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters and numbers"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="container-fluid register-bg">
      <div className="row" >
        <div className="col-1"></div>
        <div className="col-5 box1">
          <h3 className="pop">Register Form</h3>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName" className="attr">
                Full Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName" className="attr">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="attr">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="attr">
                Country:
              </label>
              <input
                type="text"
                className="form-control"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="attr">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              {passwordError && (
                <div className="error-message text-danger">{passwordError}</div>
              )}
            </div>
            <button type="submit" className=" cutie ">
              Submit
            </button>
            {isRegistered && (
              <div className="success-message text-success">Registration successful!</div>
            )}
          </form>
          <div className='reg'> 
           Already have an account? <Link to='/login'><span className='regtxt2'>Login Now!</span></Link>
        </div>
        </div>
        <div className="col-6">
        <div className="row">
      <div className="col-6 planet-prev">
        <div className="planet-container">
        <img src="./planet-prev.png" alt="planet" width="200px"/>
        </div>
      </div>
      <div className="col-6"><Menu /></div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Register;