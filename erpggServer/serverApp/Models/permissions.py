from django.db import models



class Permission(models.Model):
    description = models.CharField(max_length=150)    
    code = models.CharField(max_length=150)
    is_menu = models.BooleanField()
    is_submenu = models.BooleanField()
