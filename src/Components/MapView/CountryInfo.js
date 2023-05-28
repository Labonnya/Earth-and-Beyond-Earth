import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import ReactCountryFlag from "react-country-flag";
import axios from "axios";

const CountryInfo = (props) => {
  const [geography, setGeography] = useState("");
  const [government, setGovernment] = useState("");
  const [history, setHistory] = useState("");
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
        if(response.data){
          setShowModal(true)
        }
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
            <div className="col-6">
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
            <div className="col-6">
              <h5>General Facts:</h5>
              <hr></hr>
              <p className="modal-p">Capital: <span className="light-p">{data && data.capitals}</span></p>
              <p className="modal-p">Languages: <span className="light-p">{data && data.language}</span></p>
              <p className="modal-p">Currency: <span className="light-p">{data && data.currency}</span></p>
              <p className="modal-p">Religion: <span className="light-p">{data && data.religion}</span></p>
            </div>
          </div>
          <hr />
          <div className="row">
              <h5>Know more about {props.country}... </h5>
              <hr />
              <br></br>
              {geography && (
    <>
      <h5>Geography:</h5>
      <p className="modal-p"><span className="light-pq">{geography}</span></p>
    </>
  )}
  <br></br><hr></hr><br></br>
              {government && (
    <>
      <h5>Government:</h5>
      <p className="modal-p"><span className="light-pq">{government}</span></p>
    </>
  )}
  <br></br><hr></hr><br></br>
  {history && (
    <>
      <h5>History:</h5>
      <p className="modal-p"><span className="light-pq">{history}</span></p>
    </>
  )}
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
