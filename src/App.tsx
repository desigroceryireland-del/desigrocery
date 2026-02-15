// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "@/context/CartContext";
// import { AuthProvider } from "@/context/AuthContext";
// import Index from "./pages/Index";
// import CategoryPage from "./pages/CategoryPage";
// import ProductDetailPage from "./pages/ProductDetailPage";
// import SearchPage from "./pages/SearchPage";
// import CartPage from "./pages/CartPage";
// import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
// import CheckoutPage from "./pages/CheckoutPage";
// import OffersPage from "./pages/OffersPage";
// import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
// import TermsPage from "./pages/TermsPage";
// import RefundPolicyPage from "./pages/RefundPolicyPage";
// import ShippingPolicyPage from "./pages/ShippingPolicyPage";
// import NotFound from "./pages/NotFound";
// import ScrollToTop from "./components/ScrollToTop";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <AuthProvider>
//         <CartProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//           <ScrollToTop />
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/category/:categoryId" element={<CategoryPage />} />
//               <Route path="/product/:productId" element={<ProductDetailPage />} />
//               <Route path="/search" element={<SearchPage />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/checkout" element={<CheckoutPage />} />
//               <Route path="/offers" element={<OffersPage />} />
//               <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//               <Route path="/terms" element={<TermsPage />} />
//               <Route path="/refund-policy" element={<RefundPolicyPage />} />
//               <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </CartProvider>
//       </AuthProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OffersPage from "./pages/OffersPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import OrderSuccessPage from "./pages/OrderSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ✅ 1. BrowserRouter must be the top-most provider for routing to work */}
      <BrowserRouter>
        {/* ✅ 2. AuthProvider inside Router (if it uses navigation) */}
        <AuthProvider>
          {/* ✅ 3. CartProvider inside Auth (needs user) AND Router (needs navigation) */}
          <CartProvider>
            <ScrollToTop />
            <Toaster />
            <Sonner />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/payment/success" element={<OrderSuccessPage />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
