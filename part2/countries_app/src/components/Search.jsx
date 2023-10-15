const Search = ({ handleInput }) => {
  return (
    <div>
      <label>find countries</label>
      <input type="text" onChange={handleInput} />
    </div>
  );
};
export default Search;
