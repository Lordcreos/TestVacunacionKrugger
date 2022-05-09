/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import { Row, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from 'components/context/authContext';
import { taskModel } from 'types/taskModel.';
import { getTaskById, editTask, deleteTask } from 'components/api/tasks';
import TaskDetails from 'components/domain/Tasks/TaskDetails';

type Props = RouteComponentProps<{ id: string }>;

function Task({ match }: Props) {
  const [task, setTask] = useState<taskModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const loadTask = async () => { 
    setLoading(true);
    setError(null);
    try {
      const res = await getTaskById(match.params.id);
      setTask(res);
    } catch (err) {
      setError(err.response.statusText);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTask();
  }, []);

  const context = useContext(AuthContext);
  const history = useHistory();

  const saveChanges = async (data: taskModel) => {
    setActionLoading(true);
    try {
      await editTask(data);
      history.goBack();
    } catch (err) {
      setError(err.response.statusText);
    }
    setActionLoading(false);
  };

  const deleteCurrentTask = async (taskId: number) => {
    setActionLoading(true);
    try {
      await deleteTask(taskId);
      history.goBack();
    } catch (err) {
      //   setError(err.response.statusText);
    }
    setActionLoading(false);
  };

  if (context.user?.isAdmin !== true && context.user?.id !== task?.userId) {
    return (
      <Layout>
        <Row className="justify-content-center">
          Acceso Restringido para Administrador
        </Row>
        <Row className="justify-content-center">
          El Evento sera marcado como completado por el Adminitrador una ves recibida la  dosis de vacuna
        </Row>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        {loading && (
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        )}
        {error && (
          <Row className="justify-content-center">
            <Alert variant="danger">{error}</Alert>
          </Row>
        )}
        {task && (
          <TaskDetails
            task={task}
            actionLoading={actionLoading}
            saveChanges={saveChanges}
            deleteCurrentTask={deleteCurrentTask}
          />
        )}
      </Layout>
    </>
  );
}

export default Task;
