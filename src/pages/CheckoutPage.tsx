// // // // // import { useState, useEffect } from "react";
// // // // // import { useNavigate, Link } from "react-router-dom";
// // // // // import {
// // // // //   ChevronRight,
// // // // //   MapPin,
// // // // //   CreditCard,
// // // // //   Check,
// // // // //   Plus,
// // // // //   Loader2,
// // // // //   ArrowRight,
// // // // // } from "lucide-react";
// // // // // import { motion } from "framer-motion";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // // // // import { Layout } from "@/components/layout/Layout";
// // // // // import { useCart } from "@/context/CartContext";
// // // // // import { useAuth } from "@/context/AuthContext";
// // // // // import { useToast } from "@/hooks/use-toast";
// // // // // import { api } from "@/lib/api";

// // // // // const CheckoutPage = () => {
// // // // //   const { state, subtotal, total } = useCart();
// // // // //   const { user, isAuthenticated } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const { toast } = useToast();

// // // // //   const [addresses, setAddresses] = useState<any[]>([]);
// // // // //   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
// // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // //   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

// // // // //   // ✅ Redirect if not logged in or cart empty
// // // // //   useEffect(() => {
// // // // //     if (!isAuthenticated) {
// // // // //       navigate("/login?redirect=/checkout");
// // // // //     } else if (state.items.length === 0) {
// // // // //       navigate("/cart");
// // // // //     }
// // // // //   }, [isAuthenticated, state.items.length, navigate]);

// // // // //   // ✅ Fetch addresses on mount
// // // // //   useEffect(() => {
// // // // //     if (isAuthenticated) {
// // // // //       api
// // // // //         .getAddresses()
// // // // //         .then((data) => {
// // // // //           setAddresses(data);
// // // // //           // Auto-select default or first address
// // // // //           const defaultAddr = data.find((a: any) => a.is_default);
// // // // //           if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
// // // // //           else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
// // // // //         })
// // // // //         .catch((err) => console.error("Failed to load addresses", err))
// // // // //         .finally(() => setIsLoadingAddresses(false));
// // // // //     }
// // // // //   }, [isAuthenticated]);

// // // // //   // ✅ Handle Stripe Checkout
// // // // //   const handlePlaceOrder = async () => {
// // // // //     if (!selectedAddressId) {
// // // // //       toast({
// // // // //         title: "Select an address",
// // // // //         description: "Please select a delivery address to continue.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setIsProcessing(true);

// // // // //       const selectedAddress = addresses.find(
// // // // //         (a) => a.id.toString() === selectedAddressId,
// // // // //       );

// // // // //       // 1. Create Checkout Session on Backend
// // // // //       const response = await api.createCheckoutSession(
// // // // //         state.items.map((item) => ({
// // // // //           product: { id: item.product.id },
// // // // //           quantity: item.quantity,
// // // // //         })),
// // // // //         selectedAddress,
// // // // //       );

// // // // //       // 2. Redirect to Stripe
// // // // //       if (response.url) {
// // // // //         window.location.href = response.url;
// // // // //       } else {
// // // // //         throw new Error("No checkout URL received");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Checkout failed:", err);
// // // // //       toast({
// // // // //         title: "Checkout failed",
// // // // //         description: "Could not initiate payment. Please try again.",
// // // // //         variant: "destructive",
// // // // //       });
// // // // //       setIsProcessing(false);
// // // // //     }
// // // // //   };

// // // // //   // Helper to fix image URLs
// // // // //   const getImageUrl = (path: string | undefined) => {
// // // // //     if (!path) return "/placeholder.png";
// // // // //     if (path.startsWith("http")) return path;
// // // // //     return `http://127.0.0.1:8000${path}`;
// // // // //   };

// // // // //   if (!isAuthenticated || state.items.length === 0) return null;

// // // // //   return (
// // // // //     <Layout>
// // // // //       <div className="container py-8">
// // // // //         {/* Breadcrumb */}
// // // // //         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
// // // // //           <Link to="/" className="hover:text-primary">
// // // // //             Home
// // // // //           </Link>
// // // // //           <ChevronRight className="h-4 w-4" />
// // // // //           <Link to="/cart" className="hover:text-primary">
// // // // //             Cart
// // // // //           </Link>
// // // // //           <ChevronRight className="h-4 w-4" />
// // // // //           <span className="text-foreground">Checkout</span>
// // // // //         </nav>

// // // // //         <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

// // // // //         <div className="grid lg:grid-cols-3 gap-8">
// // // // //           {/* Checkout Form */}
// // // // //           <div className="lg:col-span-2 space-y-6">
// // // // //             {/* Delivery Address Section */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               className="bg-card rounded-xl p-6 shadow-sm border"
// // // // //             >
// // // // //               <div className="flex items-center gap-3 mb-6">
// // // // //                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // // // //                   <MapPin className="h-5 w-5 text-primary" />
// // // // //                 </div>
// // // // //                 <h2 className="text-xl font-bold text-foreground">
// // // // //                   Delivery Address
// // // // //                 </h2>
// // // // //               </div>

// // // // //               {isLoadingAddresses ? (
// // // // //                 <div className="flex justify-center py-8">
// // // // //                   <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
// // // // //                 </div>
// // // // //               ) : addresses.length === 0 ? (
// // // // //                 <div className="text-center py-8 border rounded-lg border-dashed">
// // // // //                   <p className="text-muted-foreground mb-4">
// // // // //                     No addresses saved
// // // // //                   </p>
// // // // //                   <Link to="/profile">
// // // // //                     <Button variant="outline" className="gap-2">
// // // // //                       <Plus className="h-4 w-4" />
// // // // //                       Add New Address
// // // // //                     </Button>
// // // // //                   </Link>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <RadioGroup
// // // // //                   value={selectedAddressId}
// // // // //                   onValueChange={setSelectedAddressId}
// // // // //                   className="grid gap-4"
// // // // //                 >
// // // // //                   {addresses.map((address) => (
// // // // //                     <div
// // // // //                       key={address.id}
// // // // //                       onClick={() =>
// // // // //                         setSelectedAddressId(address.id.toString())
// // // // //                       }
// // // // //                       className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
// // // // //                         selectedAddressId === address.id.toString()
// // // // //                           ? "border-primary bg-primary/5 ring-1 ring-primary"
// // // // //                           : "border-border hover:border-muted-foreground"
// // // // //                       }`}
// // // // //                     >
// // // // //                       <RadioGroupItem
// // // // //                         value={address.id.toString()}
// // // // //                         id={`addr-${address.id}`}
// // // // //                         className="mt-1"
// // // // //                       />
// // // // //                       <div className="flex-1">
// // // // //                         <div className="flex justify-between items-center mb-1">
// // // // //                           <span className="font-semibold">{address.name}</span>
// // // // //                           {address.is_default && (
// // // // //                             <span className="text-xs bg-muted px-2 py-0.5 rounded">
// // // // //                               Default
// // // // //                             </span>
// // // // //                           )}
// // // // //                         </div>
// // // // //                         <p className="text-sm text-muted-foreground">
// // // // //                           {address.street}
// // // // //                         </p>
// // // // //                         <p className="text-sm text-muted-foreground">
// // // // //                           {address.city}, {address.zip_code}
// // // // //                         </p>
// // // // //                         <p className="text-sm text-muted-foreground mt-1">
// // // // //                           {address.phone}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </RadioGroup>
// // // // //               )}

// // // // //               {addresses.length > 0 && addresses.length < 3 && (
// // // // //                 <div className="mt-4 pt-4 border-t">
// // // // //                   <Link
// // // // //                     to="/profile"
// // // // //                     className="text-sm text-primary hover:underline flex items-center gap-1"
// // // // //                   >
// // // // //                     <Plus className="h-3 w-3" /> Add another address
// // // // //                   </Link>
// // // // //                 </div>
// // // // //               )}
// // // // //             </motion.div>

// // // // //             {/* Payment Info Banner */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ delay: 0.1 }}
// // // // //               className="bg-card rounded-xl p-6 shadow-sm border"
// // // // //             >
// // // // //               <div className="flex items-center gap-3 mb-4">
// // // // //                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // // // //                   <CreditCard className="h-5 w-5 text-primary" />
// // // // //                 </div>
// // // // //                 <h2 className="text-xl font-bold text-foreground">
// // // // //                   Payment Method
// // // // //                 </h2>
// // // // //               </div>

// // // // //               <div className="bg-muted/50 p-4 rounded-lg border flex items-center justify-between">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <div className="bg-white p-2 rounded border">
// // // // //                     <img
// // // // //                       src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png"
// // // // //                       alt="Stripe"
// // // // //                       className="h-6"
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <p className="font-medium">Credit / Debit Card</p>
// // // // //                     <p className="text-sm text-muted-foreground">
// // // // //                       Secure payment via Stripe
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <Check className="h-5 w-5 text-primary" />
// // // // //               </div>
// // // // //               <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
// // // // //                 <Check className="h-3 w-3" /> Your payment information is
// // // // //                 encrypted and processed securely by Stripe. We do not store your
// // // // //                 card details.
// // // // //               </p>
// // // // //             </motion.div>
// // // // //           </div>

// // // // //           {/* Order Summary */}
// // // // //           <div>
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ delay: 0.2 }}
// // // // //               className="bg-card rounded-xl p-6 shadow-sm border sticky top-24"
// // // // //             >
// // // // //               <h2 className="text-xl font-bold text-foreground mb-6">
// // // // //                 Order Summary
// // // // //               </h2>

// // // // //               <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
// // // // //                 {state.items.map((item) => (
// // // // //                   <div key={item.product.id} className="flex gap-3">
// // // // //                     <div className="shrink-0 border rounded-md overflow-hidden h-12 w-12">
// // // // //                       <img
// // // // //                         src={getImageUrl(item.product.image)}
// // // // //                         alt={item.product.name}
// // // // //                         className="w-full h-full object-cover"
// // // // //                         onError={(e) =>
// // // // //                           (e.currentTarget.src = "/placeholder.png")
// // // // //                         }
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <p className="text-sm font-medium line-clamp-2">
// // // // //                         {item.product.name}
// // // // //                       </p>
// // // // //                       <p className="text-xs text-muted-foreground">
// // // // //                         Qty: {item.quantity}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <span className="text-sm font-medium shrink-0">
// // // // //                       €{(Number(item.product.price) * item.quantity).toFixed(2)}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>

// // // // //               <div className="space-y-3 mb-6 text-sm border-t pt-4">
// // // // //                 <div className="flex justify-between text-muted-foreground">
// // // // //                   <span>Subtotal</span>
// // // // //                   <span>€{Number(subtotal).toFixed(2)}</span>
// // // // //                 </div>
// // // // //                 <div className="flex justify-between text-muted-foreground">
// // // // //                   <span>Delivery</span>
// // // // //                   <span className="text-green-600 font-medium">Free</span>
// // // // //                 </div>
// // // // //                 {state.discountAmount > 0 && (
// // // // //                   <div className="flex justify-between text-green-600">
// // // // //                     <span>Discount</span>
// // // // //                     <span>-€{state.discountAmount.toFixed(2)}</span>
// // // // //                   </div>
// // // // //                 )}
// // // // //                 <div className="flex justify-between text-lg font-bold text-foreground border-t pt-3 mt-2">
// // // // //                   <span>Total</span>
// // // // //                   <span>€{Number(total).toFixed(2)}</span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <Button
// // // // //                 onClick={handlePlaceOrder}
// // // // //                 className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
// // // // //                 size="lg"
// // // // //                 disabled={isProcessing || addresses.length === 0}
// // // // //               >
// // // // //                 {isProcessing ? (
// // // // //                   <>
// // // // //                     <Loader2 className="h-5 w-5 animate-spin mr-2" />
// // // // //                     Processing...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     Pay Securely <ArrowRight className="h-5 w-5 ml-1" />
// // // // //                   </>
// // // // //                 )}
// // // // //               </Button>

// // // // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // // // //                 You will be redirected to Stripe to complete your payment
// // // // //                 securely.
// // // // //               </p>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Layout>
// // // // //   );
// // // // // };

// // // // // export default CheckoutPage;
// // // // import { useState, useEffect } from "react";
// // // // import { useNavigate, Link } from "react-router-dom";
// // // // import {
// // // //   ChevronRight,
// // // //   MapPin,
// // // //   CreditCard,
// // // //   Check,
// // // //   Plus,
// // // //   Loader2,
// // // //   ArrowRight,
// // // //   Edit2,
// // // //   User,
// // // // } from "lucide-react";
// // // // import { motion } from "framer-motion";
// // // // import { Button } from "@/components/ui/button";
// // // // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // // // import { Layout } from "@/components/layout/Layout";
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogTrigger,
// // // // } from "@/components/ui/dialog";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
// // // // import { Checkbox } from "@/components/ui/checkbox";
// // // // import { useCart } from "@/context/CartContext";
// // // // import { useAuth } from "@/context/AuthContext";
// // // // import { useToast } from "@/hooks/use-toast";
// // // // import { api } from "@/lib/api";

// // // // const CheckoutPage = () => {
// // // //   const { state, subtotal, total } = useCart();
// // // //   const { user, isAuthenticated } = useAuth(); // Assuming useAuth provides a way to refresh user data
// // // //   const navigate = useNavigate();
// // // //   const { toast } = useToast();

// // // //   const [addresses, setAddresses] = useState<any[]>([]);
// // // //   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
// // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // //   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

// // // //   // Address Dialog State
// // // //   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
// // // //   const [editingAddress, setEditingAddress] = useState<any | null>(null);
// // // //   const [addressForm, setAddressForm] = useState({
// // // //     name: "",
// // // //     street: "",
// // // //     city: "",
// // // //     state: "",
// // // //     zip_code: "",
// // // //     phone: "",
// // // //     is_default: false,
// // // //   });

// // // //   // Profile Dialog State
// // // //   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
// // // //   const [fullName, setFullName] = useState(user?.name || "");

// // // //   // ✅ Redirect if not logged in or cart empty
// // // //   useEffect(() => {
// // // //     if (!isAuthenticated) {
// // // //       navigate("/login?redirect=/checkout");
// // // //     } else if (state.items.length === 0) {
// // // //       navigate("/cart");
// // // //     }
// // // //   }, [isAuthenticated, state.items.length, navigate]);

// // // //   // ✅ Fetch addresses on mount
// // // //   const fetchAddresses = () => {
// // // //     setIsLoadingAddresses(true);
// // // //     api
// // // //       .getAddresses()
// // // //       .then((data) => {
// // // //         setAddresses(data);
// // // //         // Auto-select default or first address if none selected
// // // //         if (!selectedAddressId) {
// // // //           const defaultAddr = data.find((a: any) => a.is_default);
// // // //           if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
// // // //           else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
// // // //         }
// // // //       })
// // // //       .catch((err) => console.error("Failed to load addresses", err))
// // // //       .finally(() => setIsLoadingAddresses(false));
// // // //   };

// // // //   useEffect(() => {
// // // //     if (isAuthenticated) fetchAddresses();
// // // //   }, [isAuthenticated]);

// // // //   // ✅ Handle Address Form Submit (Add or Edit)
// // // //   const handleAddressSubmit = async () => {
// // // //     try {
// // // //       if (editingAddress) {
// // // //         await api.updateAddress(editingAddress.id, addressForm);
// // // //         toast({ title: "Address updated" });
// // // //       } else {
// // // //         await api.addAddress(addressForm);
// // // //         toast({ title: "Address added" });
// // // //       }
// // // //       setAddressDialogOpen(false);
// // // //       fetchAddresses(); // Refresh list
// // // //     } catch (err: any) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: err.detail || "Failed to save address.",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   // ✅ Open Add/Edit Dialog
// // // //   const openAddressDialog = (address?: any) => {
// // // //     if (address) {
// // // //       setEditingAddress(address);
// // // //       setAddressForm({
// // // //         name: address.name,
// // // //         street: address.street,
// // // //         city: address.city,
// // // //         state: address.state,
// // // //         zip_code: address.zip_code,
// // // //         phone: address.phone,
// // // //         is_default: address.is_default,
// // // //       });
// // // //     } else {
// // // //       setEditingAddress(null);
// // // //       setAddressForm({
// // // //         name: "",
// // // //         street: "",
// // // //         city: "",
// // // //         state: "",
// // // //         zip_code: "",
// // // //         phone: "",
// // // //         is_default: false,
// // // //       });
// // // //     }
// // // //     setAddressDialogOpen(true);
// // // //   };

// // // //   // ✅ Handle Profile Update
// // // //   const handleProfileUpdate = async () => {
// // // //     try {
// // // //       // Assuming you have an api.updateProfile method
// // // //       // If not, you need to implement PATCH /api/auth/profile/ in Django
// // // //       // await api.updateProfile({ first_name: fullName });
// // // //       toast({
// // // //         title: "Profile updated",
// // // //         description: "This feature needs backend implementation.",
// // // //       });
// // // //       setProfileDialogOpen(false);
// // // //       // user.name = fullName; // Optimistic update if context allows
// // // //     } catch (err) {
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to update profile.",
// // // //         variant: "destructive",
// // // //       });
// // // //     }
// // // //   };

// // // //   // ✅ Handle Stripe Checkout
// // // //   const handlePlaceOrder = async () => {
// // // //     if (!selectedAddressId) {
// // // //       toast({
// // // //         title: "Select an address",
// // // //         description: "Please select a delivery address to continue.",
// // // //         variant: "destructive",
// // // //       });
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setIsProcessing(true);
// // // //       const selectedAddress = addresses.find(
// // // //         (a) => a.id.toString() === selectedAddressId,
// // // //       );

// // // //       const response = await api.createCheckoutSession(
// // // //         state.items.map((item) => ({
// // // //           product: { id: item.product.id },
// // // //           quantity: item.quantity,
// // // //         })),
// // // //         selectedAddress,
// // // //       );

// // // //       if (response.url) {
// // // //         window.location.href = response.url;
// // // //       } else {
// // // //         throw new Error("No checkout URL received");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Checkout failed:", err);
// // // //       toast({
// // // //         title: "Checkout failed",
// // // //         description: "Could not initiate payment. Please try again.",
// // // //         variant: "destructive",
// // // //       });
// // // //       setIsProcessing(false);
// // // //     }
// // // //   };

// // // //   const getImageUrl = (path: string | undefined) => {
// // // //     if (!path) return "/placeholder.png";
// // // //     if (path.startsWith("http")) return path;
// // // //     return `http://127.0.0.1:8000${path}`;
// // // //   };

// // // //   if (!isAuthenticated || state.items.length === 0) return null;

// // // //   return (
// // // //     <Layout>
// // // //       <div className="container py-8">
// // // //         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
// // // //           <Link to="/" className="hover:text-primary">
// // // //             Home
// // // //           </Link>
// // // //           <ChevronRight className="h-4 w-4" />
// // // //           <Link to="/cart" className="hover:text-primary">
// // // //             Cart
// // // //           </Link>
// // // //           <ChevronRight className="h-4 w-4" />
// // // //           <span className="text-foreground">Checkout</span>
// // // //         </nav>

// // // //         <div className="flex justify-between items-center mb-8">
// // // //           <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

// // // //           {/* ✅ Profile Update Dialog */}
// // // //           <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
// // // //             <DialogTrigger asChild>
// // // //               <Button variant="outline" size="sm" className="gap-2">
// // // //                 <User className="h-4 w-4" /> Edit Profile ({user?.name})
// // // //               </Button>
// // // //             </DialogTrigger>
// // // //             <DialogContent>
// // // //               <DialogHeader>
// // // //                 <DialogTitle>Update Profile</DialogTitle>
// // // //               </DialogHeader>
// // // //               <div className="space-y-4 py-4">
// // // //                 <div className="space-y-2">
// // // //                   <Label>Full Name</Label>
// // // //                   <Input
// // // //                     value={fullName}
// // // //                     onChange={(e) => setFullName(e.target.value)}
// // // //                   />
// // // //                 </div>
// // // //                 <div className="space-y-2">
// // // //                   <Label>Email</Label>
// // // //                   <Input value={user?.email} disabled className="bg-muted" />
// // // //                 </div>
// // // //                 <Button onClick={handleProfileUpdate} className="w-full">
// // // //                   Save Changes
// // // //                 </Button>
// // // //               </div>
// // // //             </DialogContent>
// // // //           </Dialog>
// // // //         </div>

// // // //         <div className="grid lg:grid-cols-3 gap-8">
// // // //           <div className="lg:col-span-2 space-y-6">
// // // //             {/* Delivery Address Section */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               className="bg-card rounded-xl p-6 shadow-sm border"
// // // //             >
// // // //               <div className="flex items-center justify-between mb-6">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // // //                     <MapPin className="h-5 w-5 text-primary" />
// // // //                   </div>
// // // //                   <h2 className="text-xl font-bold text-foreground">
// // // //                     Delivery Address
// // // //                   </h2>
// // // //                 </div>
// // // //                 {/* ✅ Add Address Button */}
// // // //                 {addresses.length < 3 && (
// // // //                   <Button
// // // //                     variant="ghost"
// // // //                     size="sm"
// // // //                     onClick={() => openAddressDialog()}
// // // //                     className="gap-1 text-primary"
// // // //                   >
// // // //                     <Plus className="h-4 w-4" /> Add New
// // // //                   </Button>
// // // //                 )}
// // // //               </div>

// // // //               {isLoadingAddresses ? (
// // // //                 <div className="flex justify-center py-8">
// // // //                   <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
// // // //                 </div>
// // // //               ) : addresses.length === 0 ? (
// // // //                 <div className="text-center py-8 border rounded-lg border-dashed">
// // // //                   <p className="text-muted-foreground mb-4">
// // // //                     No addresses saved
// // // //                   </p>
// // // //                   <Button variant="outline" onClick={() => openAddressDialog()}>
// // // //                     Add New Address
// // // //                   </Button>
// // // //                 </div>
// // // //               ) : (
// // // //                 <RadioGroup
// // // //                   value={selectedAddressId}
// // // //                   onValueChange={setSelectedAddressId}
// // // //                   className="grid gap-4"
// // // //                 >
// // // //                   {addresses.map((address) => (
// // // //                     <div
// // // //                       key={address.id}
// // // //                       className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
// // // //                         selectedAddressId === address.id.toString()
// // // //                           ? "border-primary bg-primary/5 ring-1 ring-primary"
// // // //                           : "border-border hover:border-muted-foreground"
// // // //                       }`}
// // // //                       onClick={() =>
// // // //                         setSelectedAddressId(address.id.toString())
// // // //                       }
// // // //                     >
// // // //                       <RadioGroupItem
// // // //                         value={address.id.toString()}
// // // //                         id={`addr-${address.id}`}
// // // //                         className="mt-1"
// // // //                       />
// // // //                       <div className="flex-1">
// // // //                         <div className="flex justify-between items-center mb-1">
// // // //                           <span className="font-semibold">{address.name}</span>
// // // //                           <div className="flex items-center gap-2">
// // // //                             {address.is_default && (
// // // //                               <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
// // // //                                 Default
// // // //                               </span>
// // // //                             )}
// // // //                             {/* ✅ Edit Button */}
// // // //                             <Button
// // // //                               variant="ghost"
// // // //                               size="icon"
// // // //                               className="h-6 w-6 text-muted-foreground hover:text-foreground"
// // // //                               onClick={(e) => {
// // // //                                 e.stopPropagation();
// // // //                                 openAddressDialog(address);
// // // //                               }}
// // // //                             >
// // // //                               <Edit2 className="h-3 w-3" />
// // // //                             </Button>
// // // //                           </div>
// // // //                         </div>
// // // //                         <p className="text-sm text-muted-foreground">
// // // //                           {address.street}
// // // //                         </p>
// // // //                         <p className="text-sm text-muted-foreground">
// // // //                           {address.city}, {address.state} {address.zip_code}
// // // //                         </p>
// // // //                         <p className="text-sm text-muted-foreground mt-1">
// // // //                           {address.phone}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </RadioGroup>
// // // //               )}
// // // //             </motion.div>

// // // //             {/* Address Dialog (Add/Edit) */}
// // // //             <Dialog
// // // //               open={addressDialogOpen}
// // // //               onOpenChange={setAddressDialogOpen}
// // // //             >
// // // //               <DialogContent>
// // // //                 <DialogHeader>
// // // //                   <DialogTitle>
// // // //                     {editingAddress ? "Edit Address" : "Add New Address"}
// // // //                   </DialogTitle>
// // // //                 </DialogHeader>
// // // //                 <div className="grid gap-4 py-4">
// // // //                   <div className="space-y-2">
// // // //                     <Label>Label (e.g. Home)</Label>
// // // //                     <Input
// // // //                       value={addressForm.name}
// // // //                       onChange={(e) =>
// // // //                         setAddressForm({ ...addressForm, name: e.target.value })
// // // //                       }
// // // //                     />
// // // //                   </div>
// // // //                   <div className="space-y-2">
// // // //                     <Label>Street</Label>
// // // //                     <Input
// // // //                       value={addressForm.street}
// // // //                       onChange={(e) =>
// // // //                         setAddressForm({
// // // //                           ...addressForm,
// // // //                           street: e.target.value,
// // // //                         })
// // // //                       }
// // // //                     />
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <div className="space-y-2">
// // // //                       <Label>City</Label>
// // // //                       <Input
// // // //                         value={addressForm.city}
// // // //                         onChange={(e) =>
// // // //                           setAddressForm({
// // // //                             ...addressForm,
// // // //                             city: e.target.value,
// // // //                           })
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label>State</Label>
// // // //                       <Input
// // // //                         value={addressForm.state}
// // // //                         onChange={(e) =>
// // // //                           setAddressForm({
// // // //                             ...addressForm,
// // // //                             state: e.target.value,
// // // //                           })
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <div className="space-y-2">
// // // //                       <Label>Zip Code</Label>
// // // //                       <Input
// // // //                         value={addressForm.zip_code}
// // // //                         onChange={(e) =>
// // // //                           setAddressForm({
// // // //                             ...addressForm,
// // // //                             zip_code: e.target.value,
// // // //                           })
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label>Phone</Label>
// // // //                       <Input
// // // //                         value={addressForm.phone}
// // // //                         onChange={(e) =>
// // // //                           setAddressForm({
// // // //                             ...addressForm,
// // // //                             phone: e.target.value,
// // // //                           })
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex items-center space-x-2">
// // // //                     <Checkbox
// // // //                       id="default"
// // // //                       checked={addressForm.is_default}
// // // //                       onCheckedChange={(checked) =>
// // // //                         setAddressForm({
// // // //                           ...addressForm,
// // // //                           is_default: checked as boolean,
// // // //                         })
// // // //                       }
// // // //                     />
// // // //                     <Label htmlFor="default">Set as default address</Label>
// // // //                   </div>
// // // //                   <Button onClick={handleAddressSubmit} className="w-full">
// // // //                     {editingAddress ? "Update Address" : "Save Address"}
// // // //                   </Button>
// // // //                 </div>
// // // //               </DialogContent>
// // // //             </Dialog>

// // // //             {/* Payment Info Banner */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ delay: 0.1 }}
// // // //               className="bg-card rounded-xl p-6 shadow-sm border"
// // // //             >
// // // //               <div className="flex items-center gap-3 mb-4">
// // // //                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // // //                   <CreditCard className="h-5 w-5 text-primary" />
// // // //                 </div>
// // // //                 <h2 className="text-xl font-bold text-foreground">
// // // //                   Payment Method
// // // //                 </h2>
// // // //               </div>
// // // //               <div className="bg-muted/50 p-4 rounded-lg border flex items-center justify-between">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <div className="bg-white p-2 rounded border">
// // // //                     <img
// // // //                       src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png"
// // // //                       alt="Stripe"
// // // //                       className="h-6"
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="font-medium">Credit / Debit Card</p>
// // // //                     <p className="text-sm text-muted-foreground">
// // // //                       Secure payment via Stripe
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <Check className="h-5 w-5 text-primary" />
// // // //               </div>
// // // //               <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
// // // //                 <Check className="h-3 w-3" /> SSL Encrypted Payment
// // // //               </p>
// // // //             </motion.div>
// // // //           </div>

// // // //           {/* Order Summary */}
// // // //           <div>
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ delay: 0.2 }}
// // // //               className="bg-card rounded-xl p-6 shadow-sm border sticky top-24"
// // // //             >
// // // //               <h2 className="text-xl font-bold text-foreground mb-6">
// // // //                 Order Summary
// // // //               </h2>

// // // //               <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
// // // //                 {state.items.map((item) => (
// // // //                   <div key={item.product.id} className="flex gap-3">
// // // //                     <div className="shrink-0 border rounded-md overflow-hidden h-12 w-12">
// // // //                       <img
// // // //                         src={getImageUrl(item.product.image)}
// // // //                         alt={item.product.name}
// // // //                         className="w-full h-full object-cover"
// // // //                         onError={(e) =>
// // // //                           (e.currentTarget.src = "/placeholder.png")
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <p className="text-sm font-medium line-clamp-2">
// // // //                         {item.product.name}
// // // //                       </p>
// // // //                       <p className="text-xs text-muted-foreground">
// // // //                         Qty: {item.quantity}
// // // //                       </p>
// // // //                     </div>
// // // //                     <span className="text-sm font-medium shrink-0">
// // // //                       €{(Number(item.product.price) * item.quantity).toFixed(2)}
// // // //                     </span>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div className="space-y-3 mb-6 text-sm border-t pt-4">
// // // //                 <div className="flex justify-between text-muted-foreground">
// // // //                   <span>Subtotal</span>
// // // //                   <span>€{Number(subtotal).toFixed(2)}</span>
// // // //                 </div>
// // // //                 <div className="flex justify-between text-muted-foreground">
// // // //                   <span>Delivery</span>
// // // //                   <span className="text-green-600 font-medium">Free</span>
// // // //                 </div>
// // // //                 {state.discountAmount > 0 && (
// // // //                   <div className="flex justify-between text-green-600">
// // // //                     <span>Discount</span>
// // // //                     <span>-€{state.discountAmount.toFixed(2)}</span>
// // // //                   </div>
// // // //                 )}
// // // //                 <div className="flex justify-between text-lg font-bold text-foreground border-t pt-3 mt-2">
// // // //                   <span>Total</span>
// // // //                   <span>€{Number(total).toFixed(2)}</span>
// // // //                 </div>
// // // //               </div>

// // // //               <Button
// // // //                 onClick={handlePlaceOrder}
// // // //                 className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
// // // //                 size="lg"
// // // //                 disabled={isProcessing || addresses.length === 0}
// // // //               >
// // // //                 {isProcessing ? (
// // // //                   <>
// // // //                     <Loader2 className="h-5 w-5 animate-spin mr-2" />
// // // //                     Processing...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     Pay Securely <ArrowRight className="h-5 w-5 ml-1" />
// // // //                   </>
// // // //                 )}
// // // //               </Button>
// // // //             </motion.div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Layout>
// // // //   );
// // // // };

// // // // export default CheckoutPage;
// // // import { useState, useEffect } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import {
// // //   ChevronRight,
// // //   MapPin,
// // //   CreditCard,
// // //   Check,
// // //   Plus,
// // //   Loader2,
// // //   ArrowRight,
// // //   Edit2,
// // //   User,
// // // } from "lucide-react";
// // // import { motion } from "framer-motion";
// // // import { Button } from "@/components/ui/button";
// // // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // // import { Layout } from "@/components/layout/Layout";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // // } from "@/components/ui/dialog";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Checkbox } from "@/components/ui/checkbox";
// // // import { useCart } from "@/context/CartContext";
// // // import { useAuth } from "@/context/AuthContext";
// // // import { useToast } from "@/hooks/use-toast";
// // // import { api } from "@/lib/api";

// // // const CheckoutPage = () => {
// // //   const { state, subtotal } = useCart();
// // //   const { user, isAuthenticated } = useAuth();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();

// // //   const [addresses, setAddresses] = useState<any[]>([]);
// // //   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

// // //   // ✅ 1. NEW STATE FOR MISCELLANEOUS CHARGES
// // //   const [miscCharges, setMiscCharges] = useState<any[]>([]);

// // //   // Address Dialog State
// // //   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
// // //   const [editingAddress, setEditingAddress] = useState<any | null>(null);
// // //   const [addressForm, setAddressForm] = useState({
// // //     name: "",
// // //     street: "",
// // //     city: "",
// // //     state: "",
// // //     zip_code: "",
// // //     phone: "",
// // //     is_default: false,
// // //   });

// // //   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
// // //   const [fullName, setFullName] = useState(user?.name || "");

// // //   useEffect(() => {
// // //     if (!isAuthenticated) {
// // //       navigate("/login?redirect=/checkout");
// // //     } else if (state.items.length === 0) {
// // //       navigate("/cart");
// // //     }
// // //   }, [isAuthenticated, state.items.length, navigate]);

// // //   // ✅ 2. FETCH MISC CHARGES FROM BACKEND
// // //   const fetchMiscCharges = () => {
// // //     api.getMiscCharges()
// // //       .then((data) => setMiscCharges(data))
// // //       .catch((err) => console.error("Failed to load miscellaneous charges", err));
// // //   };

// // //   const fetchAddresses = () => {
// // //     setIsLoadingAddresses(true);
// // //     api.getAddresses()
// // //       .then((data) => {
// // //         setAddresses(data);
// // //         if (!selectedAddressId) {
// // //           const defaultAddr = data.find((a: any) => a.is_default);
// // //           if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
// // //           else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
// // //         }
// // //       })
// // //       .catch((err) => console.error("Failed to load addresses", err))
// // //       .finally(() => setIsLoadingAddresses(false));
// // //   };

// // //   useEffect(() => {
// // //     if (isAuthenticated) {
// // //       fetchAddresses();
// // //       fetchMiscCharges(); // ✅ Load charges on mount
// // //     }
// // //   }, [isAuthenticated]);

// // //   // ✅ 3. DYNAMIC CALCULATION LOGIC
// // //   const calculateChargesTotal = () => {
// // //     return miscCharges.reduce((acc, charge) => {
// // //       if (charge.charge_type === 'percentage') {
// // //         return acc + (Number(subtotal) * Number(charge.value)) / 100;
// // //       }
// // //       return acc + Number(charge.value);
// // //     }, 0);
// // //   };

// // //   const chargesTotal = calculateChargesTotal();
// // //   const finalTotal = Number(subtotal) + chargesTotal - (state.discountAmount || 0);

// // //   const handleAddressSubmit = async () => {
// // //     try {
// // //       if (editingAddress) {
// // //         await api.updateAddress(editingAddress.id, addressForm);
// // //         toast({ title: "Address updated" });
// // //       } else {
// // //         await api.addAddress(addressForm);
// // //         toast({ title: "Address added" });
// // //       }
// // //       setAddressDialogOpen(false);
// // //       fetchAddresses();
// // //     } catch (err: any) {
// // //       toast({ title: "Error", description: "Failed to save address.", variant: "destructive" });
// // //     }
// // //   };

// // //   const openAddressDialog = (address?: any) => {
// // //     if (address) {
// // //       setEditingAddress(address);
// // //       setAddressForm({
// // //         name: address.name, street: address.street, city: address.city,
// // //         state: address.state, zip_code: address.zip_code, phone: address.phone,
// // //         is_default: address.is_default,
// // //       });
// // //     } else {
// // //       setEditingAddress(null);
// // //       setAddressForm({
// // //         name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
// // //       });
// // //     }
// // //     setAddressDialogOpen(true);
// // //   };

// // //   const handleProfileUpdate = async () => {
// // //     try {
// // //       await api.updateProfile({ name: fullName });
// // //       toast({ title: "Profile updated" });
// // //       setProfileDialogOpen(false);
// // //     } catch (err) {
// // //       toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
// // //     }
// // //   };

// // //   const handlePlaceOrder = async () => {
// // //     if (!selectedAddressId) {
// // //       toast({ title: "Select an address", variant: "destructive" });
// // //       return;
// // //     }

// // //     try {
// // //       setIsProcessing(true);
// // //       const selectedAddress = addresses.find((a) => a.id.toString() === selectedAddressId);
      
// // //       const response = await api.createCheckoutSession(
// // //         state.items.map((item) => ({
// // //           product: { id: item.product.id },
// // //           quantity: item.quantity,
// // //         })),
// // //         selectedAddress
// // //       );

// // //       if (response.url) {
// // //         window.location.href = response.url;
// // //       }
// // //     } catch (err) {
// // //       toast({ title: "Checkout failed", variant: "destructive" });
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   const getImageUrl = (path: string | undefined) => {
// // //     if (!path) return "/placeholder.png";
// // //     if (path.startsWith("http")) return path;
// // //     return `http://127.0.0.1:8000${path}`;
// // //   };

// // //   if (!isAuthenticated || state.items.length === 0) return null;

// // //   return (
// // //     <Layout>
// // //       <div className="container py-8">
// // //         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
// // //           <Link to="/" className="hover:text-primary">Home</Link>
// // //           <ChevronRight className="h-4 w-4" />
// // //           <Link to="/cart" className="hover:text-primary">Cart</Link>
// // //           <ChevronRight className="h-4 w-4" />
// // //           <span className="text-foreground">Checkout</span>
// // //         </nav>

// // //         <div className="flex justify-between items-center mb-8">
// // //           <h1 className="text-3xl font-bold text-foreground tracking-tight">Checkout</h1>
// // //           <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
// // //             <DialogTrigger asChild>
// // //               <Button variant="outline" size="sm" className="gap-2 font-bold">
// // //                 <User className="h-4 w-4" /> Edit Profile ({user?.name})
// // //               </Button>
// // //             </DialogTrigger>
// // //             <DialogContent>
// // //               <DialogHeader><DialogTitle>Update Profile</DialogTitle></DialogHeader>
// // //               <div className="space-y-4 py-4">
// // //                 <div className="space-y-2">
// // //                   <Label>Full Name</Label>
// // //                   <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
// // //                 </div>
// // //                 <Button onClick={handleProfileUpdate} className="w-full font-bold">Save Changes</Button>
// // //               </div>
// // //             </DialogContent>
// // //           </Dialog>
// // //         </div>

// // //         <div className="grid lg:grid-cols-3 gap-8">
// // //           <div className="lg:col-span-2 space-y-6">
// // //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-6 shadow-sm border">
// // //               <div className="flex items-center justify-between mb-6">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // //                     <MapPin className="h-5 w-5 text-primary" />
// // //                   </div>
// // //                   <h2 className="text-xl font-bold text-foreground">Delivery Address</h2>
// // //                 </div>
// // //                 {addresses.length < 3 && (
// // //                   <Button variant="ghost" size="sm" onClick={() => openAddressDialog()} className="gap-1 text-primary font-bold">
// // //                     <Plus className="h-4 w-4" /> Add New
// // //                   </Button>
// // //                 )}
// // //               </div>

// // //               {isLoadingAddresses ? (
// // //                 <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
// // //               ) : (
// // //                 <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="grid gap-4">
// // //                   {addresses.map((address) => (
// // //                     <div key={address.id} className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${selectedAddressId === address.id.toString() ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-muted-foreground"}`} onClick={() => setSelectedAddressId(address.id.toString())}>
// // //                       <RadioGroupItem value={address.id.toString()} id={`addr-${address.id}`} className="mt-1" />
// // //                       <div className="flex-1">
// // //                         <div className="flex justify-between items-center mb-1">
// // //                           <span className="font-semibold">{address.name}</span>
// // //                           <div className="flex items-center gap-2">
// // //                             {address.is_default && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium uppercase tracking-tighter">Default</span>}
// // //                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); openAddressDialog(address); }}>
// // //                               <Edit2 className="h-3 w-3" />
// // //                             </Button>
// // //                           </div>
// // //                         </div>
// // //                         <p className="text-sm text-muted-foreground leading-tight">{address.street}</p>
// // //                         <p className="text-sm text-muted-foreground leading-tight">{address.city}, {address.state} {address.zip_code}</p>
// // //                         <p className="text-sm text-muted-foreground mt-1 font-medium">{address.phone}</p>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </RadioGroup>
// // //               )}
// // //             </motion.div>

// // //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-6 shadow-sm border">
// // //               <div className="flex items-center gap-3 mb-4">
// // //                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// // //                   <CreditCard className="h-5 w-5 text-primary" />
// // //                 </div>
// // //                 <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
// // //               </div>
// // //               <div className="bg-muted/50 p-4 rounded-lg border flex items-center justify-between">
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="bg-white p-2 rounded border"><img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png" alt="Stripe" className="h-6" /></div>
// // //                   <div>
// // //                     <p className="font-bold">Stripe Payment</p>
// // //                     <p className="text-sm text-muted-foreground italic">Pay via Card or Apple/Google Pay</p>
// // //                   </div>
// // //                 </div>
// // //                 <Check className="h-5 w-5 text-primary" />
// // //               </div>
// // //             </motion.div>
// // //           </div>

// // //           {/* ORDER SUMMARY SECTION */}
// // //           <div>
// // //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-[2rem] p-8 shadow-sm border sticky top-24 overflow-hidden">
// // //               <h2 className="text-xl font-black text-slate-900 mb-6 uppercase italic tracking-tighter">Order Summary</h2>

// // //               <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
// // //                 {state.items.map((item) => (
// // //                   <div key={item.product.id} className="flex gap-4">
// // //                     <div className="shrink-0 border rounded-xl overflow-hidden h-14 w-14 bg-muted">
// // //                       <img src={getImageUrl(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" />
// // //                     </div>
// // //                     <div className="flex-1 min-w-0">
// // //                       <p className="text-xs font-bold line-clamp-2 uppercase leading-tight">{item.product.name}</p>
// // //                       <p className="text-[10px] text-muted-foreground font-black uppercase">Qty: {item.quantity}</p>
// // //                     </div>
// // //                     <span className="text-xs font-black shrink-0 italic">€{(Number(item.product.price) * item.quantity).toFixed(2)}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               <div className="space-y-4 mb-8 text-sm border-t pt-6">
// // //                 <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
// // //                   <span>Subtotal</span>
// // //                   <span className="text-slate-900 font-black">€{Number(subtotal).toFixed(2)}</span>
// // //                 </div>

// // //                 {/* ✅ 4. RENDER MISC CHARGES LINE ITEMS */}
// // //                 {miscCharges.map((charge) => {
// // //                   const calculatedVal = charge.charge_type === 'percentage' 
// // //                     ? (Number(subtotal) * Number(charge.value)) / 100 
// // //                     : Number(charge.value);
// // //                   return (
// // //                     <div key={charge.id} className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
// // //                       <span>{charge.name}</span>
// // //                       <span className="text-slate-900 font-black">€{calculatedVal.toFixed(2)}</span>
// // //                     </div>
// // //                   );
// // //                 })}

// // //                 <div className="flex justify-between text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
// // //                   <span>Delivery</span>
// // //                   <span className="text-green-600 font-black">FREE</span>
// // //                 </div>

// // //                 {state.discountAmount > 0 && (
// // //                   <div className="flex justify-between text-green-600 font-bold uppercase tracking-widest text-[10px]">
// // //                     <span>Discount</span>
// // //                     <span className="font-black">-€{state.discountAmount.toFixed(2)}</span>
// // //                   </div>
// // //                 )}

// // //                 <div className="flex justify-between text-2xl font-black text-slate-900 border-t pt-4 italic">
// // //                   <span>Total</span>
// // //                   <span className="tracking-tighter">€{finalTotal.toFixed(2)}</span>
// // //                 </div>
// // //               </div>

// // //               <Button
// // //                 onClick={handlePlaceOrder}
// // //                 className="w-full gap-2 bg-primary hover:opacity-90 text-primary-foreground h-14 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20"
// // //                 size="lg"
// // //                 disabled={isProcessing || addresses.length === 0}
// // //               >
// // //                 {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Pay Securely <ArrowRight className="h-4 w-4 ml-1" /></>}
// // //               </Button>
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default CheckoutPage;


// // import { useState, useEffect } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import {
// //   ChevronRight,
// //   MapPin,
// //   CreditCard,
// //   Check,
// //   Plus,
// //   Loader2,
// //   ArrowRight,
// //   Edit2,
// //   User,
// // } from "lucide-react";
// // import { motion } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Layout } from "@/components/layout/Layout";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { useCart } from "@/context/CartContext";
// // import { useAuth } from "@/context/AuthContext";
// // import { useToast } from "@/hooks/use-toast";
// // import { api } from "@/lib/api";

// // const CheckoutPage = () => {
// //   const { state, subtotal } = useCart();
// //   const { user, isAuthenticated } = useAuth();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();

// //   const [addresses, setAddresses] = useState<any[]>([]);
// //   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

// //   // ✅ 1. STATE FOR MISCELLANEOUS CHARGES
// //   const [miscCharges, setMiscCharges] = useState<any[]>([]);

// //   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
// //   const [editingAddress, setEditingAddress] = useState<any | null>(null);
// //   const [addressForm, setAddressForm] = useState({
// //     name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
// //   });

// //   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
// //   const [fullName, setFullName] = useState(user?.name || "");

// //   // ✅ 2. FETCH MISC CHARGES ON MOUNT
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       api.getMiscCharges()
// //         .then((data) => setMiscCharges(data))
// //         .catch((err) => console.error("Failed to load charges", err));
// //     }
// //   }, [isAuthenticated]);

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate("/login?redirect=/checkout");
// //     } else if (state.items.length === 0) {
// //       navigate("/cart");
// //     }
// //   }, [isAuthenticated, state.items.length, navigate]);

// //   const fetchAddresses = () => {
// //     setIsLoadingAddresses(true);
// //     api.getAddresses()
// //       .then((data) => {
// //         setAddresses(data);
// //         if (!selectedAddressId) {
// //           const defaultAddr = data.find((a: any) => a.is_default);
// //           if (defaultAddr) setSelectedAddressId(defaultAddr.id.toString());
// //           else if (data.length > 0) setSelectedAddressId(data[0].id.toString());
// //         }
// //       })
// //       .catch((err) => console.error("Failed to load addresses", err))
// //       .finally(() => setIsLoadingAddresses(false));
// //   };

// //   useEffect(() => {
// //     if (isAuthenticated) fetchAddresses();
// //   }, [isAuthenticated]);

// //   // ✅ 3. CALCULATION LOGIC FOR DYNAMIC TOTAL
// //   const calculateChargesTotal = () => {
// //     return miscCharges.reduce((acc, charge) => {
// //       if (charge.charge_type === 'percentage') {
// //         return acc + (Number(subtotal) * Number(charge.value)) / 100;
// //       }
// //       return acc + Number(charge.value);
// //     }, 0);
// //   };

// //   const chargesTotal = calculateChargesTotal();
// //   const finalTotal = Number(subtotal) + chargesTotal - (state.discountAmount || 0);

// //   const handleAddressSubmit = async () => {
// //     try {
// //       if (editingAddress) {
// //         await api.updateAddress(editingAddress.id, addressForm);
// //         toast({ title: "Address updated" });
// //       } else {
// //         await api.addAddress(addressForm);
// //         toast({ title: "Address added" });
// //       }
// //       setAddressDialogOpen(false);
// //       fetchAddresses();
// //     } catch (err: any) {
// //       toast({ title: "Error", description: "Failed to save address.", variant: "destructive" });
// //     }
// //   };

// //   const openAddressDialog = (address?: any) => {
// //     if (address) {
// //       setEditingAddress(address);
// //       setAddressForm({
// //         name: address.name, street: address.street, city: address.city,
// //         state: address.state, zip_code: address.zip_code, phone: address.phone,
// //         is_default: address.is_default,
// //       });
// //     } else {
// //       setEditingAddress(null);
// //       setAddressForm({
// //         name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
// //       });
// //     }
// //     setAddressDialogOpen(true);
// //   };

// //   const handlePlaceOrder = async () => {
// //     if (!selectedAddressId) {
// //       toast({ title: "Select an address", variant: "destructive" });
// //       return;
// //     }

// //     try {
// //       setIsProcessing(true);
// //       const selectedAddress = addresses.find((a) => a.id.toString() === selectedAddressId);
// //       const response = await api.createCheckoutSession(
// //         state.items.map((item) => ({ product: { id: item.product.id }, quantity: item.quantity })),
// //         selectedAddress
// //       );
// //       if (response.url) window.location.href = response.url;
// //     } catch (err) {
// //       toast({ title: "Checkout failed", variant: "destructive" });
// //       setIsProcessing(false);
// //     }
// //   };

// //   const getImageUrl = (path: string | undefined) => {
// //     if (!path) return "/placeholder.png";
// //     if (path.startsWith("http")) return path;
// //     return `http://127.0.0.1:8000${path}`;
// //   };

// //   return (
// //     <Layout>
// //       <div className="container py-8">
// //         <h1 className="text-3xl font-bold mb-8 uppercase italic tracking-tighter">Checkout</h1>

// //         <div className="grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Address Selection Section */}
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-6 shadow-sm border">
// //               <div className="flex items-center justify-between mb-6">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// //                     <MapPin className="h-5 w-5 text-primary" />
// //                   </div>
// //                   <h2 className="text-xl font-bold">Delivery Address</h2>
// //                 </div>
// //                 <Button variant="ghost" size="sm" onClick={() => openAddressDialog()} className="text-primary font-bold"><Plus className="h-4 w-4 mr-1" /> Add New</Button>
// //               </div>

// //               <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="grid gap-4">
// //                 {addresses.map((address) => (
// //                   <div key={address.id} className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAddressId === address.id.toString() ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"}`} onClick={() => setSelectedAddressId(address.id.toString())}>
// //                     <div className="flex justify-between items-start">
// //                       <div className="flex items-center gap-3">
// //                          <RadioGroupItem value={address.id.toString()} />
// //                          <div>
// //                            <p className="font-semibold">{address.name}</p>
// //                            <p className="text-sm text-muted-foreground">{address.street}, {address.city}</p>
// //                          </div>
// //                       </div>
// //                       <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); openAddressDialog(address); }}><Edit2 className="h-3 w-3" /></Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </RadioGroup>
// //             </motion.div>
// //           </div>

// //           {/* ORDER SUMMARY SECTION */}
// //           <div>
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 sticky top-24">
// //               <h2 className="text-xl font-black text-slate-900 mb-6 uppercase italic tracking-tighter">Summary</h2>

// //               <div className="space-y-4 mb-8 text-sm border-b pb-6">
// //                 <div className="flex justify-between font-bold uppercase tracking-widest text-[10px] text-slate-400">
// //                   <span>Subtotal</span>
// //                   <span className="text-slate-900 font-black">€{Number(subtotal).toFixed(2)}</span>
// //                 </div>

// //                 {/* ✅ DYNAMIC MISC CHARGES DISPLAY */}
// //                 {miscCharges.map((charge) => {
// //                   const val = charge.charge_type === 'percentage' 
// //                     ? (Number(subtotal) * Number(charge.value)) / 100 
// //                     : Number(charge.value);
// //                   return (
// //                     <div key={charge.id} className="flex justify-between font-bold uppercase tracking-widest text-[10px] text-slate-400">
// //                       <span>{charge.name}</span>
// //                       <span className="text-slate-900 font-black">€{val.toFixed(2)}</span>
// //                     </div>
// //                   );
// //                 })}

// //                 <div className="flex justify-between font-bold uppercase tracking-widest text-[10px] text-slate-400">
// //                   <span>Delivery</span>
// //                   <span className="text-green-600 font-black">FREE</span>
// //                 </div>

// //                 {state.discountAmount > 0 && (
// //                   <div className="flex justify-between font-bold uppercase tracking-widest text-[10px] text-green-600">
// //                     <span>Discount</span>
// //                     <span className="font-black">-€{state.discountAmount.toFixed(2)}</span>
// //                   </div>
// //                 )}

// //                 <div className="flex justify-between text-2xl font-black text-slate-900 border-t pt-4 italic">
// //                   <span>Total</span>
// //                   <span className="tracking-tighter">€{finalTotal.toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               <Button
// //                 onClick={handlePlaceOrder}
// //                 className="w-full h-14 bg-primary hover:opacity-90 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20"
// //                 disabled={isProcessing || addresses.length === 0}
// //               >
// //                 {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Pay Securely <ArrowRight className="h-4 w-4 ml-1" /></>}
// //               </Button>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default CheckoutPage;
// import { useState, useEffect } from "react";
// import { useNavigate, Link, useSearchParams } from "react-router-dom";
// import {
//   ChevronRight,
//   MapPin,
//   CreditCard,
//   Check,
//   Plus,
//   Loader2,
//   ArrowRight,
//   Edit2,
//   User,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Layout } from "@/components/layout/Layout";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// const CheckoutPage = () => {
//   const { state, subtotal } = useCart();
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
//   // ✅ 1. Use searchParams to get location for the API call
//   const [searchParams] = useSearchParams();
//   const locationId = searchParams.get('location');

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
//   const [miscCharges, setMiscCharges] = useState<any[]>([]);

//   // Dialog States
//   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<any | null>(null);
//   const [addressForm, setAddressForm] = useState({
//     name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
//   });

//   // Fetch Miscellaneous Charges
//   useEffect(() => {
//     if (isAuthenticated) {
//       api.getMiscCharges()
//         .then((data) => setMiscCharges(data))
//         .catch((err) => console.error("Failed to load charges", err));
//     }
//   }, [isAuthenticated]);

//   // Auth & Cart Check
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(`/login?redirect=/checkout${locationId ? `&location=${locationId}` : ''}`);
//     } else if (state.items.length === 0) {
//       navigate("/cart");
//     }
//   }, [isAuthenticated, state.items.length, navigate, locationId]);

//   // Fetch Addresses
//   const fetchAddresses = () => {
//     setIsLoadingAddresses(true);
//     api.getAddresses()
//       .then((data) => {
//         setAddresses(data);
//         if (data.length > 0) {
//           const defaultAddr = data.find((a: any) => a.is_default) || data[0];
//           setSelectedAddressId(defaultAddr.id.toString());
//         }
//       })
//       .catch((err) => console.error("Failed to load addresses", err))
//       .finally(() => setIsLoadingAddresses(false));
//   };

//   useEffect(() => {
//     if (isAuthenticated) fetchAddresses();
//   }, [isAuthenticated]);

//   // Calculations
//   const chargesTotal = miscCharges.reduce((acc, charge) => {
//     const val = charge.charge_type === 'percentage' 
//       ? (Number(subtotal) * Number(charge.value)) / 100 
//       : Number(charge.value);
//     return acc + val;
//   }, 0);

//   const finalTotal = Number(subtotal) + chargesTotal - (state.discountAmount || 0);

//   // Address Submit Handler
//   const handleAddressSubmit = async () => {
//     try {
//       if (editingAddress) {
//         await api.updateAddress(editingAddress.id, addressForm);
//         toast({ title: "Address updated" });
//       } else {
//         await api.addAddress(addressForm);
//         toast({ title: "New address added" });
//       }
//       setAddressDialogOpen(false);
//       fetchAddresses();
//     } catch (err: any) {
//       toast({ title: "Error", description: "Check all fields and try again.", variant: "destructive" });
//     }
//   };

//   const openAddressDialog = (address?: any) => {
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({ ...address });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({ name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false });
//     }
//     setAddressDialogOpen(true);
//   };

//   // ✅ 2. Fixed Place Order Handler (Fixes 400 Error)
//   const handlePlaceOrder = async () => {
//   if (!selectedAddressId) {
//     toast({ title: "Select an address", variant: "destructive" });
//     return;
//   }

//   try {
//     setIsProcessing(true);
//     const selectedAddress = addresses.find((a) => a.id.toString() === selectedAddressId);
    
//     // ✅ SMART LOCATION LOGIC
//     // 1. Try to get from URL
//     // 2. If not there, try to get from local storage (where you likely save it on the home page)
//     // 3. If still not there, use a placeholder or the address city ID
//     const urlLocation = searchParams.get('location');
//     const storedLocation = localStorage.getItem('selectedLocationId'); 
//     const finalLocationId = urlLocation || storedLocation;

//     if (!finalLocationId) {
//       toast({ 
//         title: "Location missing", 
//         description: "Please select a store location from the home page first.", 
//         variant: "destructive" 
//       });
//       setIsProcessing(false);
//       return;
//     }

//     const response = await api.createCheckoutSession(
//       state.items.map((item) => ({ product: { id: item.product.id }, quantity: item.quantity })),
//       selectedAddress,
//       finalLocationId // ✅ This will no longer be null
//     );

//     if (response.url) {
//       window.location.href = response.url;
//     }
//   } catch (err: any) {
//     console.error("Checkout Error:", err);
//     toast({ 
//       title: "Checkout failed", 
//       description: err.error || "Check your store selection.", 
//       variant: "destructive" 
//     });
//     setIsProcessing(false);
//   }
// };

//   const getImageUrl = (path: string | undefined) => {
//     if (!path) return "/placeholder.png";
//     return path.startsWith("http") ? path : `http://127.0.0.1:8000${path}`;
//   };

//   if (!isAuthenticated || state.items.length === 0) return null;

//   return (
//     <Layout>
//       <div className="container py-10">
//         <h1 className="text-3xl font-black mb-10 uppercase italic tracking-tighter">Checkout</h1>

//         <div className="grid lg:grid-cols-3 gap-12">
//           <div className="lg:col-span-2 space-y-8">
//             {/* ADDRESS SECTION */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
//                     <MapPin className="h-6 w-6 text-primary" />
//                   </div>
//                   <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Delivery Address</h2>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={() => openAddressDialog()} className="rounded-xl border-primary text-primary font-black uppercase text-[10px] tracking-widest">
//                   <Plus className="h-3 w-3 mr-1" /> Add New
//                 </Button>
//               </div>

//               {isLoadingAddresses ? (
//                 <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
//               ) : (
//                 <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="grid gap-4">
//                   {addresses.map((address) => (
//                     <div 
//                       key={address.id} 
//                       className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddressId === address.id.toString() ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"}`} 
//                       onClick={() => setSelectedAddressId(address.id.toString())}
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex gap-4">
//                           <RadioGroupItem value={address.id.toString()} />
//                           <div>
//                             <p className="font-black uppercase text-xs mb-1">{address.name}</p>
//                             <p className="text-sm text-slate-500 font-medium italic">{address.street}, {address.city}</p>
//                             <p className="text-xs text-slate-400 mt-2 font-bold">{address.phone}</p>
//                           </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openAddressDialog(address); }}>
//                           <Edit2 className="h-3 w-3 text-slate-400" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               )}
//             </motion.div>

//             {/* PAYMENT PREVIEW */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
//                   <CreditCard className="h-6 w-6 text-slate-900" />
//                 </div>
//                 <h2 className="text-xl font-black uppercase italic tracking-tight">Payment</h2>
//               </div>
//               <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png" alt="Stripe" className="h-8" />
//                   <div>
//                     <p className="font-black uppercase text-[11px] tracking-widest">Powered by Stripe</p>
//                     <p className="text-xs text-slate-400 font-medium italic">Secure Encrypted Transaction</p>
//                   </div>
//                 </div>
//                 <Check className="h-6 w-6 text-green-500" />
//               </div>
//             </motion.div>
//           </div>

//           {/* SUMMARY */}
//           <div className="lg:col-span-1">
//             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-24">
//               <h2 className="text-xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Summary</h2>

//               <div className="space-y-4 mb-10 text-sm border-b pb-8">
//                 <div className="flex justify-between font-bold uppercase tracking-widest text-[9px] text-slate-400">
//                   <span>Subtotal</span>
//                   <span className="text-slate-900 font-black">€{Number(subtotal).toFixed(2)}</span>
//                 </div>

//                 {miscCharges.map((charge) => (
//                   <div key={charge.id} className="flex justify-between font-bold uppercase tracking-widest text-[9px] text-slate-400">
//                     <span>{charge.name}</span>
//                     <span className="text-slate-900 font-black">
//                       €{(charge.charge_type === 'percentage' ? (Number(subtotal) * Number(charge.value)) / 100 : Number(charge.value)).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}

//                 <div className="flex justify-between font-bold uppercase tracking-widest text-[9px] text-green-600">
//                   <span>Delivery</span>
//                   <span className="font-black">FREE</span>
//                 </div>

//                 <div className="flex justify-between text-3xl font-black text-slate-900 border-t border-dashed pt-6 mt-4 italic tracking-tighter">
//                   <span>Total</span>
//                   <span>€{finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePlaceOrder}
//                 className="w-full h-16 bg-primary hover:opacity-95 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl transition-all active:scale-95"
//                 disabled={isProcessing || addresses.length === 0}
//               >
//                 {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Pay Securely <ArrowRight className="h-4 w-4 ml-2" /></>}
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ADDRESS DIALOG */}
//       <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
//         <DialogContent className="rounded-[2rem] max-w-md">
//           <DialogHeader>
//             <DialogTitle className="font-black uppercase italic tracking-tight">
//               {editingAddress ? "Update Location" : "Add Delivery Spot"}
//             </DialogTitle>
//             {/* ✅ Added Description to fix Radix Warning */}
//             <DialogDescription className="text-[10px] uppercase font-bold text-slate-400">
//               Provide your delivery details for accurate shipping.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Label (e.g Home)</Label>
//               <Input value={addressForm.name} onChange={(e) => setAddressForm({...addressForm, name: e.target.value})} className="rounded-xl" />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Street</Label>
//               <Input value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} className="rounded-xl" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">City</Label>
//                 <Input value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} className="rounded-xl" />
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">State</Label>
//                 <Input value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} className="rounded-xl" />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Zip Code</Label>
//                 <Input value={addressForm.zip_code} onChange={(e) => setAddressForm({...addressForm, zip_code: e.target.value})} className="rounded-xl" />
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Phone</Label>
//                 <Input value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} className="rounded-xl" />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 py-2">
//               <Checkbox id="default" checked={addressForm.is_default} onCheckedChange={(checked) => setAddressForm({ ...addressForm, is_default: !!checked })} />
//               <Label htmlFor="default" className="text-xs font-bold uppercase text-slate-500">Primary address</Label>
//             </div>
//             <Button onClick={handleAddressSubmit} className="w-full font-black uppercase tracking-widest text-[11px] h-12 rounded-xl bg-slate-900">
//               {editingAddress ? "Update" : "Save Location"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Layout>
//   );
// };

// export default CheckoutPage;

// import { useState, useEffect, useMemo } from "react"; // ✅ Added useMemo
// import { useNavigate, useSearchParams } from "react-router-dom";
// import {
//   ChevronRight,
//   MapPin,
//   CreditCard,
//   Check,
//   Plus,
//   Loader2,
//   ArrowRight,
//   Edit2,
//   User,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Layout } from "@/components/layout/Layout";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// const CheckoutPage = () => {
//   const { state, subtotal } = useCart();
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
//   const [searchParams] = useSearchParams();

//   // ✅ 1. Reactive Location Logic
//   // This ensures that if the URL changes, the component re-renders with the new location
//   const locationId = useMemo(() => {
//     return searchParams.get('location') || localStorage.getItem('selectedLocationId');
//   }, [searchParams]);

//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string>("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
//   const [miscCharges, setMiscCharges] = useState<any[]>([]);

//   // Dialog States
//   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<any | null>(null);
//   const [addressForm, setAddressForm] = useState({
//     name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
//   });

//   // Fetch Miscellaneous Charges
//   useEffect(() => {
//     if (isAuthenticated) {
//       api.getMiscCharges()
//         .then((data) => setMiscCharges(data))
//         .catch((err) => console.error("Failed to load charges", err));
//     }
//   }, [isAuthenticated]);

//   // Auth & Cart Check
//   useEffect(() => {
//     if (!isAuthenticated) {
//       // ✅ Pass location to login so it returns with it
//       navigate(`/login?redirect=/checkout${locationId ? `&location=${locationId}` : ''}`);
//     } else if (state.items.length === 0) {
//       navigate("/cart");
//     }
//   }, [isAuthenticated, state.items.length, navigate, locationId]);

//   // Fetch Addresses
//   const fetchAddresses = () => {
//     setIsLoadingAddresses(true);
//     api.getAddresses()
//       .then((data) => {
//         setAddresses(data);
//         if (data.length > 0) {
//           const defaultAddr = data.find((a: any) => a.is_default) || data[0];
//           setSelectedAddressId(defaultAddr.id.toString());
//         }
//       })
//       .catch((err) => console.error("Failed to load addresses", err))
//       .finally(() => setIsLoadingAddresses(false));
//   };

//   useEffect(() => {
//     if (isAuthenticated) fetchAddresses();
//   }, [isAuthenticated]);

//   // Calculations
//   const chargesTotal = miscCharges.reduce((acc, charge) => {
//     const val = charge.charge_type === 'percentage' 
//       ? (Number(subtotal) * Number(charge.value)) / 100 
//       : Number(charge.value);
//     return acc + val;
//   }, 0);

//   const finalTotal = Number(subtotal) + chargesTotal - (state.discountAmount || 0);

//   // Address Submit Handler
//   const handleAddressSubmit = async () => {
//     try {
//       if (editingAddress) {
//         await api.updateAddress(editingAddress.id, addressForm);
//         toast({ title: "Address updated" });
//       } else {
//         await api.addAddress(addressForm);
//         toast({ title: "New address added" });
//       }
//       setAddressDialogOpen(false);
//       fetchAddresses();
//     } catch (err: any) {
//       toast({ title: "Error", description: "Check all fields.", variant: "destructive" });
//     }
//   };

//   const openAddressDialog = (address?: any) => {
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({ ...address });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({ name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false });
//     }
//     setAddressDialogOpen(true);
//   };

//   // ✅ 2. Place Order Handler (Using the memoized locationId)
//   // Inside CheckoutPage.tsx
// const handlePlaceOrder = async () => {
//   if (!selectedAddressId) {
//     toast({ title: "Select an address", variant: "destructive" });
//     return;
//   }

//   // We use the locationId from your useMemo at the top of the component
//   if (!locationId) {
//     toast({ 
//       title: "Location missing", 
//       description: "Please select a store location first.", 
//       variant: "destructive" 
//     });
//     return;
//   }

//   try {
//     setIsProcessing(true);
//     const selectedAddress = addresses.find((a) => a.id.toString() === selectedAddressId);
    
//     // ✅ FIX: Ensure locationId is passed correctly to the API
//     const response = await api.createCheckoutSession(
//       state.items.map((item) => ({ 
//         product: { id: item.product.id }, 
//         quantity: item.quantity 
//       })),
//       selectedAddress,
//       locationId // This must match the backend's expected 'location_id'
//     );

//     if (response.url) {
//       window.location.href = response.url;
//     }
//   } catch (err: any) {
//     // ... error handling
//     setIsProcessing(false);
//   }
// };

//   if (!isAuthenticated || state.items.length === 0) return null;

//   return (
//     <Layout>
//       <div className="container py-10">
//         {/* Header with Current Location Indicator */}
//         <div className="flex justify-between items-end mb-10">
//             <div>
//                 <h1 className="text-3xl font-black uppercase italic tracking-tighter">Checkout</h1>
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
//                     Store ID: <span className="text-primary">{locationId || "None Selected"}</span>
//                 </p>
//             </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-12">
//           <div className="lg:col-span-2 space-y-8">
//             {/* ADDRESS SECTION */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
//                     <MapPin className="h-6 w-6 text-primary" />
//                   </div>
//                   <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Delivery Address</h2>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={() => openAddressDialog()} className="rounded-xl border-primary text-primary font-black uppercase text-[10px] tracking-widest">
//                   <Plus className="h-3 w-3 mr-1" /> Add New
//                 </Button>
//               </div>

//               {isLoadingAddresses ? (
//                 <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
//               ) : (
//                 <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="grid gap-4">
//                   {addresses.map((address) => (
//                     <div 
//                       key={address.id} 
//                       className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddressId === address.id.toString() ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"}`} 
//                       onClick={() => setSelectedAddressId(address.id.toString())}
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex gap-4">
//                           <RadioGroupItem value={address.id.toString()} />
//                           <div>
//                             <p className="font-black uppercase text-xs mb-1">{address.name}</p>
//                             <p className="text-sm text-slate-500 font-medium italic">{address.street}, {address.city}</p>
//                             <p className="text-xs text-slate-400 mt-2 font-bold">{address.phone}</p>
//                           </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openAddressDialog(address); }}>
//                           <Edit2 className="h-3 w-3 text-slate-400" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               )}
//             </motion.div>

//             {/* PAYMENT PREVIEW */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
//                   <CreditCard className="h-6 w-6 text-slate-900" />
//                 </div>
//                 <h2 className="text-xl font-black uppercase italic tracking-tight">Payment</h2>
//               </div>
//               <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png" alt="Stripe" className="h-8" />
//                   <div>
//                     <p className="font-black uppercase text-[11px] tracking-widest">Powered by Stripe</p>
//                     <p className="text-xs text-slate-400 font-medium italic">Secure Encrypted Transaction</p>
//                   </div>
//                 </div>
//                 <Check className="h-6 w-6 text-green-500" />
//               </div>
//             </motion.div>
//           </div>

//           {/* SUMMARY */}
//           <div className="lg:col-span-1">
//             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-24">
//               <h2 className="text-xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Summary</h2>

//               <div className="space-y-5 mb-10 border-b pb-8">
//   {/* Subtotal Row */}
//   <div className="flex justify-between items-center text-sm font-semibold tracking-tight text-slate-500">
//     <span>Subtotal</span>
//     <span className="text-slate-900 text-base font-bold">
//       €{Number(subtotal).toFixed(2)}
//     </span>
//   </div>

//   {/* Dynamic Misc Charges */}
//   {miscCharges.map((charge) => (
//     <div key={charge.id} className="flex justify-between items-center text-sm font-semibold tracking-tight text-slate-500">
//       <span>{charge.name}</span>
//       <span className="text-slate-900 text-base font-bold">
//         €{(charge.charge_type === 'percentage' 
//           ? (Number(subtotal) * Number(charge.value)) / 100 
//           : Number(charge.value)
//         ).toFixed(2)}
//       </span>
//     </div>
//   ))}

//                 <div className="flex justify-between text-3xl font-black text-slate-900 border-t border-dashed pt-6 mt-4 italic tracking-tighter">
//                   <span>Total</span>
//                   <span>€{finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePlaceOrder}
//                 className="w-full h-16 bg-primary hover:opacity-95 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl transition-all active:scale-95"
//                 disabled={isProcessing || addresses.length === 0}
//               >
//                 {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Pay Securely <ArrowRight className="h-4 w-4 ml-2" /></>}
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ADDRESS DIALOG */}
//       <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
//         <DialogContent className="rounded-[2rem] max-w-md">
//           <DialogHeader>
//             <DialogTitle className="font-black uppercase italic tracking-tight">
//               {editingAddress ? "Update Location" : "Add Delivery Spot"}
//             </DialogTitle>
//             <DialogDescription className="text-[10px] uppercase font-bold text-slate-400">
//               Provide your delivery details for accurate shipping.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Label (e.g Home)</Label>
//               <Input value={addressForm.name} onChange={(e) => setAddressForm({...addressForm, name: e.target.value})} className="rounded-xl" />
//             </div>
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Street</Label>
//               <Input value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} className="rounded-xl" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">City</Label>
//                 <Input value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} className="rounded-xl" />
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">State</Label>
//                 <Input value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} className="rounded-xl" />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Zip Code</Label>
//                 <Input value={addressForm.zip_code} onChange={(e) => setAddressForm({...addressForm, zip_code: e.target.value})} className="rounded-xl" />
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-[10px] uppercase font-black text-slate-400 ml-1">Phone</Label>
//                 <Input value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} className="rounded-xl" />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 py-2">
//               <Checkbox id="default" checked={addressForm.is_default} onCheckedChange={(checked) => setAddressForm({ ...addressForm, is_default: !!checked })} />
//               <Label htmlFor="default" className="text-xs font-bold uppercase text-slate-500">Primary address</Label>
//             </div>
//             <Button onClick={handleAddressSubmit} className="w-full font-black uppercase tracking-widest text-[11px] h-12 rounded-xl bg-slate-900">
//               {editingAddress ? "Update" : "Save Location"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Layout>
//   );
// };

// export default CheckoutPage;

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Check,
  Plus,
  Loader2,
  ArrowRight,
  Edit2,
  Tag,
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

// ✅ Helper to fix broken image URLs
const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  return `http://api.desigrocery.ie${path}`;
};

const CheckoutPage = () => {
  const { state, subtotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const locationId = useMemo(() => {
    return searchParams.get('location') || localStorage.getItem('selectedLocationId');
  }, [searchParams]);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [miscCharges, setMiscCharges] = useState<any[]>([]);

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      api.getMiscCharges()
        .then((data) => setMiscCharges(data))
        .catch((err) => console.error("Failed to load charges", err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/checkout${locationId ? `&location=${locationId}` : ''}`);
    } else if (state.items.length === 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, state.items.length, navigate, locationId]);

  const fetchAddresses = () => {
    setIsLoadingAddresses(true);
    api.getAddresses()
      .then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          const defaultAddr = data.find((a: any) => a.is_default) || data[0];
          setSelectedAddressId(defaultAddr.id.toString());
        }
      })
      .catch((err) => console.error("Failed to load addresses", err))
      .finally(() => setIsLoadingAddresses(false));
  };

  useEffect(() => {
    if (isAuthenticated) fetchAddresses();
  }, [isAuthenticated]);

  // ✅ Calculation Logic
  const chargesTotal = miscCharges.reduce((acc, charge) => {
    const val = charge.charge_type === 'percentage' 
      ? (Number(subtotal) * Number(charge.value)) / 100 
      : Number(charge.value);
    return acc + val;
  }, 0);

  const finalTotal = Number(subtotal) + chargesTotal - (state.discountAmount || 0);

  const handleAddressSubmit = async () => {
    try {
      if (editingAddress) {
        await api.updateAddress(editingAddress.id, addressForm);
        toast({ title: "Address updated" });
      } else {
        await api.addAddress(addressForm);
        toast({ title: "New address added" });
      }
      setAddressDialogOpen(false);
      fetchAddresses();
    } catch (err: any) {
      toast({ title: "Error", description: "Please check all fields.", variant: "destructive" });
    }
  };

  const openAddressDialog = (address?: any) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({ ...address });
    } else {
      setEditingAddress(null);
      setAddressForm({ name: "", street: "", city: "", state: "", zip_code: "", phone: "", is_default: false });
    }
    setAddressDialogOpen(true);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast({ title: "Selection Required", description: "Please select a delivery address.", variant: "destructive" });
      return;
    }

    try {
      setIsProcessing(true);
      const selectedAddress = addresses.find((a) => a.id.toString() === selectedAddressId);
      
      const response = await api.createCheckoutSession(
        state.items.map((item) => ({ 
          product: { id: item.product.id }, 
          quantity: item.quantity 
        })),
        selectedAddress,
        locationId
      );

      if (response.url) {
        window.location.href = response.url;
      }
    } catch (err: any) {
      toast({ title: "Checkout Error", description: "Could not initialize payment.", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Checkout</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Store Location ID: <span className="text-primary">{locationId || "Default"}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight">Delivery Details</h2>
                </div>
                <Button variant="outline" size="sm" onClick={() => openAddressDialog()} className="rounded-xl border-primary text-primary font-black uppercase text-[10px] tracking-widest">
                  <Plus className="h-3 w-3 mr-1" /> New Address
                </Button>
              </div>

              {isLoadingAddresses ? (
                <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : (
                <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="grid gap-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddressId === address.id.toString() ? "border-primary bg-primary/5" : "border-slate-100"}`} 
                      onClick={() => setSelectedAddressId(address.id.toString())}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <RadioGroupItem value={address.id.toString()} />
                          <div>
                            <p className="font-black uppercase text-xs mb-1">{address.name}</p>
                            <p className="text-sm text-slate-500 font-medium italic">{address.street}, {address.city}</p>
                            <p className="text-xs text-slate-400 mt-2 font-bold">{address.phone}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openAddressDialog(address); }}>
                          <Edit2 className="h-3 w-3 text-slate-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <CreditCard className="h-6 w-6 text-slate-900" />
                </div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">Payment Method</h2>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-2-498440.png" alt="Stripe" className="h-8" />
                  <p className="font-black uppercase text-[11px] tracking-widest">Pay via Stripe</p>
                </div>
                <Check className="h-6 w-6 text-green-500" />
              </div>
            </motion.div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-24 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
              <h2 className="text-xl font-black text-primary mb-8 uppercase italic tracking-tighter">Your Order</h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-[200px] overflow-y-auto pr-2">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={getImageUrl(item.product.image)} className="w-10 h-10 rounded-lg object-contain bg-slate-50" alt={item.product.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black italic text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-black">€{(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pt-6 border-t">
                <div className="flex justify-between text-sm font-semibold text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">€{Number(subtotal).toFixed(2)}</span>
                </div>

                {miscCharges.map((charge) => {
                  const val = charge.charge_type === 'percentage' 
                    ? (Number(subtotal) * Number(charge.value)) / 100 
                    : Number(charge.value);
                  return (
                    <div key={charge.id} className="flex justify-between text-sm font-semibold text-slate-500">
                      <span>{charge.name}</span>
                      <span className="text-slate-900 font-bold">€{val.toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="flex justify-between text-sm font-semibold text-slate-500">
                  <span>Delivery</span>
                  <span className="text-primary font-bold uppercase">Free</span>
                </div>

                {/* ✅ PROMO DISPLAY */}
                {state.discountAmount > 0 && (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 text-green-600" />
                      <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">Promo Applied</span>
                    </div>
                    <span className="text-xs font-black text-green-600">-€{state.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-3xl font-black text-slate-900 border-t border-dashed pt-6 mt-4 italic tracking-tighter">
                  <span>Total</span>
                  <span>€{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full h-16 bg-primary hover:opacity-95 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all active:scale-95"
                disabled={isProcessing || addresses.length === 0}
              >
                {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : "Pay Securely"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Address Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black uppercase italic tracking-tight">
              {editingAddress ? "Update Address" : "New Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-black text-slate-400">Address Label</Label>
              <Input value={addressForm.name} onChange={(e) => setAddressForm({...addressForm, name: e.target.value})} className="rounded-xl" placeholder="e.g. Home" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-black text-slate-400">Street</Label>
              <Input value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-black text-slate-400">City</Label>
                <Input value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-black text-slate-400">State</Label>
                <Input value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} className="rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-black text-slate-400">Zip Code</Label>
                <Input value={addressForm.zip_code} onChange={(e) => setAddressForm({...addressForm, zip_code: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-black text-slate-400">Phone</Label>
                <Input value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} className="rounded-xl" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="default" checked={addressForm.is_default} onCheckedChange={(checked) => setAddressForm({ ...addressForm, is_default: !!checked })} />
              <Label htmlFor="default" className="text-xs font-bold text-slate-500">Set as Primary</Label>
            </div>
            <Button onClick={handleAddressSubmit} className="w-full font-black uppercase tracking-widest text-[11px] h-12 rounded-xl bg-slate-900 mt-4">
              {editingAddress ? "Update" : "Save Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CheckoutPage;