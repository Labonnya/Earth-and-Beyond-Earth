import React, { useState, useEffect } from "react";
import "./Quiz.css"


function Quiz({userLevel}) {
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch token from local storage
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch current level using token
      fetch(`http://localhost:8000/user/${email}/current-level`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch current level');
          }
          return response.json();
        })
        .then(data => {
          setCurrentLevel(data.current_level);
        })
        .catch(error => console.error(error));
    }
  }, [token]);
  

  useEffect(() => {
    console.log(currentLevel+"bhallagena"); // This may not reflect the updated value immediately
  }, [currentLevel]);

  useEffect(() => {
    fetch("http://localhost:8000/mcq/allMCQ")
      .then((res) => res.json())
      .then((data) => {
        console.log(currentLevel+"pore");
        setCorrectAnswers(data.filter((question) => question.level === currentLevel).map((question) => question.correct_ans));
        setMCQQuestions(data.filter((question) => question.level === currentLevel));
        setSelectedOptions(new Array(data.length).fill(""));
        setIsAnswerCorrect(new Array(data.length).fill(false));
        
      });
  }, [currentLevel]);

  const handleLogin = () => {
    // Perform login and retrieve access token
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: email,
        password: password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        const { access_token } = data;
        localStorage.setItem('access_token', access_token);
        setToken(access_token);
      })
      .catch(error => console.error(error));
  };

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
  };

  return (
    <div>
      {currentLevel ? (
      <div className = "container">
      <h1>MCQ Questions</h1>
      <ul>
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
                <label htmlFor={`${mcqQuestion.option1}-${index}`}>
                  {mcqQuestion.option1}
                </label>
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
                <label htmlFor={`${mcqQuestion.option2}-${index}`}>
                  {mcqQuestion.option2}
                </label>
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
                <label htmlFor={`${mcqQuestion.option3}-${index}`}>
                  {mcqQuestion.option3}
                </label>
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
            <label htmlFor={`${mcqQuestion.option4}-${index}`}>
              {mcqQuestion.option4}
            </label>
          </li>
        </ul>
      </li>
    ))}
  </ul>
  <button onClick={handleSubmit}>Submit</button>
  {showResult && (
    <>
      <h2>Result:</h2>
      <ul>
        {isAnswerCorrect.map((answer, index) => (
          <li key={mcqQuestions[index].question}>
            {answer.isCorrect ? (
              <span style={{ color: "green" }}>✓</span>
            ) : (
              <span style={{ color: "red" }}>✗</span>
            )}
            {mcqQuestions[index].question} - You answered:{" "}
            {answer.userAnswer}, Correct answer: {answer.correctAnswer}
          </li>
        ))}
      </ul>
      <h2>
        Score: {score}/{mcqQuestions.length}
      </h2>
    </>
  )}
  </div>) :
  (
    <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
  )}
</div>
);
}

export default Quiz;