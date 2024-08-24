from django.contrib import admin
from django.urls import path
from serverApp.Controllers.usersControllers import *
from serverApp.Controllers.SecurityControllers import *

urlpatterns = [
    path('login',login),
    path('users',users),
    path('security/token/isvalid/<token>',is_token_valid),
    path('test',testing_method)
]
