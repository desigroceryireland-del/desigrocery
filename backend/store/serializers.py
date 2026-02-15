from rest_framework import serializers
from .models import Category, SubCategory, Product

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ["id", "name", "slug"]


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "image", "subcategories"]


from rest_framework import serializers
from .models import Product, Category, SubCategory

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()
    image = serializers.SerializerMethodField()  # ✅ Custom method for full URL

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "original_price",
            "image",
            "unit",
            "in_stock",
            "in_offer",
            "rating",
            "reviews_count",
            "category",
            "subcategory",
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            # ✅ Return full absolute URL (e.g. http://127.0.0.1:8000/media/...)
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://127.0.0.1:8000{obj.image.url}" # Fallback
        return None

from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]

    def get_product(self, obj):
        return {
            "id": obj.product.id,
            "name": obj.product.name,
            "price": obj.product.price,
            "image": obj.product.image.url if obj.product.image else None,
            "unit": obj.product.unit,
        }


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", "items"]
# serializers.py
from rest_framework import serializers
from .models import Address, Order, OrderItem

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'name', 'phone', 'street', 'city', 'state', 'zip_code', 'is_default']
        read_only_fields = ['id']

    def validate(self, attrs):
        # Limit to 3 addresses per user
        user = self.context['request'].user
        if self.instance is None:  # Creation
            if user.addresses.count() >= 3:
                raise serializers.ValidationError("You can only add up to 3 addresses.")
        return attrs

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    
    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    #total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_total = serializers.DecimalField(max_digits=10, decimal_places=2) 
    class Meta:
        model = Order
        fields = ['id', 'status', 'created_at', 'amount_total', 'items']
