import React from 'react';
import "./SpaceTravel.css";
import Accordion from 'react-bootstrap/Accordion';
import {BsFillSquareFill} from "react-icons/bs"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";


const SpaceTravel = () => {
  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };
  return (
    <div className='spaceTravel'>
                  <Navbar>
          <Container>
            <Navbar.Brand href="#home">
                <button className="login-btn mt-2 arrow-back-travel-space" onClick={goBack}>
                  <TbArrowBackUp size="40px" />
                </button>
            </Navbar.Brand>
          </Container>
        </Navbar>
      <div className="row row3">
      <h2 className='htext1'>Space Travel</h2>
      </div>
      <div className="row row1">
        <div className="col-4">
        <Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header> What is space travel?</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./st1.png" alt="" width='250px' height='150px'/> <br /> <br />
          Space travel involves the exploration and travel beyond Earth's atmosphere. It encompasses the journey of humans and spacecraft to celestial bodies like the Moon, planets, and even beyond our solar system.
  <br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion> 
        </div>
        <div className="col-4">
        <Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>What is used for space travel?</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./st2.png" alt="" width='250px' height='150px'/> <br /> <br />
       Spacecraft and rockets are used for space travel. Spacecraft are vehicles designed for travel and operations in space. They can be manned or unmanned and include capsules, shuttles, and modules. Rockets provide the necessary thrust to overcome Earth's gravity and launch spacecraft into space. They consist of stages that are ignited and discarded as fuel is depleted.
  <br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion>
        </div>
        <div className="col-4">
        <Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>How do astronauts prepare themselves for space travel?
</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./astronaut.png" alt="" width='250px' height='150px'/> <br /> <br />
         Astronaut training prepares individuals for space travel through rigorous physical, mental, and technical exercises. It includes physical fitness, simulated spacewalks, survival training, and psychological preparations. <br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion>
       </div>

      </div>
      <div className="row row2">
      <div className="col-4">
      <Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>What are the famous space agencies and programs?
</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./st4.png" alt="" width='250px' height='150px'/> <br /> <br />
          Space agencies like NASA, Roscosmos, and ESA lead programs for space exploration, research, and development of spacecraft and missions.
 <br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion>
</div> 
<div className="col-4">
<Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>What is space tourism?
</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./st5.png" alt="" width='250px' height='150px'/> <br /> <br />
          Space tourism refers to the concept of traveling to space for recreational purposes or leisure activities. It involves individuals paying for the opportunity to experience spaceflight and spend a short period of time in space. Space tourism aims to make space exploration more accessible to the general public, offering a unique and extraordinary experience beyond Earth's atmosphere. Companies like Virgin Galactic and Blue Origin are actively developing space tourism programs and spacecraft to cater to this emerging industry.
  <br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion>
</div> 
<div className="col-4">
<Accordion style={{
      width: "300px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>What is the future of space travel?
</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}> <img src="./astronot.png" alt="" width='250px' height='150px'/> <br /> <br />
        The future of space travel includes Mars missions, lunar colonization, space tourism, and advancements in technology to explore deep space. Private companies are actively involved, making space more accessible. Research and innovation will drive new discoveries and expand human presence in space.

<br></br>
          
        </Accordion.Body>
      </Accordion.Item>

      
     
    </Accordion>
</div>
      </div>


    


    </div>
  )
}

export default SpaceTravel;