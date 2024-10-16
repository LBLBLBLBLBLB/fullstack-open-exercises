import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
      number: newNumber,
      id: persons.length + 1,
    };

    const personExists = persons.find((person) => person.name === newName);
    const isValidNumber = /^(?!-)(?!.*--)[0-9]+(-[0-9]+)*(?<!-)$/.test(
      newNumber
    );

    if (personExists) {
      alert(`${newName} is already in phonebook`);
    } else if (newName === "" && newNumber === "") {
      alert("fields are empty");
    } else if (newName === "") {
      alert("name field is empty");
    } else if (newNumber === "") {
      alert("number field is empty");
    } else if (!isValidNumber) {
      alert("add valid phone number");
    } else {
      setPersons(persons.concat(newPersonObj));
      setNewName("");
      setNewNumber("");
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
        <Persons filteredNames={filteredNames} />
      ) : (
        <p>the phonebook is empty</p>
      )}
    </>
  );
};

export default App;
