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
import SportsOptions from "./SportsOption";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Worldmap = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [stateToShow, setStateToShow] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);


  const changeshowname = (country, code3) => {
    setContent(country);
    
  };

  const showInfo = (country, code) => {
    setIsOpen(true);
    setStateToShow(country);
    setSelectedSport(null); // Reset the selected sport when showing country info
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
    "Australia": "#dbe4eb",
    "New Zealand":"#dbe4eb",
    Pakistan: "#dbe4eb",
    India:"#dbe4eb",
    "Sri lanka":"#dbe4eb",
    Bangladesh:"#dbe4eb",
    "West indies":"#dbe4eb",
    Zimbabwe:"#dbe4eb",
    Ireland:"#dbe4eb",
    Netherlands:"#dbe4eb",
    Oman:"#dbe4eb",
    Afghanistan:"#dbe4eb",
    "South africa":"#dbe4eb",
    "Namibia":"#dbe4eb",
    England:"#dbe4eb",
  }

  const fillColorMapFootball = {
    default: "grey",
    Argentina: "#d4af37",
    Brazil: "#d4af37",
    Germany: "#d4af37",
    Spain: "#d4af37",
    Portugal: "#d4af37",
    Italy: "#d4af37",
    England: "#d4af37",
    Netherlands: "#d4af37",
    France: "#d4af37",
    Turkey: "#d4af37",
    Uruguay: "#d4af37",
    Colombia: "#d4af37",
    Belgium: "#d4af37",
    Ghana: "#d4af37",
    "South korea": "#d4af37",
    Japan: "#d4af37",
    Switzerland: "#d4af37",
    Sweden: "#d4af37",
    "United States of America":"#d4af37",
    Morocco: "#d4af37",

  }

  const fillColorMapBasketball = {
    default: "grey",
    "United States of America": "#cd7f32", 
    Canada: "#cd7f32", 
    Argentina: "#cd7f32", 
    Russia: "#cd7f32", 
    Spain: "#cd7f32", 
    Australia: "#cd7f32", 
    China: "#cd7f32", 
    Brazil: "#cd7f32", 
    Phillipins: "#cd7f32", 
    Serbia: "#cd7f32", 
    Greece: "#cd7f32", 
    Italy: "#cd7f32", 
    France: "#cd7f32", 
    Croatia: "#cd7f32", 
    Lithuania: "#cd7f32", 
  }

  const fillColorMapHockey = {
    default: "grey",
    Australia: "#5bb072",
    Belgium: "#5bb072",
    Netherlands: "#5bb072",
    Germany: "#5bb072",
    India: "#5bb072",
    England:"#5bb072",
    Argentina:"#5bb072",
    Spain: "#5bb072",
    "New Zealand": "#5bb072",
    Malaysia: "#5bb072",
  }

 


  const determineFillColor = (geo) => {
    if (selectedSport === "Cricket") {
      return fillColorMapCricket[geo.properties.name] || fillColorMapCricket.default;
    } 
    else if (selectedSport === "Football") {
      return fillColorMapFootball[geo.properties.name] || fillColorMapFootball.default;
    } 
    else if (selectedSport === "Hockey") {
        return fillColorMapHockey[geo.properties.name] || fillColorMapHockey.default;
    } 
    else if (selectedSport === "Basketball") {
            return fillColorMapBasketball[geo.properties.name] || fillColorMapBasketball.default;
    }
     else {
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
            <SportsOptions setSelectedSport={setSelectedSport} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Worldmap;
