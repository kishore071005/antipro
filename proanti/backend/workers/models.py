from django.db import models
from django.conf import settings

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class WorkerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='worker_profile')
    skills = models.ManyToManyField(Skill, related_name='workers', blank=True)
    experience_years = models.IntegerField(default=0)
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    is_available = models.BooleanField(default=True)
    expected_wage = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return self.user.username

class Certification(models.Model):
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='certifications')
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_issued = models.DateField()
    proof_file = models.FileField(upload_to='certifications/', null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} - {self.worker.user.username}"
