const CountryDetailed = ({ filteredCountries }) => {
  return (
    <div>
      <h2>{filteredCountries[0].name.common}</h2>
      <div></div>
      <div>
        <p>languages</p>
        <ul>
          {Object.values(filteredCountries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={filteredCountries[0].flags.png} alt="" />
    </div>
  );
};
export default CountryDetailed;
