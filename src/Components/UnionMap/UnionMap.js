import React, { useState } from "react";
import "../WorldMap/Worldmap.css";
import ReactCountryFlag from "react-country-flag";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import LoggedNav from "../Navbar/LoggedNav";
import UnionOptions from "./UnionOptions";
import { Modal } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const UnionMap = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganizationInfo, setSelectedOrganizationInfo] = useState(null);


  const changeshowname = (country, code3) => {
    setContent(country);
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

  const fillColorMapEEU = {
    default:"grey",
    Armenia: "#FFA69E",
    Belarus: "#FFA69E",
    Kazakhstan: "#FFA69E",
    Kyrgyzstan: "#FFA69E",
    Russia: "#FFA69E",
  };

  const fillColorMapSAARC = {
    default:"grey",
    Afghanistan: "#70EE9C",
    Bangladesh: "#70EE9C",
    Bhutan: "#70EE9C",
    India: "#70EE9C",
    Maldives: "#70EE9C",
    Nepal: "#70EE9C",
    Pakistan: "#70EE9C",
    "Sri Lanka": "#70EE9C",
  };

  const fillColorMapEU = {
    default:"grey",
    Austria: "#de5462",
    Belgium: "#de5462",
    Bulgaria: "#de5462",
    Croatia: "#de5462",
    Cyprus: "#de5462",
    "Czech Republic": "#de5462",
    Denmark: "#de5462",
    Estonia: "#de5462",
    Finland: "#de5462",
    France: "#de5462",
    Germany: "#de5462",
    Greece: "#de5462",
    Hungary: "#de5462",
    Ireland: "#de5462",
    Italy: "#de5462",
    Latvia: "#de5462",
    Lithuania: "#de5462",
    Luxembourg: "#de5462",
    Malta: "#de5462",
    Netherlands: "#de5462",
    Poland: "#de5462",
    Portugal: "#de5462",
    Romania: "#de5462",
    Slovakia: "#de5462",
    Slovenia: "#de5462",
    Spain: "#de5462",
    Sweden: "#de5462",
  };

  const fillColorMapAL = {
    default:"grey",
    Algeria: "#FFD447",
    Bahrain: "#FFD447",
    Comoros: "#FFD447",
    Djibouti: "#FFD447",
    Egypt: "#FFD447",
    Iraq: "#FFD447",
    Jordan: "#FFD447",
    Kuwait: "#FFD447",
    Lebanon: "#FFD447",
    Libya: "#FFD447",
    Mauritania: "#FFD447",
    Morocco: "#FFD447",
    Oman: "#FFD447",
    Palestine: "#FFD447",
    Qatar: "#FFD447",
    "Saudi Arabia": "#FFD447",
    Somalia: "#FFD447",
    Sudan: "#FFD447",
    Syria: "#FFE59B",
    Tunisia: "#FFD447",
    "United Arab Emirates": "#FFD447",
    Yemen: "#FFD447",
  };

  const fillColorMapASEAN = {
    default:"grey",
    Brunei: "#a2bf54",
    Cambodia: "#a2bf54",
    Indonesia: "#a2bf54",
    Laos: "#a2bf54",
    Malaysia: "#a2bf54",
    Myanmar: "#a2bf54",
    Philippines: "#a2bf54",
    Singapore: "#a2bf54",
    Thailand: "#a2bf54",
    Vietnam: "#a2bf54",
  };

  const fillColorMapAU = {
    default:"grey",
    Angola: "#21e31e",
    Burundi: "#21e31e",
    Benin: "#21e31e",
    "Burkina Faso": "#dcfa4d",
    Botswana: "#21e31e",
    "Central African Republic": "#21e31e",
    "Ivory Coast": "#21e31e",
    Cameroon: "#21e31e",
    "Democratic Republic of the Congo": "#21e31e",
    "Republic of the Congo": "#21e31e",
    Djibouti: "#21e31e",
    Algeria: "#21e31e",
    Egypt: "#21e31e",
    Eritrea: "#21e31e",
    Ethiopia: "#21e31e",
    Gabon: "#21e31e",
    Ghana: "#21e31e",
    Guinea: "#dcfa4d",
    Gambia: "#21e31e",
    "Guinea Bissau": "#21e31e",
    "Equatorial Guinea": "#21e31e",
    Kenya: "#21e31e",
    Liberia: "#21e31e",
    Libya: "#21e31e",
    Lesotho: "#21e31e",
    Morocco: "#21e31e",
    Madagascar: "#21e31e",
    Mali: "#dcfa4d",
    Mozambique: "#21e31e",
    Mauritania: "#21e31e",
    Malawi: "#21e31e",
    Namibia: "#21e31e",
    Niger: "#21e31e",
    Nigeria: "#21e31e",
    Rwanda: "#21e31e",
    Sudan: "#dcfa4d",
    "South Sudan": "#21e31e",
    Senegal: "#dcfa4d",
    "Sierra Leone": "#21e31e",
    Somaliland: "#21e31e",
    Somalia: "#21e31e",
    Chad: "#21e31e",
    Togo: "#21e31e",
    Tunisia: "#21e31e",
    "United Republic of Tanzania": "#21e31e",
    Uganda: "#21e31e",
    "South Africa": "#21e31e",
    Zambia: "#21e31e",
    Zimbabwe: "#21e31e",
  };

  const fillColorMapNato = {
    Albania: "#0B89C6",
    Belgium: "#0B89C6",
    Bulgaria: "#0B89C6",
    Canada: "#0B89C6",
    Croatia: "#0B89C6",
    Czechia: "#0B89C6",
    Denmark: "#0B89C6",
    Estonia: "#0B89C6",
    Finland: "#0B89C6",
    France: "#0B89C6",
    Germany: "#0B89C6",
    Greece: "#0B89C6",
    Hungary: "#0B89C6",
    Iceland: "#0B89C6",
    Italy: "#0B89C6",
    Latvia: "#0B89C6",
    Lithuania: "#0B89C6",
    Luxembourg: "#0B89C6",
    Montenegro: "#0B89C6",
    Netherlands: "#0B89C6",
    "North Macedonia": "#0B89C6",
    Norway: "#0B89C6",
    Poland: "#0B89C6",
    Portugal: "#0B89C6",
    Romania: "#0B89C6",
    Slovakia: "#0B89C6",
    Slovenia: "#0B89C6",
    Spain: "#0B89C6",
    Türkiye: "#0B89C6",
    "United Kingdom": "#0B89C6",
    "United States of America": "#0B89C6",
  }

  const fillColorMapGCC = {
    Qatar: "#634e20",
    Oman: "#634e20",
    "United Arab Emirates": "#634e20",
    Bahrain: "#634e20",
    Kuwait : "#634e20",
    "Saudi Arabia": "#634e20"
  }

  const fillColorMapOIC = {
    Afghanistan: '#5ECD81',
    Algeria: '#5ECD81',
    Bahrain: '#5ECD81',
    Bangladesh: '#5ECD81',
    Benin: '#5ECD81',
    Brunei: '#5ECD81',
    "Burkina Faso": '#5ECD81',
    Cameroon: '#5ECD81',
    Chad: '#5ECD81',
    Comoros: '#5ECD81',
    Djibouti: '#5ECD81',
    Egypt: '#5ECD81',
    Gabon: '#5ECD81',
    Gambia: '#5ECD81',
    Guinea: '#5ECD81',
    "Guinea Bissau": '#5ECD81',
    Indonesia: '#5ECD81',
    Iran: '#5ECD81',
    Iraq: '#5ECD81',
    Jordan: '#5ECD81',
    Kuwait: '#5ECD81',
    Lebanon: '#5ECD81',
    Libya: '#5ECD81',
    Malaysia: '#5ECD81',
    Maldives: '#5ECD81',
    Mali: '#5ECD81',
    Mauritania: '#5ECD81',
    Morocco: '#5ECD81',
    Niger: '#5ECD81',
    Oman: '#5ECD81',
    Pakistan: '#5ECD81',
    Qatar: '#5ECD81',
    "Saudi Arabia": '#5ECD81',
    Senegal: '#5ECD81',
    "Sierra Leone": '#5ECD81',
    Somalia: '#5ECD81',
    Sudan: '#5ECD81',
    Syria: '#5ECD81',
    Tunisia: '#5ECD81',
    Turkey: '#5ECD81',
    Uganda: '#5ECD81',
    "United Arab Emirates": '#5ECD81',
    Yemen: '#5ECD81',
  }
  const determineFillColorUnion = (geo) => {
    if (selectedUnion === "AU") {
      return fillColorMapAU[geo.properties.name] || fillColorMapAU.default;
    } else if (selectedUnion === "ASEAN") {
      return fillColorMapASEAN[geo.properties.name] || fillColorMapAU.default;
    } else if (selectedUnion === "AL") {
      return fillColorMapAL[geo.properties.name] || fillColorMapAU.default;
    } else if (selectedUnion === "EEU") {
      return fillColorMapEEU[geo.properties.name] || fillColorMapAU.default;
    } else if (selectedUnion === "EU") {
      return fillColorMapEU[geo.properties.name] || fillColorMapAU.default;
    } else if (selectedUnion === "SAARC") {
      return fillColorMapSAARC[geo.properties.name] || fillColorMapAU.default;
    } 
    else if(selectedUnion ==="OIC" ){
      return fillColorMapOIC[geo.properties.name] || fillColorMapAU.default;
    }
    else if(selectedUnion ==="GCC" ){
      return fillColorMapGCC[geo.properties.name] || fillColorMapAU.default;
    }
    else if(selectedUnion ==="NATO" ){
      return fillColorMapNato[geo.properties.name] || fillColorMapAU.default;
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
                <button className="login-btn mt-2 arrow-back-btn-quiz">
                  <TbArrowBackUp size="40px" />
                </button>
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="text-country">
          <p>Country: {content !== "" && <text>{content}</text>}</p>
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
                                fill={determineFillColorUnion(geo)}
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

            <UnionOptions
              setSelectedUnion={ setSelectedUnion}   
           
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default UnionMap;
