from django.db import models
from db_connection import db

# Create your models here.
position_collection = db['position']

class Position(models.Model):
    id = models.AutoField(primary_key=True)
    floor = models.PositiveIntegerField()
    building = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'position'  # Specify the custom collection name
    
    def __str__(self):
        return f"Floor: {self.floor} in Building {self.building}"
