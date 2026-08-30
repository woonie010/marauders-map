from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("get-all/", views.get_all_activities),
    path("database-initialise/", views.initialise_activity_database),
    path("get-near/<str:today_date>/", views.get_near_activities),
    path("add-activity/", views.add_activity),
]
