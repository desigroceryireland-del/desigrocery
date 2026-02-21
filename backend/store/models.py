from django.db import models
import uuid # Add this import at the top
import datetime
class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to="categories/", blank=True, null=True)

    def __str__(self):
        return self.name
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories")
    name = models.CharField(max_length=150)
    slug = models.SlugField()

    class Meta:
        unique_together = ("category", "slug")

    def __str__(self):
        return f"{self.category.name} → {self.name}"

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name="products")

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    image = models.ImageField(upload_to="products/")
    unit = models.CharField(max_length=50)

    in_stock = models.BooleanField(default=True)
    in_offer = models.BooleanField(default=False)  # 🔥 matches frontend
    rating = models.FloatField(default=0)
    reviews_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
from django.conf import settings

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cart - {self.user.email}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey("store.Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
# from django.contrib.auth.models import User

# class Order(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     discount = models.PositiveIntegerField(default=0)
#     final_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Order #{self.id} - {self.user.username}"


# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
#     product = models.ForeignKey("Product", on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)  # price at time of order

#     def __str__(self):
#         return f"{self.product.name} x {self.quantity}"

from django.db import models
from django.conf import settings
from .models import Product  # Import your existing Product model

# ✅ ADDRESS MODEL
class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="addresses")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    street = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default="India")
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.city}"

# ✅ ORDER MODEL
import uuid # Add this import at the top
import datetime

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders", null=True, blank=True)
    
    # ✅ Professional Order Number Field
    order_number = models.CharField(max_length=100, unique=True, editable=False, null=True, blank=True)
    
    # Address snapshot
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    address_line = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)

    # Payment Info
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    payment_status = models.CharField(max_length=50, default="pending")
    amount_total = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    # ✅ Logic to generate matching Order ID
    def save(self, *args, **kwargs):
        if not self.order_number:
            # Generates something like: DG-2026-A1B2
            date_str = datetime.date.today().strftime("%Y")
            unique_id = str(uuid.uuid4()).split('-')[0].upper()
            self.order_number = f"DG-{date_str}-{unique_id}"
        super().save(*args, **kwargs)

    def __str__(self):
        # Now matches the professional number
        return f"Order {self.order_number} - {self.status}"

# ✅ ORDER ITEM MODEL
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of purchase
    quantity = models.PositiveIntegerField(default=1)

    def get_total(self):
        price = self.price if self.price is not None else 0
        quantity = self.quantity if self.quantity is not None else 0
        return price * quantity
        

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
class Location(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class ProductPrice(models.Model):
    # Links a product to a specific location
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name="location_prices")
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="product_prices")
    
    # These fields are now location-specific
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock_count = models.PositiveIntegerField(default=0)
    in_stock = models.BooleanField(default=True)

    class Meta:
        # This prevents having two different prices for the same product in the same city
        unique_together = ("product", "location")

    def __str__(self):
        return f"{self.product.name} in {self.location.name}"


class MiscellaneousCharge(models.Model):
    CHARGE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    name = models.CharField(max_length=100)
    charge_type = models.CharField(max_length=20, choices=CHARGE_CHOICES, default='fixed')
    value = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.value})"

    # ✅ ENSURE THIS IS INSIDE THE CLASS
    def calculate_charge(self, subtotal):
        from decimal import Decimal
        subtotal = Decimal(str(subtotal))
        value = Decimal(str(self.value))
        
        if self.charge_type == 'percentage':
            return (subtotal * value) / Decimal('100')
        return value