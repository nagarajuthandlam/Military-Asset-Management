from django.db import models

class Purchase(models.Model):
    purchase_date = models.DateField()
    base_name = models.CharField(max_length=100)
    equipment_name = models.CharField(max_length=100)
    quantity = models.IntegerField()

    def __str__(self):
        return self.equipment_name