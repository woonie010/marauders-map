from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Activity, Position
from django.utils import timezone  # Import timezone utility
from datetime import timedelta, datetime
import calendar
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError
from rest_framework.response import Response


# Create your views here.
def index(request):
    return HttpResponse("<h1>App for activity is running</h1>")

def get_all_activities(request):
    activities = list(Activity.objects.values('id', 'name', 'description', 'content', 'status', 'location__floor', 'location__building'))
    return JsonResponse(activities, safe=False)

def get_near_activities(request, today_date):
    try:
        # Parse the passed date string (assuming it's in YYYY-MM-DD format)
        today = datetime.strptime(today_date, "%Y-%m-%d")

        # Get the first and last day of this month
        first_day_of_this_month = today.replace(day=1)
        last_day_of_this_month = today.replace(day=calendar.monthrange(today.year, today.month)[1])

        # Get the first and last day of last month
        first_day_of_last_month = (first_day_of_this_month - timedelta(days=1)).replace(day=1)
        last_day_of_last_month = first_day_of_this_month - timedelta(days=1)

        # Get the first and last day of next month
        first_day_of_next_month = (last_day_of_this_month + timedelta(days=1)).replace(day=1)
        last_day_of_next_month = first_day_of_next_month.replace(day=calendar.monthrange(first_day_of_next_month.year, first_day_of_next_month.month)[1])

        # Fetch activities for this month, last month, and next month
        activities = Activity.objects.filter(
            date__gte=first_day_of_last_month,
            date__lte=last_day_of_next_month
        ).values('id', 'name', 'description', 'content', 'status', 'location__floor', 'location__building', 'date')

        # Convert the queryset to a list of dictionaries
        activities_list = list(activities)

        return JsonResponse(activities_list, safe=False)
        
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
def add_activity(request):
    # Extract data from request
    name = request.data.get('name')
    description = request.data.get('description')
    activity_status = request.data.get('status')  # Renamed to avoid conflict
    date_str = request.data.get('date')
    building = int(request.data.get('building'))
    floor = int(request.data.get('floor'))

    # Validate required fields
    if not all([name, description, activity_status, date_str, building, floor]):
        return JsonResponse({"error": "All fields are required."}, status=400)

    # Validate date format
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d")  # Convert string to datetime
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

    # Check for valid position
    try:
        position = Position.objects.get(floor=floor, building=building)

    except Position.DoesNotExist:
        return JsonResponse({"error": "Position not found."}, status=400)

    # Create the activity instance
    activity = Activity(
        name=name,
        description=description,
        status=activity_status,
        date=date,
        location=position
    )

    # Save the activity and handle potential integrity errors
    try:
        activity.save()
        
    except ValidationError as e:
        return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Activity added successfully!", "id": activity.id}, status=200)


def initialise_activity_database(request):
    position = Position.objects.get(id=1)
    # This function is used to reset the database
    Activity.objects.all().delete()
    
    # Dummy Data
    activities_data = [
        {
            'name': 'Monash Cup Opening', 
            'description': 'Opening for annual Monash cup happening at the field',
            'status': 'Open',
            'content': 'The Monash Cup Opening will take place at the field. This is a great opportunity to start the annual cup with exciting events and activities.',
            'date': timezone.make_aware(datetime(2024, 9, 22)),  # Timezone aware datetime
            'location': position,
        },
        {
            'name': 'Monash Coding League', 
            'description': 'Opening for annual Monash cup happening at the field',
            'status': 'Close',
            'content': 'The Monash Cup Opening will take place at the field. This is a great opportunity to start the annual cup with exciting events and activities.',
            'date': timezone.make_aware(datetime(2024, 8, 20)),  # Timezone aware datetime
            'location': position,
        },
    ]
    
    activities = [Activity(**data) for data in activities_data]
    Activity.objects.bulk_create(activities)
    
    count = Activity.objects.count()
    
    return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")
