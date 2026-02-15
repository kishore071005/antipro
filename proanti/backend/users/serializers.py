from rest_framework import serializers
from django.contrib.auth import get_user_model
from workers.models import WorkerProfile
from employers.models import EmployerProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username
        return token

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'worker')
        )
        if user.role == 'worker':
            WorkerProfile.objects.create(user=user)
        elif user.role == 'employer':
            EmployerProfile.objects.create(user=user)
        return user
