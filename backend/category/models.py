from django.db import models
from db_connection import db

# Create your models here.
category_collection = db['category']

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=125)
    
    class Meta:
        db_table = 'category'
        
    def __str__(self):
        return f"Category {self.name}"
