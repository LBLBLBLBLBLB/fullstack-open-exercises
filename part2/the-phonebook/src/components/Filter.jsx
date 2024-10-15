const Filter = ({ handleSearchChange }) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
