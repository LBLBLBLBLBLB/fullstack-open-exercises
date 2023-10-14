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
    phonebookServ.getAll().then((updatedPersons) => {
      setPersons(updatedPersons);
    });
  }, []);
  const addName = (event) => {
    event.preventDefault();
    const newPersonEntry = {
      name: newName,
      number: newNumber,
    };

    const isNameAlreadyExists = persons.find(
      (person) =>
        person.name.toLowerCase() === newPersonEntry.name.toLowerCase()
    );

    if (isNameAlreadyExists) {
      const shouldReplaceNum = window.confirm(
        `${isNameAlreadyExists.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (shouldReplaceNum) {
        const updatedPerson = {
          ...isNameAlreadyExists,
          number: newNumber,
        };

        axios
          .put(
            `http://localhost:3001/persons/${isNameAlreadyExists.id}`,
            updatedPerson
          )
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== isNameAlreadyExists.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
          });
        return;
      }
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

  const deletePerson = (id, name) => {
    const shouldDelete = window.confirm(`Delete ${name}?`);
    if (shouldDelete) {
      phonebookServ.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const searchPerson = (event) => {
    event.preventDefault();
  };

  const searchedPerson = persons.filter((person) =>
    person.name.toLowerCase().startsWith(searchedName.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchedName(event.target.value);
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
