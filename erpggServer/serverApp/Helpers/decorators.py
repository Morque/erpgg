from rest_framework.response import Response
from serverApp.Models.users import User
from serverApp.Models.job_codes import *
from serverApp.Models.permissions import Permission
from serverApp.Helpers.Logs import Register
from datetime import datetime

def is_authorized(permission_code):
    def decorator(func):
        def wrapper(*args, **kwards):
            request = args[0]
            
            if 'Authorization' in request.headers:
                ssid = request.headers["Authorization"]
                
                try:
                    _user = User.objects.get(ssid_token=ssid)
                    
                    if _user.ssid_expires < datetime.now():
                        return Response({'message': 'Not Authorized'},status=401)

                    _permission = Permission.objects.get(code=permission_code)
                    _job_code = JobCode.objects.get(user=_user,permission=_permission)
                    
                    result = func(*args, **kwards)
                    return result
                except Exception as ex:
                    Register(ex.__str__())
                    return Response({'message': 'Not Authorized'},status=401)
            else:
                return Response({'message': 'Not Authorized'},status=401)
        return wrapper
    return decorator