import React from 'react';
import Card from 'react-bootstrap/Card';
import "./SpaceMIssion.css";

const SpaceMIssion = () => {
  return (
    <>
    <div className='row'>
        <div className="col-6">
        <Card
      style={{ width: '50rem' }}
      className="mb-2 space-card"
    >
      <Card.Body>
        <div className='row'>
          <div className='col-4'>
            <img src='./mission1.png' alt='earth' width='200px'/>
          </div>
          <div className='col-8'>
            <br/>
          <h4>Apollo 11 (1969)</h4>
            <br/>
            The Apollo 11 mission marked the first crewed lunar landing. Astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, while Michael Collins orbited above in the command module. This historic mission demonstrated the remarkable achievement of reaching another celestial body.

          </div>
        </div>
      </Card.Body>
    </Card>
    
    <Card
      style={{ width: '50rem' }}
      className="mb-2 space-card"
    >
      <Card.Body>
        <div className='row'>
          <div className='col-4'>
            <img src='./mission2 (1).png' alt='earth' width='200px'/>
          </div>
          <div className='col-8'>
            <br/>
          <h4>Voyager missions (1977)</h4>
            <br/>
            The Voyager 1 and Voyager 2 spacecraft were launched to study the outer planets of our solar system. These missions provided unprecedented close-up views and valuable scientific data about Jupiter, Saturn, Uranus, and Neptune. Voyager 1 also holds the distinction of being the most distant human-made object, currently venturing into interstellar space.


          </div>
        </div>
      </Card.Body>
    </Card>
    <Card
      style={{ width: '50rem' }}
      className="mb-2 space-card"
    >
      <Card.Body>
        <div className='row'>
          <div className='col-4'>
            <img src='./mission33.png' alt='earth' width='200px'/>
          </div>
          <div className='col-8'>
            <br/>
          <h4>Hubble Space Telescope (1990)</h4>
            <br/>
            The Hubble Space Telescope, a joint project between NASA and ESA, has revolutionized our understanding of the cosmos. It has captured stunning images of distant galaxies, observed supernovae, studied exoplanets, and helped refine the age and expansion rate of the universe. Hubble continues to be a vital tool for astronomical research.


          </div>
        </div>
      </Card.Body>
    </Card>
    <Card
      style={{ width: '50rem' }}
      className="mb-2 space-card"
    >
      <Card.Body>
        <div className='row'>
          <div className='col-4'>
            <img src='./mission44.png' alt='earth' width='200px'/>
          </div>
          <div className='col-8'>
            <br/>
          <h4>Cassini-Huygens (1997-2017)</h4>
            <br/>
            The Cassini-Huygens mission was a collaboration between NASA, ESA, and the Italian Space Agency. The spacecraft, Cassini, explored Saturn and its moons, while the Huygens probe successfully landed on Saturn's moon, Titan. The mission provided unprecedented insights into Saturn's rings, the atmosphere of Titan, and the dynamics of the Saturnian system.


          </div>
        </div>
      </Card.Body>
    </Card>
    <Card
      style={{ width: '50rem' }}
      className="mb-2 space-card"
    >
      <Card.Body>
        <div className='row'>
          <div className='col-4'>
            <img src='./mission55.png' alt='earth' width='200px'/>
          </div>
          <div className='col-8'>
            <br/>
          <h4>Rosetta (2004-2016)</h4>
            <br/>
            The Rosetta mission, led by the European Space Agency (ESA), involved an orbiter and a lander called Philae. Rosetta rendezvoused with the comet 67P/Churyumov-Gerasimenko, studying its composition and dynamics. Philae successfully landed on the comet's surface, providing invaluable data about these ancient remnants of the early solar system.


          </div>
        </div>
      </Card.Body>
    </Card>

    </div>

  
        </div>
    
    </>
    
  )
}

export default SpaceMIssion
