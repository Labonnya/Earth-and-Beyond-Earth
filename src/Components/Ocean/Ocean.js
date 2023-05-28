import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Ocean.css';
import axios from 'axios';

const Ocean = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [oceanData, setOceanData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/ocean-info')
      .then(response => {
        console.log(response.data)
        setOceanData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleButtonClick = (buttonTitle) => {
    const matchedData = oceanData.find(data => data.title === buttonTitle);

    if (matchedData) {
      setModalTitle(matchedData.title);
      setModalContent(matchedData.content);
      setImageURL(matchedData.imageURL);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="ocean">
      <div className="arctic">
        <button onClick={() => handleButtonClick('Arctic Ocean')} className="arctic-btn">
          Arctic Ocean
        </button>
      </div>
      <div className="atlantic">
        <button onClick={() => handleButtonClick('Atlantic Ocean')} className="atlantic-btn">
          Atlantic Ocean
        </button>
      </div>
      <div className="pacific">
        <button onClick={() => handleButtonClick('Pacific Ocean')} className="pacific-btn">
          Pacific Ocean
        </button>
      </div>
      <div className="southern">
        <button onClick={() => handleButtonClick('Southern Ocean')} className="southern-btn">
          Southern Ocean
        </button>
      </div>
      <div className="indian">
        <button onClick={() => handleButtonClick('Indian Ocean')} className="indian-btn">
          Indian Ocean
        </button>
      </div>
      {modalOpen && (
        <Modal
          title={modalTitle}
          content={modalContent}
          imageURL={imageURL}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Ocean;
