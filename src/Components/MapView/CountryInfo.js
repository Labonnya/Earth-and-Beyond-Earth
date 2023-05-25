import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import Accordion from "react-bootstrap/Accordion";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";

const CountryInfo = (props) => {
  const [geography, setGeography] = useState("");
  const [government, setGovernment] = useState("");
  const [history, setHistory] = useState("");
  const [facts, setFacts] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, [props.country]);

  const fetchTableData = async () => {
    var formattedCountry = props.country;
    if(formattedCountry==="united-states-of-america") {
      formattedCountry = "united-states";
    }
    const response = await fetch(`http://localhost:8000/table-data/${formattedCountry}`);
    const data = await response.json();
    setData(data);
    console.log(data);
  };

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
        setShowModal(true)
      })
      .catch((error) => {
        setHistory("Country not found");
      });
  }, [props.country, props.stateToShow]);

      const handleCloseModal = () => {
        setShowModal(false);
        setData([]);
      };

  return (
    <>
    <Modal show={showModal} onHide={handleCloseModal} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>{props.country}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
          <ReactCountryFlag
          countryCode={props.code}
          svg
          style={{
            width: "20em",
            height: "20em",
          }}
          title={props.code}
          className="flag"
        />{" "}
          </div>
          <hr />
          <div className="row">
              <h5>{props.country} Facts</h5>
              <hr />
              <h6>Geography:</h6>
              <p className="modal-p">{geography}</p>
              <h6>Government:</h6>
              <p className="modal-p">{government}</p>
              <h6>History:</h6>
              <p className="modal-p">{history}</p>
              <h6>General Facts:</h6>
              <p className="modal-p">{data && data.capitals}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CountryInfo;  
