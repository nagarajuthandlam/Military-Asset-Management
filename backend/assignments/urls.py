from django.urls import path
from .views import AssignmentListCreate

urlpatterns = [
    path("", AssignmentListCreate.as_view(), name="assignment-list"),
]