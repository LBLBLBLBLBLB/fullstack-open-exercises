import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Persons";

import phonebookServ from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    phonebookServ.getAll().then((newPerson) => {
      setPersons(newPerson);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPersonEntry = {
      id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
      name: newName,
      number: newNumber,
    };

    const isNameAlreadyExists = persons.some(
      (person) =>
        person.name.toLowerCase() === newPersonEntry.name.toLowerCase()
    );

    if (isNameAlreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      if (!newPersonEntry.name || !newPersonEntry.number) {
        alert("add all information");
      } else {
        phonebookServ.create(newPersonEntry).then((newPersEnt) => {
          setPersons([...persons, newPersEnt]);
          setNewName("");
          setNewNumber("");
        });
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchedName(event.target.value);
  };

  const searchPerson = (event) => {
    event.preventDefault();
  };

  const searchedPerson = persons.filter((person) =>
    person.name.toLowerCase().startsWith(searchedName.toLowerCase())
  );

  const deletePerson = (id, name) => {
    const shouldDelete = window.confirm(`Delete ${name}?`);
    if (shouldDelete) {
      phonebookServ.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchPerson={searchPerson} handleSearch={handleSearch} />
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Person
        searchedName={searchedName}
        searchedPerson={searchedPerson}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
