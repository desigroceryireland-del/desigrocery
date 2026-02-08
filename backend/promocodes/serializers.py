from rest_framework import serializers
from decimal import Decimal
from .models import PromoCode

class ApplyPromoSerializer(serializers.Serializer):
    code = serializers.CharField()
    cart_total = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        try:
            promo = PromoCode.objects.get(
                code__iexact=data["code"],
                is_active=True
            )
        except PromoCode.DoesNotExist:
            raise serializers.ValidationError("Invalid promo code")

        discount = promo.calculate_discount(data["cart_total"])

        return {
            "promo": promo,
            "cart_total": data["cart_total"],
            "discount": discount,
        }
