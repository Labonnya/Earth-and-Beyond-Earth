import React, { useState, useEffect } from "react";
import LoggedNav from "../Navbar/LoggedNav";
import "./Quiz.css";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimeRunning, setIsTimeRunning] = useState(true);

  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Rome", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Which is the tallest mountain in the world?",
      answers: [
        { text: "Mount Everest", correct: true },
        { text: "Mount Fuji", correct: false },
        { text: "Mount Hakaluki", correct: false },
        { text: "Mount Fontain", correct: false },
      ],
    },
    {
      question: "Which is the longest river in the world?",
      answers: [
        { text: "River Naf, Puerto Rico", correct: false },
        { text: "Street End, England", correct: false },
        { text: "The Nile, Africa", correct: true },
        { text: "None", correct: false },
      ],
    },
    {
      question: "What is the capital of Germany?",
      answers: [
        { text: "Berlin", correct: true },
        { text: "Paris", correct: false },
        { text: "Rome", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "On which continent is the Sahara Desert located?",
      answers: [
        { text: "Asia", correct: false },
        { text: "Europe", correct: false },
        { text: "Africa", correct: true },
        { text: "America", correct: false },
      ],
    },
    {
      question: "What is the southernmost capital city in the world?",
      answers: [
        { text: "Canberra", correct: false },
        { text: "Buenos Aires", correct: true },
        { text: "Jakarta", correct: false },
        { text: "Wellington", correct: false },
      ],
    },
    {
      question: "What is the smallest country in the world?",
      answers: [
        { text: "Andorra", correct: false },
        { text: "Luxemborg", correct: false },
        { text: "Vatican City", correct: true },
        { text: "Belgium", correct: false },
      ],
    },
    {
      question: "In which US state can you find the city of Chicago?",
      answers: [
        { text: "Mississippi", correct: false },
        { text: "Missouri", correct: false },
        { text: "Illinois", correct: true },
        { text: "Arizona", correct: false },
      ],
    },
    {
      question:
        "In which country is located the volcano Eyjafjallajökull which stopped air traffic for days in 2010?",
      answers: [
        { text: "Greenland", correct: false },
        { text: "Italy", correct: false },
        { text: "Indonesia", correct: false },
        { text: "Iceland", correct: true },
      ],
    },
    {
      question: "How many countries are there in the world",
      answers: [
        { text: "105", correct: false },
        { text: "145", correct: false },
        { text: "195", correct: false },
        { text: "245", correct: true },
      ],
    },
    // more questions here
  ];

  useEffect(() => {
    if (isTimeRunning && timeLeft > 0) {
        const interval = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearTimeout(interval);
    }
}, [timeLeft, isTimeRunning]);

  const handleAnswerClick = (correct) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeLeft(45);

    if (questionIndex === questions.length - 1) {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <h1 className="t">
        <Card body className="text-center mx-auto mt-4">Your score is {score} out of {questions.length}</Card>
        <Link to='/quiz'><button className="quiz-option">Start Over</button></Link>
      </h1>
    );
  }

  const currentQuestion = questions[questionIndex];
  return (
    <>
      <LoggedNav />
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h1 className="mb-5 ques">{currentQuestion.question}</h1>
            <div>
              {currentQuestion.answers.map((answer, index) => (
                <div>
                  <button
                    className="quiz-option"
                    key={index}
                    onClick={() => handleAnswerClick(answer.correct)}
                    style={{
                      margin: "20px",
                    }}
                  >
                    {answer.text}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            <h5>(Time Left: {timeLeft} seconds)</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
