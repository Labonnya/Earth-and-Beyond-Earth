import React, { useState } from 'react';
import Modal from './Modal';
import "./Ocean.css";

const Ocean = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
  
    const handleButtonClick = (title, content) => {
      setModalTitle(title);
      setModalContent(content);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const modalData = [
      {
        title: 'Arctic Ocean',
        content: `The Arctic Ocean is located in the Northern Hemisphere and is centered around the North Pole. It is the smallest of the five oceans of the world in terms of area and also the shallowest. Throughout winter, the volume of the ocean shrinks as the extent of the Arctic sea ice increases, significantly covering the surface. Due to global warming, Arctic sea ice coverage in the summer has been reduced by 50% since 1979.

        This has wide-ranging impacts on the ocean’s flora and fauna. On top of the sea ice, many highly specialized species of animals, such as the polar bear, are becoming increasingly threatened by the reduction in coverage as they rely on the ice for shelter and food. Underneath the waves, melting ice is opening up the waters to increased fishing and therefore endangering species like the beluga whale.
        
        The melting ice is opening a new era for the Arctic Ocean as it reveals potential shipping lanes and resources to claim. This is already manifesting in political disputes over access to oil reserves and the rights of the indigenous population.`,
      },
      {
        title: 'Atlantic Ocean',
        content: `Named after the Greek titan Atlas, the Atlantic is the second-largest ocean in the world and covers 20% of the Earth’s surface. It stretches from the Arctic in the north, passing down between Europe, the Americas, and Africa and ending just before the Southern Ocean. It is split in two by the Equatorial Counter Current, the North Atlantic, and South Atlantic. Throughout history, the Atlantic has been at the center of many key events, such as Christopher Columbus’ crossing to discover the Americas in 1492 and the Atlantic slave trade which began in the 15th century.

        Apart from trade routes, the Atlantic’s other major economic factor is fishing. In the 20th century, fishing was largely unregulated which led to a rapid decline in fish stocks, reaching a low point in the 1990s. Since then, regulations on catch numbers have seen fish stocks rise but they are yet to reach their original numbers. Another environmental issue in the Atlantic is waste management. Due to the convergence of certain ocean currents, much of the world’s rubbish has been collected as the North Atlantic garbage patch which is hundreds of kilometers in extent.`,
      },
      {
        title: 'Pacific Ocean',
        content: `The Pacific is the largest ocean in the world and is home to the deepest place on Earth in the Mariana Trench called Challenger Point. It also has the largest expanse of open ocean. Divided into the North Pacific and South Pacific, it is bounded by Australia, the Philippines, Russia, and the Americas and is home to some of the most remote places on Earth. 

        Over 25,000 islands are located in the Pacific Ocean, many of which are active volcanoes grouped in an area known as the Pacific Ring of Fire. Other islands are inhabited and form parts of minor nations such as Tonga, Fiji, and the Marshall Islands. Humans first settled in the Pacific 70,000 years ago, reaching Papua New Guinea and Australia first and later migrating to the now well-known island nations. Kiribati, a nation of 32 atolls, straddles the international date line that runs through the center of the Pacific, therefore existing as the furthest country away from GMT and the only one in all four hemispheres of the world. 
        
        Home to 50% of the world’s ocean waters, it also hosts the Great Pacific garbage patch which contains an estimated 1.8 trillion pieces of litter. The ocean was also the site of the most nuclear bomb tests in history and the Marshall Islands are more radioactive than Chornobyl in some areas. Many countries such as Peru and Chile rely heavily on fishing to support their economies which are periodically affected by the El Nino weather phenomenon.`,
      },
      {
        title: 'Southern Ocean',
        content: `Also known as the Antarctic Ocean, the Southern Ocean is centered around Antarctica in the South Pole. There has been debate over whether the Southern Ocean should even be classified as a separate body of water, but research into southern circulation currents, which begin at the South Atlantic Ocean, found them to be significantly strong enough to warrant a distinction.

        Where Antarctic glaciers meet the Southern Ocean, significant ice melt occurs. This is normal, but due to global warming, more ice is melting into the ocean at an increased rate, making Antarctica one of the areas contributing most to sea level rises. On the flip side, the icebergs that form in the Southern Ocean every year hold enough fresh water to serve every person on Earth for months. Other natural resources include huge, untapped oil reserves and extensive manganese nodule fields.`,
      },
      {
        title: 'Indian Ocean',
        content: `The Indian Ocean is the third largest in the world and sits between Africa, India, South East Asia, and Australia. The International Hydrographic Organization first designated the Indian Ocean as inclusive of the Southern Ocean, but in 2000 the two were separated.

        The Indian is the warmest ocean and therefore supports a host of unique marine life. The warmth supports the largest phytoplankton groupings in the world and this means there is an increased capability to support fish populations. In turn, this attracts many different countries, as far away as Korea and Russia, to exploit the stocks through fishing species like tuna. Endangered species include the Dugong, Irrawaddy dolphin, and even phytoplankton which have decreased by 20% in number over the past 60 years.`,
      },
    ];
  
    return (
      <div className="ocean">
        <div className='arctic'>
        <button  onClick={() => handleButtonClick(modalData[0].title, modalData[0].content)}>
          {modalData[0].title}
        </button>
        </div>
       <div className='atlantic'> 
       <button onClick={() => handleButtonClick(modalData[1].title, modalData[1].content)}>
          {modalData[1].title}
        </button>
       </div>

       <div className='pacific'>
       <button onClick={() => handleButtonClick(modalData[2].title, modalData[2].content)}>
          {modalData[2].title}
        </button>
       </div>
        
        <div className='southern'>
        <button onClick={() => handleButtonClick(modalData[3].title, modalData[3].content)}>
          {modalData[3].title}
        </button>
        </div>

        <div className='indian'>
        <button onClick={() => handleButtonClick(modalData[4].title, modalData[4].content)}>
          {modalData[4].title}
        </button>
        </div>
     
        
       
  
        {modalOpen && <Modal title={modalTitle} content={modalContent} closeModal={handleCloseModal} />}
      </div>
    );
  };
  
  export default Ocean;
  