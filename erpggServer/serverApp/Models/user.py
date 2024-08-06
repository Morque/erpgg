from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_number = models.CharField(max_length=50)
    ssid_token = models.CharField(max_length=128)
    user = models.CharField(max_length=150)
    password = models.CharField(max_length=250)
    
    