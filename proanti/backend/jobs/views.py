from rest_framework import viewsets, permissions
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(employer=self.request.user.employer_profile)
        
    @action(detail=False, methods=['get'])
    def my_jobs(self, request):
        jobs = Job.objects.filter(employer=request.user.employer_profile)
        serializer = self.get_serializer(jobs, many=True)
        return Response(serializer.data)

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(worker=self.request.user.worker_profile)
    
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'worker_profile'):
            return Application.objects.filter(worker=user.worker_profile)
        elif hasattr(user, 'employer_profile'):
            return Application.objects.filter(job__employer=user.employer_profile)
        return Application.objects.none()
