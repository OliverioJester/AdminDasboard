import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../assets/scss/app.scss";

const DeleteConfirmationModal = ({ show, handleClose, handleConfirmDelete }) => {
  return (
    <Modal  show={show} onHide={handleClose} size="sm" aria-labelledby="example-modal-sizes-title-sm" style={{color: 'black'}}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title> 
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
