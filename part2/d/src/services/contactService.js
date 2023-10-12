import Axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = Axios.get(baseURL);

  return request.then((response) => response.data);
};

const create = (object) => {
  const request = Axios.post(baseURL, object);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
};
