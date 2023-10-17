import { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

import Search from "./components/Search";
import Content from "./components/Content";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios.get(countriesUrl).then((response) => {
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
      <Content
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </>
  );
}

export default App;
