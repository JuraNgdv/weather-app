from celery import shared_task
from .models import City, Weather
import requests
from django.utils import timezone
from django.conf import settings

@shared_task
def update_weather_for_city(city_id):
    # Отримуємо місто з бази
    city = City.objects.get(id=city_id)

    # Запит до OpenWeather API
    params = {
        'lat': city.lat,
        'lon': city.lon,
        'appid': settings.OPENWEATHER_API_KEY,
        'units': 'metric'
    }

    response = requests.get(settings.OPENWEATHER_WEATHER_URL, params=params)
    print(response)
    if response.status_code == 200:
        data = response.json()
        # Збереження погодних даних в базі
        weather = Weather.objects.create(
            city=city,
            temperature=data['main']['temp'],
            feels_like=data['main']['feels_like'],
            temp_min=data['main']['temp_min'],
            temp_max=data['main']['temp_max'],
            pressure=data['main']['pressure'],
            humidity=data['main']['humidity'],
            wind_speed=data['wind']['speed'],
            cloudiness=data['clouds']['all'],
            timestamp=timezone.now()
        )
        print(weather)
    else:
        # Якщо не вдалося отримати погодні дані
        print(f"Error fetching weather data for {city.name}")
