// import { useEffect, useState } from "react";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// import {
//   CheckCircle2,
//   XCircle,
//   ShoppingBag,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Layout } from "@/components/layout/Layout";
// import { useCart } from "@/context/CartContext";
// import { api } from "@/lib/api";

// const OrderSuccessPage = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const navigate = useNavigate();
//   const { clearCart } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [order, setOrder] = useState<any>(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (!sessionId) {
//       navigate("/");
//       return;
//     }

//     const verifyOrder = async () => {
//       try {
//         // Clear local cart since payment succeeded
//         await clearCart();

//         // Fetch user orders to find the one matching this session
//         // In a real app, you might have a specific endpoint verify-session
//         const orders = await api.getOrders();
//         const foundOrder = orders.find(
//           (o: any) => o.stripe_session_id === sessionId,
//         );

//         if (foundOrder) {
//           setOrder(foundOrder);
//         } else {
//           // Fallback: If webhook hasn't processed yet, show generic success
//           // or poll for status. For now, we assume success if session_id exists.
//           setOrder({ status: "processing", id: "Creating..." });
//         }
//       } catch (err) {
//         console.error("Failed to verify order", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyOrder();
//   }, [sessionId, navigate]);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="container py-32 text-center flex flex-col items-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
//           <h2 className="text-xl font-semibold">Verifying your payment...</h2>
//           <p className="text-muted-foreground">Please wait a moment.</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="container py-32 text-center flex flex-col items-center">
//           <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
//             <XCircle className="h-8 w-8 text-destructive" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
//           <p className="text-muted-foreground mb-8 max-w-md">
//             We couldn't verify your payment details. If you were charged, please
//             contact support.
//           </p>
//           <div className="flex gap-4">
//             <Link to="/contact">
//               <Button variant="outline">Contact Support</Button>
//             </Link>
//             <Link to="/">
//               <Button>Return to Home</Button>
//             </Link>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-2xl mx-auto text-center"
//         >
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
//             <CheckCircle2 className="h-10 w-10 text-green-600" />
//           </div>

//           <h1 className="text-4xl font-bold text-foreground mb-4">
//             Order Confirmed!
//           </h1>
//           <p className="text-xl text-muted-foreground mb-8">
//             Thank you for your purchase. Your order #{order?.id} has been placed
//             successfully.
//           </p>

//           <div className="bg-card border rounded-xl p-8 mb-8 shadow-sm text-left">
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//               <div>
//                 <p className="text-sm text-muted-foreground">Order Number</p>
//                 <p className="font-bold text-lg">#{order?.id || "PENDING"}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-muted-foreground">Status</p>
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
//                   {order?.status || "Processing"}
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <p className="font-medium">What happens next?</p>
//               <ul className="space-y-3 text-sm text-muted-foreground">
//                 {/* <li className="flex gap-3">
//                   <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
//                     1
//                   </div>
//                   We will send you an order confirmation email shortly.
//                 </li> */}
//                 <li className="flex gap-3">
//                   <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
//                     1
//                   </div>
//                   Your items will be prepared for shipping.
//                 </li>
//                 <li className="flex gap-3">
//                   <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
//                     2
//                   </div>
//                   We'll call you when we reach your doorstep.
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/profile">
//               <Button variant="outline" className="w-full sm:w-auto gap-2 h-12">
//                 <ShoppingBag className="h-4 w-4" />
//                 View Order History
//               </Button>
//             </Link>
//             <Link to="/">
//               <Button className="w-full sm:w-auto gap-2 h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
//                 Continue Shopping
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </Layout>
//   );
// };

// export default OrderSuccessPage;
import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // ✅ Get order_id from URL immediately
  const urlOrderId = searchParams.get("order_id");

  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    const verifyOrder = async () => {
      try {
        await clearCart();

        // Use URL order ID initially if available
        if (urlOrderId) {
          setOrder({ id: urlOrderId, status: "Processing" });
        }

        // Poll for order details (retry 3 times)
        let foundOrder = null;
        for (let i = 0; i < 3; i++) {
          const orders = await api.getOrders();
          foundOrder = orders.find(
            (o: any) => o.stripe_session_id === sessionId,
          );
          if (foundOrder) break;
          await new Promise((r) => setTimeout(r, 1000)); // Wait 1s
        }

        if (foundOrder) {
          setOrder(foundOrder);
        } else if (!urlOrderId) {
          // Only fallback if we don't even have the ID
          setOrder({ status: "processing", id: "Creating..." });
        }
      } catch (err) {
        console.error("Failed to verify order", err);
        // Don't show full error screen if we at least have the ID
        if (!urlOrderId) setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [sessionId, urlOrderId, navigate]); // Add urlOrderId to deps

  // Show loading only if we have NO order info at all
  if (loading && !order) {
    return (
      <Layout>
        <div className="container py-32 text-center flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-32 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            We couldn't verify your payment details. If you were charged, please
            contact support.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order #{order?.id} has been placed
            successfully.
          </p>

          <div className="bg-card border rounded-xl p-8 mb-8 shadow-sm text-left">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                {/* ✅ Display Order ID */}
                <p className="font-bold text-lg">
  #{order?.order_number}
</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {order?.status || "Processing"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium">What happens next?</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                    1
                  </div>
                  Your items will be prepared for shipping.
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                    2
                  </div>
                  We'll call you when we reach your doorstep.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile">
              <Button variant="outline" className="w-full sm:w-auto gap-2 h-12">
                <ShoppingBag className="h-4 w-4" />
                View Order History
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full sm:w-auto gap-2 h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
