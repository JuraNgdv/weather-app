import React from 'react';

const CityItem = ({ city, onDelete, onShowWeather }) => {
    return (
        <li>
            {city.name}{' '}
            <button onClick={() => onShowWeather(city.id)}>Show Weather</button>
            <button onClick={() => onDelete(city.id)}>Delete</button>
        </li>
    );
};

export default CityItem;
