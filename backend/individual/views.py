from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Category, Individual
from django.db.models import Max


# Create your views here.
def index(request):
    return HttpResponse("<h1>App for individual is running</h1>")

def add_individual(request):
    pass

def get_all_individual(request):
    
    individuals = Individual.objects.annotate(
        last_seen=Max('capture__timestamp')  # Assuming 'capture__timestamp' is the related field in the capture model
    ).values('id', 'name', 'description', 'category__name', 'last_seen')  # Add 'category__name' to the values

    individuals_list = list(individuals)
    
    return JsonResponse(individuals_list, safe=False)

def initialise_individuals_database(request):
    students = Category.objects.get(name="Students")
    lecturers = Category.objects.get(name="Lecturers")
    staffs = Category.objects.get(name="Staffs")

    #This function is used to reset the database
    Individual.objects.all().delete()
    
    # Get the current maximum id value to avoid duplicates
    max_id = Individual.objects.aggregate(Max('id'))['id__max'] or 0
    
    
    # Dummy Data
    individuals_data = [
        {"id": max_id + 1, "name": "John Doe", "description": "Student in School of IT", "category": students},
        {"id": max_id + 2, "name": "Steve Job", "description": "Student in School of IT", "category": students},
        {"id": max_id + 3, "name": "Bob", "description": "Student in School of Science", "category": students},
        {"id": max_id + 4, "name": "Junmin Kim", "description": "Student in School of IT", "category": students},
        {"id": max_id + 5, "name": "Woontaek Baik", "description": "Student in School of IT", "category": students},
        {"id": max_id + 6, "name": "Lee Yi Mei", "description": "Student in School of IT", "category": students},
        {"id": max_id + 7, "name": "Sophia Nguyen", "description": "Student in School of Law", "category": students},
        {"id": max_id + 8, "name": "Benjamin Wright", "description": "Student in School of IT", "category": students},
        {"id": max_id + 9, "name": "Chloe Wilson", "description": "Student in School of Architecture", "category": students},
        {"id": max_id + 10, "name": "Oliver Brown", "description": "Student in School of IT", "category": students},
        {"id": max_id + 11, "name": "Isabella Garcia", "description": "Student in School of IT", "category": students},
        {"id": max_id + 12, "name": "Elijah Harris", "description": "Student in School of Science", "category": students},
        {"id": max_id + 13, "name": "Liam Davis", "description": "Student in School of Engineering", "category": students},
        {"id": max_id + 14, "name": "Evelyn Lee", "description": "Student in School of Business", "category": students},
        {"id": max_id + 15, "name": "Noah Walker", "description": "Student in School of IT", "category": students},
        {"id": max_id + 16, "name": "Aiden Clark", "description": "Student in School of IT", "category": students},
        {"id": max_id + 17, "name": "Harper Lewis", "description": "Student in School of IT", "category": students},
        {"id": max_id + 18, "name": "Charlotte Hall", "description": "Student in School of Arts", "category": students},
        {"id": max_id + 19, "name": "Lucas Young", "description": "Student in School of Business", "category": students},
        {"id": max_id + 20, "name": "Amelia King", "description": "Student in School of IT", "category": students},
        {"id": max_id + 21, "name": "Mason Scott", "description": "Student in School of IT", "category": students},
        {"id": max_id + 22, "name": "Mia Adams", "description": "Student in School of Science", "category": students},
        {"id": max_id + 23, "name": "James Baker", "description": "Student in School of Law", "category": students},
        {"id": max_id + 24, "name": "Grace Gonzalez", "description": "Student in School of Engineering", "category": students},
        {"id": max_id + 25, "name": "Owen Perez", "description": "Student in School of IT", "category": students},
        {"id": max_id + 26, "name": "Lily Richardson", "description": "Student in School of Architecture", "category": students},
        {"id": max_id + 27, "name": "Henry Reed", "description": "Student in School of Science", "category": students},
        {"id": max_id + 28, "name": "Ella Howard", "description": "Student in School of Business", "category": students},
        {"id": max_id + 29, "name": "Jacob Barnes", "description": "Student in School of IT", "category": students},
        {"id": max_id + 30, "name": "Sophie Roberts", "description": "Student in School of IT", "category": students},
        {"id": max_id + 31, "name": "Dr. Sarah Taylor", "description": "Lecturer in School of IT", "category": lecturers},
        {"id": max_id + 32, "name": "Dr. Matthew Moore", "description": "Lecturer in School of Science", "category": lecturers},
        {"id": max_id + 33, "name": "Dr. Emily Anderson", "description": "Lecturer in School of Business", "category": lecturers},
        {"id": max_id + 34, "name": "Dr. Kevin Miller", "description": "Lecturer in School of Engineering", "category": lecturers},
        {"id": max_id + 35, "name": "Dr. Olivia Lee", "description": "Lecturer in School of IT", "category": lecturers},
        {"id": max_id + 36, "name": "Dr. William Harris", "description": "Lecturer in School of Arts", "category": lecturers},
        {"id": max_id + 37, "name": "Dr. Jessica Thompson", "description": "Lecturer in School of Law", "category": lecturers},
        {"id": max_id + 38, "name": "Dr. Charles Evans", "description": "Lecturer in School of Science", "category": lecturers},
        {"id": max_id + 39, "name": "Dr. David Collins", "description": "Lecturer in School of IT", "category": lecturers},
        {"id": max_id + 40, "name": "Dr. Rebecca Green", "description": "Lecturer in School of Engineering", "category": lecturers},
        {"id": max_id + 41, "name": "Anna White", "description": "Administrative Staff, School of IT", "category": staffs},
        {"id": max_id + 42, "name": "John Parker", "description": "Maintenance Staff, School of Science", "category": staffs},
        {"id": max_id + 43, "name": "Laura Turner", "description": "Librarian, School of Business", "category": staffs},
        {"id": max_id + 44, "name": "Mark Hill", "description": "IT Support, School of IT", "category": staffs},
        {"id": max_id + 45, "name": "Sandra Wright", "description": "Administrative Staff, School of Law", "category": staffs},
        {"id": max_id + 46, "name": "James Campbell", "description": "Groundskeeper, School of Engineering", "category": staffs},
        {"id": max_id + 47, "name": "Megan Torres", "description": "HR Staff, School of IT", "category": staffs},
        {"id": max_id + 48, "name": "Paul Brooks", "description": "Lab Technician, School of Science", "category": staffs},
        {"id": max_id + 49, "name": "Diane Ross", "description": "Receptionist, School of Architecture", "category": staffs},
        {"id": max_id + 50, "name": "Chris Baker", "description": "Finance Staff, School of Business", "category": staffs},

]
    
    
    # Create and save Dummy Data to database
    individuals = [Individual(**data) for data in individuals_data]
    Individual.objects.bulk_create(individuals)
    
    count = Individual.objects.count()
    
    return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")