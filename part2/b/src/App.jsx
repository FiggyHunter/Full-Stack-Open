import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState(""); // meant for controlling the form input element

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
    const newArray = persons.concat({ name: newName });
    setPersons(newArray);
    setNewName("");
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}> {person.name} </p>
      ))}
    </div>
  );
};

export default App;
