import image from "../Images/3d-weather-icon-sun-and-wind-free-png.webp";
import * as React from 'react';
import { Link } from "react-router-dom";
const StartPage = () => {
    return(
        <div className="m-auto text-white text-center">
            <img src={image} alt="my image" className="w-60 h-60 my-6 m-auto"></img>
            <h1 className="text-4xl font-bold m-4">Weather</h1>
            <h2 className="m-4 text-2xl font-medium">ForeCasts</h2>
            <Link to="/Weatherinfo">
            <button className="w-40 h-10 rounded-3xl bg-yellow-500 text-xl font-medium shadow-lime-50">Get Start</button>
            </Link>
        </div>
    )
}
export default StartPage;