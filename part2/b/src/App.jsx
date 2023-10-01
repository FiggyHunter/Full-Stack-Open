import { useState } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState(""); // meant for controlling the form input element
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
