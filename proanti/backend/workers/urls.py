from django.urls import path
from .views import WorkerListView, WorkerDetailView

urlpatterns = [
    path('', WorkerListView.as_view(), name='worker-list'),
    path('me/', WorkerDetailView.as_view(), name='worker-detail'),
]
