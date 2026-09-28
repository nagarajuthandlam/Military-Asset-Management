from rest_framework import generics
from .models import Assignment
from .serializers import AssignmentSerializer

class AssignmentListCreate(generics.ListCreateAPIView):
    queryset = Assignment.objects.all().order_by("-id")
    serializer_class = AssignmentSerializer