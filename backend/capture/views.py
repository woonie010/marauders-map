from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from .models import Capture, Camera, Individual
import json
from datetime import datetime
import os
from django.views.decorators.csrf import csrf_exempt




# Create your views here.
def index(request):
    return HttpResponse("<h1>Capture App is running</h1>")

def get_individual_capture(request, individual_id, date):
    # Parse the date string to a datetime object
    try:
        target_date = datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)

    # Calculate start and end of the target date
    start_time = datetime.combine(target_date, datetime.min.time())
    end_time = datetime.combine(target_date, datetime.max.time())

    # Filter captures for the given individual and date range
    captures = Capture.objects.filter(individual_id=individual_id, timestamp__range=(start_time, end_time))

    # Prepare the response data
    positions = [
        {
            'latitude': capture.lang,
            'longitude': capture.long,
            'timestamp': capture.timestamp.isoformat(),
            'level': capture.level,
        }
        for capture in captures
    ]

    # Check if there are no positions found
    if not positions:
        return JsonResponse({'message': 'No captures found for the given individual and date.'}, status=204)

    return JsonResponse(positions, safe=False)


def get_all_capture(request):
    captures = list(Capture.objects.values('id', 'individual', 'camera', 'lang', 'long', 'building', 'level', 'timestamp'))
    return JsonResponse(captures, safe=False)

# def initialise_capture_database(request):
#     individual_1 = Individual.objects.get(name="John Doe")
#     individual_2 = Individual.objects.get(name="Bob")
#     camera = Camera.objects.get(id=1)
    
#     def generate_unique_id(individual_id, timestamp):
#         timestamp_str = timestamp.strftime('%Y%m%d%H%M%S%f')  # Format timestamp to a string
#         return f"{individual_id}_{timestamp_str}"
    
#     Capture.objects.all().delete()
    
#     captures_data = [
#         {'id': generate_unique_id(individual_1.id, datetime.now()), 'individual': individual_1, 'camera': camera, 'lang': 101.6005776845732, 'long': 3.064765166235585, 'timestamp': datetime.now()},
#         {'id': generate_unique_id(individual_1.id, datetime.now()), 'individual': individual_1, 'camera': camera, 'lang': 101.60057770302161, 'long': 3.0647650282739765, 'timestamp': datetime.now()},
#         {'id': generate_unique_id(individual_2.id, datetime(2023, 3, 15)), 'individual': individual_2, 'camera': camera, 'lang': 101.60057770302161, 'long': 3.0647650282739765, 'timestamp': datetime(2023, 3, 15)},
#     ]
    
#     captures = [Capture(**data) for data in captures_data]
#     Capture.objects.bulk_create(captures)
    
#     count = Capture.objects.count()
    
#     return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")
    

# Initialise Capture Database
def initialise_capture_database(request):
    # Correct relative path to the JSON file
    json_file_path = '../frontend/public/json_generater/example.json'

    # Check if the path exists
    if not os.path.exists(json_file_path):
        return HttpResponse(f"File not found at {json_file_path}", status=404)

    # Load the JSON file
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Clear existing data
    Capture.objects.all().delete()

    # Get camera object (assuming the same camera for simplicity)
    camera = Camera.objects.get(id=1)
    
    def generate_unique_id(individual_id, timestamp):
        timestamp_str = timestamp.strftime('%Y%m%d%H%M%S%f')  # Format timestamp to a string
        return f"{individual_id}_{timestamp_str}"

    # Now initialize data
    captures_data = []
    for individual_id_str, positions in data.items():
        # Convert the key (e.g., "1", "2") to an integer for the individual ID
        individual_id = int(individual_id_str)
        
        # Fetch the Individual object based on the individual ID from the key
        try:
            individual = Individual.objects.get(id=individual_id)
        except Individual.DoesNotExist:
            return HttpResponse(f"Individual with ID {individual_id} does not exist.", status=404)

        for position in positions:
            timestamp = datetime.strptime(position['timestamp'], '%Y-%m-%d %H:%M:%S')

            # Create a unique ID for each capture
            capture_id = generate_unique_id(individual_id, timestamp)

            # Prepare the data for bulk creation
            capture_data = {
                'id': capture_id,
                'individual': individual,
                'camera': camera,
                'long': position['lng'],  # Longitude (lng)
                'lang': position['lat'],  # Latitude (lat)
                'level': position['level'],
                'building': position['building'],
                'timestamp': timestamp
            }
            captures_data.append(Capture(**capture_data))
    
    # Bulk create all captures
    Capture.objects.bulk_create(captures_data)

    count = Capture.objects.count()
    return HttpResponse(f"Data initialized in the database. {count} records added.")

# Fetch all capture data (for testing)
def test_capture_data(request):
    # Fetch all captures from the database
    captures = Capture.objects.all()

    # Prepare the response data
    captures_data = [
        {
            'id': capture.id,
            'individual': capture.individual.id,  # Assuming individual has an id field
            'camera': capture.camera.id,          # Assuming camera has an id field
            'lng': capture.long,  # Longitude (long)
            'lat': capture.lang,  # Latitude (lang)
            'level': capture.level,
            'building': capture.building,
            'timestamp': capture.timestamp.isoformat()
        }
        for capture in captures
    ]
    
    # Check if there are no captures found
    if not captures_data:
        return JsonResponse({'message': 'No captures found in the database.'}, status=204)

    return JsonResponse(captures_data, safe=False)