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


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()

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
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["product", "product_name", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "total_amount", "discount", "final_amount", "created_at", "items"]
