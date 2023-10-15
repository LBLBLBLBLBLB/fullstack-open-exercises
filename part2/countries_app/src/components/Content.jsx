import {} from "react";

const Content = ({ filteredCountries }) => {
  return (
    <div>
      {filteredCountries.length === 1 ? (
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
      ) : filteredCountries.length <= 10 ? (
        filteredCountries.map((country) => {
          return (
            <div key={country.ccn3}>
              {country.name.common}
              <button>show</button>
            </div>
          );
        })
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length === 0 && <p>No matches found.</p>}
    </div>
  );
};
export default Content;
