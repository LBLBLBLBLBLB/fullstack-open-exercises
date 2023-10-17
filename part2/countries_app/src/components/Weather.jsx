import { useState, useEffect } from "react";

import apiService from "../services/getData";

const Weather = ({ filteredCountries }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    apiService
      .getWeather(filteredCountries[0].capital)
      .then((returnedWeather) => {
        setWeather(returnedWeather);
      });
  }, [filteredCountries]);

  const kelvinToCels = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div>
      <h2>Weather in {filteredCountries[0].capital}</h2>
      {weather && (
        <div>
          <p>Temperature: {kelvinToCels(weather.main.temp)} celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};
export default Weather;
