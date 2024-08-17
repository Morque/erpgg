from django.contrib import admin
from django.urls import path
from serverApp.Controllers.usersControllers import *
from serverApp.Controllers.SecurityControllers import *

urlpatterns = [
    path('users',users),
    path('login',login),
    path('security/token/isvalid/<token>',is_token_valid),
]
