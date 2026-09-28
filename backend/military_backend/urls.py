from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # Dashboard API
    path("api/dashboard/", include("dashboard_app.urls")),

    # Purchases API
    path("api/purchases/", include("purchases.urls")),

    # Transfers API
    path("api/transfers/", include("transfers.urls")),

    # Assignments API
    path("api/assignments/", include("assignments.urls")),

    # Login / Users API
    path("api/users/", include("users.urls")),
]