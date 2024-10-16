import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [notification, setNotification] = useState(null);

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
      alert("Fields are empty");
    } else if (newName === "") {
      alert("Name field is empty");
    } else if (newNumber === "") {
      alert("Number field is empty");
    } else if (!isValidNumber) {
      alert("Add a valid phone number");
    } else if (personExists) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
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
            setNotification({
              message: `Updated ${newName}'s number`,
              type: "success",
            });
            setTimeout(() => setNotification(null), 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setNotification({
              message: `Error: ${newName} was already removed from the server`,
              type: "error",
            });
            setTimeout(() => setNotification(null), 5000);
            setPersons(
              persons.filter((person) => person.id !== personExists.id)
            );
          });
      }
    } else {
      personService.create(newPersonObj).then((personObj) => {
        setPersons(persons.concat(personObj));
        setNotification({ message: `Added ${newName}`, type: "success" });
        setTimeout(() => setNotification(null), 5000);
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

  const handleDeleteChange = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ message: `Deleted ${name}`, type: "success" });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(() => {
          setNotification({
            message: `Error: ${name} was already removed from the server`,
            type: "error",
          });
          setTimeout(() => setNotification(null), 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        <Persons
          filteredNames={filteredNames}
          handleDelete={handleDeleteChange}
        />
      ) : (
        <p>The phonebook is empty</p>
      )}
    </>
  );
};

export default App;
