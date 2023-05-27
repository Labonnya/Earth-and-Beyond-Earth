import React, { useEffect, useState } from 'react';
import './Leaderboard.css'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";

const LeaderboardGame = () => {
  const [topScorers, setTopScorers] = useState([]);

  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };

  useEffect(() => {
    fetchTopScorers();
  }, []);

  const fetchTopScorers = async () => {
    try {
      const response = await fetch('http://localhost:8000/plays/top-scorers-game');
      const data = await response.json();
      setTopScorers(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching top scorers:', error);
    }
  };

  return (
    <div className="container mt-4">
                    <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={goBack}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
      <h2 className="text-center mb-4 text-light">Leaderboard</h2>
      {topScorers.length > 0 ? (
        <table className="table table-striped table-bordered lead-table">
          <thead className="thead-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {topScorers.map((scorer, index) => (
              <tr key={index}>
                <td className='text-light'>{index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`}</td>
                <td className='text-light'>{scorer.username}</td>
                <td className='text-light'>{scorer.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No top scorers found.</p>
      )}
    </div>
  );
};

export default LeaderboardGame;
