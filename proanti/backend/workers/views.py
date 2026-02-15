from rest_framework import generics, permissions, filters
from .models import WorkerProfile, Skill
from .serializers import WorkerProfileSerializer

class WorkerListView(generics.ListAPIView):
    queryset = WorkerProfile.objects.all()
    serializer_class = WorkerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['city', 'skills__name', 'user__username']

class WorkerDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = WorkerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.worker_profile
