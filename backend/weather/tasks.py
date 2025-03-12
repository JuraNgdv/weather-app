import logging
from celery import shared_task
from .models import City, Weather
import requests
from django.utils import timezone
from django.conf import settings


@shared_task
def update_weather_for_city(city_id):
    city = City.objects.get(id=city_id)
    logging.info(f'{city=}')
    params = {
        'lat': city.lat,
        'lon': city.lon,
        'appid': settings.OPENWEATHER_API_KEY,
        'units': 'metric'
    }

    response = requests.get(settings.OPENWEATHER_WEATHER_URL, params=params)
    logging.info(f'{response=}')

    if response.status_code == 200:
        data = response.json()
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
        logging.info(weather)
        weathers = Weather.objects.filter(city=city).order_by('-timestamp')[:1]

        logging.warning(f"{weathers=}")
    else:
        logging.info(f"Error fetching weather data for {city.name}")


def add_weather_task(city_id):
    """Додає періодичне завдання для оновлення погоди кожні 10 хвилин"""
    from celery import current_app
    current_app.add_periodic_task(
        600.0,  # 600 секунд = 10 хвилин
        update_weather_for_city.s(city_id),  # Викликає задачу для конкретного міста
        name=f'update_weather_for_city_{city_id}',
    )


def remove_weather_task(city_id):
    """Видаляє періодичне завдання для міста"""
    from celery import current_app
    current_app.control.revoke(f'update_weather_for_city_{city_id}', terminate=True)
