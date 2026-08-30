from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Camera, Position
from django.db.models import Max
import json
from bson import ObjectId

# Create your views here.
def index(request):
    return HttpResponse("<h1>Camera app is running</h1>")

def get_all_camera(request):
    cameras = list(Camera.objects.values('id', 'name', 'location_info'))
    return JsonResponse(cameras, safe=False)

def initialise_camera_database(request):
    position = Position.objects.get(id=1)
    
    # This function is used to reset the database
    Camera.objects.all().delete()
    
    # Get the current maximum id value to avoid duplicates
    max_id = Camera.objects.aggregate(Max('id'))['id__max'] or 0
    
    # Dummy Datas
    cameras_data = [
        {"id": max_id + 1, 'name': 'camera_1', "location_info" : position},
        {"id": max_id + 1,'name': 'camera_2', 'location_info' : position},
    ]
    
    for data in cameras_data:
        camera = Camera(**data)
        camera.save()
        print(f"Created Camera: {camera} with id: {camera.id}")  # Debugging line
    
    count = Camera.objects.count()
    
    return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")
