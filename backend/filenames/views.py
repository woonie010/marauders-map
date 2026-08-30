from django.http import HttpResponse, JsonResponse
from .models import Filenames

def index(request):
    return HttpResponse("<h1>App for file names is running</h1>")

def get_all_filenames(request):
    filenames = list(Filenames.objects.values('name'))
    return JsonResponse(filenames, safe=False)