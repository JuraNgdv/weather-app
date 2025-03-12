from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from city.models import City
from city.serializers import CitySerializer
from .models import Weather
from .serializers import WeatherSerializer
from .pagination import WeatherPagination

@api_view(['GET'])
def get_weather(request, city_id):
    try:
        weather_data = Weather.objects.filter(city_id=city_id).order_by('-timestamp')[:1]
        if not weather_data:
            return Response({'error': 'No weather data available'}, status=status.HTTP_404_NOT_FOUND)

        paginator = WeatherPagination()
        paginated_weather = paginator.paginate_queryset(weather_data, request)

        if paginated_weather is not None:
            weather_serializer = WeatherSerializer(paginated_weather, many=True)
            return paginator.get_paginated_response(weather_serializer.data)

        weather_serializer = WeatherSerializer(weather_data, many=True)
        return Response(weather_serializer.data)

    except Weather.DoesNotExist:
        return Response({'error': 'Weather data not found for the city'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_weather_with_cities(request):
    weather_data = Weather.objects.select_related('city').order_by('-timestamp')

    weather_with_cities = []
    for weather in weather_data:
        weather_serialized = WeatherSerializer(weather, many=True).data
        weather_serialized['cityName'] = weather.city.name  # Додаємо назву міста до даних погоди
        weather_with_cities.append(weather_serialized)

    return Response(weather_with_cities)