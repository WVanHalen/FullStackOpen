import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  axios.delete(`${baseURL}/${id}`);
};

const update = (newObject) => {
  const request = axios.put(`${baseURL}/${newObject.id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
