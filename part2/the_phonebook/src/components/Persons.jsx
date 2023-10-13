const Person = ({ searchedName, searchedPerson, persons, deletePerson }) => {
  const peopleToDisplay = searchedName ? searchedPerson : persons;

  return (
    <>
      <h2>Numbers</h2>
      {peopleToDisplay.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};
export default Person;
