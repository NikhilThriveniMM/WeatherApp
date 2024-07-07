import { useState, useEffect } from "react";
import { API_KEY } from "../utils/linkData";
import CurrentWeather from "./CurrentWeather";
import ForcastWeather from "./ForcastWeather";

const WeatherInfo = () => {
  const [location, setLocation] = useState("");
  const [latLonResult, setLatLonResult] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (latLonResult) {
      getWeatherForecast(latLonResult);
      liveWeather(latLonResult);
  }
  }, [latLonResult]);

  const getLatLon = async (location) => {
    try {
      console.log(location)
      const locationLink = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=` + API_KEY
      );
      const data = await locationLink.json();

      if (data.length === 0) {
        setErrorMessage(<h1 className="text-center font-bold text-2xl">"Invalid location name"</h1>);
        setCurrent(null)
        setForecast(null)
        setLatLonResult(null);
        return;
      }

      const lat = await data[0]?.lat;
      const lon = await data[0]?.lon;
      setLatLonResult({ lat, lon });
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching lat/lon:", error);
      setErrorMessage("Error fetching locating data");
    }
  };

  const liveWeather = async (latLonResult) => {
    try {
      const { lat, lon } = latLonResult;
      const weatherInfo = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=` + API_KEY
      );
      const data = await weatherInfo.json();
      setCurrent(data);
    } catch (error) {
      console.error("No location found");
      setErrorMessage("Error fetching current weather data")
    }
  };

  const getWeatherForecast = async (latLonResult) => {
    try {
      const { lat, lon } = latLonResult;
      const weatherInfo = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=` + API_KEY
      );
      const info = await weatherInfo.json();
      setForecast(info);
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      setErrorMessage("Error fetching weather forecast data")
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-10 m-auto w-1/3 h-96 rounded-3xl relative shadow-red-200">
      <div className="p-5">
        <input
          type="text"
          value={location}
          placeholder="location..."
          className="h-8 w-2/3 rounded-md"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 w-20 h-8 rounded-md text-white"
          onClick={() => getLatLon(location)}
        >
          Search
        </button>
      </div>
      {
        errorMessage && (
          <div className="text-red-500 p-5">{errorMessage}</div>
        )
      }
      <div>
        <CurrentWeather info={current} />
        <ForcastWeather info={forecast} />
      </div>
    </div>
  );
};

export default WeatherInfo;

