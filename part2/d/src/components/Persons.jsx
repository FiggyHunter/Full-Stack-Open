import React from "react";
import "../persons.css";
import contactService from "../services/contactService";

export default function Persons({ searchTerm, persons, setPersons }) {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .deleteContact(id)
        .then(() =>
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          )
        );
    }
  };

  return (
    <>
      {searchTerm === "" &&
        persons.map((person) => (
          <div key={person.id} className="persons">
            <p>
              {person.name} {person.number}
            </p>
            <button onClick={() => handleDelete(person.id, person.name)}>
              Delete
            </button>
          </div>
        ))}
      {searchTerm !== "" &&
        persons
          .filter((person) => {
            if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return person;
            } else return false;
          })
          ?.map((person) => (
            <div key={person.id} className="persons">
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person.id, person.name)}>
                Delete
              </button>
            </div>
          ))}
    </>
  );
}
