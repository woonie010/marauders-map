from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.index),
    path('get-all/', views.get_all_capture),
    path('database-initialise/', views.initialise_capture_database),
    path('positions/<int:individual_id>/<str:date>/', views.get_individual_capture),
    path('test-data/', views.test_capture_data),  # New path for testing

]
