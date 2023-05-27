import React, { useState, useEffect } from "react";
import Pagination from 'react-js-pagination';
import "./Download.css";
import Menu from "../Menu/Menu";

function Download() {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const response = await fetch("http://localhost:8000/table-data");
    const data = await response.json();
    setData(data);
  };

  // Calculate the indexes for the current page
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the rows to display for the current page
  const rowsToDisplay = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const scrollToConcept = () => {
    const conceptRow = document.querySelector('.download-data');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };  

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 download-bg">
          <img src="./download-bg.png" alt="download" width="600px" />
        </div>
        <div className="col-4 download-bg">
          <div style={{
            paddingRight: "30px"
          }}>
          <button className='btn-space-menu' style={{ 
              fontSize: "20px",
              backgroundColor: "#4158D0",
              backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              // webkitBorderOrderRadius: "28";
              MozBorderRadius: "28",
              WebkitBorderRadius: "28",
              borderRadius: "28px",
              padding: '10px 20px 10px 20px', 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }} onClick={scrollToConcept}>
              All Countries Data
            </button>
          </div>
        <div>
        <button className='btn-space-menu' style={{ 
              fontSize: "20px",
              backgroundColor: "#4158D0",
              backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              // webkitBorderOrderRadius: "28";
              MozBorderRadius: "28",
              WebkitBorderRadius: "28",
              borderRadius: "28px",
              padding: '10px 20px 10px 20px', 
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
              transition: 'color 0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Download
            </button>
        </div>
        </div>
        <div className="col-2"><Menu /></div>
      </div>
      <div className="download-data">
      <p style={{
        marginBottom: "50px"
      }}>
        Download this table?{" "}
        <a
          id="button"
          type="button"
          href="./All_country_info.pdf"
          download="All_country_info.pdf"
          style={{ 
            fontSize: "20px",
            backgroundColor: "#4158D0",
            backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
            // webkitBorderOrderRadius: "28";
            MozBorderRadius: "28",
            WebkitBorderRadius: "28",
            borderRadius: "28px",
            padding: '10px 20px 10px 20px', 
            textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', 
            transition: 'color 0.3s',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
            textDecoration: "none",
            color: "white",
            marginLeft: "30px"}}
        >
          Click Here!
        </a>
      </p>
      <table className="tableD">
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
          {rowsToDisplay.map((row) => (
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
      <div style={{
        color: "white",
      }}>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={rowsPerPage}
        totalItemsCount={data.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass="white-pagination" // Add the custom CSS class here
      />
      </div>
      </div>
    </div>
      
  );
}

export default Download;
