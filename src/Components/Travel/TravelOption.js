import React, { useState, useEffect } from 'react';
import { Offcanvas, button } from 'react-bootstrap';
import "./Travel.css";
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import axios from 'axios';

const TravelOptions = ({ setSelectedWonder }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedWonderInfo, setSelectedWonderInfo] = useState([]);
  const [travelData, setTravelData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/wonders')
      .then(response => {
        console.log(response.data)
        setTravelData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleClick = (wonder) => {
    setSelectedWonder(wonder);
    setIsOffcanvasOpen(true);
    // Set the selected wonder's name and description
    setSelectedWonderInfo(getWonderInfo(wonder));
  };

  const handleCloseOffcanvas = () => {
    setSelectedWonder(null);
    setIsOffcanvasOpen(false);
    selectedWonderInfo([]);
  };

  // Define a static dataset of sport information

  const getWonderInfo = (wonder) => {
    console.log(wonder)
    const matchedData = travelData.find(data => data.name === wonder);

    return matchedData;
  };

  return (
    <div>
      <button className="travel-x-btn" onClick={() => handleClick('Great Pyramid of Giza')}>
      Great Pyramid Of Giza
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Hanging Gardens of Babylon')}>
      Hanging Gardens Of Babylon
      </button> 
      <button className="travel-x-btn" onClick={() => handleClick('Mausoleum at Halicarnassus')}>
      Mausoleum At Halicarnassus
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Colossus of Rhodes')}>
      Colossus Of Rhodes
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Lighthouse of Alexandria')}>
      Lighthouse Of Alexandria
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Taj Mahal')}>
      Taj Mahal
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Machu Picchu')}>
      Machu Picchu
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Great Wall of China')}>
      Great Wall Of China
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('Petra')}>
      Petra
      </button>

      <Offcanvas show={isOffcanvasOpen} onHide={handleCloseOffcanvas} placement="end" backdrop={false} scroll={false} className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedWonderInfo.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={selectedWonderInfo.imageURL} alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={selectedWonderInfo.imageURL2} alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={selectedWonderInfo.imageURL3}alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
    </div>

          <hr />
          <div className="row">
            <div className="col-6">
              <p className="modal-p">{selectedWonderInfo.description}</p>

</div>
            <div className="col-6">
              <h5>Facts</h5>
              <hr></hr>
              <h6>Location: </h6> <p className='modal-p'>{selectedWonderInfo.location}</p>
              <h6>Year Built: </h6> <p className='modal-p'>{selectedWonderInfo.yearBuilt}</p>
              <h6>Builder: </h6> <p className='modal-p'>{selectedWonderInfo.builder}</p>
            </div>
          </div>
       </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default TravelOptions;