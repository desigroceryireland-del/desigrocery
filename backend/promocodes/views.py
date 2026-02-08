from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ApplyPromoSerializer

class ApplyPromoCodeView(APIView):
    """
    POST /api/promocodes/apply/
    """

    def post(self, request):
        serializer = ApplyPromoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        promo = serializer.validated_data["promo"]
        cart_total = serializer.validated_data["cart_total"]
        discount = serializer.validated_data["discount"]
        final_total = cart_total - discount

        return Response({
            "valid": True,
            "code": promo.code,
            "discount": str(discount),
            "discount_amount": str(discount),
            "final_total": str(final_total),
        }, status=status.HTTP_200_OK)
