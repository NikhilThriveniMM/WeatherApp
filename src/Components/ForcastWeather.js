
import { useState } from "react";

const ForcastWeather = ({ info }) => {
  const [forecastDetails, setForecastDetails] = useState(false);

  const showForecast = () => {
    return setForecastDetails(!forecastDetails)
  }

  if (!info) {
    return <div></div>;
  }

  return (
    <div className="text-center text-white m-5 rounded-2xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <h2 onClick={() => showForecast()} className="font-bold cursor-pointer ">Click for Weather Forecast</h2>
      {
      forecastDetails && info?.list?.map((forecast, index) => ( 
      <div key={index}>
        {(new Date(forecast.dt_txt).toLocaleString().split(",")[1] === ' 12:00:00 AM') ? <div className="m-4"> 
            <p>{new Date(forecast?.dt_txt).toLocaleString().split(",")[0]}</p>
            <p>Temperature: {Math.round((forecast?.main?.temp)/10)} °C</p>
            <p>Weather: {forecast?.weather[0]?.description}</p>
            </div>
        : ""}
      </div>
      ))}
    </div>
  );
};

export default ForcastWeather;