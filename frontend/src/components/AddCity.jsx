import React, { useState } from 'react';
import { addCity } from '../services/api';

const AddCity = ({ onCityAdded }) => {
    const [cityName, setCityName] = useState('');

    const handleAdd = async () => {
        if (cityName.trim()) {
            try {
                const newCity = await addCity({ name: cityName });
                onCityAdded(newCity);
                setCityName('');
            } catch (err) {
                alert('Failed to add city');
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleAdd}>Add City</button>
        </div>
    );
};

export default AddCity;
