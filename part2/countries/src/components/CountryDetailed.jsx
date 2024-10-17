import { useState, useEffect } from "react";

import countriesService from "../services/countries";

const CountryDetailed = ({
  selectedCountry,
  setSelectedCountry,
  showBackButton = true,
}) => {
  const weatherImg = { backgroundColor: "lightgray" };

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await countriesService.getWeather(
          selectedCountry.capital[0]
        );
        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [selectedCountry]);

  const backToList = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      {showBackButton && <button onClick={backToList}>Back</button>}
      <h2>{selectedCountry.name.common}</h2>
      <p>capital: {selectedCountry.capital}</p>
      <p>area: {selectedCountry.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(selectedCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />

      {weather ? (
        <div>
          <p>
            <strong>Weather in {selectedCountry.capital}</strong>
          </p>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            style={weatherImg}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryDetailed;
