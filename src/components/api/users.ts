import axios from 'axios';
import { userModel } from 'types/userModel';

const REACT_APP_API_URL= 'http://localhost:3005';

export type LoginModel = {
  email: string;
  password: string;
};
 
export const getUsers = async (): Promise<userModel[]> => {
  const res = await axios.get(`${REACT_APP_API_URL}/users`);
  return res.data;
};

export const getUserById = async (userId: string): Promise<userModel> => {
  const res = await axios.get(`${REACT_APP_API_URL}/users/${userId}`);
  return res.data;
};

export const editUser = async (data: userModel): Promise<void> => {
  await axios.put(`${REACT_APP_API_URL}/users/${data.id}`, data);
};

export const addUser = async (data: userModel): Promise<userModel> => {
  const users = await getUsers();
  const existEmail = users.find((x) => x.email === data.email);
  const existCi = users.find((x) => x.ci === data.ci);
  if (existEmail) {
    throw new Error('Email ya registrado');
  } else if
  (existCi) {
    throw new Error('Cedula Ya registrada');
  }
  
  else {
    const res = await axios.post(`${REACT_APP_API_URL}/users/`, data);
    console.log(existCi)

    return res.data;
    
  }
};


export const login = async (data: LoginModel): Promise<userModel> => {
  const users = await getUsers();

  const loggedUser = users.find(
    (x) =>
      x.email === data.email && x.password.toString() === data.password
  );
  if (loggedUser) {
    loggedUser.isActive = true;
    await editUser(loggedUser);
    return loggedUser;
  }
  throw new Error('Usuario o contraseña incorrectos');
};

export const getMe = (): userModel | null => {
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

export const logout = async (data: userModel): Promise<void> => {
  // eslint-disable-next-line no-param-reassign
  data.isActive = false;
  await editUser(data);
  await localStorage.removeItem('loggedUser');
};

export const register = async (data: userModel): Promise<userModel> => {
  const users = await getUsers();
  const existEmail = users.find((x) => x.email === data.email);
  const existCi = users.find((x) => x.ci === data.ci);
  if (existEmail) {
    throw new Error('Usuario ya registrado');
  } else if
  (existCi) {
    throw new Error('Cedula Ya registrada');
  }
  
  else {
    const res = await axios.post(`${REACT_APP_API_URL}/users/`, data);
    console.log(existCi)

    return res.data;
    
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${REACT_APP_API_URL}/users/${userId}`);
};
