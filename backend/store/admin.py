from django.contrib import admin
from .models import Category, SubCategory, Product
from django.contrib import admin
from .models import Category, SubCategory, Product, Order, OrderItem, Address

# ✅ Inline: Show items inside the Order page
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Don't show extra empty rows
    readonly_fields = ('product', 'price', 'quantity', 'get_total')
    can_delete = False  # Prevent deleting items from a completed order

    def get_total(self, obj):
        return f"€{obj.get_total()}"
    get_total.short_description = "Line Total"

# ✅ Order Admin Configuration
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'user_email', 
        'amount_total', 
        'status', 
        'payment_status', 
        'created_at'
    )
    list_filter = ('status', 'payment_status', 'created_at')
    search_fields = ('id', 'user__email', 'email', 'stripe_session_id')
    readonly_fields = ('created_at', 'stripe_session_id', 'amount_total')
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('user', 'status', 'created_at', 'amount_total')
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

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "subcategory", "price", "in_stock", "in_offer")
    list_filter = ("category", "subcategory", "in_stock", "in_offer")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'city', 'state', 'is_default')
    list_filter = ('city', 'state')
    search_fields = ('user__email', 'street', 'zip_code')