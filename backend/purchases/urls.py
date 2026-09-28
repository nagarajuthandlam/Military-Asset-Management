from django.urls import path
from .views import PurchaseListCreate

urlpatterns = [
    path("", PurchaseListCreate.as_view(), name="purchase-list"),
]