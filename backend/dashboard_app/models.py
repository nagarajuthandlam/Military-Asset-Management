from django.db import models

class Equipment(models.Model):
    equipment_name = models.CharField(max_length=100)
    equipment_type = models.CharField(max_length=100)
    opening_balance = models.IntegerField(default=0)
    closing_balance = models.IntegerField(default=0)

    def __str__(self):
        return self.equipment_name