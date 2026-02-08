from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["email"],  # hidden internal username
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            password=validated_data["password"]
        )
        return user
