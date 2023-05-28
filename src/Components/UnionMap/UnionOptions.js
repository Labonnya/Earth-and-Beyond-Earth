import { Offcanvas, button } from 'react-bootstrap';
import './UnionMap.css';
import React, { useState } from 'react';

const UnionOptions = ({ setSelectedUnion }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedUnionInfo, setSelectedUnionInfo] = useState({
    name: '',
    description: ''
  });

  const handleClick = (union) => {
    setSelectedUnion(union);
    setIsOffcanvasOpen(true);
    // Set the selected union's name and description
    setSelectedUnionInfo(getUnionInfo(union));
  };

  const handleCloseOffcanvas = () => {
    setSelectedUnion(null);
    setIsOffcanvasOpen(false);
  };

  // Define a static dataset of union information
  const unionData = {
    AU: { name: 'AU (African Union)', description: 'The African Union is a continental union consisting of 55 member states located on the continent of Africa. The AU was announced in the Sirte Declaration in Sirte, Libya, on 9 September 1999, calling for the establishment of the African Union.  The African Union has more than 1.3 billion people and an area of around 30 million km2 (12 million sq mi) and includes world landmarks, such as the Sahara and the Nile. The primary working languages are Arabic, English, French, Portuguese, Spanish, and Swahili. Within the African Union, there are official bodies, such as the Peace and Security Council and the Pan-African Parliament.', headquarters: 'Addis Ababa, Ethiopia', founder: 'Muammar Gaddafi', founded: 'Durban, South Africa', HDI: '0.577; medium', imageURL: "./download.png" },
    ASEAN: { name: 'ASEAN (Association of Southeast Asian Nations)', description: 'ASEAN, officially the Association of Southeast Asian Nations, is a political and economic union of 10 member states in Southeast Asia. The union has a total area of 4,522,518 km² and an estimated total population of about 668 million, containing approximately 8.5% of the world population in 2021. ASEANs primary objectives are: "(1) to accelerate economic growth, social progress and cultural development in the region and (2) to promote regional peace and stability through abiding respect for justice and the rule of law in the relationship among countries in the region and adherence to the principles of the United Nations Charter.' , headquarters:'Jakarta, Indonesia', founder:' Sinnathamby Rajaratnam, Abdul Razak Hussein, Adam Malik, Narciso Ramos, Thanat Khoman', founded:'August 8, 1967, Bangkok, Thailand', HDI:"0.718", imageURL:'asean.png'},
    AL: { name: 'AL (Arab League)', description: 'The Arab League, formally the League of Arab States, is a regional organization in the Arab world, which is located in Northern Africa, Western Africa, Eastern Africa, and Western Asia. The Arab League has achieved relatively low levels of cooperation throughout its history. According to Michael Barnett and Etel Solingen, the design of the Arab League reflects Arab leaders individual concerns for regime survival: "the politics of Arab nationalism and a shared identity led Arab states to embrace the rhetoric of Arab unity in order to legitimize their regimes, and to fear Arab unity in practice because it would impose greater restrictions on their sovereignty.', headquarters:'Cairo, Egypt. ', founder:'Saudi Arabia, Lebanon, Yemen, Emirate of Transjordan, Kingdom of Egypt, Kingdom of Iraq, Second Syrian Republi, ', founded:'March 22, 1945, Cairo, Egypt', imageURL:'al.png' },
    EEU: { name: 'EEU (Eurasian Economic Union)', description: 'The Eurasian Economic Union is an economic union of some post-Soviet states located in Eurasia. The Treaty on the Eurasian Economic Union was signed on 29 May 2014 by the leaders of Belarus, Kazakhstan, and Russia, and came into force on 1 January 2015. The Eurasian Economic Union has an integrated single market of 183 million people and a gross domestic product of over $2.4 trillion. The EAEU encourages the free movement of goods and services, and provides for common policies in the macroeconomic sphere, transport, industry and agriculture, energy, foreign trade and investment, customs, technical regulation, competition, and antitrust regulation. Provisions for a single currency and greater integration are envisioned for the future.', headquarters:'Moscow', founder:'January 1, 2015, Russia', founded:'Russia, Kazakhstan, Belarus, Armenia', imageURL:'eeu.png'},
    EU: { name: 'EU (European Union)', description: 'The European Union is a supranational political and economic union of 27 member states that are located primarily in Europe. The union has a total area of 4,233,255 km² and an estimated total population of nearly 447 million. Containing 5.8 per cent of the world population in 2020, the EU generated a nominal gross domestic product (GDP) of around US$16.6 trillion in 2022, constituting approximately one sixth of global nominal GDP and the third-biggest global economy after the United States and China.Additionally, all EU states except Bulgaria have a very high Human Development Index according to the United Nations Development Programme.', headquarters:'Most Commission departments are located in Brussels or Luxembourg, but the Commission has offices in every EU country.', founder:'Germany, France, Italy, Netherlands, Belgium, Luxembourg', founded:'November 1, 1993, Maastricht, Netherlands', imageURL:'eu.png'  },
    SAARC: { name: 'SAARC (South Asian Association for Regional Cooperation)', description: 'The South Asian Association for Regional Cooperation is the regional intergovernmental organization and geopolitical union of states in South Asia. Its member states are Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, and Sri Lanka. The idea of co-operation among South Asian Countries was discussed in three conferences: the Asian Relations Conference held in New Delhi in April 1947; the Baguio Conference in the Philippines in May 1950; and the Colombo Powers Conference held in Sri Lanka in April 1954.', headquarters:'Kathmandu,Nepal', founder:'Its seven founding members are Bangladesh, Bhutan, India, the Maldives, Nepal, Pakistan, and Sri Lanka.', founded:' December 8, 1985, Dhaka' , imageURL:'saarc.png' },
    GCC: { name: 'GCC (Gulf Cooperation Council)', description: 'The Cooperation Council for the Arab States of the Gulf, also known as the Gulf Cooperation Council, is a regional, intergovernmental, political, and economic union comprising Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, and the United Arab Emirates. All current member states are monarchies, including three constitutional monarchies (Qatar, Kuwait, and Bahrain), two absolute monarchies (Saudi Arabia and Oman), and one federal monarchy (the United Arab Emirates, which is composed of seven member states, each of which is an absolute monarchy with its own emir). There have been discussions regarding the future membership of Jordan, Morocco, and Yemen.', headquarters:'Riyadh, Saudi Arabia', founder:'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Bahrain, Oman', founded:' May 25, 1981, Abu Dhabi, United Arab Emirates', imageURL:'gcc.png'  },
    OIC: { name: 'OIC (Organisation of Islamic Cooperation)', description: 'The Organisation of Islamic Cooperation, formerly the Organisation of the Islamic Conference, is an intergovernmental organization founded in 1969, consisting of 57 member states, with 48 being Muslim-majority countries. The OIC has permanent delegations to the United Nations and the European Union. The official languages of the OIC are Arabic, English, and French. It maintains various affiliated, specialized, and subsidiary organs within the framework of OIC Charter. The member states had a collective population of over 1.8 billion as of 2015, accounting for just under a quarter of the worlds population. The collective area is 31.66 m km2.', headquarters:'Jeddah, Saudi Arabia', founder:'Organization of the Islamic Cooperation, Arabic Munaẓamat al-Taʿāwun al-Islāmī, an Islamic organization established in Jeddah, Saudi Arabia, in May 1971, following summits by Muslim heads of state and government in 1969 and by Muslim foreign ministers in 1970..', founded:' September 25, 1969', imageURL:'oic.png'  },
    NATO: { name: 'NATO (North Atlantic Treaty Organization)', description: 'The North Atlantic Treaty Organization, also called the North Atlantic Alliance, is an intergovernmental military alliance between 31 member states – 29 European and two North American. NATOs main headquarters are located in Brussels, Belgium, while NATOs military headquarters are near Mons, Belgium. The alliance has targeted its NATO Response Force deployments in Eastern Europe, and the combined militaries of all NATO members include around 3.5 million soldiers and personnel.', headquarters:'Brussels, Belgiuml', founder:'United States, France, United Kingdom, Italy, Canada, MORE', founded:' April 4, 1949, Washington, D.C., United States' , imageURL: 'nato.png' }

  };

  const getUnionInfo = (union) => {
    return unionData[union];
  };

  return (
    <div>
      <button className="travel-x-btn" onClick={() => handleClick('AU')}>
        AU
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('ASEAN')}>
        ASEAN
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('AL')}>
        AL
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('EEU')}>
        EEU
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('EU')}>
        EU
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('SAARC')}>
        SAARC
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('OIC')}>
        OIC
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('GCC')}>
        GCC
      </button>
      <button className="travel-x-btn" onClick={() => handleClick('NATO')}>
        NATO
      </button>

      <Offcanvas show={isOffcanvasOpen} onHide={handleCloseOffcanvas} placement="end" backdrop={false} 
        scroll={false} className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedUnionInfo.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <img src= {selectedUnionInfo.imageURL} alt="mercury-1" width="300px" />
              {console.log(selectedUnionInfo.imageURL)}
            </div>
            
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p className='modal-p'>{selectedUnionInfo.description}</p>
            </div>
            <div className="col-6">
              <h5>Facts</h5>
              <hr></hr>
              <h6>Founder:</h6> <p className='modal-p'>{selectedUnionInfo.founder}</p>
              <h6>Founded:</h6> <p className='modal-p'>{selectedUnionInfo.founded}</p>
              <h6>Headquarters:</h6> <p className='modal-p'>{selectedUnionInfo.headquarters}</p>
             
            </div>
          </div>
       </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default UnionOptions;
