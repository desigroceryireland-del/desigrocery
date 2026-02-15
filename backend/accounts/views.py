from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
# accounts/views.py
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


@api_view(['GET', 'PATCH'])
@authentication_classes([JWTAuthentication]) # 👈 ADD THIS LINE
@permission_classes([IsAuthenticated])
def manage_user_profile(request):
    user = request.user

    # Return current user info
    if request.method == 'GET':
        return Response({
            'id': user.id,
            'name': getattr(user, 'name', f"{user.first_name} {user.last_name}"), 
            'email': user.email
        })

    # Update user info
    if request.method == 'PATCH':
        name = request.data.get('name')
        
        if name:
            # Handle Custom User (with 'name' field) vs Standard User (first_name)
            if hasattr(user, 'name'):
                user.name = name
            else:
                # If using standard Django user, split name into first/last
                parts = name.split(' ', 1)
                user.first_name = parts[0]
                user.last_name = parts[1] if len(parts) > 1 else ''
            
            user.save()
            return Response({'message': 'Profile updated', 'name': name})
        
        return Response({'error': 'Name is required'}, status=400)
