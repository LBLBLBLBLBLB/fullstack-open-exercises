import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newPersObj) => {
  const request = axios.post(baseUrl, newPersObj);
  const response = await request;
  return response.data;
};

const removePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const updatePerson = async (id, newPersObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersObj);
  const response = await request;
  return response.data;
};

export default { getAll, create, removePerson, updatePerson };
