import React, { useState, useEffect} from "react";
import "../WorldMap/Worldmap.css";
import ClimateOption  from "./ClimateOption";
import {
  ComposableMap, Geographies, Geography, ZoomableGroup,
} from "react-simple-maps";
import MapLegend from "../MapView/MapLegend";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CountryInfo from "../MapView/CountryInfo";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';



const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Climate = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stateToShow, setStateToShow] = useState("");
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);


  const changeshowname = (country, code3) => {
    setContent(country);
   
  };

  const showInfo = (country, code) => {
    const countryInfo = getCountryInfo(country); // Implement a function to fetch country information based on the country name
    setSelectedCountryInfo(countryInfo);
    setIsOpen(true);
    setShowPopover(false);
    setContent("");
  };
  
  const getCountryInfo = (country) => {
    // Define a static dataset of country information
    const countryData = [
      {
        name: "China",
        details: "China has quite a striking difference in where it ranks on the EPI compared to the GFI, 160th for the former and 26th for the latter. For annual average PM2.5 concentrations, it ranks 61st with 32.6 μg/m³, and for CO2 emissions per capita it ranks 51st with 8.2 tonnes. In regards to the Sustainable Development goals, (significant) challenges remain for China across goals 7, 11, and 13. However, it is moving in the right direction, as it is deemed to be “moderately increasing” across these goals.",
      },
      {
        name: "Qatar",
        details: "Unfortunately, Qatar places last on list of greenest countries. It ranks 137th on the EPI and 73rd on the GFI. Its annual average PM2.5 concentration is a worrying 38.2 μg/m³, placing it 66th. Qatar also comes in last place for its CO2 emissions per capita with 35.64 tonnes. This is backed up by the UN’s evaluation of Qatar’s progress towards achieving the Sustainable Development Goals. In regards to goal 7 (Affordable and Clean Energy) and goal 13 (Climate Action), major challenges remain, and for goal 11 (Sustainable Cities and Communities), significant challenges still remain.",
      },
      {
        name: "Iran",
        details: "Iran also needs to improve in regards to its sustainability efforts. It only ranks 133rd on the EPI and 76th on the GFI. In regards to CO2 emissions per capita it ranks 52nd with 8.26 tonnes, and for annual average PM2.5 concentrations it ranks 59th with 30.3 μg/m³.The Sustainable Development Report also assesses that major challenges still remain for Iran in regards to affordable and clean energy. Furthermore, for goals 11 and 13, Iran is assessed to be stagnating with significant challenges remaining.",
      },
      {
        name: "Turkey",
        details: "Turkey does not fare well on either the EPI or GFI, ranking 172nd and 69th place respectively. It also ranks 48th place for the lowest annual average PM2.5 concentrations with 20 μg/m³ and 35th place for CO2 emissions per capita with 4.83 tonnes. This is confirmed by the Sustainable Development Report, that states challenges remain for affordable and clean energy, significant challenges remain for sustainable cities and communities, and major challenges remain for climate action..",
      },
      {
        name: "Saudi Arabia",
        details: "Saudi Arabia also has some way to go in regards to becoming more green. It ranks 109th on the EPI and 51st on the GFI. Its scores for annual average PM2.5 concentrations and CO2 emissions per capita are also not great. Ranking 62nd with 32.7 μg/m³ for the former and 66th with 16.96 tonnes for the latter. Looking at the Sustainable Development Goals it is clear that both significant and major challenges remain for Saudi Arabia in regards to goals 7, 11, and 13. However, it has been assessed as “moderately increasing” across these goals, so hopefully there will be improvements in the near future.",
      },
      {
        name: "Indonesia",
        details: "Indonesia’s total carbon emissions are relatively high at 568.27 Mt, however, due to its large population size it only produces 2.09 tonnes per capita, leaving it in 17th place. Otherwise, Indonesia ranks quite poorly. It is 164th on the EPI and 70th on the GFI. In regards to the lowest annual average PM2.5 concentrations, it ranks 64th with 34.3 μg/m³. This is confirmed by the Sustainable Development Report, which states challenges still remain across goals 7, 11, and 13 for Indonesia. In particular for goal 11 (Sustainable Cities and Communities).",
      },
      {
        name: "Malaysia",
        details: "Malaysia also ranks in the bottom ten for the greenest countries in the world. It comes in 130th place on the EPI and 65th on the GFI. It ranks 50th for CO2 emissions per capita with 7.98 tonnes, and 45th place for annual average PM2.5 concentrations with 19.4 μg/m³. This is backed up by the Sustainable Development Report, which states that challenges (of varying magnitudes) remain for Malaysia in regards to goals 7, 11, and 13. ",
      },
      {
        name: "Algeria",
        details: "Algeria is another country in the bottom ten that ranks relatively well in terms of its CO2 emissions per capita, in 23rd place with 3.77 tonnes. However, it still has work to do in regards to the other metrics. It ranks 155th on the EPI, 75th on the GFI, and 47th on the lowest annual average PM2.5 concentrations with 20 μg/m³. In regards to the Sustainable Development goals, significant and major challenges remain for Algeria across goals 7, 11, and 13. In addition to this, for goal 11 (Sustainable Cities and Communities) it has even been deemed to be regressing.",
      },

       {
        name: "Kuwait",
        details: "Finally, we have Kuwait which ranks 61st out of the 69 countries on this list. It comes in 87th position for the EPI and 58th for the GFI. It has a rank of 68th for CO2 emissions per capita with 20.91 tonnes and ranks 58th for the lowest annual average PM2.5 concentrations with 29.7 μg/m³. Again, this is confirmed by the Sustainable Development Report, which assesses Kuwait to have significant and major challenges remaining across goals 7, 11, and 13.",
      },
      {
        name: "Sweden",
        details: `Coming in at first place is Sweden. Sweden ranks highly across the studies, coming in 5th place on the EPI, 9th for the GFI, and 4th for the lowest annual average PM2.5 concentration at 6.6 μg/m³.

        However, like most European countries Sweden’s main downfall is its CO2 emissions per capita, ranking only 28th place with 4.18 tonnes (4th in Europe).
        
        Some of Sweden’s highlights are that it has a perfect score in the EPI for protecting marine ecosystems and it ranks second in the GFI’s CO2 emissions growth in transport sector indicator.`,
      },
      {
        name: "Denmark",
        details: `Denmark is considered to be a pioneer in promoting sustainability, so it is no surprise that it ranks so highly. It has an impressive ranking on both the EPI and the GFI, 1st and 2nd place respectively.

        However, it does rank relatively lower in terms of its CO2 emissions per capita and annual average PM2.5 concentration. At 31st place with 4.43 tonnes for the former and at 16th place with 9.6 μg/m³ for the latter.
        
        One of Denmark’s highlights is that it comes out on top for the EPI’s wastewater treatment indicator. Which means 100% of its population is connected to a sewer system and 100% of its household wastewater is treated.`,
      },
      {
        name: "United Kingdom",
        details: `Despite its history the UK has been making headway in recent years as it aims to meet its net zero target by 2050. Ranking 2nd for the EPI and 4th for the GFI, it is clear that the UK is determined to make a greener future a reality.

        However, it still has some work to do in regards to its CO2 emissions and annual average PM2.5 concentration. It ranks in 34th place with 4.66 tonnes for the former and in 13th place with 8.8 μg/m³ for the latter.
        
        The UK performs particularly well for climate policy, ranking 3rd in the GFI and 2nd in the EPI for this category.`,
      },
      {
        name: "Finland",
        details: `Finland ranks 3rd on the EPI and 6th on the GFI. In particular, Finland excels in the GFI’s Clean Innovation pillar, ranking first. Furthermore, it achieves first place for the lowest annual average PM2.5 concentration with 5.5 μg/m³.

        Out of the four studies, Finland mainly needs to focus on reducing its CO2 emissions, as it ranks 45th place with 7.29 tonnes per capita. The nation is already implementing change and plans to reduce its dependence on fossil fuels by 50% by 2030.`,
      },
      {
        name: "Switzerland",
        details: `Switzerland placed 9th on the EPI and 14th on the GFI. It scores relatively lower for its CO2 emissions per capita and annual average PM2.5 concentration. Ranking 27th with 4.07 tonnes and 20th with 10.8 μg/m³, respectively.

        Switzerland has a perfect score for both the EPI’s sanitation and drinking water indicators, meaning it has among the lowest DALY rates (age-standardised disability-adjusted life-years lost per 100,000 persons) in the world.`,
      },
      {
        name: "France",
        details: `Next on the list is France, which ranks 12th on the EPI and 7th on the GFI. This nation produces 4.26 tonnes of CO2 emissions per capita, meaning it comes in at 29th. Furthermore, France has an annual average PM2.5 concentration of 11.4 μg/m³, making it 23rd on the list.

        In 2015, France became an early adopter of the United Nations’ Sustainable Development Goals. Therefore, it’s understandable why it ranks 4th place for the GFI’s Climate Policy pillar.`,
      },
      {
        name: "Costa Rica",
        details: `Costa Rica, the first non-European country on the list, is a true front-runner when it comes to creating a more sustainable future. It comes in 8th place for the lowest annual average PM2.5 concentrations with 7.8 μg/m³. Furthermore, it ranks 12th with 1.55 tonnes in regards to CO2 emissions per capita and 20th in the GFI.

        However, out of the 180 nations assessed in the EPI, Costa Rica only places 68th. Despite this, the EPI still gave Costa Rica a perfect score for SO2 growth rate, meaning it’s cutting emissions by ≥3.94% per year.`,
      },
      {
        name: "Iceland",
        details: `Iceland is considered to be the top nation by the GFI and ranks in 10th place in the EPI. It also has a low annual average PM2.5 concentration of 6.1 μg/m³, ranking 3rd place.

        However, Iceland’s CO2 emissions per capita have room for improvement as it ranks 56th with 9.23 tonnes. The government plans to achieve carbon neutrality by 2040 and be fossil-fuel-free by 2050, so we should see Iceland moving up the rankings in the coming years.`,
      },
      {
        name: "Norway",
        details: `Norway ranks 20th on the EPI and 5th on the GFI. According to the GFI, it is leading in the area of Green Transport. Norway has an annual average PM2.5 concentration of 7.5 μg/m³ and 7.74 tonnes of CO2 emissions per capita, making it rank in 7th and 49th place respectively.

        In order to become even greener, Norway plans to reduce 90-95% of its greenhouse gas emissions (excluding sinks) from 1990 levels by 2050.`,
      },
      {
        name: "Ireland",
        details: `Ireland comes in 24th place on the EPI and 12th on the GFI. A highlight being that it ranks 3rd on the GFI’s Green Society pillar. Furthermore, Ireland ranks 9th for the lowest annual average PM2.5 concentrations with 8 μg/m³.

        However, Ireland only ranks 41st place for its CO2 emissions per capita with 6.68 tonnes. To address this, the government has created a Climate Action Plan which commits Ireland to reach net zero no later than 2050.`,
      },


     
      // Add more country information objects as needed
    ];
  
    // Find the country information in the dataset based on the country name
    const countryInfo = countryData.find((data) => data.name === country);
  
    return countryInfo;
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setContent("");
  };

  
  const CountryPopup = ({ countryInfo , onClose}) => {
    const handleClose = () => {
        onClose();
      };
    return (
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{countryInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display the country information */}
          
          <p style={{ color: 'black' }}>{countryInfo.details}</p>
          {/* Add more country information fields as needed */}
        </Modal.Body>
      </Modal>
    );
  };
  

  const fillColorMap = {
    Sweden: "#2b5400",
    Denmark: "#507003",
    "United Kingdom": "#2b5400",
    Finland: "#4e6f01",
    Switzerland: "#617e1c",
    France: "#486f20",
    "Costa Rica": "#688c15",
    Iceland: "#688c15",
    Norway: "#588435",
    Ireland: "#72a201", 
    Qatar: "#8a3215",
    Iran: "#892f13",
    Turkey: "#9f4201",
    China: "#a84602",
    "Saudi Arabia": "#c5823e",
    Vietnam: "#b37436",
    Indonesia: "#cc863f",
    Malaysia: "#e39444",
    Algeria: "#892f13",
    Kuwait: "#ecb58a"
  }

  const determineFillColor = (geo) => {
    return fillColorMap[geo.properties.name] || "grey";
  };
  
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowPopover(false);
    }
  }, [isOpen]);
  
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header
        as="h3"
        style={{
          backgroundColor: "#FFC09F",
          color: "#222222",
        }}
      >
        {content}
      </Popover.Header>
      
    </Popover>
  );

  return (
    <>
      <div className="world-map">
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
        <div className="text-country">
          <p className="text-light">
            Country: {content !== "" && <text>{content}</text>}
          </p>
        </div>
        <div className="map-view">
          <div className="row">
            <div className="col-10">
              <ComposableMap data-tip="" projection="geoMercator">
                <ZoomableGroup zoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo, index) => {
                        const countryInfo = getCountryInfo(geo.properties.name);
                        const isCountryInData = !!countryInfo;
                        return (
                          <>
                            <OverlayTrigger
                              placement="auto"
                              delay={{ show: 250, hide: 200 }}
                              overlay={showPopover && content ? popover : <></>}
                            >
                              <Geography
                                className="each-country"
                                key={geo.rsmKey + geo.properties.name}
                                geography={geo}
                                fill={determineFillColor(geo)}
                                data-name={geo.properties.name}
                                onMouseEnter={(event) => {
                                setShowPopover(true);
                                  changeshowname(geo.properties.name, geo.id);
                                }}
                                onMouseLeave={() => {
                                    setShowPopover(false);
                                  changeshowname("", "");
                                }}
                                style={{
                                    default: {
                                      stroke: "#fff",
                                      strokeWidth: "0.3",
                                      
                                    },
                                    hover: {
                                      outline: "none",
                                      transition: "all 0.3s ease-in-out",
                                      stroke: "#56494C",
                                      strokeWidth: "0.5",
                                      transform: "translateY(-4px)",
                                      cursor: "pointer",
                                      zIndex: "10",
                                      
                                    },
                                    pressed: {
                                      fill: "#E42",
                                      outline: "none",
                                      
                                    },
                                  }}
                                  
                                onClick={() => {
                                    if (isCountryInData) {
                                        showInfo(geo.properties.name, geo.id);
                                      }
                                }}
                              ></Geography>
                            </OverlayTrigger>
                          </>
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
            <div className="col-2">
            {isOpen && <CountryPopup countryInfo={selectedCountryInfo} onClose={handleCloseModal} />}
              <ClimateOption />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Climate;
