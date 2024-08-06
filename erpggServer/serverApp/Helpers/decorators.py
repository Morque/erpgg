from rest_framework.response import Response

def is_authorized(permission_code):
    def decorator(func):
        def wrapper(*args, **kwards):
            request = args[0]
            
            if 'user' in request.data and 'password' in request.data:
                if 'Authorization' in request.data:
                    ssid = request.data['Authorization']
                    
                    
                result = func(*args, **kwards)
                return result
            else:
                return Response({'message': 'bad request'}, status = 400)
        return wrapper
    return decorator