import React from 'react';

const WeatherCard = ({ weatherData }) => {
    return (
        <div className="weather-card">
            <h3>{weatherData.cityName}</h3>
            <ul>
                <li><strong>Temperature:</strong> {weatherData.temperature} °C</li>
                <li><strong>Feels Like:</strong> {weatherData.feels_like} °C</li>
                <li><strong>Min Temperature:</strong> {weatherData.temp_min} °C</li>
                <li><strong>Max Temperature:</strong> {weatherData.temp_max} °C</li>
                <li><strong>Pressure:</strong> {weatherData.pressure} hPa</li>
                <li><strong>Humidity:</strong> {weatherData.humidity}%</li>
                <li><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</li>
                <li><strong>Cloudiness:</strong> {weatherData.cloudiness}%</li>
                <li><strong>Timestamp:</strong> {new Date(weatherData.timestamp).toLocaleString()}</li>
            </ul>
        </div>
    );
};

export default WeatherCard;
