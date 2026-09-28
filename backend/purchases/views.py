from rest_framework import generics
from .models import Purchase
from .serializers import PurchaseSerializer


class PurchaseListCreate(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer