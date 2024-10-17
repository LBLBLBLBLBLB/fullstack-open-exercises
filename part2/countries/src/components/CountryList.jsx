const CountryList = ({ country, handleShow }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={() => handleShow(country)}>Show</button>
    </div>
  );
};

export default CountryList;
