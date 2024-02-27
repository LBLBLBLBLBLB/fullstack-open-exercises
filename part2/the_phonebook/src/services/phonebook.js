import axios from "axios";

const BASE_URL = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((response) => {
    return response.data;
  });
};

const create = (newPersEntry) => {
  return axios.post(BASE_URL, newPersEntry).then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/${id}`).then(() => {
    return;
  });
};

export default { getAll, create, deletePerson };

// const update = (id, newPersEntry) => {
//   return axios.put(`${BASE_URL}/${id}`, newPersEntry).then((response) => {
//     response.data;
//   });
// };
