import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import './SportsMap.css';
import './Sports.css';

const SportsOptions = ({ setSelectedSports }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedSportInfo, setSelectedSportInfo] = useState({
    name: '',
    description: ''
  });
  

  const handleClick = (sport) => {
    setSelectedSports(sport);
    setIsOffcanvasOpen(true);
    // Set the selected sport's name and description
    setSelectedSportInfo(getSportInfo(sport));
  };

  const handleCloseOffcanvas = () => {

    setIsOffcanvasOpen(false);
  };

  // Define a static dataset of sport information
  const sportData = {
    Cricket: {
      name: 'Cricket',
      description: 'Cricket is a bat-and-ball game played between two teams of eleven players. It is one of the most popular sports in the world, particularly in countries like India, England, Australia, and South Africa.',
      imageURL: './cricket.png',
      Team: '11 players per side (substitutes permitted in some circumstances)',
      Type: 'Team sport, Bat-and-Ball',
      Equipment: 'Cricket ball, Cricket bat, Wicket (Stumps, Bails), Protective equipment',
      Venue:'Cricket field',
      GV: "ICC"
    },
    Football: {
      name: 'Football',
      description: 'Football, also known as soccer, is a team sport played with a spherical ball between two teams of eleven players. It is the most widely followed and played sport in the world, with billions of fans and professional leagues in numerous countries.',
      imageURL: './football.png',
      Team: '11 per side (including goalkeeper)',
      Type: 'Team sport, ball sport',
      Equipment: 'Football (or soccer ball), shin pads',
      Venue:'Football pitch (also known as football field, football ground, soccer field, soccer pitch or "pitch")',
      GV: "FIFA"
    },
    Basketball: {
      name: 'Basketball',
      description: 'Basketball is a team sport played on a rectangular court. The objective is to shoot a ball through a hoop mounted to a backboard at each end. It is a popular sport globally, with professional leagues like the NBA (National Basketball Association) in the United States.',
      imageURL: './basketball.png',
      Team: '5 per side',
      Type: 'Indoor/Outdoor',
      Equipment: 'Basketball',
      Venue:'Indoor court (mainly) or outdoor court (Streetball)',
      GV: "FIBA"
    },
    Hockey: {
      name: 'Hockey',
      description: 'Hockey is a sport played on ice or field, depending on the variant. It involves two teams trying to maneuver a puck or ball into the opponent\'s goal using a stick. Ice hockey and field hockey are popular variants of the sport.',
      imageURL: './hockey.png',
      Team: `Each side has eleven players: ten field players and one goalkeeper. Attackers, midfielders, defenders, and goalkeepers will make up the field formations, which may vary based on the coach's approach.`,
      Type: 'Bandy, Field hockey, Ice hockey, Roller hockey',
      Equipment: 'Hockey stick and ball are the most important equipment without which the sport cannot be played. There are many other equipment like shin guard, helmet, glove, shoes, etc., that a hockey player uses during the match.',
      Venue:'Indoor Ice Arenas, Outdoor Ice Rinks, Sports Arenas, Community Rinks',
      GV: "International Hockey Federation"
    }
  };

  const getSportInfo = (sport) => {
    return sportData[sport];
  };

  return (
    <div>
      <div className='top-dibo'>
      <button className="sports-btn" onClick={() => handleClick('Cricket')}>
        Cricket
      </button>
      <button className="sports-btn" onClick={() => handleClick('Football')}>
        Football
      </button>
      <button className="sports-btn" onClick={() => handleClick('Basketball')}>
        Basketball
      </button>
      <button className="sports-btn" onClick={() => handleClick('Hockey')}>
        Hockey
      </button>

      </div>
  
      <Offcanvas show={isOffcanvasOpen} onHide={handleCloseOffcanvas} placement="end" backdrop={false} scroll={false} className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedSportInfo.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <img src={selectedSportInfo.imageURL} alt={selectedSportInfo.name} width="300px" />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p className="modal-p">{selectedSportInfo.description}</p>

</div>
            <div className="col-6">
              <h5>Facts</h5>
              <hr></hr>
              <h6>Team Members: </h6> <p className='modal-p'>{selectedSportInfo.Team}</p>
              <h6>Type: </h6> <p className='modal-p'>{selectedSportInfo.Type}</p>
              <h6>Venue: </h6> <p className='modal-p'>{selectedSportInfo.Venue}</p>
              <h6>Equipment: </h6> <p className='modal-p'>{selectedSportInfo.Equipment}</p>
              <h6>Highest Governing Body: </h6> <p className='modal-p'>{selectedSportInfo.GV}</p>

             
            </div>
          </div>
       </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default SportsOptions;