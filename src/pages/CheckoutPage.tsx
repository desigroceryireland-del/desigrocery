// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   ChevronRight,
//   MapPin,
//   CreditCard,
//   Check,
//   Plus,
//   Loader2,
//   ArrowRight,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Layout } from "@/components/layout/Layout";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// const CheckoutPage = () => {
//   const { state, subtotal, total } = useCart();
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

//   // ✅ Redirect if not logged in or cart empty
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login?redirect=/checkout");
//     } else if (state.items.length === 0) {
//       navigate("/cart");
//     }
//   }, [isAuthenticated, state.items.length, navigate]);

//   // ✅ Fetch addresses on mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       api
//         .getAddresses()
//         .then((data) => {
//           setAddresses(data);
//           // Auto-select default or first address
//           const defaultAddr = data.find((a: any) => a.is_default);
//           if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
//           else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
//         })
//         .catch((err) => console.error("Failed to load addresses", err))
//         .finally(() => setIsLoadingAddresses(false));
//     }
//   }, [isAuthenticated]);

//   // ✅ Handle Stripe Checkout
//   const handlePlaceOrder = async () => {
//     if (!selectedAddressId) {
//       toast({
//         title: "Select an address",
//         description: "Please select a delivery address to continue.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsProcessing(true);

//       const selectedAddress = addresses.find(
//         (a) => a.id.toString() === selectedAddressId,
//       );

//       // 1. Create Checkout Session on Backend
//       const response = await api.createCheckoutSession(
//         state.items.map((item) => ({
//           product: { id: item.product.id },
//           quantity: item.quantity,
//         })),
//         selectedAddress,
//       );

//       // 2. Redirect to Stripe
//       if (response.url) {
//         window.location.href = response.url;
//       } else {
//         throw new Error("No checkout URL received");
//       }
//     } catch (err) {
//       console.error("Checkout failed:", err);
//       toast({
//         title: "Checkout failed",
//         description: "Could not initiate payment. Please try again.",
//         variant: "destructive",
//       });
//       setIsProcessing(false);
//     }
//   };

//   // Helper to fix image URLs
//   const getImageUrl = (path: string | undefined) => {
//     if (!path) return "/placeholder.png";
//     if (path.startsWith("http")) return path;
//     return `http://127.0.0.1:8000${path}`;
//   };

//   if (!isAuthenticated || state.items.length === 0) return null;

//   return (
//     <Layout>
//       <div className="container py-8">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//           <Link to="/" className="hover:text-primary">
//             Home
//           </Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to="/cart" className="hover:text-primary">
//             Cart
//           </Link>
//           <ChevronRight className="h-4 w-4" />
//           <span className="text-foreground">Checkout</span>
//         </nav>

//         <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Delivery Address Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-card rounded-xl p-6 shadow-sm border"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                   <MapPin className="h-5 w-5 text-primary" />
//                 </div>
//                 <h2 className="text-xl font-bold text-foreground">
//                   Delivery Address
//                 </h2>
//               </div>

//               {isLoadingAddresses ? (
//                 <div className="flex justify-center py-8">
//                   <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//                 </div>
//               ) : addresses.length === 0 ? (
//                 <div className="text-center py-8 border rounded-lg border-dashed">
//                   <p className="text-muted-foreground mb-4">
//                     No addresses saved
//                   </p>
//                   <Link to="/profile">
//                     <Button variant="outline" className="gap-2">
//                       <Plus className="h-4 w-4" />
//                       Add New Address
//                     </Button>
//                   </Link>
//                 </div>
//               ) : (
//                 <RadioGroup
//                   value={selectedAddressId}
//                   onValueChange={setSelectedAddressId}
//                   className="grid gap-4"
//                 >
//                   {addresses.map((address) => (
//                     <div
//                       key={address.id}
//                       onClick={() =>
//                         setSelectedAddressId(address.id.toString())
//                       }
//                       className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
//                         selectedAddressId === address.id.toString()
//                           ? "border-primary bg-primary/5 ring-1 ring-primary"
//                           : "border-border hover:border-muted-foreground"
//                       }`}
//                     >
//                       <RadioGroupItem
//                         value={address.id.toString()}
//                         id={`addr-${address.id}`}
//                         className="mt-1"
//                       />
//                       <div className="flex-1">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="font-semibold">{address.name}</span>
//                           {address.is_default && (
//                             <span className="text-xs bg-muted px-2 py-0.5 rounded">
//                               Default
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           {address.street}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {address.city}, {address.zip_code}
//                         </p>
//                         <p className="text-sm text-muted-foreground mt-1">
//                           {address.phone}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               )}

//               {addresses.length > 0 && addresses.length < 3 && (
//                 <div className="mt-4 pt-4 border-t">
//                   <Link
//                     to="/profile"
//                     className="text-sm text-primary hover:underline flex items-center gap-1"
//                   >
//                     <Plus className="h-3 w-3" /> Add another address
//                   </Link>
//                 </div>
//               )}
//             </motion.div>

//             {/* Payment Info Banner */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-card rounded-xl p-6 shadow-sm border"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                   <CreditCard className="h-5 w-5 text-primary" />
//                 </div>
//                 <h2 className="text-xl font-bold text-foreground">
//                   Payment Method
//                 </h2>
//               </div>

//               <div className="bg-muted/50 p-4 rounded-lg border flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-white p-2 rounded border">
//                     <img
//                       src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png"
//                       alt="Stripe"
//                       className="h-6"
//                     />
//                   </div>
//                   <div>
//                     <p className="font-medium">Credit / Debit Card</p>
//                     <p className="text-sm text-muted-foreground">
//                       Secure payment via Stripe
//                     </p>
//                   </div>
//                 </div>
//                 <Check className="h-5 w-5 text-primary" />
//               </div>
//               <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
//                 <Check className="h-3 w-3" /> Your payment information is
//                 encrypted and processed securely by Stripe. We do not store your
//                 card details.
//               </p>
//             </motion.div>
//           </div>

//           {/* Order Summary */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-card rounded-xl p-6 shadow-sm border sticky top-24"
//             >
//               <h2 className="text-xl font-bold text-foreground mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
//                 {state.items.map((item) => (
//                   <div key={item.product.id} className="flex gap-3">
//                     <div className="shrink-0 border rounded-md overflow-hidden h-12 w-12">
//                       <img
//                         src={getImageUrl(item.product.image)}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) =>
//                           (e.currentTarget.src = "/placeholder.png")
//                         }
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium line-clamp-2">
//                         {item.product.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                     <span className="text-sm font-medium shrink-0">
//                       €{(Number(item.product.price) * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3 mb-6 text-sm border-t pt-4">
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Subtotal</span>
//                   <span>€{Number(subtotal).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Delivery</span>
//                   <span className="text-green-600 font-medium">Free</span>
//                 </div>
//                 {state.discountAmount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-€{state.discountAmount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-lg font-bold text-foreground border-t pt-3 mt-2">
//                   <span>Total</span>
//                   <span>€{Number(total).toFixed(2)}</span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePlaceOrder}
//                 className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
//                 size="lg"
//                 disabled={isProcessing || addresses.length === 0}
//               >
//                 {isProcessing ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin mr-2" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     Pay Securely <ArrowRight className="h-5 w-5 ml-1" />
//                   </>
//                 )}
//               </Button>

//               <p className="text-xs text-muted-foreground text-center mt-4">
//                 You will be redirected to Stripe to complete your payment
//                 securely.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CheckoutPage;
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Check,
  Plus,
  Loader2,
  ArrowRight,
  Edit2,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Layout } from "@/components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const CheckoutPage = () => {
  const { state, subtotal, total } = useCart();
  const { user, isAuthenticated } = useAuth(); // Assuming useAuth provides a way to refresh user data
  const navigate = useNavigate();
  const { toast } = useToast();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Address Dialog State
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    is_default: false,
  });

  // Profile Dialog State
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.name || "");

  // ✅ Redirect if not logged in or cart empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/checkout");
    } else if (state.items.length === 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, state.items.length, navigate]);

  // ✅ Fetch addresses on mount
  const fetchAddresses = () => {
    setIsLoadingAddresses(true);
    api
      .getAddresses()
      .then((data) => {
        setAddresses(data);
        // Auto-select default or first address if none selected
        if (!selectedAddressId) {
          const defaultAddr = data.find((a: any) => a.is_default);
          if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
          else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
        }
      })
      .catch((err) => console.error("Failed to load addresses", err))
      .finally(() => setIsLoadingAddresses(false));
  };

  useEffect(() => {
    if (isAuthenticated) fetchAddresses();
  }, [isAuthenticated]);

  // ✅ Handle Address Form Submit (Add or Edit)
  const handleAddressSubmit = async () => {
    try {
      if (editingAddress) {
        await api.updateAddress(editingAddress.id, addressForm);
        toast({ title: "Address updated" });
      } else {
        await api.addAddress(addressForm);
        toast({ title: "Address added" });
      }
      setAddressDialogOpen(false);
      fetchAddresses(); // Refresh list
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.detail || "Failed to save address.",
        variant: "destructive",
      });
    }
  };

  // ✅ Open Add/Edit Dialog
  const openAddressDialog = (address?: any) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        phone: address.phone,
        is_default: address.is_default,
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        is_default: false,
      });
    }
    setAddressDialogOpen(true);
  };

  // ✅ Handle Profile Update
  const handleProfileUpdate = async () => {
    try {
      // Assuming you have an api.updateProfile method
      // If not, you need to implement PATCH /api/auth/profile/ in Django
      // await api.updateProfile({ first_name: fullName });
      toast({
        title: "Profile updated",
        description: "This feature needs backend implementation.",
      });
      setProfileDialogOpen(false);
      // user.name = fullName; // Optimistic update if context allows
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  // ✅ Handle Stripe Checkout
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: "Select an address",
        description: "Please select a delivery address to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const selectedAddress = addresses.find(
        (a) => a.id.toString() === selectedAddressId,
      );

      const response = await api.createCheckoutSession(
        state.items.map((item) => ({
          product: { id: item.product.id },
          quantity: item.quantity,
        })),
        selectedAddress,
      );

      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      toast({
        title: "Checkout failed",
        description: "Could not initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    return `http://127.0.0.1:8000${path}`;
  };

  if (!isAuthenticated || state.items.length === 0) return null;

  return (
    <Layout>
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="hover:text-primary">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Checkout</span>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

          {/* ✅ Profile Update Dialog */}
          <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" /> Edit Profile ({user?.name})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email} disabled className="bg-muted" />
                </div>
                <Button onClick={handleProfileUpdate} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Delivery Address
                  </h2>
                </div>
                {/* ✅ Add Address Button */}
                {addresses.length < 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAddressDialog()}
                    className="gap-1 text-primary"
                  >
                    <Plus className="h-4 w-4" /> Add New
                  </Button>
                )}
              </div>

              {isLoadingAddresses ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8 border rounded-lg border-dashed">
                  <p className="text-muted-foreground mb-4">
                    No addresses saved
                  </p>
                  <Button variant="outline" onClick={() => openAddressDialog()}>
                    Add New Address
                  </Button>
                </div>
              ) : (
                <RadioGroup
                  value={selectedAddressId}
                  onValueChange={setSelectedAddressId}
                  className="grid gap-4"
                >
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAddressId === address.id.toString()
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      onClick={() =>
                        setSelectedAddressId(address.id.toString())
                      }
                    >
                      <RadioGroupItem
                        value={address.id.toString()}
                        id={`addr-${address.id}`}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold">{address.name}</span>
                          <div className="flex items-center gap-2">
                            {address.is_default && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                                Default
                              </span>
                            )}
                            {/* ✅ Edit Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                openAddressDialog(address);
                              }}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zip_code}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </motion.div>

            {/* Address Dialog (Add/Edit) */}
            <Dialog
              open={addressDialogOpen}
              onOpenChange={setAddressDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Label (e.g. Home)</Label>
                    <Input
                      value={addressForm.name}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Street</Label>
                    <Input
                      value={addressForm.street}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          street: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Zip Code</Label>
                      <Input
                        value={addressForm.zip_code}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            zip_code: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="default"
                      checked={addressForm.is_default}
                      onCheckedChange={(checked) =>
                        setAddressForm({
                          ...addressForm,
                          is_default: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="default">Set as default address</Label>
                  </div>
                  <Button onClick={handleAddressSubmit} className="w-full">
                    {editingAddress ? "Update Address" : "Save Address"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Payment Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Payment Method
                </h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded border">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png"
                      alt="Stripe"
                      className="h-6"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-muted-foreground">
                      Secure payment via Stripe
                    </p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <Check className="h-3 w-3" /> SSL Encrypted Payment
              </p>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-sm border sticky top-24"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="shrink-0 border rounded-md overflow-hidden h-12 w-12">
                      <img
                        src={getImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.src = "/placeholder.png")
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium shrink-0">
                      €{(Number(item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm border-t pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {state.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-€{state.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-foreground border-t pt-3 mt-2">
                  <span>Total</span>
                  <span>€{Number(total).toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
                size="lg"
                disabled={isProcessing || addresses.length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay Securely <ArrowRight className="h-5 w-5 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
