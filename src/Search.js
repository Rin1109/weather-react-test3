import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import ReactAnimatedWeather from "react-animated-weather";


export default function Search() {
   const [city, setCity] = useState("");
   const [loaded, setLoaded] = useState(false);
   const [weather, setWeather] = useState({});

   const defaults = {
      icon: 'CLEAR_DAY',
      color: 'goldenrod',
      size: 48,
      animate: true
   };

   let weatherData = {
      city: "London",
      temperature: 20,
      date: "Tuesday 10:00",
      description: "Sunny",
      imgUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      humidity: 80,
      wind: 10
      };

   function displayWeather(response) {
      setLoaded(true);
      setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${
         response.data.weather[0].icon
      }@2x.png`,
      description: response.data.weather[0].description
      });
   }

   function handleSubmit(event) {
      event.preventDefault();
      let apiKey = "094780c710fa4efd669f0df8c3991927";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeather);
   }

   function updateCity(event) {
      setCity(event.target.value);
   }

   let form = (
      <form onSubmit={handleSubmit}>
         <div className="row">
            <div className="col-9">
               <input type="search" class="form-control" placeholder="Enter a city.." onChange={updateCity} />
            </div>
            <div className="col-3">
               <button type="Submit" className="btn btn-primary">Search</button>
            </div>
         </div>
      </form>
   );

   if (loaded) {
      return (
      <div>
            {form}
               <div className="overview mt-3">
                  <h1>{city}</h1>
                     <strong>{weather.description}</strong>
            </div>
               <div className="row">
               <div className="col-6">
                  <div className="clearfix weather-temperature">
                     <div className="float-left">
                        <img src={weather.icon} alt={weather.description} />
                        <strong className="temp">{Math.round(weather.temperature)}</strong>
                        <span className="units">°C</span>
                  </div>
               </div>
               </div>
               <div className="col-6">
               <ul>
                  <li>Humidity: {weather.humidity}%</li>
                     <li>Wind: {weather.wind} km/h</li>
               </ul>
               </div>
         </div>
      </div>
      );
   } else {
      return (
         <div>
            {form}
            <div className="overview mt-3">
               <h1>{weatherData.city}</h1>
               <strong>{weatherData.description}</strong>
            </div>
            <div className="row">
               <div className="col-6">
               <div className="clearfix weather-temperature">
                     <div className="float-left">
                     <ReactAnimatedWeather
                     icon={defaults.icon}
                     color={defaults.color}
                     size={defaults.size}
                     animate={defaults.animate}
                        />
                     <strong className="temp">{weatherData.temperature}</strong>
                     <span className="units">°C</span>
                  </div>
               </div>
               </div>
               <div className="col-6">
               <ul>
                  <li>Humidity: {weatherData.humidity}%</li>
                  <li>Wind: {weatherData.wind} km/h</li>
               </ul>
               </div>
            </div>
         </div>
         );
   }
}
