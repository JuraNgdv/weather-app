import React, { useState, useEffect } from 'react';
import { searchCities, addCity } from '../services/api';

const SearchCity = ({ onCityAdded }) => {
    const [cityName, setCityName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    // Handle city search
    const handleSearch = async (e) => {
        const name = e.target.value;
        setCityName(name);
        console.log(name);
        if (name.trim()) {
            try {
                const cities = await searchCities(name);
                setSearchResults(cities);
            } catch (err) {
                setError('Failed to search cities');
            }
        } else {
            setSearchResults([]);
        }
    };

    // Handle city selection
    const handleCitySelect = async (city) => {
        try {
            await addCity(city);
            onCityAdded(city); // Update the parent with the newly added city
            setCityName('');
            setSearchResults([]);
        } catch (err) {
            setError('Failed to add city');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={cityName}
                onChange={handleSearch}
                placeholder="Search city..."
            />
            {error && <p className="error">{error}</p>}

            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((city) => (
                        <li key={city.id} onClick={() => handleCitySelect(city)}>
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCity;
