import Axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAllContacts = () => {
  const request = Axios.get(baseURL);

  return request.then((response) => response.data);
};

const createContact = (object) => {
  const request = Axios.post(baseURL, object);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  return Axios.delete(`${baseURL}/${id}`);
};

export default {
  getAllContacts,
  createContact,
  deleteContact,
};
