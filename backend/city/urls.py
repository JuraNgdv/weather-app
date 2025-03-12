from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_cities, name='get_cities'),
    path('search/', views.search_city, name='search_city'),
    path('add/', views.add_city, name='add_city'),
    path('delete/<int:city_id>/', views.delete_city, name='delete_city'),
]