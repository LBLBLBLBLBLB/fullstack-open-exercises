import { useState, useEffect } from "react";

import "./index.css";

import Search from "./components/Search";
import Content from "./components/Content";

import apiService from "./services/getData";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    apiService.getCountries().then((returnedCountries) => {
      setCountries(returnedCountries);
    });
  }, []);

  const handleInput = (event) => {
    const value = event.target.value;

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <Search handleInput={handleInput} />
      <Content
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </>
  );
}

export default App;
