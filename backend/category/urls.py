from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('', views.index),
    path('get-all/', views.get_all_category),
    path('get-count/', views.category_individual_count),
    path('database-initialise/', views.initialise_category_database),
]
