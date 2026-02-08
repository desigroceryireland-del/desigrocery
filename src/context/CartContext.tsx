import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { Product } from "@/data/products";
import { applyPromoCode } from "@/lib/promocode";

import { api } from "@/lib/api";

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


/* ---------------- CONTEXT ---------------- */

const CartContext = createContext<any>(null);

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
;

    case "CLEAR_CART":
      return { items: [], promoCode: null, discountAmount: 0 };

    default:
      return state;
  }
};

/* ---------------- PROMOS ---------------- */

// const promoCodes: Record<string, number> = {
//   DESI10: 10,
//   FRESH20: 20,
//   WELCOME15: 15,
// };

/* ---------------- PROVIDER ---------------- */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    promoCode: null,
    discountAmount: 0,
  });

  // rest of your code...



  /* ✅ LOAD CART FROM BACKEND */
  const loadCart = async () => {
    try {
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
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  /* ➕ ADD */
  const addToCart = async (product: Product) => {
    await api.addToCart(product.id, 1);
    await loadCart();
  };

  /* ➖ REMOVE */
  const removeFromCart = async (productId: number) => {
    await api.removeCartItem(productId);
    await loadCart();
  };

  /* 🔄 UPDATE */
  const updateQuantity = async (productId: number, quantity: number) => {
    await api.updateCartItem(productId, quantity);
    await loadCart();
  };

  /* 🎟 PROMO */
  // const applyPromo = (code: string): boolean => {
  //   const discount = promoCodes[code.toUpperCase()];
  //   if (discount) {
  //     dispatch({
  //       type: "APPLY_PROMO",
  //       code: code.toUpperCase(),
  //       discount,
  //     });
  //     return true;
  //   }
  //   return false;
  // };
  const applyPromo = async (code: string): Promise<boolean> => {
  try {
    const data = await applyPromoCode(code, subtotal);

    dispatch({
      type: "APPLY_PROMO",
      code: data.code,
      discountAmount: Number(data.discount_amount),
    });

    return true;
  } catch (error) {
    return false;
  }
};


  /* 🗑 CLEAR */
  const clearCart = async () => {
    await api.clearCart();
    dispatch({ type: "CLEAR_CART" });
  };

  /* 💰 TOTALS (SAFE) */
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
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
