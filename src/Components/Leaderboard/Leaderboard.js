import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [topScorers, setTopScorers] = useState([]);

  useEffect(() => {
    fetchTopScorers();
  }, []);

  const fetchTopScorers = async () => {
    try {
      const response = await fetch('http://localhost:8000/plays/top-scorers');
      const data = await response.json();
      setTopScorers(data);
    } catch (error) {
      console.error('Error fetching top scorers:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Leaderboard</h2>
      {topScorers.length > 0 ? (
        <table className="table table-striped table-bordered">
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
                <td>{index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`}</td>
                <td>{scorer.username}</td>
                <td>{scorer.total_score}</td>
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

export default Leaderboard;
