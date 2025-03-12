from rest_framework import serializers
from .models import Weather

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ['id', 'city', 'temperature', 'feels_like', 'temp_min', 'temp_max', 'pressure', 'humidity', 'wind_speed', 'cloudiness', 'timestamp']
