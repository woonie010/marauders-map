from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("get-all/", views.get_all_individual),
    path("database-initialise/", views.initialise_individuals_database),
]
