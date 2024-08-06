from django.db import models
from serverApp.Models.user import User


class PermissionType(models.Model):
    description = models.CharField(max_length=100)

class Permission(models.Model):
    description = models.CharField(max_length=150)    

class PermissionCode(models.Model):
    code = models.CharField(max_length=50)
    permission_type = models.ForeignKey(PermissionType,on_delete=models.PROTECT)
    permission = models.ForeignKey(Permission,on_delete=models.PROTECT)

class JobCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    permission_code = models.ForeignKey(PermissionCode, on_delete=models.PROTECT)