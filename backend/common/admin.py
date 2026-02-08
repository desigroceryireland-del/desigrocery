from django.contrib import admin
from .models import Announcement

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("message", "is_active", "order")
    list_editable = ("is_active", "order")
