from django.db import models
from db_connection import db
from category.models import Category

individual_collection = db['individual']

class Individual(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=225)
    description = models.CharField(max_length=500)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    
    class Meta:
        db_table = 'individual'
    
    def __str__(self):
        return self.name