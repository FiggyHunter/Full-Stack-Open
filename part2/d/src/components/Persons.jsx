import React from "react";

export default function Persons({ searchTerm, persons }) {
  return (
    <>
      {searchTerm === "" &&
        persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
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
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}{" "}
    </>
  );
}
