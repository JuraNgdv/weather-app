import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = (weather) => {
    console.log(weather);
    return (
        <div>
            <h2>Weather Information</h2>
            {weather.length === 0 ? (
                <p>No weather data available</p>
            ) : (
                weather.map((card) => {<WeatherCard weatherData={card.results} />})
            )}
        </div>
    );
};

export default WeatherList;
