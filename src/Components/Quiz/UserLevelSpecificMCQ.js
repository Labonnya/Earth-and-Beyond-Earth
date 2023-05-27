import React, { useState, useEffect, useContext, useRef } from "react";
import { useTimer } from 'react-timer-hook';
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
  const [timeLeft, setTimeLeft] = useState(20); // 3 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [timer, setTimer] = useState('00:00:00');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const intervalRef = useRef(null);

  // console.log(props.user.email)
  // console.log(props.user.secret)

  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };

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

  const handleOptionChange = (event, index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = event.target.value;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(timer==='00:00:00')
    {
      alert("Your time is up");
    }
    else{
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
    }}
  };

  //timer
  function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60);
    const minutes = Math.floor( (total/1000/60) % 60);
    const hours = Math.floor( (total/1000*60*60) % 24);
    const days = Math.floor( (total/(1000*60*60*24)));

    return{
      total, days, hours, minutes, seconds
    };

  }

  function startTimer(deadline){
    let { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);
    if(total>=0)
    {
      setTimer(
        (hours > 9 ? hours: '0' + hours) + ':' +
        (minutes > 9 ? minutes: '0' + minutes) + ':' +
        (seconds > 9 ? seconds: '0' + seconds)
      )
    }
    else{
      clearInterval(intervalRef.current);
    }
  }

  function clearTimer(endtime){
    setTimer('00:01:00');
    if(intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startTimer(endtime);
    }, 1000)
    intervalRef.current = id;
  }

  function getDeadlineTime(){
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds()+60);
    return deadline;
  }

  useEffect(()=>{
    clearTimer(getDeadlineTime());
    return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
  }, []);

  // level update
  useEffect(() => {
    if (score >= 4) {
      const nextLevelNumber = currentLevel + 1;
      const nextLevel = nextLevelNumber;
      setNextLevel(nextLevel);
    }
  }, [score]);

  if (!token) {
    return <LoginForm />;
  } else {

    return (
      <div className="world-map">
      <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={goBack}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
        <div className="container quiz-container">
          <h1 className="text-light">MCQ Questions (Level {currentLevel})</h1>
          {intervalRef.current ? (
            !showResult ? (
              <div className="timer text-light">Time Left: {timer} s</div>
            ) : (
              <div></div>
            )
          ) : (
            <div className="timer text-light">Your Time is up</div>
          )}
<ol className="text-light">
  {mcqQuestions.map((mcqQuestion, index) => (
    <li key={mcqQuestion.question}>
      <div className="question-card">
        <h2 className="question-text">{mcqQuestion.question}</h2>
        <ul className="options-list">
          <li>
            <input
              type="radio"
              id={`${mcqQuestion.option1}-${index}`}
              name={`option-${index}`}
              value={mcqQuestion.option1}
              checked={selectedOptions[index] === mcqQuestion.option1}
              onChange={(event) => handleOptionChange(event, index)}
            />
            <label htmlFor={`${mcqQuestion.option1}-${index}`}  style={{
                  paddingLeft: '20px'

            }}>{mcqQuestion.option1}</label>
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
            <label htmlFor={`${mcqQuestion.option2}-${index}`} style={{
                  paddingLeft: '20px'

            }}>{mcqQuestion.option2}</label>
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
            <label htmlFor={`${mcqQuestion.option3}-${index}`} style={{
                  paddingLeft: '20px'

            }}>{mcqQuestion.option3}</label>
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
            <label htmlFor={`${mcqQuestion.option4}-${index}`} style={{
                  paddingLeft: '20px'

            }}>{mcqQuestion.option4}</label>
          </li>
        </ul>
      </div>
    </li>
  ))}
</ol>

          {showResult ? (
            <>
              <h2 className="text-light">Result:</h2>
              <ol className="text-light result-list">
                {isAnswerCorrect.map((answer, index) => (
                  <li key={mcqQuestions[index].question}>
                    {answer.isCorrect ? (
                      <span className="correct-answer"><b>✓</b></span>
                    ) : (
                      <span className="wrong-answer"><b>✗</b></span>
                    )}
                    {mcqQuestions[index].question} - You answered: {answer.userAnswer}, Correct answer: {answer.correctAnswer}
                  </li>
                ))}
              </ol>
              <h2 className="text-light">
                Score: {score}/{mcqQuestions.length}
              </h2>
              {score >= 2 ? (
                <>
                  <h2 className="text-light">
                    Congratulations! You have reached level {nextLevel}.
                  </h2>
                  <Link to="/quizMode">
                    <button className="play-next-level-btn">Play Next Level</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/quizMode">
                    <button className="try-again-btn">Try again</button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    );    
    }
}

export default UserLevelSpecificMCQ;
