import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({weather}) => {
    console.log(weather);
    console.log(weather.results);
    return (
        <div>
            <h2>Weather Information</h2>
            {weather.results && weather.results.length === 0 ? (
                <p>No weather data available</p>
            ) : (
                <div className="weather-cards-container">
                    {weather.results && weather.results.map((card) => {
                        // Add a return statement here for WeatherCard
                        return <WeatherCard key={card.id} card={card} />;
                    })}
                </div>
            )}
        </div>
    );
};



export default WeatherList;
