import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Search() {
   const [city, setCity] = useState("");
   const [loaded, setLoaded] = useState(false);
   const [weather, setWeather] = useState({});

   let weatherData = {
      city: "New York",
      temperature: 19,
      date: "Tuesday 10:00",
      description: "Cloudy",
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
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
      </form>
   );

   if (loaded) {
      return (
      <div>
            {form}
               <div className="overview">
                  <h1>{city}</h1>
                     <ul>
                        <li>Last updated: </li>
                        <li>{weather.description}</li>
                     </ul>
            </div>
               <div className="row">
               <div className="col-6">
                  <div className="clearfix weather-temperature">
                  <img src={weather.icon} alt={weather.description} />
                  <div className="float-left">
                        <strong>{Math.round(weather.temperature)}</strong>
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
            <div className="overview">
               <h1>{weatherData.city}</h1>
               <ul>
               <li>Last updated: {weatherData.date}</li>
               <li>{weatherData.description}</li>
               </ul>
            </div>
            <div className="row">
               <div className="col-6">
               <div className="clearfix weather-temperature">
                  <img
                     src={weatherData.imgUrl}
                     alt={weatherData.description}
                     className="float-left"
                  />
                  <div className="float-left">
                     <strong>{weatherData.temperature}</strong>
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
