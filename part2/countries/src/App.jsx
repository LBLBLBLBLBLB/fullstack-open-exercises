import CountryDetailed from "./components/CountryDetailed";
import Search from "./components/Search";
import CountryList from "./components/CountryList";

import { useState, useEffect } from "react";

import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searched, setSearched] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countryData) => setCountries(countryData));
  }, []);

  const handleSearch = (event) => {
    setSearched(event.target.value);
    setSelectedCountry(null);
  };

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const searchedCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <>
      <Search handleSearch={handleSearch} />
      {searched && (
        <div>
          {selectedCountry ? (
            <CountryDetailed
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          ) : searchedCountry.length === 1 ? (
            <CountryDetailed
              selectedCountry={searchedCountry[0]}
              setSelectedCountry={setSelectedCountry}
              showBackButton={false}
            />
          ) : searchedCountry.length === 0 ? (
            <p>No matches found</p>
          ) : searchedCountry.length < 11 ? (
            searchedCountry.map((country) => (
              <CountryList
                key={country.cca3}
                country={country}
                handleShow={handleShow}
              />
            ))
          ) : (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
    </>
  );
};

export default App;
