import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ filteredCountries }) => {
  const [weather, setWeather] = useState(null);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    filteredCountries[0].capital
  }&appid=${import.meta.env.VITE_WATHER_KEY}`;

  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setWeather(response.data);
    });
  }, [weatherUrl]);

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
