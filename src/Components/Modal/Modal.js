import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ModalView = (props) => {
    console.log("hell")
    const handleClose = () => {
        props.show = false;
    }
  return (
    <div>
    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.country}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalView
