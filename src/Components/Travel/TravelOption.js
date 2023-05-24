import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import "./Travel.css";
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';

const TravelOptions = ({ setSelectedWonder }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [selectedWonderInfo, setSelectedWonderInfo] = useState({
    name: '',
    description: ''
  });

  const handleClick = (wonder) => {
    setSelectedWonder(wonder);
    setIsOffcanvasOpen(true);
    // Set the selected wonder's name and description
    setSelectedWonderInfo(getWonderInfo(wonder));
  };

  const handleCloseOffcanvas = () => {
    setSelectedWonder(null);
    setSelectedWonderInfo({ name: '', description: '' }); // Reset selected wonder info
    setIsOffcanvasOpen(false);
  };

  // Define a static dataset of sport information
  const wondersData = {
    GreatPyramidOfGiza: {
      name: 'Great Pyramid of Giza',
      description: 'The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex in Egypt. It was built as a tomb for the Pharaoh Khufu and is the only remaining ancient wonder of the world.',
      imageURL1: './giza1.png',
      imageURL2: './giza2.png',
      imageURL3: './giza3.png',
      location: 'Giza, Egypt',
      yearBuilt: 'Around 2560 BC',
      builder: 'Ancient Egyptians',
    },
    HangingGardensOfBabylon: {
      name: 'Hanging Gardens of Babylon',
      description: 'The Hanging Gardens of Babylon were a series of terraced gardens built in ancient Babylon, present-day Iraq. They were considered one of the Seven Wonders of the Ancient World and were renowned for their lush greenery and complex irrigation systems.',
      imageURL: './hanging-gardens.jpg',
      location: 'Babylon, Iraq',
      yearBuilt: 'Around 600 BC',
      builder: 'Nebuchadnezzar II',
    },

    MausoleumAtHalicarnassus: {
      name: 'Mausoleum at Halicarnassus',
      description: 'The Mausoleum at Halicarnassus was a tomb built for Mausolus, the ruler of Caria, in present-day Bodrum, Turkey. It was known for its impressive architecture and elaborate decorations.',
      imageURL: './mausoleum-at-halicarnassus.jpg',
      location: 'Bodrum, Turkey',
      yearBuilt: 'Around 350 BC',
      builder: 'Various architects',
    },
    ColossusOfRhodes: {
      name: 'Colossus of Rhodes',
      description: 'The Colossus of Rhodes was a giant statue of the Greek titan-god Helios, erected in the city of Rhodes, Greece. It was one of the tallest statues of the ancient world and symbolized the city\'s strength and power.',
      imageURL: './colossus-of-rhodes.jpg',
      location: 'Rhodes, Greece',
      yearBuilt: 'Around 280 BC',
      builder: 'Chares of Lindos',
    },
    LighthouseOfAlexandria: {
      name: 'Lighthouse of Alexandria',
      description: 'The Lighthouse of Alexandria, also known as the Pharos of Alexandria, was a tower built on the island of Pharos in Alexandria, Egypt. It served as a navigational aid for ships in the harbor and was one of the tallest man-made structures of the time.',
      imageURL: './lighthouse-of-alexandria.jpg',
      location: 'Alexandria, Egypt',
      yearBuilt: 'Around 280 BC',
      builder: 'Sostratus of Cnidus',
    },
    TajMahal: {
        name: 'Taj Mahal',
        description: 'The Taj Mahal is an ivory-white marble mausoleum located in Agra, Uttar Pradesh, India. It was commissioned by the Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal and is considered one of the most beautiful architectural masterpieces in the world.',
        imageURL: './taj-mahal.jpg',
        location: 'Agra, Uttar Pradesh, India',
        yearBuilt: 'Between 1632 and 1653',
        builder: 'Emperor Shah Jahan'
    },
        MachuPicchu: {
            name: 'Machu Picchu',
            description: 'Machu Picchu is an ancient Incan citadel located in the Andes Mountains of Peru. It is renowned for its breathtaking mountainous setting and well-preserved ruins, which provide insights into the Inca civilization.',
            imageURL: './machu-picchu.jpg',
            location: 'Cusco Region, Peru',
            yearBuilt: 'Around 1450 AD',
            builder: 'Inca civilization',
          },
          GreatWallOfChina: {
            name: 'Great Wall of China',
            description: 'The Great Wall of China is a monumental fortification that stretches across the northern border of China. It was built to protect the Chinese empire from invasions and is one of the most famous landmarks in the world.',
            imageURL: './great-wall-of-china.jpg',
            location: 'Northern China',
            yearBuilt: 'Started in the 7th century BC (Different sections built over centuries)',
            builder: 'Various Chinese dynasties',
          },
          Petra: {
            name: 'Petra',
            description: 'Petra is an ancient city carved into the rock face in southern Jordan. It was the capital of the Nabataean Kingdom and is known for its impressive architecture and intricate rock-cut structures, such as the Treasury and the Monastery.',
            imageURL: './petra.jpg',
            location: 'Ma\'an Governorate, Jordan',
            yearBuilt: 'Established in the 4th century BC',
            builder: 'Nabataeans',
          },

  };

  const getWonderInfo = (wonder) => {
    return wondersData[wonder];
  };

  return (
    <div>
      <Button className="btnTravel" onClick={() => handleClick('GreatPyramidOfGiza')}>
      Great Pyramid Of Giza
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('HangingGardensOfBabylon')}>
      Hanging Gardens Of Babylon
      </Button>
    
      <Button className="btnTravel" onClick={() => handleClick('MausoleumAtHalicarnassus')}>
      Mausoleum At Halicarnassus
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('ColossusOfRhodes')}>
      Colossus Of Rhodes
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('LighthouseOfAlexandria')}>
      Lighthouse Of Alexandria
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('TajMahal')}>
      Taj Mahal
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('MachuPicchu')}>
      Machu Picchu
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('GreatWallOfChina')}>
      Great Wall Of China
      </Button>
      <Button className="btnTravel" onClick={() => handleClick('Petra')}>
      Petra
      </Button>

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
          <img className="d-block w-100" src={selectedWonderInfo.imageURL1} alt="First slide" />
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