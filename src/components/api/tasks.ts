import axios from 'axios';
import { taskModel } from 'types/taskModel.';

const REACT_APP_API_URL = 'http://localhost:3005';
 
export const getTasksByUserId = async (
  userId: number
): Promise<taskModel[]> => {
  const res = await axios.get(`${REACT_APP_API_URL}/tasks?userId=${userId}`);
  return res.data;
};

export const getTaskById = async (taskId: string): Promise<taskModel> => {
  const res = await axios.get(`${REACT_APP_API_URL}/tasks/${taskId}`);
  return res.data;
};

export const addTask = async (task: taskModel): Promise<taskModel> => {
  const res = await axios.post(`${REACT_APP_API_URL}/tasks/`, task);
  return res.data;
};

export const editTask = async (data: taskModel): Promise<void> => {
  await axios.put(`${REACT_APP_API_URL}/tasks/${data.id}`, data);
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${REACT_APP_API_URL}/tasks/${taskId}`);
};
