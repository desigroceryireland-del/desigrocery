from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryListView,
    ProductListView,
    ProductDetailView,
    get_cart,
    add_to_cart,
    update_cart_item,
    remove_cart_item,
    clear_cart,
    OrderViewSet,          # ✅ ViewSet for listing user orders
    create_checkout_session, # ✅ New view for creating order + stripe session
    stripe_webhook,        # ✅ Webhook listener
    AddressViewSet         # ✅ ViewSet for managing addresses
)

# ✅ Use Router for ViewSets (like Order history)
router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'addresses', AddressViewSet, basename='addresses')

urlpatterns = [
    # Store
    path("categories/", CategoryListView.as_view()),
    path("products/", ProductListView.as_view()),
    path("products/<slug:slug>/", ProductDetailView.as_view()),

    # Cart
    path("cart/", get_cart),
    path("cart/add/", add_to_cart),
    path("cart/update/", update_cart_item),
    path("cart/remove/", remove_cart_item),
    path("cart/clear/", clear_cart),

    # Orders & Payments
    path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
    path("webhook/stripe/", stripe_webhook, name="stripe-webhook"),

    # Router URLs (includes /orders/ list and detail views)
    path("", include(router.urls)),

]
