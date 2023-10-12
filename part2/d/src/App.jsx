import { useEffect, useState } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Axios from "axios";
import contactService from "./services/contactService.js";
import ErrorMessage from "./components/ErrorMessage.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); // meant for controlling the form input element
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentContactId, setCurrentContactId] = useState("");
  const [errorMessage, setErrorMessage] = useState({ message: "", status: "" });

  useEffect(() => {
    contactService.getAllContacts().then((response) => setPersons(response));
  }, []);

  useEffect(() => {
    if (currentContactId !== "") updateNumber();
  }, [currentContactId]);

  const contactExists = () => {
    const foundPerson = persons.find((person) => {
      return person.name === newName;
    });

    if (foundPerson) {
      setCurrentContactId(foundPerson.id);
      return true;
    } else {
      setCurrentContactId("");
      return false;
    }
  };

  const updateNumber = () => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const newObject = {
        id: currentContactId,
        name: newName,
        number: newPhone,
      };

      contactService
        .updateExisting(currentContactId, newObject)
        .then((response) =>
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id.toString() === currentContactId.toString()
                ? response
                : person
            )
          )
        );

      setNewName("");
      setNewPhone("");
      setCurrentContactId("");
      return;
    }
  };

  const createNumber = () => {
    const newObject = {
      name: newName,
      number: newPhone,
    };

    contactService.createContact(newObject).then((response) => {
      setPersons((prevPersons) => prevPersons.concat(response));
      setErrorMessage({
        message: `Added ${response.name} `,
        status: "success",
      });
      setTimeout(() => {
        setErrorMessage({ message: "", status: "" });
      }, 3000);
    });

    setNewName("");
    setNewPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactExists()) return;
    else createNumber();
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
      {errorMessage.message !== "" && (
        <ErrorMessage
          message={errorMessage.message}
          status={errorMessage.status}
        />
      )}
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

      <Persons
        searchTerm={searchTerm}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
