import {} from "react";
import CountryDetailed from "./Country";

const Content = ({ filteredCountries, setFilteredCountries }) => {
  return (
    <div>
      {filteredCountries.length === 0 && <p>No data</p>}
      {filteredCountries.length === 1 ? (
        <CountryDetailed filteredCountries={filteredCountries} />
      ) : filteredCountries.length <= 10 ? (
        filteredCountries.map((country) => {
          return (
            <div key={country.ccn3}>
              {country.name.common}
              <button
                onClick={() => {
                  console.log(country);
                  setFilteredCountries([country]);
                }}
              >
                show
              </button>
            </div>
          );
        })
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};
export default Content;
