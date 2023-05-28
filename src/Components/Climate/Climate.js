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
import axios from 'axios';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Climate = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stateToShow, setStateToShow] = useState("");
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);
  const [climateData, setClimateData] = useState([])


  const changeshowname = (country, code3) => {
    setContent(country);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/climate')
      .then(response => {
        console.log(response.data)
        setClimateData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const showInfo = (country, code) => {
    const countryInfo = getCountryInfo(country); // Implement a function to fetch country information based on the country name
    setSelectedCountryInfo(countryInfo);
    setIsOpen(true);
    setShowPopover(false);
    setContent("");
  };
  
  const getCountryInfo = (country) => {
    const countryInfo = climateData.find((data) => data.name === country);
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
                <button className="login-btn mt-2 arrow-back-btn-quiz">
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
