from django.db import models

from city.models import City


class Weather(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    temperature = models.FloatField()
    feels_like = models.FloatField()
    temp_min = models.FloatField()
    temp_max = models.FloatField()
    pressure = models.FloatField()
    humidity = models.FloatField()
    wind_speed = models.FloatField()
    cloudiness = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Weather data for {self.city.name} at {self.timestamp}"