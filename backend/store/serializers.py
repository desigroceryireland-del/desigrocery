# # from rest_framework import serializers
# # from .models import Category, SubCategory, Product

# # class SubCategorySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = SubCategory
# #         fields = ["id", "name", "slug"]


# # class CategorySerializer(serializers.ModelSerializer):
# #     subcategories = SubCategorySerializer(many=True, read_only=True)

# #     class Meta:
# #         model = Category
# #         fields = ["id", "name", "slug", "image", "subcategories"]


# # from rest_framework import serializers
# # from .models import Product, Category, SubCategory

# # class ProductSerializer(serializers.ModelSerializer):
# #     category = serializers.StringRelatedField()
# #     subcategory = serializers.StringRelatedField()
# #     image = serializers.SerializerMethodField()  # ✅ Custom method for full URL

# #     class Meta:
# #         model = Product
# #         fields = [
# #             "id",
# #             "name",
# #             "slug",
# #             "description",
# #             "price",
# #             "original_price",
# #             "image",
# #             "unit",
# #             "in_stock",
# #             "in_offer",
# #             "rating",
# #             "reviews_count",
# #             "category",
# #             "subcategory",
# #         ]

# #     def get_image(self, obj):
# #         request = self.context.get('request')
# #         if obj.image:
# #             # ✅ Return full absolute URL (e.g. http://127.0.0.1:8000/media/...)
# #             if request:
# #                 return request.build_absolute_uri(obj.image.url)
# #             return f"http://127.0.0.1:8000{obj.image.url}" # Fallback
# #         return None

# # from .models import Cart, CartItem

# # class CartItemSerializer(serializers.ModelSerializer):
# #     product = serializers.SerializerMethodField()

# #     class Meta:
# #         model = CartItem
# #         fields = ["id", "product", "quantity"]

# #     def get_product(self, obj):
# #         return {
# #             "id": obj.product.id,
# #             "name": obj.product.name,
# #             "price": obj.product.price,
# #             "image": obj.product.image.url if obj.product.image else None,
# #             "unit": obj.product.unit,
# #         }


# # class CartSerializer(serializers.ModelSerializer):
# #     items = CartItemSerializer(many=True)

# #     class Meta:
# #         model = Cart
# #         fields = ["id", "items"]
# # # serializers.py
# # from rest_framework import serializers
# # from .models import Address, Order, OrderItem

# # class AddressSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Address
# #         fields = ['id', 'name', 'phone', 'street', 'city', 'state', 'zip_code', 'is_default']
# #         read_only_fields = ['id']

# #     def validate(self, attrs):
# #         # Limit to 3 addresses per user
# #         user = self.context['request'].user
# #         if self.instance is None:  # Creation
# #             if user.addresses.count() >= 3:
# #                 raise serializers.ValidationError("You can only add up to 3 addresses.")
# #         return attrs

# # class OrderItemSerializer(serializers.ModelSerializer):
# #     product_name = serializers.CharField(source='product.name')
    
# #     class Meta:
# #         model = OrderItem
# #         fields = ['product_name', 'quantity', 'price']

# # class OrderSerializer(serializers.ModelSerializer):
# #     items = OrderItemSerializer(many=True, read_only=True)
# #     #total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
# #     amount_total = serializers.DecimalField(max_digits=10, decimal_places=2) 
# #     class Meta:
# #         model = Order
# #         fields = ['id', 'status', 'created_at', 'amount_total', 'items']


# # from rest_framework import serializers
# # from .models import (
# #     Category, SubCategory, Product, ProductPrice, 
# #     Location, Cart, CartItem, Address, Order, OrderItem
# # )

# # # ✅ 1. CATEGORY & SUBCATEGORY (Missing in your version)
# # class SubCategorySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = SubCategory
# #         fields = ["id", "name", "slug"]

# # class CategorySerializer(serializers.ModelSerializer):
# #     subcategories = SubCategorySerializer(many=True, read_only=True)

# #     class Meta:
# #         model = Category
# #         fields = ["id", "name", "slug", "image", "subcategories"]

# # # ✅ 2. LOCATION
# # class LocationSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Location
# #         fields = ["id", "name", "slug", "address"]

# # # ✅ 3. PRODUCT (Location-Aware)
# # class ProductSerializer(serializers.ModelSerializer):
# #     category = serializers.StringRelatedField()
# #     subcategory = serializers.StringRelatedField()
# #     image = serializers.SerializerMethodField()
    
# #     price = serializers.SerializerMethodField()
# #     original_price = serializers.SerializerMethodField()
# #     stock_count = serializers.SerializerMethodField()
# #     in_stock = serializers.SerializerMethodField()

# #     class Meta:
# #         model = Product
# #         fields = [
# #             "id", "name", "slug", "description", "image", "unit", 
# #             "in_offer", "rating", "reviews_count", "category", "subcategory",
# #             "price", "original_price", "stock_count", "in_stock"
# #         ]

# #     def get_price_data(self, obj):
# #         location_id = self.context.get('location_id')
# #         return obj.location_prices.filter(location_id=location_id).first()

# #     def get_price(self, obj):
# #         data = self.get_price_data(obj)
# #         return data.price if data else None

# #     def get_original_price(self, obj):
# #         data = self.get_price_data(obj)
# #         return data.original_price if data else None

# #     def get_stock_count(self, obj):
# #         data = self.get_price_data(obj)
# #         return data.stock_count if data else 0

# #     def get_in_stock(self, obj):
# #         data = self.get_price_data(obj)
# #         return data.in_stock if data else False

# #     def get_image(self, obj):
# #         request = self.context.get('request')
# #         if obj.image:
# #             if request:
# #                 return request.build_absolute_uri(obj.image.url)
# #             return f"http://127.0.0.1:8000{obj.image.url}"
# #         return None

# # # ✅ 4. CART
# # class CartItemSerializer(serializers.ModelSerializer):
# #     product = serializers.SerializerMethodField()

# #     class Meta:
# #         model = CartItem
# #         fields = ["id", "product", "quantity"]

# #     def get_product(self, obj):
# #         location_id = self.context.get('location_id')
# #         price_data = obj.product.location_prices.filter(location_id=location_id).first()
# #         return {
# #             "id": obj.product.id,
# #             "name": obj.product.name,
# #             "price": price_data.price if price_data else None,
# #             "image": obj.product.image.url if obj.product.image else None,
# #             "unit": obj.product.unit,
# #         }

# # class CartSerializer(serializers.ModelSerializer):
# #     items = CartItemSerializer(many=True, read_only=True)
# #     class Meta:
# #         model = Cart
# #         fields = ["id", "items"]

# # # ✅ 5. ADDRESS & ORDERS
# # class AddressSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Address
# #         fields = ['id', 'name', 'phone', 'street', 'city', 'state', 'zip_code', 'is_default']

# # class OrderItemSerializer(serializers.ModelSerializer):
# #     product_name = serializers.CharField(source='product.name')
# #     class Meta:
# #         model = OrderItem
# #         fields = ['product_name', 'quantity', 'price']

# # class OrderSerializer(serializers.ModelSerializer):
# #     items = OrderItemSerializer(many=True, read_only=True)
# #     class Meta:
# #         model = Order
# #         fields = ['id', 'status', 'created_at', 'amount_total', 'items']

# from rest_framework import serializers
# from .models import (
#     Category, SubCategory, Product, ProductPrice, 
#     Location, Cart, CartItem, Address, Order, OrderItem, MiscellaneousCharge
# )

# # ✅ 1. CATEGORY & SUBCATEGORY
# class SubCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubCategory
#         fields = ["id", "name", "slug"]

# class CategorySerializer(serializers.ModelSerializer):
#     subcategories = SubCategorySerializer(many=True, read_only=True)

#     class Meta:
#         model = Category
#         fields = ["id", "name", "slug", "image", "subcategories"]

# # ✅ 2. LOCATION
# class LocationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Location
#         fields = ["id", "name", "slug", "address"]

# # ✅ 3. PRODUCT (Location-Aware with Fallback Fix)
# class ProductSerializer(serializers.ModelSerializer):
#     category = serializers.StringRelatedField()
#     subcategory = serializers.StringRelatedField()
#     image = serializers.SerializerMethodField()
    
#     price = serializers.SerializerMethodField()
#     original_price = serializers.SerializerMethodField()
#     stock_count = serializers.SerializerMethodField()
#     in_stock = serializers.SerializerMethodField()

#     class Meta:
#         model = Product
#         fields = [
#             "id", "name", "slug", "description", "image", "unit", 
#             "in_offer", "rating", "reviews_count", "category", "subcategory",
#             "price", "original_price", "stock_count", "in_stock"
#         ]

#     def get_price_data(self, obj):
#         location_id = self.context.get('location_id')
#         prices = list(obj.location_prices.all())
        
#         if not prices:
#             return None

#         if location_id:
#             price_obj = next((p for p in prices if str(p.location_id) == str(location_id)), None)
#             if price_obj:
#                 return price_obj

#         # Fallback: if no location match, show the first available price so it's not 0
#         return prices[0]

#     def get_price(self, obj):
#         data = self.get_price_data(obj)
#         return data.price if data else 0.00

#     def get_original_price(self, obj):
#         data = self.get_price_data(obj)
#         return data.original_price if data else 0.00

#     def get_stock_count(self, obj):
#         data = self.get_price_data(obj)
#         return data.stock_count if data else 0

#     def get_in_stock(self, obj):
#         data = self.get_price_data(obj)
#         # Fix: Ensure it checks the in_stock boolean AND count
#         return (data.in_stock and data.stock_count > 0) if data else False

#     def get_image(self, obj):
#         request = self.context.get('request')
#         if obj.image:
#             if request:
#                 return request.build_absolute_uri(obj.image.url)
#             return f"http://127.0.0.1:8000{obj.image.url}"
#         return None
# # ✅ 4. CART
# class CartItemSerializer(serializers.ModelSerializer):
#     product = serializers.SerializerMethodField()

#     class Meta:
#         model = CartItem
#         fields = ["id", "product", "quantity"]

#     def get_product(self, obj):
#         location_id = self.context.get('location_id')
        
#         # Apply the same fallback logic for Cart to ensure prices show up
#         price_data = obj.product.location_prices.filter(location_id=location_id).first()
#         if not price_data:
#             price_data = obj.product.location_prices.first()

#         return {
#             "id": obj.product.id,
#             "name": obj.product.name,
#             "price": price_data.price if price_data else 0.00,
#             "image": obj.product.image.url if obj.product.image else None,
#             "unit": obj.product.unit,
#         }

# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, read_only=True)
#     class Meta:
#         model = Cart
#         fields = ["id", "items"]

# # ✅ 5. ADDRESS & ORDERS
# class AddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Address
#         fields = ['id', 'name', 'phone', 'street', 'city', 'state', 'zip_code', 'is_default']

# class OrderItemSerializer(serializers.ModelSerializer):
#     product_name = serializers.CharField(source='product.name')
#     class Meta:
#         model = OrderItem
#         fields = ['product_name', 'quantity', 'price']

# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, read_only=True)
#     class Meta:
#         model = Order
#         fields = ['id', 'status', 'created_at', 'amount_total', 'items']



# class MiscellaneousChargeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MiscellaneousCharge
#         fields = ['id', 'name', 'charge_type', 'value']

# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, read_only=True)
#     # We add these as extra fields in the response
#     charges = serializers.SerializerMethodField()
#     total_price = serializers.SerializerMethodField()

#     class Meta:
#         model = Cart
#         fields = ["id", "items", "charges", "total_price"]

#     def get_charges(self, obj):
#         # Fetch all active charges
#         active_charges = MiscellaneousCharge.objects.filter(is_active=True)
#         return MiscellaneousChargeSerializer(active_charges, many=True).data

#     def get_total_price(self, obj):
#         # This logic ensures the backend and frontend stay in sync
#         subtotal = sum(item.product.price * item.quantity for item in obj.items.all())
#         charges = MiscellaneousCharge.objects.filter(is_active=True)
#         total_charges = sum(c.calculate_charge(subtotal) for c in charges)
#         return subtotal + total_charges

from rest_framework import serializers
from .models import (
    Category, SubCategory, Product, ProductPrice, 
    Location, Cart, CartItem, Address, Order, OrderItem, MiscellaneousCharge
)

# ✅ 1. CATEGORY & SUBCATEGORY
# Added 'slug' to SubCategory so the frontend can route to /category/sub-category
class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ["id", "name", "slug"]

# Nesting subcategories inside Category for the Sidebar/MegaMenu
class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "image", "subcategories"]

# ✅ 2. LOCATION
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "name", "slug", "address"]

# ✅ 3. PRODUCT (Location-Aware with Fallback Fix)
class ProductSerializer(serializers.ModelSerializer):
    # These return the Name of the category/subcategory for display
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    
    # These return the Slugs for frontend URL navigation
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    subcategory_slug = serializers.CharField(source='subcategory.slug', read_only=True)
    
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    original_price = serializers.SerializerMethodField()
    stock_count = serializers.SerializerMethodField()
    in_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "image", "unit", 
            "in_offer", "rating", "reviews_count", 
            "category_name", "category_slug", 
            "subcategory_name", "subcategory_slug",
            "price", "original_price", "stock_count", "in_stock"
        ]

    def get_price_data(self, obj):
        location_id = self.context.get('location_id')
        prices = list(obj.location_prices.all())
        
        if not prices:
            return None

        if location_id:
            price_obj = next((p for p in prices if str(p.location_id) == str(location_id)), None)
            if price_obj:
                return price_obj

        # Fallback: prevents 0€ display if location is not set
        return prices[0]

    def get_price(self, obj):
        data = self.get_price_data(obj)
        return data.price if data else 0.00

    def get_original_price(self, obj):
        data = self.get_price_data(obj)
        return data.original_price if data else 0.00

    def get_stock_count(self, obj):
        data = self.get_price_data(obj)
        return data.stock_count if data else 0

    def get_in_stock(self, obj):
        data = self.get_price_data(obj)
        # Fix: Product is only "In Stock" if the flag is True AND count > 0
        return (data.in_stock and data.stock_count > 0) if data else False

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://127.0.0.1:8000{obj.image.url}"
        return None

# ✅ 4. CART & CHARGES
class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]

    def get_product(self, obj):
        location_id = self.context.get('location_id')
        price_data = obj.product.location_prices.filter(location_id=location_id).first()
        if not price_data:
            price_data = obj.product.location_prices.first()

        return {
            "id": obj.product.id,
            "name": obj.product.name,
            "slug": obj.product.slug,
            "price": price_data.price if price_data else 0.00,
            "image": obj.product.image.url if obj.product.image else None,
            "unit": obj.product.unit,
        }

class MiscellaneousChargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiscellaneousCharge
        fields = ['id', 'name', 'charge_type', 'value']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    charges = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "charges", "total_price"]

    def get_charges(self, obj):
        active_charges = MiscellaneousCharge.objects.filter(is_active=True)
        return MiscellaneousChargeSerializer(active_charges, many=True).data

    def get_total_price(self, obj):
        # Calculates subtotal based on location-aware price
        # Note: If prices vary wildly by location, ensure the view passes location_id to context
        subtotal = sum(item.product.price * item.quantity for item in obj.items.all())
        charges = MiscellaneousCharge.objects.filter(is_active=True)
        total_charges = sum(c.calculate_charge(subtotal) for c in charges)
        return subtotal + total_charges

# ✅ 5. ADDRESS & ORDERS
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'name', 'phone', 'street', 'city', 'state', 'zip_code', 'is_default']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        # ✅ Added 'order_number' and kept 'id' (optional, but good for internal keys)
        fields = ['id', 'order_number', 'status', 'created_at', 'amount_total', 'items']
        # ✅ Ensure order_number is read_only so the frontend can't try to change it
        read_only_fields = ['order_number']