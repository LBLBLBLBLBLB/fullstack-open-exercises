const Filter = ({ searchPerson, handleSearch }) => {
  return (
    <>
      <form onChange={searchPerson}>
        <label>filter shown with</label>
        <input onChange={handleSearch} />
      </form>
    </>
  );
};

export default Filter;
