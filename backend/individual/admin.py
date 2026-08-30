from django.contrib import admin
from .models import Individual

# Register your models here.
@admin.register(Individual)
class IndividualAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')