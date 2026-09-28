from django.urls import path
from .views import TransferListCreate

urlpatterns = [
    path("", TransferListCreate.as_view(), name="transfer-list"),
]