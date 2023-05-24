import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

const ClimateOption = () => {
  // State variables for Offcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Function to toggle Offcanvas visibility
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <div>
      <button onClick={toggleOffcanvas}>Open Offcanvas</button>

      <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas Title</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Add your Offcanvas content here */}
          <p>Offcanvas content goes here</p>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Rest of your code... */}
    </div>
  );
};

export default ClimateOption;
