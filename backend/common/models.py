from django.db import models

class Announcement(models.Model):
    message = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ["order"]
