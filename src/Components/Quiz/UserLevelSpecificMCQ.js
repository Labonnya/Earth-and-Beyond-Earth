import React, { useState, useEffect, useContext } from "react";
import "./UserLevelSpecificMCQ.css";
import LoggedNav from "../Navbar/LoggedNav";
// import "./Quiz.css";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import LoginForm from '../Auth/Login';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Hooks/AuthContext';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";

function UserLevelSpecificMCQ({ props }) {
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [nextLevel, setNextLevel] = useState(null);
  const [levelUpdated, setLevelUpdated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 3 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);

  const authContext = useContext(AuthContext);

  // console.log(props.user.email)
  // console.log(props.user.secret)

  useEffect(() => {
    if (authContext.token) {
      console.log("chole?");
      setToken(authContext.token);
      setEmail(authContext.email);
      setPassword(authContext.password);
    }
  }, []);

  const handleLogout = () => {
    authContext.logout();
  };

  // useEffect(() => {
  //   // Fetch token from local storage
  //   const storedToken = localStorage.getItem("access_token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  useEffect(() => {
    if (token) {
      // Fetch current level using token
      fetch(`http://localhost:8000/user/${email}/current-level`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch current level");
          }
          return response.json();
        })
        .then((data) => {
          setCurrentLevel(data.current_level);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  useEffect(() => {
    console.log(currentLevel + "bhallagena"); // This may not reflect the updated value immediately
  }, [currentLevel]);

  useEffect(() => {
    if (currentLevel !== null) {
      fetch("http://localhost:8000/mcq/allMCQ")
        .then((res) => res.json())
        .then((data) => {
          setCorrectAnswers(
            data
              .filter((question) => question.level === currentLevel)
              .map((question) => question.correct_ans)
          );
          setMCQQuestions(data.filter((question) => question.level === currentLevel));
          setSelectedOptions(new Array(data.length).fill(""));
          setQuizId(
            data
              .filter((question) => question.level === currentLevel)
              .map((question) => question.quiz_id)
          );
          setIsAnswerCorrect(new Array(data.length).fill(false));
          setTimerRunning(true);
        })
        .catch((error) => console.error(error));
    }
  }, [currentLevel]);


  // const handleLogin = () => {
  //   // Perform login and retrieve access token
  //   fetch("http://localhost:8000/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: new URLSearchParams({
  //       username: email,
  //       password: password
  //     })
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Login failed");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const { access_token } = data;
  //       localStorage.setItem("access_token", access_token);
  //       setToken(access_token);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const handleOptionChange = (event, index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = event.target.value;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedIsAnswerCorrect = mcqQuestions.map((question, index) => {
      const isCorrect = selectedOptions[index] === correctAnswers[index];
      return { userAnswer: selectedOptions[index], correctAnswer: correctAnswers[index], isCorrect };
    });
    setIsAnswerCorrect(updatedIsAnswerCorrect);
    const newScore = updatedIsAnswerCorrect.filter((value) => value.isCorrect === true).length;
    setScore(newScore);
    setShowResult(true);
    setTimerRunning(false); // Stop the timer
  
    // Send the score to the backend
    if (token) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          email: email,
          id: currentLevel,
          total_score: newScore
        })
      };
  
      fetch("http://localhost:8000/plays/setScore", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Score saved to the database:", data);
  
          // Call updateScore API
          const updateRequestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              email: email,
              id: currentLevel,
              total_score: newScore
            })
          };
  
          fetch("http://localhost:8000/plays/updateScore", updateRequestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("Score updated in the database:", data);
  
              // Check if the level needs to be updated
              if (newScore >= 2) {
                const nextLevelNumber = currentLevel + 1;
                const nextLevel = nextLevelNumber;
  
                // Call updateLevel API
                const updateLevelRequestOptions = {
                  method: "PUT",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                  body: JSON.stringify({
                    email: email
                  })
                };
                fetch(`http://localhost:8000/user/updateLevel?email=${email}`, updateLevelRequestOptions)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Level updated in the database:", data);
                    // setNextLevel(nextLevel);
                    console.log(nextLevel,"kijekori");
                  })
                  .catch((error) => console.error(error));
              }
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
  };
  
//timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          setShowResult(true);
          setTimerRunning(false); // Stop the timer
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // level update
  useEffect(() => {
    if (score >= 2) {
      const nextLevelNumber = currentLevel + 1;
      const nextLevel = nextLevelNumber;
      setNextLevel(nextLevel);
    }
  }, [score]);

  if (!token) {
    return <LoginForm />;
  } else {

  return (
    <div className='world-map' >
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <Link to="/">
                <button className="login-btn mt-2 arrow-back-btn">
                  <TbArrowBackUp size="40px" />
                </button>
              </Link>
            </Navbar.Brand>
            <button onClick={handleLogout}>Logout</button>
          </Container>
        </Navbar>
      {/* {currentLevel ? ( */}
        <div className="container" style={{ height: "100vh", width: "100vw" }} >
          <h1 className="text-light">MCQ Questions</h1>
          {timerRunning ? (
            <div className="timer text-light">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60} s</div>
            ) : (
            <div className="timer text-light">Your Time is up</div>
          )}
          <ol className="text-light">
            {mcqQuestions.map((mcqQuestion, index) => (
              <li key={mcqQuestion.question}>
                <h2>{mcqQuestion.question}</h2>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id={`${mcqQuestion.option1}-${index}`}
                      name={`option-${index}`}
                      value={mcqQuestion.option1}
                      checked={selectedOptions[index] === mcqQuestion.option1}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                    <label htmlFor={`${mcqQuestion.option1}-${index}`}>{mcqQuestion.option1}</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id={`${mcqQuestion.option2}-${index}`}
                      name={`option-${index}`}
                      value={mcqQuestion.option2}
                      checked={selectedOptions[index] === mcqQuestion.option2}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                    <label htmlFor={`${mcqQuestion.option2}-${index}`}>{mcqQuestion.option2}</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id={`${mcqQuestion.option3}-${index}`}
                      name={`option-${index}`}
                      value={mcqQuestion.option3}
                      checked={selectedOptions[index] === mcqQuestion.option3}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                    <label htmlFor={`${mcqQuestion.option3}-${index}`}>{mcqQuestion.option3}</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id={`${mcqQuestion.option4}-${index}`}
                      name={`option-${index}`}
                      value={mcqQuestion.option4}
                      checked={selectedOptions[index] === mcqQuestion.option4}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                    <label htmlFor={`${mcqQuestion.option4}-${index}`}>{mcqQuestion.option4}</label>
                  </li>
                </ul>
              </li>
            ))}
          </ol>
          {showResult ? (
            <>
              <h2 className="text-light">Result:</h2>
              <ol className="text-light">
                {isAnswerCorrect.map((answer, index) => (
                  <li key={mcqQuestions[index].question}>
                    {answer.isCorrect ? (
                      <span style={{ color: "green" }}>✓</span>
                    ) : (
                      <span style={{ color: "red" }}>✗</span>
                    )}
                    {mcqQuestions[index].question} - You answered: {answer.userAnswer}, Correct answer: {answer.correctAnswer}
                  </li>
                ))}
              </ol>
              <h2 className="text-light">
                Score: {score}/{mcqQuestions.length}
              </h2>
              {score >= 2 && (
                <h2 className="text-light">
                  Congratulations! You have reached level {nextLevel}.
                </h2>
              )}
            </>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      {/* ) } */}
      {/* // : (
      //   <>
      //     <input */}
      {/* //       type="email"
      //       placeholder="Email"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //     />
      //     <input
      //       type="password"
      //       placeholder="Password"
      //       value={password}
      //       onChange={(e) => setPassword(e.target.value)}
      //     />
      //     <button onClick={handleLogin}>Login</button>
      //   </>
      // ) */}

      
    
    </div>
  );
    }
}

export default UserLevelSpecificMCQ;
