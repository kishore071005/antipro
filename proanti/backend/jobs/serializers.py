from rest_framework import serializers
from .models import Job, Application
from employers.serializers import EmployerProfileSerializer

class JobSerializer(serializers.ModelSerializer):
    employer = EmployerProfileSerializer(read_only=True)
    skills_required_names = serializers.StringRelatedField(source='required_skills', many=True, read_only=True)
    
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('employer',)

class ApplicationSerializer(serializers.ModelSerializer):
    worker_name = serializers.CharField(source='worker.user.username', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    employer_company = serializers.CharField(source='job.employer.company_name', read_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('worker',)
