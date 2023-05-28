import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import './Climate.css'


const ClimateOption = () => {
  // State variables for Offcanvas

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleClick = () => {
    setIsOffcanvasOpen(true);   
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };


  return (
    <div>
      <button className="sports-btn" onClick={() => handleClick()}>
      Earth's Extreme
      </button>

      <Offcanvas show={isOffcanvasOpen} onHide={handleCloseOffcanvas} placement="end" backdrop={false} scroll={false} className="offcanvas">
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Most Environment Friendly Countries</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
    <div className="row">
      <div className="col-12 d-flex align-items-center justify-content-center">
        <img src="./environment.png" alt="" width="300px" />
      </div>
    </div>

    <hr />
    <div>
      <h3 className='green'>Green Oasis</h3>
      <ol>
        <li>Sweden</li>
        <li>Denmark</li>
        <li>United Kingdom</li>
        <li>Finland</li>
        <li>Switzerland</li>
        <li>France</li>
        <li>Costa Rica</li>
        <li>Iceland</li>
        <li>Norway</li>
        <li>Ireland</li>
      </ol>

      <h3 className='red'>Toxic Wasteland</h3>
      <ol>
        <li>Qatar</li>
        <li>Iran</li>
        <li>Turkey</li>
        <li>China</li>
        <li>Saudi Arabia</li>
        <li>Vietnam</li>
        <li>Indonesia</li>
        <li>Malaysia</li>
        <li>Algeria</li>
        <li>Kuwait</li>
      </ol>
    </div>
  </Offcanvas.Body>
</Offcanvas>


      {/* Rest of your code... */}
    </div>
  );
};

export default ClimateOption;