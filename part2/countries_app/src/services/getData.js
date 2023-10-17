import axios from "axios";

const COUNTRIES_BASE_URL =
  "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = () => {
  return axios.get(COUNTRIES_BASE_URL).then((response) => {
    return response.data;
  });
};

const weather_api_key = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}`;
  return axios.get(weatherUrl).then((response) => response.data);
};

export default { getCountries, getWeather };
