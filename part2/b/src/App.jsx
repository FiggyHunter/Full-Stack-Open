import { useState } from "react";

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
      <div>
        filter shown with:{" "}
        <input value={searchTerm} onChange={handleSearchTerm} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {searchTerm === "" &&
        persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.phone}{" "}
          </p>
        ))}

      {searchTerm !== "" &&
        persons
          .filter((person) => {
            if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return person;
            } else return false;
          })
          ?.map((person) => (
            <p key={person.name}>
              {person.name} {person.phone}{" "}
            </p>
          ))}
    </div>
  );
};

export default App;
