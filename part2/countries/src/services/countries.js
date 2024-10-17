import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const api_key = import.meta.env.VITE_SOME_KEY;

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const getWeather = async (capital) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  );
  return response.data;
};

export default { getAll, getWeather };
