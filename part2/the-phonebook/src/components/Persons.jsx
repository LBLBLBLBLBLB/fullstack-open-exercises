const Persons = ({ filteredNames, handleDelete }) => {
  return (
    <>
      {filteredNames.map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
