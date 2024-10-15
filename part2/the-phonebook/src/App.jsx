import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

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
      <Persons filteredNames={filteredNames} />
    </>
  );
};

export default App;
