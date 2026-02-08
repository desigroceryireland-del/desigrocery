from rest_framework.generics import ListAPIView
from .models import Announcement
from .serializers import AnnouncementSerializer

class AnnouncementListView(ListAPIView):
    queryset = Announcement.objects.filter(is_active=True)
    serializer_class = AnnouncementSerializer
