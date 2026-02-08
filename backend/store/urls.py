from django.urls import path
from .views import (
    CategoryListView,
    ProductListView,
    ProductDetailView,
    get_cart,
    add_to_cart,
    update_cart_item,
    remove_cart_item,
    clear_cart,
    CreateOrderView,
)

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

    # Orders
    path("orders/create/", CreateOrderView.as_view()),

]
