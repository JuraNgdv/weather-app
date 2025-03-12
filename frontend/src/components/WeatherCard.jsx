import React from 'react';

const WeatherCard = ({card}) => {
    return (
        <div className="weather-card">
            <ul>
                <li><strong>Temperature:</strong> {card.temperature} °C</li>
                <li><strong>Feels Like:</strong> {card.feels_like} °C</li>
                <li><strong>Min Temperature:</strong> {card.temp_min} °C</li>
                <li><strong>Max Temperature:</strong> {card.temp_max} °C</li>
                <li><strong>Pressure:</strong> {card.pressure} hPa</li>
                <li><strong>Humidity:</strong> {card.humidity}%</li>
                <li><strong>Wind Speed:</strong> {card.wind_speed} m/s</li>
                <li><strong>Cloudiness:</strong> {card.cloudiness}%</li>
                <li><strong>Timestamp:</strong> {new Date(card.timestamp).toLocaleString()}</li>
            </ul>
        </div>
    );
};

export default WeatherCard;
