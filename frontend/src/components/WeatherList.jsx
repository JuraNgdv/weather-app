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
        if (currentWeatherData.previous) {
            fetchWeatherData(currentWeatherData.previous);
        }
    };

    // Handle the next button click
    const handleNext = () => {
        if (currentWeatherData.next) {
            fetchWeatherData(currentWeatherData.next);
        }
    };

    // Fetch weather data from the given URL (previous or next)
    const fetchWeatherData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCurrentWeatherData({
                results: data.results,
                previous: data.previous,
                next: data.next
            });
            setCurrentPage(currentPage + 1); // Update page number
        } catch (err) {
            console.error("Failed to fetch weather data", err);
        }
    };

    // Initialize the data when the component mounts or weather prop changes
    useEffect(() => {
        if (weather && weather.results) {
            setCurrentWeatherData({
                results: weather.results,
                previous: weather.previous,
                next: weather.next
            });
        }
    }, [weather]);

    return (
        <div>
            <h2>Weather Information</h2>

            <div className="weather-cards-container">
                {currentWeatherData.results.length === 0 ? (
                    <p>No weather data available</p>
                ) : (
                    currentWeatherData.results.map((weatherData) => (
                        <WeatherCard key={weatherData.id} weatherData={weatherData} />
                    ))
                )}
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrevious} disabled={!currentWeatherData.previous}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNext} disabled={!currentWeatherData.next}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default WeatherList;
