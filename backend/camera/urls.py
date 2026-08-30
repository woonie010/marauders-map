from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.index),
    path('get-all/', views.get_all_camera),
    path('database-initialise/', views.initialise_camera_database),
]
