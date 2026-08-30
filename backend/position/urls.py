from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.index),
    path('get-all/', views.get_all_position),
    path('add-position/', views.add_position),
    path("database-initialise/", views.initialise_position_database),
]
