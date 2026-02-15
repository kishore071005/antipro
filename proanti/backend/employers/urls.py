from django.urls import path
from .views import EmployerDetailView

urlpatterns = [
    path('me/', EmployerDetailView.as_view(), name='employer-detail'),
]
