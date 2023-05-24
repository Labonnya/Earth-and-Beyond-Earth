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
import SportsOption from "./SportsOption";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Sports = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stateToShow, setStateToShow] = useState("");
  const [selectedSports, setSelectedSports] = useState(null);

  const changeshowname = (country, code3) => {
    setContent(country);
  };

  const showInfo = (country, code) => {
    setIsOpen(true);
    setStateToShow(country);
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


  const fillColorMapCricket = {
    default: "grey",
    Bangladesh: 'red',

  }
  const fillColorMapFootball = {
    default: "grey",
    India: 'red',

  }
  const fillColorMapBasketball = {
    default: "grey",
    Canada: 'red',

  }
  const fillColorMapHockey = {
    default: "grey",
    Japan: 'red',

  }

  const determineFillColor = (geo) => {
    if (selectedSports === "Cricket") {
        return fillColorMapCricket[geo.properties.name] || fillColorMapCricket.default;
      } else if (selectedSports  === "Football") {
        return fillColorMapFootball[geo.properties.name] || fillColorMapFootball.default;
      } else if (selectedSports  === "Basketball") {
        return fillColorMapBasketball[geo.properties.name] || fillColorMapBasketball.default;
      } else if (selectedSports  === "Hockey") {
        return fillColorMapHockey[geo.properties.name] || fillColorMapHockey.default;
      } 
      else {
        return "grey";
      }
  };

  const handleCountryClick = (country) => {
    setContent(country);
  };

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
                                onClick={() => handleCountryClick(geo.properties.name)}
                                onMouseEnter={() => {
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
              <SportsOption setSelectedSports={setSelectedSports} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sports;
