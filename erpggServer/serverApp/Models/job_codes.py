from django.db import models
from serverApp.Models.users import User
from serverApp.Models.permissions import Permission


class JobCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    permission = models.ForeignKey(Permission, on_delete=models.PROTECT)