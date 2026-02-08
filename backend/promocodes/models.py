from django.db import models
from decimal import Decimal

class PromoCode(models.Model):
    PERCENTAGE = "percentage"
    FIXED = "fixed"

    DISCOUNT_TYPE_CHOICES = [
        (PERCENTAGE, "Percentage"),
        (FIXED, "Fixed Amount"),
    ]

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(
        max_length=20,
        choices=DISCOUNT_TYPE_CHOICES,
        default=PERCENTAGE
    )
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code

    def calculate_discount(self, cart_total: Decimal) -> Decimal:
        if not self.is_active:
            return Decimal("0.00")

        if self.discount_type == self.PERCENTAGE:
            return (cart_total * self.discount_value) / Decimal("100")

        return min(self.discount_value, cart_total)
