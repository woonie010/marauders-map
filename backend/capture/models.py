from django.db import models
from db_connection import db
from individual.models import Individual
from camera.models import Camera

# Create your models here.
capture_collection = db['capture']

class Capture(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    individual = models.ForeignKey(Individual, on_delete=models.CASCADE, default=1)
    camera = models.ForeignKey(Camera, on_delete=models.CASCADE, default=1)
    long = models.FloatField()
    lang = models.FloatField()
    level = models.IntegerField()
    building = models.IntegerField()
    timestamp = models.DateTimeField()
    
    class Meta:
        db_table = 'capture'
        
    def __str__(self):
        return f"Capture {self.id} - Individual {self.individual_id} - Camera {self.camera_id} - Timestamp {self.timestamp}"
    