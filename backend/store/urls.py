# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import (
#     CategoryListView,
#     ProductListView,
#     ProductDetailView,
#     get_cart,
#     add_to_cart,
#     update_cart_item,
#     remove_cart_item,
#     clear_cart,
#     OrderViewSet,          # ✅ ViewSet for listing user orders
#     create_checkout_session, # ✅ New view for creating order + stripe session
#     stripe_webhook,        # ✅ Webhook listener
#     AddressViewSet         # ✅ ViewSet for managing addresses
# )

# # ✅ Use Router for ViewSets (like Order history)
# router = DefaultRouter()
# router.register(r'orders', OrderViewSet, basename='orders')
# router.register(r'addresses', AddressViewSet, basename='addresses')

# urlpatterns = [
#     # Store
#     path("categories/", CategoryListView.as_view()),
#     path("products/", ProductListView.as_view()),
#     path("products/<slug:slug>/", ProductDetailView.as_view()),

#     # Cart
#     path("cart/", get_cart),
#     path("cart/add/", add_to_cart),
#     path("cart/update/", update_cart_item),
#     path("cart/remove/", remove_cart_item),
#     path("cart/clear/", clear_cart),

#     # Orders & Payments
#     path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
#     path("webhook/stripe/", stripe_webhook, name="stripe-webhook"),

#     # Router URLs (includes /orders/ list and detail views)
#     path("", include(router.urls)),

# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter

# ✅ Fix 1: Use '.views' to refer to the current app's views
from .views import (
    CategoryListView,
    ProductListView,
    ProductDetailView,
    get_cart,
    add_to_cart,
    update_cart_item,
    remove_cart_item,
    clear_cart,
    get_locations,
    OrderViewSet,
    create_checkout_session,
    stripe_webhook,
    AddressViewSet,
    get_misc_charges  # ✅ Add this to your store views import list
)

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'addresses', AddressViewSet, basename='addresses')

urlpatterns = [
    # Store Configuration
    path("locations/", get_locations, name="get-locations"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),

    # Cart Operations
    path("cart/", get_cart, name="get-cart"),
    path("cart/add/", add_to_cart, name="add-to-cart"),
    path("cart/update/", update_cart_item, name="update-cart"),
    path("cart/remove/", remove_cart_item, name="remove-cart"),
    path("cart/clear/", clear_cart, name="clear-cart"),

    # Orders & Payments
    path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
    path("webhook/stripe/", stripe_webhook, name="stripe-webhook"),

    # ✅ Fix 2: Reference the function directly since it's imported above
    path("miscellaneous-charges/", get_misc_charges, name="misc-charges"),

    # Viewsets
    path("", include(router.urls)),
]