const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <h3>add new name</h3>
      <form onSubmit={addName}>
        <div>
          <label>name</label>
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>number</label>
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
export default PersonForm;
