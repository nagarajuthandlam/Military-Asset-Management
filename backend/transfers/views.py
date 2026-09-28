from rest_framework import generics
from .models import Transfer
from .serializers import TransferSerializer

class TransferListCreate(generics.ListCreateAPIView):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer