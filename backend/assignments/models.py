from django.db import models

class Assignment(models.Model):
    assignment_date = models.DateField()
    person_name = models.CharField(max_length=100)
    base_name = models.CharField(max_length=100)
    equipment_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.person_name