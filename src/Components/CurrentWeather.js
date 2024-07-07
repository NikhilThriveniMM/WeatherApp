import clouds from "../Images/Clouds.png.webp"
import rain from "../Images/heavy_rainwebp.webp"
import drizzling from "../Images/drizzling-7194558-6067842.png"
import thunder from "../Images/thunderstorm-rain-8874699-7322760.webp"

const CurrentWeather = ({ info }) => {
    // console.log({info})
  if (!info) {
    return <div></div>;
  }

  return (
    <div className="text-center text-white my-3">
      <h2 className="font-bold">{info?.name}</h2>
      <p className="font-bold">Today</p>
      <p className="my-2">Temperature: {Math.round((info?.main?.temp)/10)} °C</p>
      <p>Weather: {info?.weather[0]?.description }</p>
      <p>Wind Speed: {(info?.wind?.speed)} km/h</p>
      <p>
        {(info?.weather[0]?.main === 'Thunder') ? <img src={thunder} alt="img" className="h-36 w-3/4 m-auto my-1"></img>:(info?.weather[0]?.main == 'Rain')?<img src={rain} alt="img" className="h-36 w-3/4 m-auto my-1"></img>:(info?.weather[0]?.main == 'Drizzling')?<img src={drizzling} alt="img" className="h-36 w-3/4 m-auto my-1"></img>:<img src={clouds} alt="img" className="h-36 w-3/4 m-auto my-1"></img>}
      </p>
    </div>
  );
};

export default CurrentWeather;