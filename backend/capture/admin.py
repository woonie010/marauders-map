from django.contrib import admin
from .models import Capture

# Register your models here.
@admin.register(Capture)
class CaptureAdmin(admin.ModelAdmin):
    list_display = ('id', 'individual', 'camera', 'lang', 'long', 'timestamp')