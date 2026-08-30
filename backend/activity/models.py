from django.db import models
from db_connection import db
from position.models import Position
from django import forms

# Create your models here.
activity_collection = db['activity']

class Activity(models.Model):
    name = models.CharField(max_length=225)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=50)
    content = models.CharField(max_length=5000)
    date = models.DateTimeField()
    location = models.ForeignKey(Position, on_delete=models.CASCADE, default=1)
    
    class Meta:
        db_table = 'activity'
        
    def __str__(self):
        return f"Activity {self.title} happening at {self.location}"
    
class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity
        fields = ['name', 'description', 'content', 'status', 'date', 'location']