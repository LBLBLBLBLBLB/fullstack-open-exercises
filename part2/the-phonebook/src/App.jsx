import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
      number: newNumber,
    };

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const isValidNumber = /^(?!-)(?!.*--)[0-9]+(-[0-9]+)*(?<!-)$/.test(
      newNumber
    );

    if (newName === "" && newNumber === "") {
      alert("fields are empty");
    } else if (newName === "") {
      alert("name field is empty");
    } else if (newNumber === "") {
      alert("number field is empty");
    } else if (!isValidNumber) {
      alert("add valid phone number");
    } else if (personExists) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        personService
          .updatePerson(personExists.id, newPersonObj)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService.create(newPersonObj).then((personObj) => {
        setPersons(persons.concat(personObj));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchedName(event.target.value);
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      personService.removePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} />

      <h2>Add a new:</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />

      <h2>Numbers</h2>
      {persons.length > 0 ? (
        <Persons filteredNames={filteredNames} handleDelete={handleDelete} />
      ) : (
        <p>the phonebook is empty</p>
      )}
    </>
  );
};

export default App;
