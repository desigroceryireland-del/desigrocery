from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from decimal import Decimal

from .models import (
    Category,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
)
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CartSerializer,
)

# =========================
# CATEGORY & PRODUCT
# =========================

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        category = self.request.query_params.get("category")
        subcategory = self.request.query_params.get("subcategory")
        search = self.request.query_params.get("search")

        if category:
            queryset = queryset.filter(category__slug=category)

        if subcategory:
            queryset = queryset.filter(subcategory__slug=subcategory)

        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"


# =========================
# CART
# =========================

def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart = get_or_create_cart(request.user)
    return Response(CartSerializer(cart).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    cart = get_or_create_cart(request.user)
    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += quantity
        item.save()

    return Response({"message": "Item added"})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity"))

    cart = get_or_create_cart(request.user)
    item = CartItem.objects.get(cart=cart, product_id=product_id)

    if quantity <= 0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()

    return Response({"message": "Cart updated"})


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


# =========================
# ORDER (NO PROMO LOGIC)
# =========================

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        items = request.data.get("items", [])
        total = Decimal("0.00")

        order = Order.objects.create(
            user=request.user,
            total_amount=Decimal("0.00"),
        )

        for item in items:
            product = Product.objects.get(id=item["product_id"])
            quantity = int(item["quantity"])
            price = product.price

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=price,
            )

            total += price * quantity

        order.total_amount = total
        order.save()

        return Response({
            "order_id": order.id,
            "total_amount": str(total),
        })
