import { useEffect, useState } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); // meant for controlling the form input element
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/persons").then(({ data }) => {
      setPersons(data);
    });
  }, []);

  const contactExists = () => {
    if (persons.find((person) => person.name === newName)) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactExists()) {
      window.alert(`${newName} is already added to phonebook!`);
      return;
    }
    const newArray = persons.concat({ name: newName, phone: newPhone });
    setPersons(newArray);
    setNewName("");
    setNewPhone("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <h2>Add a new contact:</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleSearchTerm={handleSearchTerm}
      />
      <h2>Numbers</h2>

      <Persons searchTerm={searchTerm} persons={persons} />
    </div>
  );
};

export default App;
