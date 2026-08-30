from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Category
from django.db.models import Max, Count

# Create your views here.
def index(request):
    return HttpResponse("<h1>Category App is running</h1>")

def get_all_category(request):
    categories = list(Category.objects.values('id', 'name'))
    return JsonResponse(categories, safe=False)


def category_individual_count(request):
    categories = Category.objects.annotate(num_individuals=Count('individual')).values('name', 'num_individuals')

    # Convert the QuerySet to a list of dictionaries
    categories_list = list(categories)
    
    # Return the list as JSON
    return JsonResponse({'categories': categories_list})


def initialise_category_database(request):
    Category.objects.all().delete()
    
     # Get the current maximum id value to avoid duplicates
    max_id = Category.objects.aggregate(Max('id'))['id__max'] or 0
    
    
    categories_data = [
        {"id": max_id + 1,'name': 'Others'},
        {"id": max_id + 2,'name': 'Students'},
        {"id": max_id + 3,'name': 'Lecturers'},
        {"id": max_id + 4,'name': 'Staffs'}
    ]
    
    categories = [Category(**data) for data in categories_data]
    Category.objects.bulk_create(categories)
    
    count = Category.objects.count()
    
    return HttpResponse(f"Dummy Data initialized in the database. {count} records added.")
    