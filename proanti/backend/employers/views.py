from rest_framework import generics, permissions
from .models import EmployerProfile
from .serializers import EmployerProfileSerializer

class EmployerDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.employer_profile
