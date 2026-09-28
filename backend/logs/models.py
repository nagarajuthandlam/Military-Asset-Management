from django.db import models

class Log(models.Model):
    action = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action