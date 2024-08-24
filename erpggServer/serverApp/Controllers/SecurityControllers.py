from rest_framework.decorators import  api_view
from rest_framework.response import Response
from serverApp.models import User
from serverApp.Helpers.Logs import Register
from serverApp.Helpers.Decorators import is_authorized
from serverApp.Helpers.Tokens import generate_ssid_token, check_password

@api_view(['POST'])
def login(request):
    if 'user' in request.data and 'password' in request.data:
        user_login = request.data['user']
        password_login = request.data['password']
       
        try:
            user_find = User.objects.get(user = user_login)
        except User.DoesNotExist:
            return Response({'message': 'bad credentials'}, status=401)

        if check_password(password_login, user_find.password):
            token = generate_ssid_token()
            user_find.ssid_token = token
            user_find.save()
            return Response({'ssid': token, 'first_name': user_find.first_name, 'last_name': user_find.last_name}, status=200)
        else:
            return Response({'message': 'bad credentials'}, status=401)
    else:        
        return Response({'messages': 'All filds are required'}, status=400)



@api_view(['GET'])
def is_token_valid(request, token=''):
    try:
        _user = User.objects.get(token=token)
    except User.DoesNotExist:
        return Response({'messages': 'data is not a valid token. There not exists or is expired.'},status=401)
    except Exception as e:
        Register(e.__str__())
        return Response({'messages': 'Internal Error.'},status=500)

    return Response({'message': 'token received: ' + token},status=200)

@api_view(['GET'])
@is_authorized('ss')
def testing_method(request):
        return Response({'message': 'OK'},status=200)

