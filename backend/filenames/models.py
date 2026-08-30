from django.db import models
from db_connection import db

filenames_connection = db['filenames']

class Filenames(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=225)

    class Meta:
        db_table = 'filenames'
    
    def __str__(self):
        return self.name