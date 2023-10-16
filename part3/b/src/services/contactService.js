import Axios from "axios";
const baseURL = "https://fso.leotg.com/api/persons";

const getAllContacts = () => {
  const request = Axios.get(baseURL);

  return request.then((response) => response.data);
};

const createContact = (object) => {
  const request = Axios.post(baseURL + "/", object);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  return Axios.delete(`${baseURL}/${id}`);
};

const updateExisting = (id, contactObject) => {
  const request = Axios.put(`${baseURL}/${id}`, contactObject);
  return request.then((response) => response.data);
};

export default {
  getAllContacts,
  createContact,
  deleteContact,
  updateExisting,
};
