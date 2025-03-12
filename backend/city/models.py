from django.db import models

class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255, blank=True, null=True)
    lat = models.FloatField()
    lon = models.FloatField()

    def __str__(self):
        return f"{self.name}, {self.country}"
