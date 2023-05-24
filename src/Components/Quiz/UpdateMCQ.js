// UpdateMCQ.js

import React, { useState } from 'react';

const UpdateMCQ = () => {
  const [questionId, setQuestionId] = useState('');
  const [updatedMCQ, setUpdatedMCQ] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct_ans: '',
    round: 0,
    level: 0,
  });

  const handleUpdate = () => {
    fetch(`http://localhost:8000/mcq/${questionId}/updateMCQ`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMCQ),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // MCQ update successful, handle the response or perform any necessary actions
        console.log(data);
      })
      .catch(error => {
        // Error occurred during MCQ update, handle the error
        console.error(error);
      });
  };

  const handleInputChange = e => {
    setUpdatedMCQ({
      ...updatedMCQ,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={questionId}
        onChange={e => setQuestionId(e.target.value)}
        placeholder="Enter question ID"
      />
      <input
        type="text"
        name="question"
        value={updatedMCQ.question}
        onChange={handleInputChange}
        placeholder="Enter updated question"
      />
      <input
        type="text"
        name="option1"
        value={updatedMCQ.option1}
        onChange={handleInputChange}
        placeholder="Enter option 1"
      />
      <input
        type="text"
        name="option2"
        value={updatedMCQ.option2}
        onChange={handleInputChange}
        placeholder="Enter option 2"
      />
      <input
        type="text"
        name="option3"
        value={updatedMCQ.option3}
        onChange={handleInputChange}
        placeholder="Enter option 3"
      />
      <input
        type="text"
        name="option4"
        value={updatedMCQ.option4}
        onChange={handleInputChange}
        placeholder="Enter option 4"
      />
      <input
        type="text"
        name="correct_ans"
        value={updatedMCQ.correct_ans}
        onChange={handleInputChange}
        placeholder="Enter correct answer"
      />
      <input
        type="number"
        name="round"
        value={updatedMCQ.round}
        onChange={handleInputChange}
        placeholder="Enter round"
      />
      <input
        type="number"
        name="level"
        value={updatedMCQ.level}
        onChange={handleInputChange}
        placeholder="Enter level"
      />
      <button onClick={handleUpdate}>Update MCQ</button>
    </div>
  );
};

export default UpdateMCQ;
