from django.db import models
from django.conf import settings

class EmployerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employer_profile')
    company_name = models.CharField(max_length=200)
    company_description = models.TextField(blank=True)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    website = models.URLField(blank=True)
    
    def __str__(self):
        return self.company_name
