# from django.contrib import admin
# from .models import Category, SubCategory, Product
# from django.contrib import admin
# from .models import Category, SubCategory, Product, Order, OrderItem, Address
# from .models import Product, Location, ProductPrice
# # ✅ Inline: Show items inside the Order page
# class OrderItemInline(admin.TabularInline):
#     model = OrderItem
#     extra = 0  # Don't show extra empty rows
#     readonly_fields = ('product', 'price', 'quantity', 'get_total')
#     can_delete = False  # Prevent deleting items from a completed order

#     def get_total(self, obj):
#         return f"€{obj.get_total()}"
#     get_total.short_description = "Line Total"

# # ✅ Order Admin Configuration
# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = (
#         'id', 
#         'user_email', 
#         'amount_total', 
#         'status', 
#         'payment_status', 
#         'created_at'
#     )
#     list_filter = ('status', 'payment_status', 'created_at')
#     search_fields = ('id', 'user__email', 'email', 'stripe_session_id')
#     readonly_fields = ('created_at', 'stripe_session_id', 'amount_total')
#     inlines = [OrderItemInline]
    
#     fieldsets = (
#         ('Order Information', {
#             'fields': ('user', 'status', 'created_at', 'amount_total')
#         }),
#         ('Payment Details', {
#             'fields': ('stripe_session_id', 'payment_status')
#         }),
#         ('Shipping Address', {
#             'fields': ('full_name', 'email', 'phone', 'address_line', 'city', 'zip_code')
#         }),
#     )

#     def user_email(self, obj):
#         return obj.user.email if obj.user else obj.email
#     user_email.short_description = "Customer"

# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(SubCategory)
# class SubCategoryAdmin(admin.ModelAdmin):
#     list_display = ("name", "category")
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("name", "category", "subcategory", "price", "in_stock", "in_offer")
#     list_filter = ("category", "subcategory", "in_stock", "in_offer")
#     prepopulated_fields = {"slug": ("name",)}

# @admin.register(Address)
# class AddressAdmin(admin.ModelAdmin):
#     list_display = ('user', 'city', 'state', 'is_default')
#     list_filter = ('city', 'state')
#     search_fields = ('user__email', 'street', 'zip_code')

# class ProductPriceInline(admin.TabularInline):
#     model = ProductPrice
#     extra = 1  # Number of empty rows to show for new locations

# # 2. Register Product with the Inline
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'category')
#     inlines = [ProductPriceInline]

# # 3. Register Location separately so you can add new cities
# @admin.register(Location)
# class LocationAdmin(admin.ModelAdmin):
#     list_display = ('name', 'slug')
#     prepopulated_fields = {'slug': ('name',)}
from django.contrib import admin
from .models import (
    Category, 
    SubCategory, 
    Product, 
    Order, 
    OrderItem, 
    Address, 
    Location, 
    ProductPrice,
    MiscellaneousCharge
)

# ✅ Inline: Show product prices for different locations inside the Product page
class ProductPriceInline(admin.TabularInline):
    model = ProductPrice
    extra = 1  # Shows one empty row by default to add a new location price
    fields = ('location', 'price', 'original_price', 'stock_count', 'in_stock')

# ✅ Inline: Show items inside the Order page
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'price', 'quantity', 'get_total')
    can_delete = False

    def get_total(self, obj):
        return f"€{obj.get_total()}"
    get_total.short_description = "Line Total"

# ✅ Product Admin Configuration
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Note: 'price' removed from list_display because it's now in ProductPrice
    list_display = ("name", "category", "subcategory", "in_offer", "rating")
    list_filter = ("category", "subcategory", "in_offer")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductPriceInline] # This allows you to set prices per location

# ✅ Location Admin Configuration
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

# ✅ Order Admin Configuration
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_number',  # ✅ Swapped 'id' for 'order_number'
        'user_email', 
        'amount_total', 
        'status', 
        'payment_status', 
        'created_at'
    )
    
    # ✅ Makes the status changeable directly from the main list
    list_editable = ('status',) 
    
    # ✅ Ensures you can click the order number to open details
    list_display_links = ('order_number',) 
    
    list_filter = ('status', 'payment_status', 'created_at')
    
    # ✅ Updated search to include the new order number
    search_fields = ('order_number', 'user__email', 'email', 'stripe_session_id')
    
    # ✅ Added order_number to readonly since it's auto-generated
    readonly_fields = ('order_number', 'created_at', 'stripe_session_id', 'amount_total')
    
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'user', 'status', 'created_at', 'amount_total')
        }),
        ('Payment Details', {
            'fields': ('stripe_session_id', 'payment_status')
        }),
        ('Shipping Address', {
            'fields': ('full_name', 'email', 'phone', 'address_line', 'city', 'zip_code')
        }),
    )

    def user_email(self, obj):
        return obj.user.email if obj.user else obj.email
    user_email.short_description = "Customer"

# ✅ Category & Subcategory Configuration
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    prepopulated_fields = {"slug": ("name",)}

# ✅ Address Configuration
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'city', 'state', 'is_default')
    list_filter = ('city', 'state')
    search_fields = ('user__email', 'street', 'zip_code')

@admin.register(MiscellaneousCharge)
class MiscellaneousChargeAdmin(admin.ModelAdmin):
    list_display = ('name', 'charge_type', 'value', 'is_active') # Columns shown in the list view
    list_filter = ('charge_type', 'is_active')                 # Filters on the right side
    search_fields = ('name',)                                  # Search bar for names
    list_editable = ('is_active', 'value')