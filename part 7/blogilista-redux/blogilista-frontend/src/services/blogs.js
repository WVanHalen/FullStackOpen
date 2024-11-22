import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/:id/comments`);
  return response.data;
};

const addComment = async (id, content) => {
  const comment = { content, id: (1000 * Math.random()).toFixed(0) };
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
  getComments,
  addComment,
};
