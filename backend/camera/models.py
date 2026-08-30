from django.db import models
from db_connection import db
from position.models import Position

# Create your models here.
camera_collection = db['camera']

class Camera(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=100, unique=True)
    location_info = models.ForeignKey(Position, on_delete=models.CASCADE)
    
    
    class Meta:
        db_table = 'camera'
    
    def __str__(self):
        return self.name