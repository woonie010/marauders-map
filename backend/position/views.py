from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from django.db.models import Max
from .models import position_collection, Position
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError


# Create your views here. 
def index(request):
    return HttpResponse("<h1>App is running</h1>")


@api_view(['POST'])
def add_position(request):
    floor = request.data.get('floor')
    building = request.data.get('building')
    
    # Validate required fields
    if not all([floor, building]):
        return JsonResponse({"error": "All fields are required."}, status=400)
    
    # Check if position already exists
    if Position.objects.filter(floor=floor, building=building).exists():
        return JsonResponse({"error": "Position already exists."}, status=400)
    
    max_id = Position.objects.aggregate(Max('id'))['id__max'] or 0
    
    # Create the position instance
    position = Position(id=max_id+1, floor=floor, building=building)
    
    # Save the position and handle potential errors
    try:
        position.save()
        return JsonResponse({"message": "Position added successfully!"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


def get_all_position(request):
    positions = list(Position.objects.values('id', 'floor', 'building'))
    return JsonResponse(positions, safe=False)

def initialise_position_database(request):
    # This function is used to reset the database
    Position.objects.all().delete()
    
    # Get the current maximum id value to avoid duplicates
    max_id = Position.objects.aggregate(Max('id'))['id__max'] or 0
    
    # Dummy Datas
    positions_data = [
        {"id": max_id + 1, "floor": 1, "building": 2},
        {"id": max_id + 2, "floor": 2, "building": 2},
        {"id": max_id + 3, "floor": 3, "building": 2},
        {"id": max_id + 4, "floor": 4, "building": 2},
        {"id": max_id + 5, "floor": 5, "building": 2},
    ]
    
    # Create and save Dummy Datas to database
    positions = [Position(**data) for data in positions_data]
    Position.objects.bulk_create(positions)
    
    count = Position.objects.count()
    
    return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")
