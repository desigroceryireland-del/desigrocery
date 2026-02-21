# # from rest_framework import generics
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.permissions import IsAuthenticated
# # from rest_framework.response import Response
# # from rest_framework.views import APIView
# # from decimal import Decimal
# # import stripe
# # from django.conf import settings
# # from django.http import HttpResponse
# # from django.views.decorators.csrf import csrf_exempt
# # from rest_framework import viewsets, status
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.permissions import IsAuthenticated, AllowAny
# # from rest_framework.response import Response
# # from rest_framework import viewsets, permissions
# # from .models import Address
# # from .serializers import AddressSerializer
# # import logging
# # from django.db import transaction

# # from .models import Order, OrderItem, Product, Cart, CartItem
# # from .serializers import OrderSerializer

# # stripe.api_key = settings.STRIPE_SECRET_KEY

# # # ✅ 1. CREATE STRIPE CHECKOUT SESSION
# # @api_view(['POST'])
# # def create_checkout_session(request):
# #     """
# #     Expects payload:
# #     {
# #         "items": [{ "id": 1, "quantity": 2 }],
# #         "address": { ... } // Optional if you want to save address
# #     }
# #     """
# #     try:
# #         data = request.data
# #         user = request.user if request.user.is_authenticated else None
        
# #         # Calculate Line Items for Stripe
# #         line_items = []
# #         total_amount = 0
# #         order_items_data = []

# #         for item in data.get('items', []):
# #             product = Product.objects.get(id=item['product']['id'])
# #             quantity = item['quantity']
# #             price = product.price # Use current price

# #             line_items.append({
# #                 'price_data': {
# #                     'currency': 'eur', # or 'inr', 'usd'
# #                     'product_data': {
# #                         'name': product.name,
# #                         'images': [request.build_absolute_uri(product.image.url)] if product.image else [],
# #                     },
# #                     'unit_amount': int(price * 100), # Stripe expects cents
# #                 },
# #                 'quantity': quantity,
# #             })

# #             total_amount += price * quantity
# #             order_items_data.append({"product": product, "quantity": quantity, "price": price})

# #         # Create Pending Order in DB
# #         order = Order.objects.create(
# #             user=user,
# #             full_name=data.get('address', {}).get('name', 'Guest'),
# #             email=data.get('email', user.email if user else 'guest@example.com'),
# #             phone=data.get('address', {}).get('phone', ''),
# #             address_line=data.get('address', {}).get('street', ''),
# #             city=data.get('address', {}).get('city', ''),
# #             state=data.get('address', {}).get('state', ''),
# #             zip_code=data.get('address', {}).get('zip_code', ''),
# #             amount_total=total_amount,
# #             payment_status='pending'
# #         )

# #         for item_data in order_items_data:
# #             OrderItem.objects.create(
# #                 order=order,
# #                 product=item_data['product'],
# #                 price=item_data['price'],
# #                 quantity=item_data['quantity']
# #             )

# #         # Create Stripe Session
# #         checkout_session = stripe.checkout.Session.create(
# #             payment_method_types=['card'],
# #             line_items=line_items,
# #             mode='payment',
# #             success_url=f"{settings.FRONTEND_URL}/payment/success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order.id}",
# #             cancel_url=f"{settings.FRONTEND_URL}/payment/cancel",
# #             metadata={
# #                 "order_id": order.id
# #             }
# #         )
        
# #         # Save session ID to order
# #         order.stripe_session_id = checkout_session.id
# #         order.save()

# #         return Response({'url': checkout_session.url})

# #     except Exception as e:
# #         return Response({'error': str(e)}, status=400)


# # # ✅ 2. STRIPE WEBHOOK (Marks order as paid)
# # logger = logging.getLogger(__name__)

# # @csrf_exempt
# # def stripe_webhook(request):
# #     payload = request.body
# #     sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
# #     event = None

# #     try:
# #         event = stripe.Webhook.construct_event(
# #             payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
# #         )
# #     except ValueError as e:
# #         # Invalid payload
# #         logger.error("Invalid Payload")
# #         return HttpResponse(status=400)
# #     except stripe.error.SignatureVerificationError as e:
# #         # Invalid signature
# #         logger.error("Invalid Signature")
# #         return HttpResponse(status=400)

# #     # Handle the event
# #     if event['type'] == 'checkout.session.completed':
# #         session = event['data']['object']
        
# #         # ✅ FIX: Handle case where metadata might be missing
# #         order_id = session.get('metadata', {}).get('order_id')
        
# #         if not order_id:
# #             logger.error("No order_id found in session metadata")
# #             return HttpResponse(status=400)

# #         try:
# #             with transaction.atomic():
# #                 order = Order.objects.get(id=order_id)
                
# #                 # ✅ Check if already paid to avoid double processing
# #                 if order.payment_status == 'paid':
# #                     return HttpResponse(status=200)

# #                 order.payment_status = 'paid'
# #                 order.status = 'processing'
# #                 order.save()
                
# #                 # ✅ Clear Cart
# #                 if order.user:
# #                     CartItem.objects.filter(cart__user=order.user).delete() # Safer delete
                    
# #                 logger.info(f"Order {order_id} marked as paid.")

# #         except Order.DoesNotExist:
# #             logger.error(f"Order {order_id} not found.")
# #             return HttpResponse(status=404)

# #     return HttpResponse(status=200)

# # # ✅ 3. USER ORDERS VIEWSET
# # class OrderViewSet(viewsets.ReadOnlyModelViewSet):
# #     permission_classes = [IsAuthenticated]
# #     serializer_class = OrderSerializer

# #     def get_queryset(self):
# #         return Order.objects.filter(user=self.request.user).order_by('-created_at')

# # from .models import (
# #     Category,
# #     Product,
# #     Cart,
# #     CartItem,
# #     Order,
# #     OrderItem,
# # )
# # from .serializers import (
# #     CategorySerializer,
# #     ProductSerializer,
# #     CartSerializer,
# # )

# # # =========================
# # # CATEGORY & PRODUCT
# # # =========================

# # class CategoryListView(generics.ListAPIView):
# #     queryset = Category.objects.all()
# #     serializer_class = CategorySerializer


# # class ProductListView(generics.ListAPIView):
# #     serializer_class = ProductSerializer

# #     def get_queryset(self):
# #         queryset = Product.objects.all()

# #         category = self.request.query_params.get("category")
# #         subcategory = self.request.query_params.get("subcategory")
# #         search = self.request.query_params.get("search")

# #         if category:
# #             queryset = queryset.filter(category__slug=category)

# #         if subcategory:
# #             queryset = queryset.filter(subcategory__slug=subcategory)

# #         if search:
# #             queryset = queryset.filter(name__icontains=search)

# #         return queryset


# # class ProductDetailView(generics.RetrieveAPIView):
# #     queryset = Product.objects.all()
# #     serializer_class = ProductSerializer
# #     lookup_field = "slug"


# # # =========================
# # # CART
# # # =========================

# # def get_or_create_cart(user):
# #     cart, _ = Cart.objects.get_or_create(user=user)
# #     return cart


# # @api_view(["GET"])
# # @permission_classes([IsAuthenticated])
# # def get_cart(request):
# #     cart = get_or_create_cart(request.user)
# #     return Response(CartSerializer(cart).data)


# # @api_view(["POST"])
# # @permission_classes([IsAuthenticated])
# # def add_to_cart(request):
# #     product_id = request.data.get("product_id")
# #     quantity = int(request.data.get("quantity", 1))

# #     cart = get_or_create_cart(request.user)
# #     product = Product.objects.get(id=product_id)

# #     item, created = CartItem.objects.get_or_create(
# #         cart=cart,
# #         product=product
# #     )

# #     if not created:
# #         item.quantity += quantity
# #         item.save()

# #     return Response({"message": "Item added"})


# # @api_view(["PATCH"])
# # @permission_classes([IsAuthenticated])
# # def update_cart_item(request):
# #     product_id = request.data.get("product_id")
# #     quantity = int(request.data.get("quantity"))

# #     cart = get_or_create_cart(request.user)
# #     item = CartItem.objects.get(cart=cart, product_id=product_id)

# #     if quantity <= 0:
# #         item.delete()
# #     else:
# #         item.quantity = quantity
# #         item.save()

# #     return Response({"message": "Cart updated"})


# # @api_view(["DELETE"])
# # @permission_classes([IsAuthenticated])
# # def remove_cart_item(request):
# #     product_id = request.data.get("product_id")
# #     cart = get_or_create_cart(request.user)

# #     CartItem.objects.filter(cart=cart, product_id=product_id).delete()
# #     return Response({"message": "Item removed"})


# # @api_view(["DELETE"])
# # @permission_classes([IsAuthenticated])
# # def clear_cart(request):
# #     cart = get_or_create_cart(request.user)
# #     cart.items.all().delete()
# #     return Response({"message": "Cart cleared"})

# # class AddressViewSet(viewsets.ModelViewSet):
# #     serializer_class = AddressSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def get_queryset(self):
# #         return Address.objects.filter(user=self.request.user)

# #     def perform_create(self, serializer):
# #         serializer.save(user=self.request.user)


# from rest_framework import generics, viewsets, status, permissions
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.response import Response
# from decimal import Decimal
# import stripe
# import logging
# from django.conf import settings
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.db import transaction
# from django.db.models import Prefetch

# from .models import (
#     Category, SubCategory, Product, Location, 
#     ProductPrice, Cart, CartItem, Order, OrderItem, Address
# )
# from .serializers import (
#     CategorySerializer, ProductSerializer, CartSerializer, 
#     AddressSerializer, OrderSerializer, LocationSerializer
# )
# from .models import MiscellaneousCharge
# from .serializers import MiscellaneousChargeSerializer
# stripe.api_key = settings.STRIPE_SECRET_KEY
# logger = logging.getLogger(__name__)

# # =========================
# # LOCATION & CATEGORY
# # =========================

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_locations(request):
#     """Fetches all store locations for the frontend dropdown."""
#     locations = Location.objects.all()
#     return Response(LocationSerializer(locations, many=True).data)

# class CategoryListView(generics.ListAPIView):
#     """Fetches categories with nested subcategories."""
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]

# # =========================
# # PRODUCT VIEWS (Location-Aware)
# # =========================

# class ProductListView(generics.ListAPIView):
#     serializer_class = ProductSerializer

#     def get_queryset(self):
#         queryset = Product.objects.all()
        
#         # 1. Get slugs from the URL parameters
#         category_slug = self.request.query_params.get('category')
#         subcategory_slug = self.request.query_params.get('subcategory')

#         # 2. Apply filters if they exist
#         if category_slug:
#             queryset = queryset.filter(category__slug=category_slug)
        
#         if subcategory_slug:
#             queryset = queryset.filter(subcategory__slug=subcategory_slug)

#         return queryset

#     def get_serializer_context(self):
#         # Passing location_id to the serializer so prices update per city
#         context = super().get_serializer_context()
#         context.update({
#             "location_id": self.request.query_params.get('location')
#         })
#         return context

# # =========================
# # CART & ADDRESS
# # =========================

# def get_or_create_cart(user):
#     cart, _ = Cart.objects.get_or_create(user=user)
#     return cart

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_cart(request):
#     cart = get_or_create_cart(request.user)
#     context = {'location_id': request.query_params.get('location')}
#     return Response(CartSerializer(cart, context=context).data)

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def add_to_cart(request):
#     product_id = request.data.get("product_id")
#     quantity = int(request.data.get("quantity", 1))
#     cart = get_or_create_cart(request.user)
#     product = Product.objects.get(id=product_id)
#     item, created = CartItem.objects.get_or_create(cart=cart, product=product)
#     if not created:
#         item.quantity += quantity
#         item.save()
#     return Response({"message": "Item added"})

# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_cart_item(request):
#     product_id = request.data.get("product_id")
#     quantity = int(request.data.get("quantity"))
#     cart = get_or_create_cart(request.user)
#     item = CartItem.objects.get(cart=cart, product_id=product_id)
#     if quantity <= 0:
#         item.delete()
#     else:
#         item.quantity = quantity
#         item.save()
#     return Response({"message": "Cart updated"})

# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def remove_cart_item(request):
#     product_id = request.data.get("product_id")
#     cart = get_or_create_cart(request.user)
#     CartItem.objects.filter(cart=cart, product_id=product_id).delete()
#     return Response({"message": "Item removed"})

# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def clear_cart(request):
#     cart = get_or_create_cart(request.user)
#     cart.items.all().delete()
#     return Response({"message": "Cart cleared"})

# class AddressViewSet(viewsets.ModelViewSet):
#     serializer_class = AddressSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     def get_queryset(self):
#         return Address.objects.filter(user=self.request.user)
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# # =========================
# # STRIPE & ORDERS
# # =========================

# @api_view(['POST'])
# def create_checkout_session(request):
#     try:
#         data = request.data
#         user = request.user if request.user.is_authenticated else None
#         location_id = data.get('location_id')
        
#         if not location_id:
#             return Response({'error': 'Location is required for correct pricing'}, status=400)

#         line_items = []
#         total_amount = 0
#         order_items_data = []

#         for item in data.get('items', []):
#             product = Product.objects.get(id=item['product']['id'])
#             quantity = item['quantity']
            
#             # Fetch the price specifically for the chosen location
#             price_data = ProductPrice.objects.filter(product=product, location_id=location_id).first()
#             if not price_data:
#                 continue
            
#             price = price_data.price

#             line_items.append({
#                 'price_data': {
#                     'currency': 'eur',
#                     'product_data': {
#                         'name': product.name,
#                     },
#                     'unit_amount': int(price * 100),
#                 },
#                 'quantity': quantity,
#             })

#             total_amount += price * quantity
#             order_items_data.append({"product": product, "quantity": quantity, "price": price})

#         order = Order.objects.create(
#             user=user,
#             full_name=data.get('address', {}).get('name', 'Guest'),
#             email=data.get('email', user.email if user else 'guest@example.com'),
#             phone=data.get('address', {}).get('phone', ''),
#             address_line=data.get('address', {}).get('street', ''),
#             city=data.get('address', {}).get('city', ''),
#             state=data.get('address', {}).get('state', ''),
#             zip_code=data.get('address', {}).get('zip_code', ''),
#             amount_total=total_amount,
#             payment_status='pending'
#         )

#         for item_data in order_items_data:
#             OrderItem.objects.create(
#                 order=order, product=item_data['product'],
#                 price=item_data['price'], quantity=item_data['quantity']
#             )

#         checkout_session = stripe.checkout.Session.create(
#             payment_method_types=['card'],
#             line_items=line_items,
#             mode='payment',
#             success_url=f"{settings.FRONTEND_URL}/payment/success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order.id}",
#             cancel_url=f"{settings.FRONTEND_URL}/payment/cancel",
#             metadata={"order_id": order.id}
#         )
        
#         order.stripe_session_id = checkout_session.id
#         order.save()
#         return Response({'url': checkout_session.url})

#     except Exception as e:
#         return Response({'error': str(e)}, status=400)

# class OrderViewSet(viewsets.ReadOnlyModelViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = OrderSerializer
#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user).order_by('-created_at')

# @csrf_exempt
# def stripe_webhook(request):
#     # Standard Webhook logic here...
#     return HttpResponse(status=200)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_to_cart(request):
#     product_id = request.data.get('product_id')
#     quantity = int(request.data.get('quantity', 1))
    
#     try:
#         product = Product.objects.get(id=product_id)
#         cart, _ = Cart.objects.get_or_create(user=request.user)
        
#         # Check if item already exists
#         cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
#         if not created:
#             cart_item.quantity += quantity
#         else:
#             cart_item.quantity = quantity
            
#         cart_item.save()

#         # IMPORTANT: Return a clean Serializer response
#         # Pass context if your serializer needs location pricing
#         location_id = request.data.get('location_id')
#         serializer = CartSerializer(cart, context={'location_id': location_id})
#         return Response(serializer.data, status=200)

#     except Product.DoesNotExist:
#         return Response({"error": "Product not found"}, status=404)
#     except Exception as e:
#         print(f"Error adding to cart: {e}")
#         return Response({"error": str(e)}, status=500)
    
# @api_view(['GET'])
# @permission_classes([AllowAny]) # Using AllowAny so the checkout can see charges even before login
# def get_misc_charges(request):
#     charges = MiscellaneousCharge.objects.filter(is_active=True)
#     serializer = MiscellaneousChargeSerializer(charges, many=True)
#     return Response(serializer.data)

from rest_framework import generics, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from decimal import Decimal
import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction

from .models import (
    Category, SubCategory, Product, Location, 
    ProductPrice, Cart, CartItem, Order, OrderItem, Address, MiscellaneousCharge
)
from .serializers import (
    CategorySerializer, ProductSerializer, CartSerializer, 
    AddressSerializer, OrderSerializer, LocationSerializer, MiscellaneousChargeSerializer
)

stripe.api_key = settings.STRIPE_SECRET_KEY
logger = logging.getLogger(__name__)

# =========================
# LOCATION & CATEGORY
# =========================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_locations(request):
    """Fetches all store locations for the frontend dropdown."""
    locations = Location.objects.all()
    return Response(LocationSerializer(locations, many=True).data)

class CategoryListView(generics.ListAPIView):
    """Fetches categories with nested subcategories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

# =========================
# PRODUCT VIEWS (Location-Aware & Filtered)
# =========================

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # 1. Start with all products
        queryset = Product.objects.all().select_related('category', 'subcategory').prefetch_related('location_prices')
        
        category_slug = self.request.query_params.get('category')
        subcategory_slug = self.request.query_params.get('subcategory')
        location_id = self.request.query_params.get('location') # Capture the location ID

        # 2. Filter by Category & SubCategory
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if subcategory_slug:
            queryset = queryset.filter(subcategory__slug=subcategory_slug)

        # 3. THE FIX: Strict Location Filtering
        # This ensures the product is ONLY returned if it has an entry in ProductPrice 
        # for the specific location selected.
        if location_id:
            queryset = queryset.filter(location_prices__location_id=location_id).distinct()

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({
            "location_id": self.request.query_params.get('location'),
            "request": self.request
        })
        return context

# Added this to fix the ImportError in your URLs
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({
            "location_id": self.request.query_params.get('location'),
            "request": self.request
        })
        return context

# =========================
# CART & ADDRESS
# =========================

def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart = get_or_create_cart(request.user)
    context = {
        'location_id': request.query_params.get('location'),
        'request': request
    }
    return Response(CartSerializer(cart, context=context).data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))
    location_id = request.data.get('location_id')
    
    try:
        product = Product.objects.get(id=product_id)
        cart = get_or_create_cart(request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        
        serializer = CartSerializer(cart, context={'location_id': location_id, 'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity"))
    cart = get_or_create_cart(request.user)
    
    try:
        item = CartItem.objects.get(cart=cart, product_id=product_id)
        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()
        return Response({"message": "Cart updated"})
    except CartItem.DoesNotExist:
        return Response({"error": "Item not in cart"}, status=404)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_cart_item(request):
    product_id = request.data.get("product_id")
    cart = get_or_create_cart(request.user)
    CartItem.objects.filter(cart=cart, product_id=product_id).delete()
    return Response({"message": "Item removed"})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    cart = get_or_create_cart(request.user)
    cart.items.all().delete()
    return Response({"message": "Cart cleared"})

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# =========================
# STRIPE & ORDERS
# =========================

@api_view(['POST'])
def create_checkout_session(request):
    try:
        data = request.data
        user = request.user if request.user.is_authenticated else None
        location_id = data.get('location_id')
        
        if not location_id:
            return Response({'error': 'Location is required'}, status=400)

        line_items = []
        total_amount = Decimal('0.00')
        order_items_data = []

        for item in data.get('items', []):
            product = Product.objects.get(id=item['product']['id'])
            quantity = item['quantity']
            
            price_data = ProductPrice.objects.filter(product=product, location_id=location_id).first()
            if not price_data: continue
            
            price = price_data.price
            line_items.append({
                'price_data': {
                    'currency': 'eur',
                    'product_data': {'name': product.name},
                    'unit_amount': int(price * 100),
                },
                'quantity': quantity,
            })
            total_amount += price * quantity
            order_items_data.append({"product": product, "quantity": quantity, "price": price})

        order = Order.objects.create(
            user=user,
            full_name=data.get('address', {}).get('name', 'Guest'),
            email=data.get('email', user.email if user else 'guest@example.com'),
            phone=data.get('address', {}).get('phone', ''),
            address_line=data.get('address', {}).get('street', ''),
            city=data.get('address', {}).get('city', ''),
            state=data.get('address', {}).get('state', ''),
            zip_code=data.get('address', {}).get('zip_code', ''),
            amount_total=total_amount,
            payment_status='pending'
        )

        for item_data in order_items_data:
            OrderItem.objects.create(
                order=order, product=item_data['product'],
                price=item_data['price'], quantity=item_data['quantity']
            )

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f"{settings.FRONTEND_URL}/payment/success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order.id}",
            cancel_url=f"{settings.FRONTEND_URL}/payment/cancel",
            metadata={"order_id": order.id}
        )
        
        order.stripe_session_id = checkout_session.id
        order.save()
        return Response({'url': checkout_session.url})

    except Exception as e:
        return Response({'error': str(e)}, status=400)

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

@csrf_exempt
def stripe_webhook(request):
    return HttpResponse(status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_misc_charges(request):
    charges = MiscellaneousCharge.objects.filter(is_active=True)
    serializer = MiscellaneousChargeSerializer(charges, many=True)
    return Response(serializer.data)