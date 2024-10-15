const Persons = ({ filteredNames }) => {
  return (
    <>
      {filteredNames.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
