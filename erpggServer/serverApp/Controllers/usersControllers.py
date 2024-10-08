from rest_framework.decorators import  api_view
from rest_framework.response import Response
from serverApp.Helpers.Tokens import hash_password
from datetime import datetime
from serverApp.Models.users import User


@api_view(['POST','PATCH'])
def users(request):
    if request.method == 'POST':
        return save_user(request)
    elif request.method == 'PATCH':
        return update_user(request)
    else:
        return Response({'messages': 'Method doesn\'t exists'}, status=400)


def save_user(request):
    if  ('first_name' in request.data and
        'last_name' in request.data and
        'employee_number' in request.data and 
        'user' in request.data and 
        'password' in request.data):        
        _user = User
        _user.first_name = request.data['first_name']
        _user.last_name = request.data['last_name']
        _user.employee_number = request.data['employee_number']
        _user.ssid_token = ''
        _user.ssid_expires = datetime.min
        _user.user = request.data["user"]
        _user.password = hash_password(request.data['password'])
        _user.save()
        
        return Response({'messages': 'saved'}, status=200)
    else:
        return Response({'messages': 'All filds are required'}, status=400)


def update_user(request):
    if  (
        'id' in request.data and 
        'first_name' in request.data and
        'last_name' in request.data and
        'employee_number' in request.data and 
        'password' in request.data):

        try:
            _user = User.objects.get(id=request.data['id'])
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=404)

        _user.first_name = request.data['first_name']
        _user.last_name = request.data['last_name']
        _user.employee_number = request.data['employee_number']
        _user.password = hash_password(request.data['password']) if request.data['password'] != '' else _user.password
        _user.save()

        return Response({'messages': 'updated'},status=200)
    else:
        return Response({'messages': 'All filds are required'},status=400)
