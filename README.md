# Weather API

## Project Description
This project is a REST API for managing weather data and city information. It allows users to:
- Retrieve weather data for a specific city.
- Retrieve weather data with associated city information.
- Search for cities via OpenWeather API.
- Add and delete cities from the database.

It uses Django REST Framework (DRF) for API handling, Celery for background task processing, PostgreSQL for data storage, and Redis for caching and message brokering.

---

## Setup Instructions

### Prerequisites
Ensure you have Docker and Docker Compose installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/weather-api.git
   cd weather-api
   ```
2. Create an `.env` file in the project root and add environment variables:
   ```sh
   POSTGRES_USER=some_username
   POSTGRES_PASSWORD=some_strong_password
   POSTGRES_DB=database_name
   DB_HOST=postgres
   DB_PORT=5449

   REDIS_HOST=redis
   REDIS_PORT=6488
   REDIS_DB=3
   REDIS_PASSWORD=some_redis_pass

   OPENWEATHER_API_KEY=your_api_key
   ```
3. Start the services using Docker Compose:
   ```sh
   docker-compose up -d --build
   ```
4. Access the API at:
   ```sh
   http://localhost:8000
   ```

---

## API Documentation

### Get All Cities
**Endpoint:** `GET /api/cities/`
- Retrieves a list of all cities.
- **Response:**
  ```json
  [
    {"id": 1, "name": "Kyiv", "country": "Ukraine", "lat": 50.45, "lon": 30.52}
  ]
  ```

### Search City
**Endpoint:** `GET /api/cities/search/?name=<city_name>`
- Searches for a city using OpenWeather API.
- **Response:**
  ```json
  [
    {"name": "Kyiv", "lat": 50.45, "lon": 30.52}
  ]
  ```

### Add City
**Endpoint:** `POST /api/cities/add/`
- Adds a new city to the database.
- **Request Body:**
  ```json
  {"name": "Kyiv", "country": "Ukraine", "lat": 50.45, "lon": 30.52}
  ```
- **Response:**
  ```json
  {"id": 1, "name": "Kyiv", "country": "Ukraine", "lat": 50.45, "lon": 30.52}
  ```

### Delete City
**Endpoint:** `DELETE /api/cities/delete/<city_id>/`
- Deletes a city from the database.
- **Response:**
  ```json
  {"message": "City deleted and task stopped"}
  ```

### Get Weather by City ID
**Endpoint:** `GET /api/weather/<city_id>/`
- Retrieves the latest weather data for a given city.
- **Response:**
  ```json
  [{"temperature": 15.2, "feels_like": 14.8, "humidity": 75, "cityName": "Kyiv"}]
  ```

### Get Weather with City Info
**Endpoint:** `GET /api/weather/`
- Retrieves weather data along with city names.
- **Response:**
  ```json
  [{"temperature": 15.2, "feels_like": 14.8, "humidity": 75, "cityName": "Kyiv"}]
  ```

---

