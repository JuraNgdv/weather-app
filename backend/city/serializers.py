from rest_framework import serializers
from .models import City

# Серіалізатор для моделі City
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'country', 'state', 'lat', 'lon']
