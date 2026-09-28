from django.db import models

class User(models.Model):

    ROLE_CHOICES = [
        ("Admin", "Admin"),
        ("Base Commander", "Base Commander"),
        ("Logistics Officer", "Logistics Officer"),
    ]

    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    base_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.role}"