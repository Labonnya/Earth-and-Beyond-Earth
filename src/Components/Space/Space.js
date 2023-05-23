import React, { useState } from 'react';
import '../Space/Space.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SpaceScene = () => {
  const [planet, setPlanet] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const planets = [
    { 
      name: 'Sun', 
      title: 'THE SUN',
      description: `The sun is by far the largest object in our solar system, containing 99.8% of the solar system's mass. It sheds most of the heat and light that makes life possible on Earth and possibly elsewhere. Planets orbit the sun in oval-shaped paths called ellipses, with the sun slightly off-center of each ellipse.
              
      NASA has a fleet of spacecraft observing the sun, such as the Parker Solar Probe, to learn more about its composition, and to make better predictions about space weather and its effect on Earth.`,
      named: "In ancient times the Sun was widely seen as a god, and the name for Sun was the name of that god",
      diameter: "1.3927 million km",
      orbit: "240 million years",
      day: "36 Earth days",
      moons: 8,
      img1: './sun-1.jpg',
      img2: './sun-2.jpg'
    },
    { 
      name: 'Mercury', 
      title: 'MERCURY: THE CLOSEST TO THE SUN',
      description: `Mercury is the closest planet to the sun and the smallest planet in the solar system — it is only a little larger than Earth's moon. Mercury zips around the sun in only 88 days and because it is so close to our star (about two-fifths the distance between Earth and the sun).
              
      Mercury experiences dramatic changes in its day and night temperatures. Mercury temperatures can reach a scorching 840 F (450 C) in the day, which is hot enough to melt lead. Meanwhile, on the night side, temperatures drop to minus 290 F (minus 180 C).
      
      Mercury's atmosphere is very thin and primarily composed of oxygen, sodium, hydrogen, helium and potassium. Because the atmosphere is so thin it cannot incoming meteors, its surface is therefore pockmarked with craters, just like our moon. 

      Over its four-year mission, NASA's MESSENGER spacecraft revealed incredible discoveries that challenged astronomers' expectations. Among those findings was the discovery of water ice and frozen organic compounds at Mercury's north pole and that volcanism played a major role in shaping the planet's surface.`,
      named: "for the messenger of the Roman gods",
      diameter: "3,031 miles (4,878 km)",
      orbit: "88 Earth days",
      day: "58.6 Earth days",
      moons: 0,
      img1: './mercury-1.jpg',
      img2: './mercury-2.jpg'
    },
    { 
      name: 'Venus', 
      title: `VENUS: EARTH'S TWIN` ,
      description: `Venus is the second planet from the sun and is the hottest planet in the solar system. Its thick atmosphere is extremely toxic and composed of sulfuric acid clouds, the planet is an extreme example of the greenhouse effect.
      
      The average temperature on Venus' surface is 900 F (465 C). At 92 bar, the pressure at the surface would crush and kill you. And oddly, Venus spins slowly from east to west, the opposite direction of most of the other planets.
      
      Venus is sometimes referred to as Earth's twin as they are similar in size and radar images beneath its atmosphere reveal numerous mountains and volcanoes. But beyond that, the planets could not be more different. 
      
      The Greeks believed Venus was two different objects — one in the morning sky and another in the evening. Because it is often brighter than any other object in the sky, Venus has generated many UFO reports.`,
      named: "for the Roman goddess of love and beauty",
      diameter: "7,521 miles (12,104 km)",
      orbit: "225 Earth days",
      day: "241 Earth days",
      moons: 0,
      img1: './venus-1.jpg',
      img2: './venus-2.jpg'
    },
    { 
      name: 'Earth', 
      title: 'EARTH: OUR HOME PLANET',
      description: `Earth, our home planet, is the third planet from the sun. It is a water world with two-thirds of the planet covered by water. Earth's atmosphere is rich in nitrogen and oxygen and it is the only world known to harbor life.
      
      Earth rotates on its axis at 1,532 feet per second (467 meters per second) — slightly more than 1,000 mph (1,600 kph) — at the equator. The planet zips around the sun at more than 18 miles per second (29 km per second).`,
      named: `originates from "Die Erde," the German word for "the ground."`,
      diameter: "7,926 miles (12,760 km)",
      orbit: "365.24 Earth days",
      day: "23 hours 56 minutes",
      moons: 1,
      img1: './earth-1.jpeg',
      img2: './earth-2.jpg'
    },
    { 
      name: 'Mars', 
      title: 'MARS: THE RED PLANET',
      description: `Mars is the fourth planet from the sun. It is a cold, desert-like planet covered in iron oxide dust that gives the planet its signature red hue. Mars shares similarities with Earth: It is rocky, has mountains, valleys and canyons, and storm systems ranging from localized tornado-like dust devils to planet-engulfing dust storms. 
      
      Substantial scientific evidence suggests that Mars at one point billions of years ago was a much warmer, wetter world, rivers and maybe even oceans existed. Although Mars' atmosphere is too thin for liquid water to exist on the surface for any length of time, remnants of that wetter Mars still exist today. Sheets of water ice the size of California lie beneath Mars' surface, and at both poles are ice caps made in part of frozen water. 
      
      Scientists also think ancient Mars would have had the conditions to support life like bacteria and other microbes. Hope that signs of this past life — and the possibility of even current lifeforms — may exist on the Red Planet has driven numerous Mars missions and the Red Planet is now one of the most explored planets in the solar system.`,
      named: `for the Roman god of war`,
      diameter: "4,217 miles (6,787 km)",
      orbit: "687 Earth days",
      day: " Just more than one Earth day (24 hours, 37 minutes)",
      moons: 2,
      img1: './mars-1.jpg',
      img2: './mars-2.jpg'
    },
    { 
      name: 'Jupiter', 
      title: 'JUPITER: THE LARGEST PLANET',
      description: `Jupiter is the fifth planet from the sun and the largest planet in the solar system. The gas giant is more than twice as massive as all the other planets combined, according to NASA.
      
      Its swirling clouds are colorful due to different types of trace gases including ammonia ice, ammonium hydrosulfide crystals as well as water ice and vapor. 
      
      A famous feature in its swirling clouds is Jupiter's Great Red Spot, a giant storm more than 10,000 miles wide, first observed in 1831 by amateur astronomer Samuel Heinrich Schwabe. It has raged at more than 400 mph for the last 150 years, at least. 
      
      Jupiter has a strong magnetic field, and with 75 moons, including the largest moon in the solar system, Ganymede.`,
      named: `for the ruler of the Roman gods`,
      diameter: "86,881 miles (139,822 km)",
      orbit: "11.9 Earth years",
      day: " 9.8 Earth hours",
      moons: 53,
      img1: './jupiter-1.jpg',
      img2: './jupiter-2.jpg'
    },
    { 
      name: 'Saturn', 
      title: 'SATURN: THE RINGED JEWEL',
      description: `Saturn is the sixth planet from the sun and is famous for its large and distinct ring system. Though Saturn is not the only planet in the solar system with rings.
      
      When polymath Galileo Galilei first studied Saturn in the early 1600s, he thought it was an object with three parts: a planet and two large moons on either side. Not knowing he was seeing a planet with rings, the stumped astronomer entered a small drawing — a symbol with one large circle and two smaller ones — in his notebook, as a noun in a sentence describing his discovery. More than 40 years later, Christiaan Huygens proposed that they were rings.
      
      The rings are made of ice and rock and scientists are not yet sure how they formed. The gaseous planet is mostly hydrogen and helium and has numerous moons.`,
      named: `for Roman god of agriculture`,
      diameter: "74,900 miles (120,500 km)",
      orbit: "29.5 Earth years",
      day: "About 10.5 Earth hours",
      moons: 53,
      img1: './saturn-1.jpg',
      img2: './saturn-2.jpg'
    },
    { 
      name: 'Uranus', 
      title: 'URANUS: THE TILTED, SIDEWAYS PLANET',
      description: `Uranus is the seventh planet from the sun and is a bit of an oddball. 
      
      It has clouds made of hydrogen sulfide, the same chemical that makes rotten eggs smell so foul. It rotates from east to west like Venus. But unlike Venus or any other planet, its equator is nearly at right angles to its orbit — it basically orbits on its side. 
      
      Astronomers believe an object twice the size of Earth collided with Uranus roughly 4 billion years ago, causing Uranus to tilt. That tilt causes extreme seasons that last 20-plus years, and the sun beats down on one pole or the other for 84 Earth-years at a time. 
      
      The collision is also thought to have knocked rock and ice into Uranus' orbit. These later became some of the planet's 27 moons. Methane in Uranus' atmosphere gives the planet its blue-green tint. It also has 13 sets of faint rings.
      
      Uranus holds the record for the coldest temperature ever measured in the solar system — minus 371.56 degrees F (minus 224.2 degrees C). The average temperature of Uranus is minus 320 degrees Fahrenheit (-195 degrees Celsius).`,
      named: `for the personification of heaven in ancient myth`,
      diameter: "31,763 miles (51,120 km)",
      orbit: "84 Earth years",
      day: "18 Earth hours",
      moons: 27,
      img1: './uranus-1.jpg',
      img2: './uranus-2.jpg'
    },
    { 
      name: 'Neptune', 
      title: 'NEPTUNE: A GIANT, STORMY BLUE',
      description: `Neptune is the eighth planet from the sun and is on average the coldest planet in the solar system. The average temperature of Neptune at the top of the clouds is minus 346 degrees Fahrenheit (minus 210 degrees Celsius).
      
      Neptune is approximately the same size as Uranus and is known for its supersonic strong winds. The planet is more than 30 times as far from the sun as Earth. 
      
      Neptune was the first planet predicted to exist by using math, rather than being visually detected. Irregularities in the orbit of Uranus led French astronomer Alexis Bouvard to suggest some other planet might be exerting a gravitational tug. German astronomer Johann Galle used calculations to help find Neptune in a telescope. Neptune is about 17 times as massive as Earth and has a rocky core.`,
      named: `for the Roman god of water`,
      diameter: "30,775 miles (49,530 km)",
      orbit: "165 Earth years",
      day: "19 Earth hours",
      moons: 14,
      img1: './neptune-1.jpg',
      img2: './neptune-2.jpg'
    },
  ];

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
        <span className="see-more" onClick={toggleExpand} style={{
          color: "grey"
        }}>
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
                <button className="login-btn mt-2 arrow-back-btn">
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
              <p>{planet.name}</p>
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
              <img src={planets.find((p) => p.name === planet)?.img1} alt={planets.find((p) => p.name === planet)?.name} width="300px" />
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center">
              <img src={planets.find((p) => p.name === planet)?.img2} alt={planets.find((p) => p.name === planet)?.name} width="300px" />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p className='modal-p'>{renderParagraph(planets.find((p) => p.name === planet)?.description)}</p>
              {planet === 'Earth' && 
              <div className='d-flex align-items-center justify-content-center'>
                <Link to='/map'><button className='btn-space'>See Map</button></Link>
              </div>
              }
            </div>
            <div className="col-6">
              <h5>{planets.find((p) => p.name === planet)?.name} Facts</h5>
              <hr></hr> 
              <h6>Named:</h6> <p className='modal-p'>{planets.find((p) => p.name === planet)?.named}</p>
              <h6>Diameter:</h6> <p className='modal-p'>{planets.find((p) => p.name === planet)?.diameter}</p>
              <h6>Orbit:</h6> <p className='modal-p'>{planets.find((p) => p.name === planet)?.orbit}</p>
              <h6>Day:</h6> <p className='modal-p'>{planets.find((p) => p.name === planet)?.day}</p>
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
