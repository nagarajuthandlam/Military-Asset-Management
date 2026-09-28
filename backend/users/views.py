from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User

@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username=username, password=password)

        return Response({
            "success": True,
            "username": user.username,
            "role": user.role,
            "base_name": user.base_name
        })

    except User.DoesNotExist:
        return Response({
            "success": False,
            "message": "Invalid Username or Password"
        }, status=401)