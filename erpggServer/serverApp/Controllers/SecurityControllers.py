from rest_framework.decorators import  api_view
from rest_framework.response import Response
from serverApp.models import User
from serverApp.Helpers.Logs import Register

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