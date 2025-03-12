import React from 'react';

const WeatherCard = ({ weatherData }) => {
    return (
        <div>
            <h3>Weather</h3>
            <ul>
                {weatherData.map((data, index) => (
                    <li key={index}>
                        <p>{data.description}</p>
                        <p>{data.temperature} °C</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherCard;
