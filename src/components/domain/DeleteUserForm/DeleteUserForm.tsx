import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from 'components/api/users';
import { useHistory } from 'react-router-dom';

type Props = {
  userId: number;
};

function DeleteUserForm({ userId }: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  return ( 
    <>
      <Button variant="danger" onClick={handleShow}>
        Borrar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de eliminar la cuenta?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteUser(userId);
              history.push('/users');
            }}
          >
            Si
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUserForm;
