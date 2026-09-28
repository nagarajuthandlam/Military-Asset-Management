from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum

from purchases.models import Purchase
from transfers.models import Transfer
from assignments.models import Assignment


@api_view(["GET"])
def dashboard_summary(request):

    total_purchase = Purchase.objects.aggregate(
        total=Sum("quantity")
    )["total"] or 0

    total_transfer = Transfer.objects.aggregate(
        total=Sum("quantity")
    )["total"] or 0

    total_assignment = Assignment.objects.aggregate(
        total=Sum("quantity")
    )["total"] or 0

    opening_balance = total_purchase

    net_movement = total_purchase + total_transfer

    closing_balance = opening_balance + total_transfer - total_assignment

    data = {
        "opening_balance": opening_balance,
        "closing_balance": closing_balance,
        "net_movement": net_movement,
        "assigned_assets": total_assignment,
        "transfer_assets": total_transfer,
    }

    return Response(data)