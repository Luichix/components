import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function Card() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm to delete your account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    Once you delete your account, it will be deleted permanently, are you sure you want to delete?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="denger" onClick={handleClose}>
      Delete
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default Card