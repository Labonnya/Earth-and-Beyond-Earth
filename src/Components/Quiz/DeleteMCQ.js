// DeleteMCQ.js

import React, { useState } from 'react';

const DeleteMCQ = () => {
  const [questionId, setQuestionId] = useState('');

  const handleDelete = () => {
    fetch(`http://localhost:8000/mcq/${questionId}/deleteMCQ`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required, such as authorization token
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // MCQ deletion successful, handle the response or perform any necessary actions
        console.log(data);
      })
      .catch(error => {
        // Error occurred during MCQ deletion, handle the error
        console.error(error);
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
      <button onClick={handleDelete}>Delete MCQ</button>
    </div>
  );
};

export default DeleteMCQ;
