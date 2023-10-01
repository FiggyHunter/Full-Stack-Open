import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "323-3334-212" },
  ]);
  const [newName, setNewName] = useState(""); // meant for controlling the form input element
  const [newPhone, setNewPhone] = useState("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}{" "}
        </p>
      ))}
    </div>
  );
};

export default App;
