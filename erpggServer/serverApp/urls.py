from django.contrib import admin
from django.urls import path
from serverApp.Controllers.usersControllers import *

urlpatterns = [
    path('users',users),
    path('login',login),
    
]
