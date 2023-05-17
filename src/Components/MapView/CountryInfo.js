import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

const CountryInfo = (props) => {
  const [geography, setGeography] = useState("");
  const [government, setGovernment] = useState("");
  const [history, setHistory] = useState("");
  const [facts, setFacts] = useState("");

  useEffect(() => {
    var formattedCountry = props.country.replace(/\s+/g, "-").toLowerCase();
    if(formattedCountry==="united-states-of-america") {
      formattedCountry = "united-states";
    }
    console.log(formattedCountry);
    axios
      .get(`http://127.0.0.1:8000/country/${formattedCountry}`)
      .then((response) => {
        console.log(response.data);
        setGeography(response.data.geography);
        setGovernment(response.data.government);
        setHistory(response.data.history);
        setFacts(response.data.general_facts);
      })
      .catch((error) => {
        setHistory("Country not found");
      });
  }, [props.country]);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{props.country}</Accordion.Header>
        <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Geography</Accordion.Header>
              <Accordion.Body
                style={{
                  textAlign: "left",
                  background: "rgb(4,51,75)",
                  background:
                    "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                {geography}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Government</Accordion.Header>
              <Accordion.Body
                style={{
                  textAlign: "left",
                  background: "rgb(4,51,75)",
                  background:
                    "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                {government}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>History</Accordion.Header>
              <Accordion.Body
                style={{
                  textAlign: "left",
                  background: "rgb(4,51,75)",
                  background:
                    "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                {history}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>General Facts</Accordion.Header>
              <Accordion.Body
                style={{
                  textAlign: "left",
                  background: "rgb(4,51,75)",
                  background:
                    "radial-gradient(circle, rgba(4,51,75,1) 0%, rgba(0,0,0,1) 100%)",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                {facts}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CountryInfo;
