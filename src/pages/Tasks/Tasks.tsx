/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import Layout from 'components/layout/Layout';
import { Row, Spinner } from 'react-bootstrap';
import { taskModel } from 'types/taskModel.';
import { getTasksByUserId } from 'components/api/tasks';
import { AuthContext } from 'components/context/authContext';
import TasksTables from 'components/domain/Tasks';
import AddTaskModal from 'components/domain/Tasks/AddTaskModal';

function Tasks() {
  const [tasks, setTasks] = useState<taskModel[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const loadTasks = async () => {
    setLoading(true);
    if (user) {
      const res = await getTasksByUserId(user?.id);
      setTasks(res);
    }
    setLoading(false); 
  };

  const addTask = (task: taskModel) => {
    setTasks([task, ...tasks]);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Layout>
      <h2 style={{ margin: '1.5rem 0' }}>
        Vacunación: <AddTaskModal onAdd={addTask} />
      </h2>
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      ) : (
        tasks && tasks.length > 0 && <TasksTables tasks={tasks} />
      )}
    </Layout>
  );
}

export default Tasks;
