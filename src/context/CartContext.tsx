// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
//   ReactNode,
// } from "react";
// import { Product } from "@/data/products";
// import { applyPromoCode } from "@/lib/promocode";
// import { api } from "@/lib/api";

// /* ---------------- TYPES ---------------- */

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   promoCode: string | null;
//   discountAmount: number; // backend calculated
// }

// type CartAction =
//   | { type: "SET_CART"; items: CartItem[] }
//   | { type: "APPLY_PROMO"; code: string; discountAmount: number }
//   | { type: "CLEAR_CART" };

// interface CartContextType {
//   state: CartState;
//   addToCart: (product: Product) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   applyPromo: (code: string) => Promise<boolean>;
//   clearCart: () => Promise<void>;
//   subtotal: number;
//   total: number;
//   totalItems: number;
//   isLoading: boolean;
//   error: string | null;
// }

// /* ---------------- CONTEXT ---------------- */

// const CartContext = createContext<CartContextType | null>(null);

// /* ---------------- REDUCER ---------------- */

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, items: action.items };

//     case "APPLY_PROMO":
//       return {
//         ...state,
//         promoCode: action.code,
//         discountAmount: action.discountAmount,
//       }; // ✅ Fixed: Removed extra semicolon

//     case "CLEAR_CART":
//       return { items: [], promoCode: null, discountAmount: 0 };

//     default:
//       return state;
//   }
// };

// /* ---------------- PROVIDER ---------------- */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(cartReducer, {
//     items: [],
//     promoCode: null,
//     discountAmount: 0,
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   /* ✅ LOAD CART FROM BACKEND */
//   const loadCart = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const data = await api.getCart();

//       const items: CartItem[] = data.items.map((item: any) => ({
//         product: {
//           ...item.product,
//           id: Number(item.product.id),
//           price: Number(item.product.price),
//           original_price: item.product.original_price
//             ? Number(item.product.original_price)
//             : undefined,
//         },
//         quantity: item.quantity,
//       }));

//       dispatch({ type: "SET_CART", items });
//     } catch (err) {
//       console.error("Failed to load cart:", err);
//       setError("Failed to load cart. Please try again.");
//       // ✅ Initialize empty cart on error (guest users)
//       dispatch({ type: "SET_CART", items: [] });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   /* ➕ ADD */
//   const addToCart = async (product: Product) => {
//     try {
//       setError(null);
//       await api.addToCart(product.id, 1);
//       await loadCart();
//     } catch (err) {
//       console.error("Failed to add to cart:", err);
//       setError("Failed to add item to cart.");
//       throw err;
//     }
//   };

//   /* ➖ REMOVE */
//   const removeFromCart = async (productId: number) => {
//     try {
//       setError(null);
//       await api.removeCartItem(productId);
//       await loadCart();
//     } catch (err) {
//       console.error("Failed to remove from cart:", err);
//       setError("Failed to remove item from cart.");
//       throw err;
//     }
//   };

//   /* 🔄 UPDATE */
//   const updateQuantity = async (productId: number, quantity: number) => {
//     try {
//       setError(null);

//       // ✅ Remove item if quantity is 0 or less
//       if (quantity <= 0) {
//         await removeFromCart(productId);
//         return;
//       }

//       await api.updateCartItem(productId, quantity);
//       await loadCart();
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//       setError("Failed to update quantity.");
//       throw err;
//     }
//   };

//   /* 🎟 PROMO */
//   const applyPromo = async (code: string): Promise<boolean> => {
//     try {
//       setError(null);
//       const data = await applyPromoCode(code, subtotal);

//       dispatch({
//         type: "APPLY_PROMO",
//         code: data.code,
//         discountAmount: Number(data.discount_amount),
//       });

//       return true;
//     } catch (error) {
//       console.error("Failed to apply promo code:", error);
//       setError("Invalid promo code.");
//       return false;
//     }
//   };

//   /* 🗑 CLEAR */
//   const clearCart = async () => {
//     try {
//       setError(null);
//       await api.clearCart();
//       dispatch({ type: "CLEAR_CART" });
//     } catch (err) {
//       console.error("Failed to clear cart:", err);
//       setError("Failed to clear cart.");
//       throw err;
//     }
//   };

//   /* 💰 TOTALS (SAFE) */
//   const subtotal = state.items.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0,
//   );

//   const total = Math.max(0, subtotal - state.discountAmount);

//   const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         state,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         applyPromo,
//         clearCart,
//         subtotal,
//         total,
//         totalItems,
//         isLoading,
//         error,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ---------------- HOOK ---------------- */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// };
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { applyPromoCode } from "@/lib/promocode";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

/* ---------------- TYPES ---------------- */

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discountAmount: number; // backend calculated
}

type CartAction =
  | { type: "SET_CART"; items: CartItem[] }
  | { type: "APPLY_PROMO"; code: string; discountAmount: number }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  applyPromo: (code: string) => Promise<boolean>;
  clearCart: () => Promise<void>;
  subtotal: number;
  total: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

/* ---------------- CONTEXT ---------------- */

const CartContext = createContext<CartContextType | null>(null);

/* ---------------- REDUCER ---------------- */

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.items };

    case "APPLY_PROMO":
      return {
        ...state,
        promoCode: action.code,
        discountAmount: action.discountAmount,
      };

    case "CLEAR_CART":
      return { items: [], promoCode: null, discountAmount: 0 };

    default:
      return state;
  }
};

/* ---------------- PROVIDER ---------------- */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    promoCode: null,
    discountAmount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ✅ LOAD CART FROM BACKEND */
  const loadCart = async () => {
    // If not logged in, don't fetch cart (avoids 401 errors)
    if (!isAuthenticated) {
      dispatch({ type: "SET_CART", items: [] });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await api.getCart();

      const items: CartItem[] = data.items.map((item: any) => ({
        product: {
          ...item.product,
          id: Number(item.product.id),
          price: Number(item.product.price),
          original_price: item.product.original_price
            ? Number(item.product.original_price)
            : undefined,
        },
        quantity: item.quantity,
      }));

      dispatch({ type: "SET_CART", items });
    } catch (err) {
      console.error("Failed to load cart:", err);
      // For authenticated users, show error but clear cart
      setError("Failed to load cart. Please try again.");
      dispatch({ type: "SET_CART", items: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Reload cart when auth state changes (login/logout)
  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  /* ➕ ADD */
 /* ➕ ADD IN CartContext.tsx */
const addToCart = async (product: Product) => {
  if (!isAuthenticated) {
    toast({ title: "Login Required", variant: "destructive" });
    navigate("/login?redirect=/cart");
    return;
  }

  try {
    setError(null);
    
    // ✅ 1. Get location from URL
    const params = new URLSearchParams(window.location.search);
    const locationId = params.get('location');

    // ✅ 2. Send locationId to backend so it doesn't crash calculating price
    await api.addToCart(product.id, 1, locationId || undefined);
    
    toast({ title: "Added to cart", description: `${product.name} added.` });
    
    // ✅ 3. Refresh cart data
    await loadCart();
  } catch (err) {
    console.error("Add to cart error:", err);
    toast({ title: "Error", description: "Failed to add item.", variant: "destructive" });
  }
};

  /* ➖ REMOVE */
  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      await api.removeCartItem(productId);
      await loadCart();
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      setError("Failed to remove item from cart.");
    }
  };

  /* 🔄 UPDATE */
  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);

      // ✅ Remove item if quantity is 0 or less
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await api.updateCartItem(productId, quantity);
      await loadCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Failed to update quantity.");
    }
  };

  /* 🎟 PROMO */
  const applyPromo = async (code: string): Promise<boolean> => {
    try {
      setError(null);
      const data = await applyPromoCode(code, subtotal);

      dispatch({
        type: "APPLY_PROMO",
        code: data.code,
        discountAmount: Number(data.discount_amount),
      });

      return true;
    } catch (error) {
      console.error("Failed to apply promo code:", error);
      setError("Invalid promo code.");
      return false;
    }
  };

  /* 🗑 CLEAR */
  const clearCart = async () => {
    try {
      setError(null);
      await api.clearCart();
      dispatch({ type: "CLEAR_CART" });
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setError("Failed to clear cart.");
    }
  };

  /* 💰 TOTALS (SAFE) */
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const total = Math.max(0, subtotal - state.discountAmount);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyPromo,
        clearCart,
        subtotal,
        total,
        totalItems,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
