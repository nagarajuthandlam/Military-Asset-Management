from django.db import models

class Transfer(models.Model):
    transfer_date = models.DateField()
    from_base = models.CharField(max_length=100)
    to_base = models.CharField(max_length=100)
    equipment_name = models.CharField(max_length=100)
    quantity = models.IntegerField()

    def __str__(self):
        return self.equipment_name