import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import "./MapLegend.css";
import {BsFillSquareFill} from "react-icons/bs"

const MapLegend = () => {

  return (
    <Accordion style={{
      width: "190px"
    }}>
      <Accordion.Item eventKey="0" style={{
          backgroundColor: "#36558F",
          color: "white",
        }}>
        <Accordion.Header>Asia</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}>
          <BsFillSquareFill className="mx-2" style={{
            fill: "rgb(64,222,136)",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Central Asia  <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#acde4e",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Eastern Asia  <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#9ecc21",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>South-Eastern Asia <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#FFD447",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Southern Asia <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#EEF36A",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Western Asia<br></br>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Europe</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#d8d1ed",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Eastern Europe <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#f2ae99",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Northern Europe <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#fc32a2",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Southern Europe <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#ed4254",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Western Europe <br></br>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>America</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#FF7B9C",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>North America <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#d9c0b6",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>South America <br></br>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Africa</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",  
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#fab95f",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Northern Africa <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#EEF36A",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Eastern Africa <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#b3e077",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Middle Africa <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#21e31e",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Southern Africa <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#f77834",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Western Africa <br></br>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Oceania & Rest</Accordion.Header>
        <Accordion.Body style={{
          textAlign: "left",
          background: "rgb(4,51,75)",
          background: "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",    
          color: "white",
          fontWeight: "500",
          fontSize: "13px"
        }}>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#E9DF00",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Australia <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#69DC9E",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Melanesia <br></br>
          <BsFillSquareFill className="mx-2" style={{
            fill: "#FFFCF9",
            stroke: "#56494C",
            strokeWidth: "1"
          }}/>Antarctica <br></br>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default MapLegend;
