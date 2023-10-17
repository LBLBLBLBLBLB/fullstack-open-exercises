import Weather from "./Weather";

const CountryDetailed = ({ filteredCountries }) => {
  return (
    <div>
      <h2>{filteredCountries[0].name.common}</h2>
      <div>
        <p>capital {filteredCountries[0].capital}</p>
        <p>area {filteredCountries[0].area}</p>
      </div>
      <div>
        <p>languages</p>
        <ul>
          {filteredCountries[0].languages &&
            Object.values(filteredCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
        </ul>
      </div>
      <img src={filteredCountries[0].flags.png} alt="" />
      <Weather filteredCountries={filteredCountries} />
    </div>
  );
};
export default CountryDetailed;
