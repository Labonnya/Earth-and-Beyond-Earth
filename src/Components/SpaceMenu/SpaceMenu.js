import React from 'react';
import './SpaceMenu.css';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const SpaceMenu = () => {
  const scrollToConcept = () => {
    const conceptRow = document.querySelector('.concept');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToSolar = () => {
    const conceptRow = document.querySelector('.explore');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTravel = () => {
    const conceptRow = document.querySelector('.travel');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToMission = () => {
    const conceptRow = document.querySelector('.mission-xd');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHome = () => {
    const conceptRow = document.querySelector('.space-bg');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='space-menu-item'>
      <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
          <button className="login-btn mt-2 arrow-back-btn" >
            <TbArrowBackUp size="40px" />
          </button>
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
      <div className='row space-bg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh' }}>
        <div className='col-6'>
        <button className='btn-space-menu' style={{ textShadow: '0 2px 20px rgba(255, 255, 255, 0.8)', transition: 'color 0.3s', animation: 'glow1 1s infinite alternate' }} onClick={scrollToConcept}>
          Unveiling the Cosmos: Embark on a Celestial Journey with Us!
        </button>
        <img src='./space-bg.png' alt='space-bg' width="800px"/>
        </div>
        <div className='col-6'>
          <div style={{ paddingTop: "200px", display: "flex", flexDirection: "column" }}>
            <button className="btn-space-menu-new" onClick={scrollToConcept}>
              Concept of Space
            </button>
            <button className="btn-space-menu-new" onClick={scrollToSolar}>
              Explore Solar System
            </button>
            <button className="btn-space-menu-new" onClick={scrollToTravel}>
              Travel Space
            </button>
            <button className="btn-space-menu-new" onClick={scrollToMission}>
              Space Missions
            </button>
          </div>
        </div>
      </div>
      <br /><br /><br /><br />
      <div className='row concept'>
      <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={scrollToHome}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
        <div className='col-6 concept-space'>
          <img src='./concept.png' alt='concept' width='500px' />
        </div>
        <div className='col-6'>
            <h4 style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)', transition: 'color 0.3s', animation: 'glow1 1s infinite alternate', marginTop: '120px' }} >Learn About Galaxies</h4>
            <br /><br /><br /><br />
            <p>Space, the vast expanse that stretches beyond our planet, holds mysteries waiting to be unraveled. The concept of space captivates us with its infinite possibilities and unknown wonders. Space is a canvas of celestial bodies, where stars, planets, and galaxies dance in the cosmic ballet.</p>
            <br></br>
            <Link to='/SpaceConcept'><button className='space-concept'>Concept of Space</button></Link>
        </div>
      </div>
      
      <div className='row explore'>
      <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={scrollToHome}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
        <div className='col-3'></div>
        <div className='col-6'>
          <img src='./explore.png' alt='explore' className='explore-image' />
          <h4 style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)', transition: 'color 0.3s', animation: 'glow 1s infinite alternate' }}>Unveiling Celestial Wonders</h4>
          <br /><br /><br />
          <p>Embark on an Epic Cosmic Voyage, where planets dance, moons mesmerize, and mysteries await, as you Explore the Solar System's Infinite Wonders.</p>
          <br />
          <Link to='/space'><button className='btn-explore'>Explore the Solar System</button></Link>
          <br /><br />
        </div>
      </div>

      <div className='row travel'>
      <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={scrollToHome}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
        <div className='mt-5 align-items-center'>
          <p className='travel-space-p'>Venture into the awe-inspiring saga of humanity's odyssey through the cosmos, where dreams defy gravity and the stars become our guide.</p>
          <Link to='/spaceTravel'><button className='btn-space-travel'>Watch Space Travel</button></Link>
        </div>
      </div>
      <div className='row mission-xd'>
      <Navbar>
      <Container>
        <Navbar.Brand>
          <button className="login-btn mt-2 arrow-back-btn" onClick={scrollToHome}>
            <TbArrowBackUp size="40px" />
          </button>
        </Navbar.Brand>
      </Container>
    </Navbar>
        <div className='mt-5 align-items-center'>
          <p className='travel-space-p'>Venture into the awe-inspiring saga of humanity's odyssey through the cosmos, where dreams defy gravity and the stars become our guide.</p>
          <Link to='/spaceMission'>
            <button className='btn-space-travel'>Know about Space Missions</button>
          </Link>
          <img src='./space-mission-img.png' alt='sda' className='float-up-animation' />
        </div>
      </div>

    </div>
  );
};

export default SpaceMenu;
