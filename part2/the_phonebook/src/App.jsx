import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

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
      (person) => person.name === newPersonEntry.name
    );

    if (isNameAlreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      if (!newPersonEntry.name || !newPersonEntry.number) {
        alert("add all information");
      } else {
        setPersons([...persons, newPersonEntry]);
        setNewName("");
        setNewNumber("");
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
    person.name.toLowerCase().includes(searchedName.toLowerCase())
  );

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
      />
    </div>
  );
};

export default App;
