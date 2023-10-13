import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
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
      (person) => person.name === newPersonEntry.name
    );

    if (isNameAlreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      if (!newPersonEntry.name || !newPersonEntry.number) {
        alert("add all information");
      } else {
        axios
          .post("http://localhost:3001/persons", newPersonEntry)
          .then((response) => {
            setPersons([...persons, response.data]);
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
