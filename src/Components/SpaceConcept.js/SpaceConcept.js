import React from 'react';
import "./SpaceConcept.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";


const SpaceConcept = () => {
  const goBack = () => {
    window.history.back(); // Go back to the immediate previous page
  };
  return (
    <>
           <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn-new" onClick={goBack}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
    <div className='space'><br /> <br /> <br />
    <h3 className='header'>Beyond the Stars: Exploring the Mysteries of Space</h3>
        <div className="row spacey">
           
            <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space2.jpg" alt="Cardcap" />
        <div className="card-body">
          <h5 className="card-title txt1">What is space?</h5>
          <p className="card-text txt" >
          The concept of space refers to the vast and seemingly infinite expanse that exists beyond Earth's atmosphere, encompassing all matter and energy. It is a way for cosmic exploration and holds countless mysteries yet to be discovered.
          </p>
        </div>
      </div>
            </div>
            <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title txt1"> What does space consist of?</h5>
          <p className="card-text txt">
          Space primarily consists of a vacuum, meaning it lacks air and other matter. However, it contains objects such as planets, stars, galaxies, comets, and other astronomical phenomena distributed.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
    <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space2.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title txt1">Key characteristics of space?</h5>
          <p className='card-text txt'>
          Key characteristics include its three-dimensional nature, its vastness, the absence of significant atmospheric pressure, and the presence of celestial bodies and phenomena dispersed across its expanse.
          </p>
        </div>
      </div>
    </div>
            </div>

        </div>

       <div className="charOfSpace"> <br /> <br/> <br/>

        <h3 className='header'>Space Exploration Unveiled: Journey into the Cosmos</h3> <br /> <br /> <br />
       <div className="row spaceChar1">
                <div className="col-4">
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./gravity.png" alt="Card image cap" height="200px" />
                    <div className="card-body">
                    <h5 className="card-title txt1">Defying Gravity</h5>
                    <p className="card-text txt" >
                    In space, the force of gravity is significantly weaker than on Earth, resulting in a state called microgravity. This property allows astronauts and objects in space to experience apparent weightlessness.
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-4 ">
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./void.png" alt="Card image cap" height="200px"/>
                    <div className="card-body">
                    <h5 className="card-title txt1">Into the Void</h5>
                    <p className="card-text txt" >
                    Space is a near-perfect vacuum, devoid of air and other gases. The absence of atmospheric pressure can have various effects on objects and organisms.
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-4">
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./bigbang.png" alt="Card image cap" height="200px" />
                    <div className="card-body">
                    <h5 className="card-title txt1">Echoes of the Big Bang</h5>
                    <p className="card-text txt" >
                    Throughout space, there is a faint background radiation called cosmic microwave background radiation. It is considered a remnant of the Big Bang, the event that marked the beginning of the universe.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <br /> <br /> <br />
            <div className="row">
                <div className="col-4 space2">
                
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./stellar.png" alt="Card image cap" height="200px" />
                    <div className="card-body">
                    <h5 className="card-title txt1">Stellar Symphony</h5>
                    <p className="card-text txt" >
                    Space is home to a vast array of celestial bodies, including stars, planets, moons, asteroids, and comets. These objects interact through gravitational forces and form complex systems like solar systems and galaxies.
                    </p>
                    </div>
                </div>
                
                </div>
                <div className="col-4 space1">
                
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./dark.png" alt="Card image cap" height="200px" />
                    <div className="card-body">
                    <h5 className="card-title txt1">Unseen Forces</h5>
                    <p className="card-text txt" >
                    Although not fully understood, scientists believe that space is composed of not only visible matter but also dark matter and dark energy. These  substances have  effects on the structure and evolution of the universe.
                    </p>
                    </div>
                </div>
                
                </div>
            </div>
       </div>
    
   


    </>
    
   
  );
};


export default SpaceConcept;
