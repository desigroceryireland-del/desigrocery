from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import manage_user_profile
from .views import google_auth # 👈 Add this import

# urlpatterns = [
#     # ... existing paths ...
#     path("google/", google_auth, name="google-auth"), # 👈 Add this
# ]

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("profile/", manage_user_profile, name="profile"),
    path("users/me/", manage_user_profile, name="users-me"),
    path("google/", google_auth, name="google-auth"), 
]
