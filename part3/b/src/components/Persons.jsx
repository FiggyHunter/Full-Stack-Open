import React from "react";
import "../persons.css";
import contactService from "../services/contactService";

export default function Persons({
  searchTerm,
  persons,
  setPersons,
  setErrorMessage,
}) {
  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .deleteContact(id)

        .then(() =>
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          )
        )
        .catch(() => {
          setErrorMessage({
            message: "The user has already been deleted from the server!",
            status: "error",
          });
          setTimeout(() => {
            setErrorMessage({
              message: "",
              status: "",
            });
          }, 3000);
        });
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
