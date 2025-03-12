import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ weather }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentWeatherData, setCurrentWeatherData] = useState({
        results: [], // Initializing the `results` array
        previous: null,
        next: null
    });


    // Handle the previous button click
    const handlePrevious = () => {
        if (weather.previous) {
            fetchWeatherData(weather.previous);
        }
    };

    // Handle the next button click
    const handleNext = () => {
        if (weather.next) {
            fetchWeatherData(weather.next);
        }
    };

    // Function to fetch weather data from the given URL (previous or next)
    const fetchWeatherData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCurrentWeatherData(data.results); // Update the weather data
            setCurrentPage(currentPage + 1); // Update page number
        } catch (err) {
            console.error("Failed to fetch weather data", err);
        }
    };

    // Initialize the data
    useEffect(() => {
        if (weather && weather.results) {
            setCurrentWeatherData(weather.results);
        }
    }, [weather]);

    return (
        <div>
            <h2>Weather Information</h2>

            <div className="weather-cards-container">
                {currentWeatherData.results.length === 0 ? (
                    <p>No weather data available</p>
                ) : (
                    currentWeatherData.results.map((weatherData, index) => (
                        <WeatherCard key={index} weatherData={weatherData}/>
                    ))
                )}
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrevious} disabled={!weather.previous}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNext} disabled={!weather.next}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default WeatherList;
