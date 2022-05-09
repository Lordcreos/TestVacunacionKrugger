import React from 'react';
import { taskModel } from 'types/taskModel.';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  tasks: taskModel[];
};

function TasksTable({ tasks }: Props) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Evento Vacunación</th>
          <th>Dosis</th>
          <th>Estado</th>
          <th>Fecha Vacunación</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <Link style={{ textDecoration: 'none',color: 'blue'}} to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td>{task.dosis}  ° dosis</td>
            <td>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table> 
  );
}

export default TasksTable;
