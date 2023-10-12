const Person = ({ searchedName, searchedPerson, persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {searchedName
        ? searchedPerson.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};
export default Person;
