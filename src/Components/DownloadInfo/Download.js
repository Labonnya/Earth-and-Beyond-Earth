import React, { useState, useEffect } from "react";
import "./Download.css"

function Download() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const response = await fetch("http://localhost:8000/table-data");
    const data = await response.json();
    setData(data);
  };


  return (
    
    <div>
        <br />
       <p>Download this table?  <a id="button" type="button" href="./All_country_info.pdf"  download="All_country_info.pdf">Click Here!</a></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capitals</th>
            <th>Currency</th>
            <th>Language</th>
            <th>Religion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.capitals}</td>
              <td>{row.currency}</td>
              <td>{row.language}</td>
              <td>{row.religion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Download;
