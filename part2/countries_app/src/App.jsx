import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import Content from "./components/Content";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
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
      <Content filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
