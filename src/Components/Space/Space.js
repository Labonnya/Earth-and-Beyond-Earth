import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Modal, Button } from 'react-bootstrap';
import { TbArrowBackUp } from 'react-icons/tb';
import './Space.css';

const SpaceScene = () => {
  const [planets, setPlanets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [planet, setPlanet] = useState('');
  const [expanded, setExpanded] = useState(false);

  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };


  const handlePlanetClick = (planetName) => {
    setPlanet(planetName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExpanded(false);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const renderParagraph = (text) => {
    if (!text) return null;
    const words = text.split(' ');

    if (expanded || words.length <= 100) {
      return text;
    }

    const visibleWords = words.slice(0, 100).join(' ');

    return (
      <>
        {visibleWords}...
        <span className="see-more" onClick={toggleExpand} style={{ color: 'grey' }}>
          See more
        </span>
      </>
    );
  };

  return (
    <div className="space-style">
      <div className="space-map">
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <Link to="/">
                <button className="login-btn mt-2 arrow-back-btn" onClick={goBack}>
                  <TbArrowBackUp size="40px" />
                </button>
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="orbit-container">
        <div className="sun-image" onClick={() => handlePlanetClick('Sun')}></div>
        {planets.map((planet) => (
          <div className={`${planet.name.toLowerCase()}-outline`} key={planet.name}>
            <div
              className={planet.name.toLowerCase()}
              onClick={() => handlePlanetClick(planet.name)}
            ></div>
            <div className={`${planet.name.toLowerCase()}-text`}>
            {planet.name !== 'Sun' && <p>{planet.name}</p>}
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>{planets.find((p) => p.name === planet)?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6 d-flex align-items-center justify-content-center">
              <img
                src={planets.find((p) => p.name === planet)?.img1}
                alt={planets.find((p) => p.name === planet)?.name}
                width="300px"
              />
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center">
              <img
                src={planets.find((p) => p.name === planet)?.img2}
                alt={planets.find((p) => p.name === planet)?.name}
                width="300px"
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p className="modal-p">{renderParagraph(planets.find((p) => p.name === planet)?.description)}</p>
              {planet === 'Earth' && (
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="/map">
                    <button className="btn-space">See Map</button>
                  </Link>
                </div>
              )}
            </div>
            <div className="col-6">
              <h5>{planets.find((p) => p.name === planet)?.name} Facts</h5>
              <hr />
              <h6>Named:</h6>
              <p className="modal-p">{planets.find((p) => p.name === planet)?.named}</p>
              <h6>Diameter:</h6>
              <p className="modal-p">{planets.find((p) => p.name === planet)?.diameter}</p>
              <h6>Orbit:</h6>
              <p className="modal-p">{planets.find((p) => p.name === planet)?.orbit}</p>
              <h6>Day:</h6>
              <p className="modal-p">{planets.find((p) => p.name === planet)?.day}</p>
              {planet === 'Sun' ? (
                <div>
                  <h6>Number of Planets:</h6>
                  <p className="modal-p">{planets.find((p) => p.name === planet)?.moons}</p>
                </div>
              ) : (
                <div>
                  <h6>Number of Moons:</h6>
                  <p className="modal-p">{planets.find((p) => p.name === planet)?.moons}</p>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SpaceScene;