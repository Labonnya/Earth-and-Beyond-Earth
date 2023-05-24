import React from 'react';
import './SpaceMenu.css';

const SpaceMenu = () => {
  const scrollToConcept = () => {
    const conceptRow = document.querySelector('.concept');
    conceptRow.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='space-menu-item'>
      <div className='row'>
        <button className='btn-space-menu' style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.😎', transition: 'color 0.3s', animation: 'glow 1s infinite alternate' }} onClick={scrollToConcept}>
          Unveiling the Cosmos: Embark on a Celestial Journey with Us!
        </button>
      </div>
      <img src='./space-bg.png' alt='space-menu' width='1000px' />
      <br /><br /><br /><br />
      <div className='row concept'>
        <div className='col-6 concept-space'>
          <img src='./concept.png' alt='concept' width='500px' />
        </div>
        <div className='col-6'>
            <h4 style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.😎', transition: 'color 0.3s', animation: 'glow 1s infinite alternate', marginTop: '120px' }}>Learn About Galaxies</h4>
            <br /><br /><br /><br />
            <p>Space, the vast expanse that stretches beyond our planet, holds mysteries waiting to be unraveled. The concept of space captivates us with its infinite possibilities and unknown wonders. Space is a canvas of celestial bodies, where stars, planets, and galaxies dance in the cosmic ballet.</p>
            <br></br>
            <button className='space-concept'>Concept of Space</button>
        </div>
      </div>
      
      <div className='row explore'>
        <div className='col-3'></div>
        <div className='col-6'>
          <img src='./explore.png' alt='explore' className='explore-image' />
          <h4 style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.😎', transition: 'color 0.3s', animation: 'glow 1s infinite alternate' }}>Unveiling Celestial Wonders</h4>
          <br /><br /><br />
          <p>Embark on an Epic Cosmic Voyage, where planets dance, moons mesmerize, and mysteries await, as you Explore the Solar System's Infinite Wonders.</p>
          <br />
          <button className='btn-explore'>Explore the Solar System</button>
          <br /><br />
        </div>
      </div>

      <div className='row travel'>
        
      </div>
      <div className='row'></div>
    </div>
  );
};

export default SpaceMenu;