import React, { useEffect, useState } from 'react';
import './cityweather.css';

const API_KEY = '903cf57c1c944ca683273344251304'; // Your API key
const API_URL = 'http://api.weatherapi.com/v1/current.json';

const CityWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Make the API request to fetch weather data for Dire Dawa
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=Dire+Dawa`);
        const data = await response.json();

        if (data.error) {
          console.error("API error:", data.error.message);
        } else {
          setWeather(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Show loading message while fetching data
  if (loading) return <div className="city-weather">Loading...</div>;
  
  // Show message if no weather data is available
  if (!weather) return <div className="city-weather">No data available</div>;

  return (
    <div className="city-weather">
      <h3>{weather.location.name}, {weather.location.country}</h3>
      <div className="weather-info">
        <img 
          src={`https:${weather.current.condition.icon}`} 
          alt="weather icon" 
          className="weather-icon"
        />
        <div className="temperature">{weather.current.temp_c}°C</div>
      </div>
      <p className="weather-condition">{weather.current.condition.text}</p>
      <p className="humidity">Humidity: {weather.current.humidity}%</p>
      <p className="wind">Wind: {weather.current.wind_kph} km/h</p>
    </div>
  );
};

export default CityWeather;
