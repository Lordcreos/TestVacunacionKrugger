import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormGroup,
  FormLabel,
  Row,
  Alert,
} from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { AuthContext } from 'components/context/authContext';
import { taskModel } from 'types/taskModel.';
import { addTask } from 'components/api/tasks';

type Props = {
  data?: taskModel;
  onAdd: (updatedData: taskModel) => void;
};

function AddTaskModal({ onAdd }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Añadir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Formik<taskModel>
          initialValues={{
            id: 0,
            userId: user?.id,
            title: '',
            description: '',
            dosis: 0,
            status: 'Esperando',
            createdAt: new Date(),
          }}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await addTask(values);
              onAdd(values);
              handleClose();
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir Vacunación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <FormLabel htmlFor="title">Titulo </FormLabel>
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Añada el Titulo"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="description">Descripción</FormLabel>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Añada Description"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="dosis">Numero de Dosis</FormLabel>
                  <Field
                    type="number"
                    name="dosis"
                    className="form-control"
                    placeholder="Numero de Dosis"
                    min={0}
                    max={10}
                    required
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={loading}
                >
                  {loading ? 'Por favor espere ' : 'Añadir'}
                </Button>
              </Modal.Footer>
              {error && (
                <Row className="justify-content-center">
                  <Alert variant="danger">{error}</Alert>
                </Row>
              )}
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AddTaskModal;
