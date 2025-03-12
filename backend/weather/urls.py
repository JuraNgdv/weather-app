from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_weather_with_cities, name='get_weather_with_cities'),
    path('<int:city_id>/', views.get_weather, name='get_weather'),
]
