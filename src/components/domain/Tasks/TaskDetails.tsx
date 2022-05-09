import React, { useState } from 'react';
import { taskModel } from 'types/taskModel.';
import { Formik, Field } from 'formik';
import {
  Spinner,
  Button,
  FormGroup,
  FormLabel,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Task.module.css';

type Props = {
  task: taskModel;
  actionLoading: boolean;
  saveChanges: (data: taskModel) => void;
  deleteCurrentTask: (taskId: number) => void;
}; 

function TaskDetails({
  task,
  actionLoading,
  deleteCurrentTask,
  saveChanges,
}: Props) {
  const [defaultTask] = useState<taskModel | null>(task);
  const history = useHistory();
  return (
    <Formik initialValues={task} onSubmit={(values) => saveChanges(values)}>
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.heading}>
            <div>
              <h2>Detalle Evento Vacunación</h2>
            </div>
            <div className={styles.buttonsWrapper}>
              {actionLoading && <Spinner animation="border" />}
              <Button variant="dark" onClick={() => history.goBack()}>
                Atras
              </Button>{' '}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">Despues de guardar sera redirecionado</Tooltip>
                }
              >
                <Button
                  className={values === defaultTask ? styles.btnDisabled : ''}
                  variant={values === defaultTask ? 'dark' : 'success'}
                  type="submit"
                  disabled={values === defaultTask}
                >
                  Guardar Cambios
                </Button>
              </OverlayTrigger>{' '}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">No se podrá recusperar el evento </Tooltip>
                }
              >
                <Button
                  variant="danger"
                  onClick={() => deleteCurrentTask(values.id)}
                >
                  Eliminar
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          <div style={{ maxWidth: '500px' }}>
            <FormGroup>
              <FormLabel htmlFor="title">Titulo</FormLabel>
              <Field
                type="text"
                name="title"
                className="form-control"
                placeholder="Añada el Titulo"
                min={0}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Field
                type="text"
                name="description"
                className="form-control"
                placeholder="Añada Descrición"
                min={0}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor=" dosis">Dosis</FormLabel>
              <Field
                type="number"
                name="dosis"
                className="form-control"
                placeholder="Ingrese el numero de dosis"
                min={0}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="status">Estado</FormLabel>
              <Field
                as="select"
                name="status"
                className="form-control"
                placeholder="Select status for task"
                defaultValue={`${values.status}`}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue('status', e.target.value)
                }
                required
              >
                <option value="Esperando">Esperando</option>
                <option value="Lista">Lista</option>
              </Field>
            </FormGroup>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default TaskDetails;
