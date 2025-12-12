// src/components/ConfirmPopup.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmPopup = ({ show, onClose, title = "Added to cart", message = "Item added to your cart." }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ margin: 0 }}>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Continue shopping</Button>
        <Button variant="primary" onClick={() => { onClose(); /* optionally navigate to cart */ }}>Go to cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPopup;  
