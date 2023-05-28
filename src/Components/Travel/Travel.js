import React, { useState } from "react";
import "../WorldMap/Worldmap.css";
import ReactCountryFlag from "react-country-flag";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import MapLegend from "../MapView/MapLegend";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CountryInfo from "../MapView/CountryInfo";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import TravelOptions from "./TravelOption";
import "./Travel.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Travel = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stateToShow, setStateToShow] = useState("");
  const [selectedWonder, setSelectedWonder] = useState(null);

  const changeshowname = (country, code3) => {
    setContent(country);
    
  };

  const showInfo = (country, code) => {
    setIsOpen(true);
    setStateToShow(country);
    setSelectedWonder(null);
  };

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
 const fillColorMapGiza ={
    Egypt: "#d4af37",
 }
 const fillColorMapBabylon ={
    Iraq: "#d4af37",
 }
 const fillColorMapHali ={
    Turkey: "#d4af37",
 }
 const fillColorMapRhodes ={
    Greece: "#d4af37",
 }
 const fillColorMapLightHouse ={
    Egypt: "#d4af37",
 }
 const fillColorMapTajMahal ={
    India: "#d4af37",
 }
 const fillColorMapChina ={
    China: "#d4af37",
 }

 const fillColorMapMachuPicchu ={
    Peru: "#d4af37",
 }
 const fillColorMapPetra ={
    Jordan: "#d4af37",
 }

 
 const determineFillColor = (geo) => {
    if (selectedWonder === "Great Pyramid of Giza") {
      return fillColorMapGiza[geo.properties.name] || "grey";
    } else if (selectedWonder === "Hanging Gardens of Babylon") {
      return fillColorMapBabylon[geo.properties.name] || "grey";
    } else if (selectedWonder === "Mausoleum at Halicarnassus") {
      return fillColorMapHali[geo.properties.name] || "grey";
    } else if (selectedWonder === "Colossus of Rhodes") {
      return fillColorMapRhodes[geo.properties.name] || "grey";
    } else if (selectedWonder === "Lighthouse of Alexandria") {
      return fillColorMapLightHouse[geo.properties.name] || "grey";
    } else if (selectedWonder === "Taj Mahal") {
      return fillColorMapTajMahal[geo.properties.name] || "grey";
    } else if (selectedWonder === "Great Wall of China") {
      return fillColorMapChina[geo.properties.name] || "grey";
    } else if (selectedWonder === "Machu Picchu") {
      return fillColorMapMachuPicchu[geo.properties.name] || "grey";
    } else if (selectedWonder === "Petra") {
      return fillColorMapPetra[geo.properties.name] || "grey";
    } else {
      return "grey";
    }
  };
  

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
            <div className="col-9">
              <ComposableMap data-tip="" projection="geoMercator">
                <ZoomableGroup zoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo, index) => {
                        return (
                          <>
                            <OverlayTrigger
                              placement="auto"
                              delay={{ show: 250, hide: 200 }}
                              overlay={popover}
                            >
                              <Geography
                                className="each-country"
                                key={geo.rsmKey + geo.properties.name}
                                geography={geo}
                                fill={determineFillColor(geo)}
                                data-name={geo.properties.name}
                                onMouseEnter={(event) => {
                                  changeshowname(geo.properties.name, geo.id);
                                }}
                                onMouseLeave={() => {
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
                                  showInfo(geo.properties.name, geo.id);
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
              
              {isOpen && <CountryInfo country={stateToShow} />}
              <TravelOptions setSelectedWonder={setSelectedWonder} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Travel;
