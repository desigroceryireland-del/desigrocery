from django.urls import path
from .views import ApplyPromoCodeView

urlpatterns = [
    path("apply/", ApplyPromoCodeView.as_view(), name="apply-promo"),
]
