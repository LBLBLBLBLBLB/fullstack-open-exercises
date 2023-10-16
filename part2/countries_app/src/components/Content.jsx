import {} from "react";
import CountryDetailed from "./Country";

const Content = ({ filteredCountries }) => {
  const showFullInfo = () => {
    return <CountryDetailed filteredCountries={filteredCountries} />;
  };

  return (
    <div>
      {filteredCountries.length === 1 ? (
        <CountryDetailed filteredCountries={filteredCountries} />
      ) : filteredCountries.length <= 10 ? (
        filteredCountries.map((country) => {
          return (
            <div key={country.ccn3}>
              {country.name.common}
              <button onClick={showFullInfo}>show</button>
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
