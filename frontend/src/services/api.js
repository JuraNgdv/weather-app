import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/',
});

export const fetchCities = async () => {
    const response = await instance.get('city/');
    return response.data;
};

export const addCity = async (cityData) => {
    const response = await instance.post('city/add/', cityData);
    return response.data;
};

export const deleteCity = async (cityId) => {
    await instance.delete(`city/delete/${cityId}/`);
};

export const fetchWeatherByCity = async (cityId) => {
    const response = await instance.get(`weather/${cityId}/`);
    return response.data;
};
