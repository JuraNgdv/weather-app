import React, { useState, useEffect } from 'react';
import { fetchCities, fetchWeatherByCity, deleteCity } from './services/api';
import CityList from './components/CityList';
import SearchCity from './components/SearchCity';
import WeatherList from './components/WeatherList';
import './App.css';

const App = () => {
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [error, setError] = useState('');

    // Fetch cities on initial load
    useEffect(() => {
        const loadCities = async () => {
            try {
                const cities = await fetchCities();
                setCities(cities);
            } catch (err) {
                setError('Failed to load cities');
            }
        };
        loadCities();
    }, []);

    // Fetch weather for a specific city
    const handleShowWeather = async (cityId) => {
        try {
            const weather = await fetchWeatherByCity(cityId);
            setWeather(weather);
        } catch (err) {
            setError('Failed to load weather');
        }
    };

    // Handle city deletion
    const handleDeleteCity = async (cityId) => {
        try {
            await deleteCity(cityId);
            setCities(cities.filter((city) => city.id !== cityId));
        } catch (err) {
            setError('Failed to delete city');
        }
    };

    // Handle adding a new city
    const handleCityAdded = (newCity) => {
        setCities([...cities, newCity]);
    };

    return (
        <div className="App">
            <h1>Weather App</h1>

            {error && <p className="error">{error}</p>}

            <SearchCity onCityAdded={handleCityAdded} />

            <CityList
                cities={cities}
                onDelete={handleDeleteCity}
                onShowWeather={handleShowWeather}
            />

            <WeatherList weather={weather} />
        </div>
    );
};

export default App;
