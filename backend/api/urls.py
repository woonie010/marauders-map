from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('session/', views.get_session),
    path('signin/', views.signin),
    path('signup/', views.signup),
    path('permision-update/<str:username>/', views.update_is_staff),
    path('get-users/', views.get_all_users),
    path('upload/', views.upload_file),
]
