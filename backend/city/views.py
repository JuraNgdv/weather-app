import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from celery import current_app

from weather.models import Weather
from weather.serializers import WeatherSerializer
from weather.tasks import update_weather_for_city

from .models import City
from .serializers import CitySerializer


@api_view(['GET'])
def search_city(request):
    city_name = request.GET.get('name')
    if not city_name:
        return Response({'error': 'City name is required'}, status=400)

    params = {
        'q': city_name,
        'limit': 5,
        'appid': settings.OPENWEATHER_API_KEY
    }

    response = requests.get(settings.OPENWEATHER_GEOCODING_URL, params=params)
    if response.status_code != 200:
        return Response({'error': 'Failed to fetch data from OpenWeather API'}, status=500)

    cities_data = response.json()

    if not cities_data:
        return Response({'error': 'No cities found'}, status=404)

    return Response(cities_data)





@api_view(['GET'])
def get_cities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def add_city(request):
    city_name = request.data.get('name')
    country = request.data.get('country')
    state = request.data.get('state', '')
    lat = request.data.get('lat')
    lon = request.data.get('lon')

    if not city_name or not lat or not lon:
        return Response({'error': 'City name, latitude, and longitude are required'}, status=400)

    city, created = City.objects.get_or_create(
        name=city_name,
        country=country,
        state=state,
        lat=lat,
        lon=lon
    )
    if created:
        update_weather_for_city.apply_async((city.id,), countdown=0)

    serializer = CitySerializer(city)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_city(request, city_id):
    try:
        city = City.objects.get(id=city_id)
        city.delete()
        current_app.control.revoke(city_id, terminate=True)
        return Response({'message': 'City deleted and task stopped'}, status=204)
    except City.DoesNotExist:
        return Response({'error': 'City not found'}, status=404)
