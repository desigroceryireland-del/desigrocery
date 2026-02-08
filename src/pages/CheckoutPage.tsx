import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, MapPin, CreditCard, Check, Plus, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from "@/lib/api";

const CheckoutPage = () => {
  const { state, subtotal, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses.find(a => a.isDefault)?.id || user?.addresses[0]?.id || ''
  );
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated || !user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

 const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    toast({
      title: "Select an address",
      description: "Please select a delivery address to continue.",
      variant: "destructive",
    });
    return;
  }

  if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv || !paymentDetails.name) {
    toast({
      title: "Payment details required",
      description: "Please fill in all payment details.",
      variant: "destructive",
    });
    return;
  }

  try {
    setIsProcessing(true);

    // 🧾 Prepare order items
    const items = state.items.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    // 📡 Call backend
    const data = await api.createOrder(items, state.discount);

    clearCart();

    toast({
      title: "Order placed successfully! 🎉",
      description: "Your order has been confirmed.",
    });

    // Go to order success page (we will build next)
    navigate(`/order-success/${data.order_id}`);

  } catch (err) {
    console.error(err);
    toast({
      title: "Order failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsProcessing(false);
  }
};

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="hover:text-primary">Cart</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Checkout</span>
        </nav>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-6 shadow-card border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Delivery Address</h2>
              </div>

              {user.addresses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No addresses saved</p>
                  <Link to="/profile">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Address
                    </Button>
                  </Link>
                </div>
              ) : (
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  <div className="grid gap-4">
                    {user.addresses.map(address => (
                      <label
                        key={address.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedAddress === address.id
                            ? 'border-primary bg-saffron-light'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <RadioGroupItem value={address.id} id={address.id} />
                        <div className="flex-1">
                          <p className="font-medium">{address.label}</p>
                          <p className="text-sm text-muted-foreground">{address.street}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.eircode}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </motion.div>

            {/* Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Payment Details</h2>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })}
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: formatExpiry(e.target.value) })}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, '') })}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-card border sticky top-32"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {state.items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      €{(Number(item.product.price) * item.quantity).toFixed(2)}

                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green">Free</span>
                </div>
                {state.discount > 0 && (
                  <div className="flex justify-between text-green">
                    <span>Discount ({state.discount}%)</span>
                    <span>-€{((subtotal * state.discount) / 100).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>€{Number(total).toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing your order, you agree to our Terms of Service
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
