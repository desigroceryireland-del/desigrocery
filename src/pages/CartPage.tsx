// // // import { useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import {
// // //   Trash2,
// // //   Minus,
// // //   Plus,
// // //   ShoppingBag,
// // //   ArrowRight,
// // //   Tag,
// // // } from "lucide-react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { useCart } from "@/context/CartContext";
// // // import { useAuth } from "@/context/AuthContext";
// // // import { useToast } from "@/hooks/use-toast";

// // // const CartPage = () => {
// // //   const { state, updateQuantity, removeFromCart, applyPromo, subtotal, total } =
// // //     useCart();
// // //   const { isAuthenticated } = useAuth();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();
// // //   const [promoCode, setPromoCode] = useState("");
// // //   const [promoError, setPromoError] = useState("");

// // //   const handleApplyPromo = () => {
// // //     if (!promoCode) return;

// // //     const success = applyPromo(promoCode);
// // //     if (success) {
// // //       toast({
// // //         title: "Promo code applied!",
// // //         description: `You saved ${state.discount}% on your order.`,
// // //       });
// // //       setPromoError("");
// // //     } else {
// // //       setPromoError("Invalid promo code. Try DESI10, FRESH20, or WELCOME15.");
// // //     }
// // //   };

// // //   const handleCheckout = () => {
// // //     if (!isAuthenticated) {
// // //       toast({
// // //         title: "Please log in",
// // //         description: "You need to be logged in to checkout.",
// // //         variant: "destructive",
// // //       });
// // //       navigate("/login?redirect=/checkout");
// // //     } else {
// // //       navigate("/checkout");
// // //     }
// // //   };

// // //   if (state.items.length === 0) {
// // //     return (
// // //       <Layout>
// // //         <div className="container py-16">
// // //           <div className="max-w-md mx-auto text-center">
// // //             <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
// // //               <ShoppingBag className="h-12 w-12 text-muted-foreground" />
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-foreground mb-4">
// // //               Your cart is empty
// // //             </h1>
// // //             <p className="text-muted-foreground mb-8">
// // //               Looks like you haven't added any items to your cart yet.
// // //             </p>
// // //             <Link to="/category/all">
// // //               <Button className="gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground">
// // //                 Start Shopping
// // //                 <ArrowRight className="h-4 w-4" />
// // //               </Button>
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   return (
// // //     <Layout>
// // //       <div className="container py-8">
// // //         <h1 className="text-3xl font-bold text-foreground mb-8">
// // //           Shopping Cart
// // //         </h1>

// // //         <div className="grid lg:grid-cols-3 gap-8">
// // //           {/* Cart Items */}
// // //           <div className="lg:col-span-2 space-y-4">
// // //             <AnimatePresence>
// // //               {state.items.map((item) => (
// // //                 <motion.div
// // //                   key={item.product.id}
// // //                   initial={{ opacity: 0, y: 10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   exit={{ opacity: 0, x: -100 }}
// // //                   className="bg-card rounded-xl p-4 shadow-card border"
// // //                 >
// // //                   <div className="flex gap-4">
// // //                     <Link
// // //                       to={`/product/${item.product.id}`}
// // //                       className="shrink-0"
// // //                     >
// // //                       <img
// // //                         src={item.product.image}
// // //                         alt={item.product.name}
// // //                         className="w-24 h-24 rounded-lg object-cover"
// // //                       />
// // //                     </Link>
// // //                     <div className="flex-1 min-w-0">
// // //                       <Link to={`/product/${item.product.id}`}>
// // //                         <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
// // //                           {item.product.name}
// // //                         </h3>
// // //                       </Link>
// // //                       <p className="text-sm text-muted-foreground mb-2">
// // //                         €{item.product.price.toFixed(2)} / {item.product.unit}
// // //                       </p>

// // //                       <div className="flex items-center justify-between">
// // //                         <div className="flex items-center border rounded-lg">
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="h-8 w-8"
// // //                             onClick={() =>
// // //                               updateQuantity(item.product.id, item.quantity - 1)
// // //                             }
// // //                           >
// // //                             <Minus className="h-4 w-4" />
// // //                           </Button>
// // //                           <span className="w-10 text-center font-medium">
// // //                             {item.quantity}
// // //                           </span>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="h-8 w-8"
// // //                             onClick={() =>
// // //                               updateQuantity(item.product.id, item.quantity + 1)
// // //                             }
// // //                           >
// // //                             <Plus className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>

// // //                         <div className="flex items-center gap-4">
// // //                           <span className="font-semibold">
// // //                             €{(item.product.price * item.quantity).toFixed(2)}
// // //                           </span>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="text-destructive hover:text-destructive"
// // //                             onClick={() => removeFromCart(item.product.id)}
// // //                           >
// // //                             <Trash2 className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               ))}
// // //             </AnimatePresence>
// // //           </div>

// // //           {/* Order Summary */}
// // //           <div>
// // //             <div className="bg-card rounded-xl p-6 shadow-card border sticky top-32">
// // //               <h2 className="text-xl font-bold text-foreground mb-6">
// // //                 Order Summary
// // //               </h2>

// // //               <div className="space-y-4 mb-6">
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>Subtotal ({state.items.length} items)</span>
// // //                   <span>€{subtotal.toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>Delivery</span>
// // //                   <span className="text-green">Free</span>
// // //                 </div>
// // //                 {state.discount > 0 && (
// // //                   <div className="flex justify-between text-green">
// // //                     <span>Discount ({state.discount}%)</span>
// // //                     <span>
// // //                       -€{((subtotal * state.discount) / 100).toFixed(2)}
// // //                     </span>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Promo Code */}
// // //               <div className="mb-6">
// // //                 <div className="flex gap-2">
// // //                   <div className="relative flex-1">
// // //                     <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // //                     <Input
// // //                       placeholder="Promo code"
// // //                       value={promoCode}
// // //                       onChange={(e) =>
// // //                         setPromoCode(e.target.value.toUpperCase())
// // //                       }
// // //                       className="pl-10"
// // //                     />
// // //                   </div>
// // //                   <Button variant="outline" onClick={handleApplyPromo}>
// // //                     Apply
// // //                   </Button>
// // //                 </div>
// // //                 {promoError && (
// // //                   <p className="text-xs text-destructive mt-2">{promoError}</p>
// // //                 )}
// // //                 {state.promoCode && (
// // //                   <p className="text-xs text-green mt-2">
// // //                     Code {state.promoCode} applied!
// // //                   </p>
// // //                 )}
// // //               </div>

// // //               <div className="border-t pt-4 mb-6">
// // //                 <div className="flex justify-between text-lg font-bold">
// // //                   <span>Total</span>
// // //                   <span>€{total.toFixed(2)}</span>
// // //                 </div>
// // //               </div>

// // //               <Button
// // //                 onClick={handleCheckout}
// // //                 className="w-full gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground"
// // //                 size="lg"
// // //               >
// // //                 Proceed to Checkout
// // //                 <ArrowRight className="h-4 w-4" />
// // //               </Button>

// // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // //                 Free delivery on orders over €50
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default CartPage;
// // // import { useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import {
// // //   Trash2,
// // //   Minus,
// // //   Plus,
// // //   ShoppingBag,
// // //   ArrowRight,
// // //   Tag,
// // //   Loader2,
// // // } from "lucide-react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { useCart } from "@/context/CartContext";
// // // import { useAuth } from "@/context/AuthContext";
// // // import { useToast } from "@/hooks/use-toast";

// // // const getImageUrl = (path: string | undefined) => {
// // //   if (!path) return "/placeholder.png"; // Fallback image
// // //   if (path.startsWith("http")) return path; // Already absolute
// // //   return `http://127.0.0.1:8000${path}`; // Prepend backend URL
// // // };
// // // const CartPage = () => {
// // //   const {
// // //     state,
// // //     updateQuantity,
// // //     removeFromCart,
// // //     applyPromo,
// // //     subtotal,
// // //     total,
// // //     isLoading,
// // //     error,
// // //   } = useCart();
// // //   const { isAuthenticated } = useAuth();
// // //   const navigate = useNavigate();
// // //   const { toast } = useToast();
// // //   const [promoCode, setPromoCode] = useState("");
// // //   const [promoError, setPromoError] = useState("");
// // //   const [isApplyingPromo, setIsApplyingPromo] = useState(false);

// // //   // ✅ Fixed: Made async and await applyPromo
// // //   const handleApplyPromo = async () => {
// // //     if (!promoCode || isApplyingPromo) return;

// // //     setIsApplyingPromo(true);
// // //     setPromoError("");

// // //     const success = await applyPromo(promoCode);

// // //     setIsApplyingPromo(false);

// // //     if (success) {
// // //       toast({
// // //         title: "Promo code applied!",
// // //         description: `You saved €${state.discountAmount.toFixed(2)} on your order.`,
// // //       });
// // //       setPromoError("");
// // //       setPromoCode(""); // ✅ Clear input after success
// // //     } else {
// // //       setPromoError("Invalid promo code. Please try again.");
// // //     }
// // //   };

// // //   const handleCheckout = () => {
// // //     if (!isAuthenticated) {
// // //       toast({
// // //         title: "Please log in",
// // //         description: "You need to be logged in to checkout.",
// // //         variant: "destructive",
// // //       });
// // //       navigate("/login?redirect=/checkout");
// // //     } else {
// // //       navigate("/checkout");
// // //     }
// // //   };

// // //   // ✅ Loading state
// // //   if (isLoading) {
// // //     return (
// // //       <Layout>
// // //         <div className="container py-16">
// // //           <div className="max-w-md mx-auto text-center">
// // //             <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
// // //             <p className="text-muted-foreground">Loading your cart...</p>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   // ✅ Error state with retry
// // //   if (error && state.items.length === 0) {
// // //     return (
// // //       <Layout>
// // //         <div className="container py-16">
// // //           <div className="max-w-md mx-auto text-center">
// // //             <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
// // //               <ShoppingBag className="h-12 w-12 text-destructive" />
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-foreground mb-4">
// // //               Failed to load cart
// // //             </h1>
// // //             <p className="text-destructive mb-8">{error}</p>
// // //             <Button onClick={() => window.location.reload()}>Retry</Button>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   // ✅ Empty cart state
// // //   if (state.items.length === 0) {
// // //     return (
// // //       <Layout>
// // //         <div className="container py-16">
// // //           <div className="max-w-md mx-auto text-center">
// // //             <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
// // //               <ShoppingBag className="h-12 w-12 text-muted-foreground" />
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-foreground mb-4">
// // //               Your cart is empty
// // //             </h1>
// // //             <p className="text-muted-foreground mb-8">
// // //               Looks like you haven't added any items to your cart yet.
// // //             </p>
// // //             <Link to="/category/all">
// // //               <Button className="gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground">
// // //                 Start Shopping
// // //                 <ArrowRight className="h-4 w-4" />
// // //               </Button>
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   return (
// // //     <Layout>
// // //       <div className="container py-8">
// // //         <h1 className="text-3xl font-bold text-foreground mb-8">
// // //           Shopping Cart
// // //         </h1>

// // //         {/* ✅ Show error banner if error exists but cart has items */}
// // //         {error && (
// // //           <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <div className="grid lg:grid-cols-3 gap-8">
// // //           {/* Cart Items */}
// // //           <div className="lg:col-span-2 space-y-4">
// // //             <AnimatePresence>
// // //               {state.items.map((item) => (
// // //                 <motion.div
// // //                   key={item.product.id}
// // //                   initial={{ opacity: 0, y: 10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   exit={{ opacity: 0, x: -100 }}
// // //                   className="bg-card rounded-xl p-4 shadow-card border"
// // //                 >
// // //                   <div className="flex gap-4">
// // //                     <Link
// // //                       to={`/product/${item.product.id}`}
// // //                       className="shrink-0"
// // //                     >
// // //                       <img
// // //                         src={item.product.image}
// // //                         alt={item.product.name}
// // //                         className="w-24 h-24 rounded-lg object-cover"
// // //                       />
// // //                     </Link>
// // //                     <div className="flex-1 min-w-0">
// // //                       <Link to={`/product/${item.product.id}`}>
// // //                         <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
// // //                           {item.product.name}
// // //                         </h3>
// // //                       </Link>
// // //                       <p className="text-sm text-muted-foreground mb-2">
// // //                         €{item.product.price.toFixed(2)} / {item.product.unit}
// // //                       </p>

// // //                       <div className="flex items-center justify-between">
// // //                         <div className="flex items-center border rounded-lg">
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="h-8 w-8"
// // //                             onClick={() =>
// // //                               updateQuantity(item.product.id, item.quantity - 1)
// // //                             }
// // //                             disabled={item.quantity <= 1}
// // //                           >
// // //                             <Minus className="h-4 w-4" />
// // //                           </Button>
// // //                           <span className="w-10 text-center font-medium">
// // //                             {item.quantity}
// // //                           </span>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="h-8 w-8"
// // //                             onClick={() =>
// // //                               updateQuantity(item.product.id, item.quantity + 1)
// // //                             }
// // //                           >
// // //                             <Plus className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>

// // //                         <div className="flex items-center gap-4">
// // //                           <span className="font-semibold">
// // //                             €{(item.product.price * item.quantity).toFixed(2)}
// // //                           </span>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="text-destructive hover:text-destructive"
// // //                             onClick={() => removeFromCart(item.product.id)}
// // //                           >
// // //                             <Trash2 className="h-4 w-4" />
// // //                           </Button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               ))}
// // //             </AnimatePresence>
// // //           </div>

// // //           {/* Order Summary */}
// // //           <div>
// // //             <div className="bg-card rounded-xl p-6 shadow-card border sticky top-32">
// // //               <h2 className="text-xl font-bold text-foreground mb-6">
// // //                 Order Summary
// // //               </h2>

// // //               <div className="space-y-4 mb-6">
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>Subtotal ({state.items.length} items)</span>
// // //                   <span>€{subtotal.toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>Delivery</span>
// // //                   <span className="text-green">Free</span>
// // //                 </div>
// // //                 {/* ✅ Fixed: Use discountAmount instead of discount% */}
// // //                 {state.discountAmount > 0 && (
// // //                   <div className="flex justify-between text-green">
// // //                     <span>Discount</span>
// // //                     <span>-€{state.discountAmount.toFixed(2)}</span>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Promo Code */}
// // //               <div className="mb-6">
// // //                 <div className="flex gap-2">
// // //                   <div className="relative flex-1">
// // //                     <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // //                     <Input
// // //                       placeholder="Promo code"
// // //                       value={promoCode}
// // //                       onChange={(e) =>
// // //                         setPromoCode(e.target.value.toUpperCase())
// // //                       }
// // //                       onKeyDown={(e) => {
// // //                         if (e.key === "Enter") handleApplyPromo();
// // //                       }}
// // //                       className="pl-10"
// // //                       disabled={isApplyingPromo}
// // //                     />
// // //                   </div>
// // //                   <Button
// // //                     variant="outline"
// // //                     onClick={handleApplyPromo}
// // //                     disabled={isApplyingPromo || !promoCode}
// // //                   >
// // //                     {isApplyingPromo ? (
// // //                       <>
// // //                         <Loader2 className="h-4 w-4 animate-spin mr-2" />
// // //                         Applying...
// // //                       </>
// // //                     ) : (
// // //                       "Apply"
// // //                     )}
// // //                   </Button>
// // //                 </div>
// // //                 {promoError && (
// // //                   <p className="text-xs text-destructive mt-2">{promoError}</p>
// // //                 )}
// // //                 {state.promoCode && (
// // //                   <p className="text-xs text-green mt-2">
// // //                     Code {state.promoCode} applied!
// // //                   </p>
// // //                 )}
// // //               </div>

// // //               <div className="border-t pt-4 mb-6">
// // //                 <div className="flex justify-between text-lg font-bold">
// // //                   <span>Total</span>
// // //                   <span>€{total.toFixed(2)}</span>
// // //                 </div>
// // //               </div>

// // //               <Button
// // //                 onClick={handleCheckout}
// // //                 className="w-full gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground"
// // //                 size="lg"
// // //               >
// // //                 Proceed to Checkout
// // //                 <ArrowRight className="h-4 w-4" />
// // //               </Button>

// // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // //                 Free delivery on orders over €50
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default CartPage;

// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import {
// //   Trash2,
// //   Minus,
// //   Plus,
// //   ShoppingBag,
// //   ArrowRight,
// //   Tag,
// //   Loader2,
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Layout } from "@/components/layout/Layout";
// // import { useCart } from "@/context/CartContext";
// // import { useAuth } from "@/context/AuthContext";
// // import { useToast } from "@/hooks/use-toast";

// // // ✅ Helper to fix broken image URLs
// // const getImageUrl = (path: string | undefined) => {
// //   if (!path) return "/placeholder.png"; // Fallback image
// //   if (path.startsWith("http")) return path; // Already absolute
// //   return `http://127.0.0.1:8000${path}`; // Prepend backend URL
// // };

// // const CartPage = () => {
// //   const {
// //     state,
// //     updateQuantity,
// //     removeFromCart,
// //     applyPromo,
// //     subtotal,
// //     total,
// //     isLoading,
// //     error,
// //   } = useCart();
// //   const { isAuthenticated } = useAuth();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();

// //   const [promoCode, setPromoCode] = useState("");
// //   const [promoError, setPromoError] = useState("");
// //   const [isApplyingPromo, setIsApplyingPromo] = useState(false);

// //   const handleApplyPromo = async () => {
// //     if (!promoCode || isApplyingPromo) return;
// //     setIsApplyingPromo(true);

// //     const success = await applyPromo(promoCode);

// //     setIsApplyingPromo(false);
// //     if (success) {
// //       toast({ title: "Success", description: "Promo code applied!" });
// //       setPromoError("");
// //       setPromoCode("");
// //     } else {
// //       setPromoError("Invalid promo code.");
// //     }
// //   };

// //   const handleCheckout = () => {
// //     if (!isAuthenticated) {
// //       toast({
// //         title: "Login Required",
// //         description: "Please log in to checkout.",
// //       });
// //       navigate("/login?redirect=/checkout");
// //     } else {
// //       navigate("/checkout");
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <Layout>
// //         <div className="container py-16 text-center">
// //           <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
// //           <p className="mt-4 text-muted-foreground">Loading your cart...</p>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   if (state.items.length === 0) {
// //     return (
// //       <Layout>
// //         <div className="container py-16 text-center">
// //           <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
// //             <ShoppingBag className="h-12 w-12 text-muted-foreground" />
// //           </div>
// //           <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
// //           <Link to="/category/all">
// //             <Button className="gap-2">
// //               Start Shopping <ArrowRight className="h-4 w-4" />
// //             </Button>
// //           </Link>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   return (
// //     <Layout>
// //       <div className="container py-8">
// //         <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

// //         <div className="grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-4">
// //             <AnimatePresence>
// //               {state.items.map((item) => (
// //                 <motion.div
// //                   key={item.product.id}
// //                   layout
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   className="bg-card rounded-xl p-4 shadow-sm border flex gap-4"
// //                 >
// //                   <Link to={`/product/${item.product.id}`} className="shrink-0">
// //                     {/* ✅ Use helper here */}
// //                     <img
// //                       src={getImageUrl(item.product.image)}
// //                       alt={item.product.name}
// //                       className="w-24 h-24 rounded-lg object-cover bg-muted"
// //                       onError={(e) =>
// //                         (e.currentTarget.src = "/placeholder.png")
// //                       }
// //                     />
// //                   </Link>

// //                   <div className="flex-1">
// //                     <div className="flex justify-between items-start">
// //                       <div>
// //                         <h3 className="font-medium line-clamp-2">
// //                           {item.product.name}
// //                         </h3>
// //                         <p className="text-sm text-muted-foreground">
// //                           €{item.product.price.toFixed(2)} / {item.product.unit}
// //                         </p>
// //                       </div>
// //                       <p className="font-bold">
// //                         €{(item.product.price * item.quantity).toFixed(2)}
// //                       </p>
// //                     </div>

// //                     <div className="flex items-center justify-between mt-4">
// //                       <div className="flex items-center border rounded-lg h-9">
// //                         <Button
// //                           variant="ghost"
// //                           size="icon"
// //                           className="h-full w-9"
// //                           onClick={() =>
// //                             updateQuantity(item.product.id, item.quantity - 1)
// //                           }
// //                         >
// //                           <Minus className="h-4 w-4" />
// //                         </Button>
// //                         <span className="w-8 text-center text-sm font-medium">
// //                           {item.quantity}
// //                         </span>
// //                         <Button
// //                           variant="ghost"
// //                           size="icon"
// //                           className="h-full w-9"
// //                           onClick={() =>
// //                             updateQuantity(item.product.id, item.quantity + 1)
// //                           }
// //                         >
// //                           <Plus className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                       <Button
// //                         variant="ghost"
// //                         size="icon"
// //                         className="text-destructive hover:text-destructive hover:bg-destructive/10"
// //                         onClick={() => removeFromCart(item.product.id)}
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </div>

// //           {/* Summary Section */}
// //           <div>
// //             <div className="bg-card rounded-xl p-6 shadow-sm border sticky top-24">
// //               <h2 className="font-bold text-lg mb-4">Order Summary</h2>

// //               <div className="space-y-3 text-sm mb-6">
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Subtotal</span>
// //                   <span>€{subtotal.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Delivery</span>
// //                   <span className="text-green-600 font-medium">Free</span>
// //                 </div>
// //                 {state.discountAmount > 0 && (
// //                   <div className="flex justify-between text-green-600">
// //                     <span>Discount</span>
// //                     <span>-€{state.discountAmount.toFixed(2)}</span>
// //                   </div>
// //                 )}
// //                 <div className="border-t pt-3 flex justify-between font-bold text-base">
// //                   <span>Total</span>
// //                   <span>€{total.toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               {/* Promo Input */}
// //               <div className="flex gap-2 mb-6">
// //                 <div className="relative flex-1">
// //                   <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     placeholder="Promo code"
// //                     className="pl-9"
// //                     value={promoCode}
// //                     onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
// //                   />
// //                 </div>
// //                 <Button
// //                   variant="outline"
// //                   onClick={handleApplyPromo}
// //                   disabled={isApplyingPromo}
// //                 >
// //                   {isApplyingPromo ? (
// //                     <Loader2 className="h-4 w-4 animate-spin" />
// //                   ) : (
// //                     "Apply"
// //                   )}
// //                 </Button>
// //               </div>
// //               {promoError && (
// //                 <p className="text-xs text-destructive -mt-4 mb-4">
// //                   {promoError}
// //                 </p>
// //               )}

// //               <Button
// //                 size="lg"
// //                 className="w-full gap-2"
// //                 onClick={handleCheckout}
// //               >
// //                 Proceed to Checkout <ArrowRight className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default CartPage;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Trash2,
//   Minus,
//   Plus,
//   ShoppingBag,
//   ArrowRight,
//   Tag,
//   Loader2,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Layout } from "@/components/layout/Layout";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";

// // ✅ Helper to fix broken image URLs
// const getImageUrl = (path: string | undefined) => {
//   if (!path) return "/placeholder.png"; // Fallback image
//   if (path.startsWith("http")) return path; // Already absolute
//   return `http://127.0.0.1:8000${path}`; // Prepend backend URL
// };

// const CartPage = () => {
//   const {
//     state,
//     updateQuantity,
//     removeFromCart,
//     applyPromo,
//     subtotal,
//     total,
//     isLoading,
//     error,
//   } = useCart();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [promoCode, setPromoCode] = useState("");
//   const [promoError, setPromoError] = useState("");
//   const [isApplyingPromo, setIsApplyingPromo] = useState(false);

//   const handleApplyPromo = async () => {
//     if (!promoCode || isApplyingPromo) return;
//     setIsApplyingPromo(true);

//     const success = await applyPromo(promoCode);

//     setIsApplyingPromo(false);
//     if (success) {
//       toast({ title: "Success", description: "Promo code applied!" });
//       setPromoError("");
//       setPromoCode("");
//     } else {
//       setPromoError("Invalid promo code.");
//     }
//   };

//   const handleCheckout = () => {
//     if (!isAuthenticated) {
//       toast({
//         title: "Login Required",
//         description: "Please log in to checkout.",
//       });
//       navigate("/login?redirect=/checkout");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   if (isLoading) {
//     return (
//       <Layout>
//         <div className="container py-16 text-center">
//           <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
//           <p className="mt-4 text-muted-foreground">Loading your cart...</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (state.items.length === 0) {
//     return (
//       <Layout>
//         <div className="container py-16 text-center">
//           <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
//             <ShoppingBag className="h-12 w-12 text-muted-foreground" />
//           </div>
//           <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
//           <Link to="/category/all">
//             <Button className="gap-2">
//               Start Shopping <ArrowRight className="h-4 w-4" />
//             </Button>
//           </Link>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-8">
//         <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-4">
//             <AnimatePresence>
//               {state.items.map((item) => (
//                 <motion.div
//                   key={item.product.id}
//                   layout
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="bg-card rounded-xl p-4 shadow-sm border flex gap-4"
//                 >
//                   <Link to={`/product/${item.product.id}`} className="shrink-0">
//                     {/* ✅ Use helper here */}
//                     <img
//                       src={getImageUrl(item.product.image)}
//                       alt={item.product.name}
//                       className="w-24 h-24 rounded-lg object-cover bg-muted"
//                       onError={(e) =>
//                         (e.currentTarget.src = "/placeholder.png")
//                       }
//                     />
//                   </Link>

//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-medium line-clamp-2">
//                           {item.product.name}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           €{item.product.price.toFixed(2)} / {item.product.unit}
//                         </p>
//                       </div>
//                       <p className="font-bold">
//                         €{(item.product.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                       <div className="flex items-center border rounded-lg h-9">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-full w-9"
//                           onClick={() =>
//                             updateQuantity(item.product.id, item.quantity - 1)
//                           }
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="w-8 text-center text-sm font-medium">
//                           {item.quantity}
//                         </span>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-full w-9"
//                           onClick={() =>
//                             updateQuantity(item.product.id, item.quantity + 1)
//                           }
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                         onClick={() => removeFromCart(item.product.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* Summary Section */}
//           <div>
//             <div className="bg-card rounded-xl p-6 shadow-sm border sticky top-24">
//               <h2 className="font-bold text-lg mb-4">Order Summary</h2>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>€{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Delivery</span>
//                   <span className="text-green-600 font-medium">Free</span>
//                 </div>
//                 {state.discountAmount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-€{state.discountAmount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="border-t pt-3 flex justify-between font-bold text-base">
//                   <span>Total</span>
//                   <span>€{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Promo Input */}
//               <div className="flex gap-2 mb-6">
//                 <div className="relative flex-1">
//                   <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Promo code"
//                     className="pl-9"
//                     value={promoCode}
//                     onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   onClick={handleApplyPromo}
//                   disabled={isApplyingPromo}
//                 >
//                   {isApplyingPromo ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     "Apply"
//                   )}
//                 </Button>
//               </div>
//               {promoError && (
//                 <p className="text-xs text-destructive -mt-4 mb-4">
//                   {promoError}
//                 </p>
//               )}

//               <Button
//                 size="lg"
//                 className="w-full gap-2"
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout <ArrowRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

// ✅ Helper to fix broken image URLs
const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  return `http://127.0.0.1:8000${path}`;
};

const CartPage = () => {
  const {
    state,
    updateQuantity,
    removeFromCart,
    applyPromo,
    subtotal,
    isLoading,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // ✅ 1. STATE FOR MISCELLANEOUS CHARGES
  const [miscCharges, setMiscCharges] = useState<any[]>([]);

  // ✅ 2. FETCH MISC CHARGES ON MOUNT
  useEffect(() => {
    api.getMiscCharges()
      .then((data) => setMiscCharges(data))
      .catch((err) => console.error("Failed to load charges", err));
  }, []);

  // ✅ 3. DYNAMIC CALCULATION LOGIC
  const calculateFinalTotal = () => {
    const baseSubtotal = Number(subtotal);
    const chargesTotal = miscCharges.reduce((acc, charge) => {
      const val = charge.charge_type === 'percentage' 
        ? (baseSubtotal * Number(charge.value)) / 100 
        : Number(charge.value);
      return acc + val;
    }, 0);

    return baseSubtotal + chargesTotal - (state.discountAmount || 0);
  };

  const finalTotal = calculateFinalTotal();

  const handleApplyPromo = async () => {
    if (!promoCode || isApplyingPromo) return;
    setIsApplyingPromo(true);

    const success = await applyPromo(promoCode);

    setIsApplyingPromo(false);
    if (success) {
      toast({ title: "Success", description: "Promo code applied!" });
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  // Inside CartPage.tsx
const handleCheckout = () => {
  // Get the current location ID from the URL or localStorage
  const searchParams = new URLSearchParams(window.location.search);
  const locationId = searchParams.get('location') || localStorage.getItem('selectedLocationId');

  if (!isAuthenticated) {
    toast({
      title: "Login Required",
      description: "Please log in to checkout.",
    });
    // Pass the location to the login redirect so we don't lose it
    navigate(`/login?redirect=/checkout${locationId ? `&location=${locationId}` : ''}`);
  } else {
    // THE FIX: Attach the location ID to the checkout URL
    navigate(`/checkout${locationId ? `?location=${locationId}` : ''}`);
  }
};

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-32 text-center font-medium italic animate-pulse text-primary">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
          Preparing your fresh items...
        </div>
      </Layout>
    );
  }

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Your basket is empty</h1>
          <Link to="/category/all">
            <Button className="gap-2 bg-primary hover:opacity-90 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl">
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-black mb-8 uppercase  tracking-tighter text-slate-900">Your Basket</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-5 items-center group"
                >
                  <Link to={`/product/${item.product.slug}`} className="shrink-0">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-2xl object-contain bg-slate-50 p-2 group-hover:scale-105 transition-transform"
                      onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-black  italic tracking-tight text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                          €{Number(item.product.price).toFixed(2)} / {item.product.unit}
                        </p>
                      </div>
                      <p className="font-black text-lg text-slate-900 italic">
                        €{(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl h-10 px-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-white"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm font-black italic">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-white"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 sticky top-24 overflow-hidden">
    {/* Top accent line uses your primary color */}
    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
    
    {/* Title: Changed from italic/black to a clean primary orange bold */}
    <h2 className="font-bold text-2xl mb-8 text-primary tracking-tight">Summary</h2>

    <div className="space-y-5 mb-8">
      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm font-semibold tracking-tight text-slate-500">
        <span>Subtotal</span>
        <span className="text-slate-900 font-semibold text-base">€{Number(subtotal).toFixed(2)}</span>
      </div>

      {/* ✅ DYNAMIC MISC CHARGES */}
      {miscCharges.map((charge) => {
        const val = charge.charge_type === 'percentage' 
          ? (Number(subtotal) * Number(charge.value)) / 100 
          : Number(charge.value);
        return (
          <div key={charge.id} className="flex justify-between items-center text-sm font-semibold tracking-tight text-slate-500">
            <span>{charge.name}</span>
            <span className="text-slate-900 font-semibold text-base">€{val.toFixed(2)}</span>
          </div>
        );
      })}

      {/* Delivery - Highlights in your primary orange */}
      <div className="flex justify-between items-center text-sm font-semibold tracking-tight text-slate-500">
        <span>Delivery</span>
        <span className="text-primary font-bold text-base">FREE</span>
      </div>

                {state.discountAmount > 0 && (
                  <div className="flex justify-between font-bold uppercase tracking-widest text-[10px] text-green-600">
                    <span>Discount Applied</span>
                    <span className="font-black">-€{state.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-dashed pt-5 flex justify-between items-baseline mt-4">
                  <span className="font-black text-slate-900 uppercase italic tracking-tighter text-lg">Total</span>
                  <span className="font-black text-3xl text-slate-900 tracking-tighter italic">
                    €{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Input */}
              <div className="flex gap-2 mb-8 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="PROMO CODE"
                    className="pl-9 bg-transparent border-none font-bold placeholder:text-slate-300 text-xs tracking-widest focus-visible:ring-0"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  />
                </div>
                <Button
                  variant="ghost"
                  className="font-black uppercase text-[10px] tracking-widest text-primary hover:bg-white rounded-xl shadow-sm border border-slate-100"
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                >
                  {isApplyingPromo ? <Loader2 className="h-3 w-3 animate-spin" /> : "Apply"}
                </Button>
              </div>
              {promoError && (
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest -mt-6 mb-6 ml-2">
                  {promoError}
                </p>
              )}

              <Button
                size="lg"
                className="w-full gap-2 bg-primary hover:opacity-95 text-primary-foreground font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              
              <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-6">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

