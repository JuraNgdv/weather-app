import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ weather }) => {
    console.log(weather);
    console.log(weather.results);
    return (
        <div>
            <h2>Weather Information</h2>
            {!weather.results && weather.length === 0 ? (
                <p>No weather data available</p>
            ) : (

                weather.results.map((card) => {
                    <WeatherCard key={card.id} weatherData={card} />
                })
            )}
        </div>
    );
};

export default WeatherList;
