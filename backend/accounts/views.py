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
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    token = request.data.get('token')
    
    try:
        # 1. Verify the token with Google
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_CLIENT_ID
        )

        # 2. Extract user info
        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')

        # 3. Get or Create user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email, # Using email as username
                'first_name': first_name,
                'last_name': last_name
            }
        )

        # 4. Generate JWT tokens (same as your standard login)
        refresh = RefreshToken.for_user(user)
        
        return Response({
    'access': str(refresh.access_token),
    'refresh': str(refresh),
    'user': {
        'id': user.id,
        'email': user.email,
        'name': f"{user.first_name} {user.last_name}".strip() or user.email # Ensure name is never empty
    }
})

    except ValueError:
        return Response({'error': 'Invalid Google token'}, status=status.HTTP_400_BAD_REQUEST)