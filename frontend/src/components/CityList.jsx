import React from 'react';
import CityItem from './CityItem';

const CityList = ({ cities, onDelete, onShowWeather }) => {
    return (
        <div>
            <h2>Cities</h2>
            {cities.length === 0 ? (
                <p>No cities available</p>
            ) : (
                <ul>
                    {cities.map((city) => (
                        <CityItem
                            key={city.id}
                            city={city}
                            onDelete={onDelete}
                            onShowWeather={onShowWeather}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CityList;
