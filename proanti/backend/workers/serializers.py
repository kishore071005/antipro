from rest_framework import serializers
from .models import WorkerProfile, Skill, Certification

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class WorkerProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    skills = serializers.SlugRelatedField(
        many=True, 
        slug_field='name', 
        queryset=Skill.objects.all()
    )
    certifications = CertificationSerializer(many=True, read_only=True)
    
    class Meta:
        model = WorkerProfile
        fields = '__all__'
