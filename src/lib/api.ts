// // // lib/api.ts

// // ✅ Base URL for Store API
// const API_URL = "http://127.0.0.1:8000/api/store";
// const AUTH_URL = "http://127.0.0.1:8000/api/auth";

// // ✅ Helper to get headers safely
// export const getAuthHeaders = () => {
//   const token = localStorage.getItem("access");
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// // ✅ Helper to parse JSON responses safely
// async function parseJson(res: Response) {
//   const text = await res.text();
//   const data = text ? JSON.parse(text) : null;

//   if (!res.ok) {
//     throw { status: res.status, message: res.statusText, ...data };
//   }
//   return data;
// }

// export const api = {
//   /* -------------------------------------------------------------------------- */
//   /* CART                                    */
//   /* -------------------------------------------------------------------------- */
  
//   // ✅ Updated: Accepts locationId to fetch correct prices for the cart
//   getCart: async (locationId?: string) => 
//     parseJson(await fetch(`${API_URL}/cart/${locationId ? `?location=${locationId}` : ''}`, { 
//       headers: getAuthHeaders() 
//     })),

//   // ✅ Updated: Passes locationId so backend can verify stock/price for that store
//   addToCart: async (productId: number, quantity = 1, locationId?: string) =>
//     parseJson(await fetch(`${API_URL}/cart/add/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId, quantity, location_id: locationId }),
//     })),

//   updateCartItem: async (productId: number, quantity: number) =>
//     parseJson(await fetch(`${API_URL}/cart/update/`, {
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId, quantity }),
//     })),

//   removeCartItem: async (productId: number) =>
//     parseJson(await fetch(`${API_URL}/cart/remove/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId }),
//     })),

//   clearCart: async () =>
//     parseJson(await fetch(`${API_URL}/cart/clear/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     })),


//   /* -------------------------------------------------------------------------- */
//   /* ORDERS                                     */
//   /* -------------------------------------------------------------------------- */

//   getOrders: async () => 
//     parseJson(await fetch(`${API_URL}/orders/`, { 
//       headers: getAuthHeaders() 
//     })),

//   // ✅ Updated: Sends location_id to Stripe so user is charged the correct regional price
//   createCheckoutSession: async (items: any[], address: any, locationId?: string) =>
//     parseJson(await fetch(`${API_URL}/create-checkout-session/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ items, address, location_id: locationId }),
//     })),


//   /* -------------------------------------------------------------------------- */
//   /* ADDRESSES                                   */
//   /* -------------------------------------------------------------------------- */

//   getAddresses: async () => 
//     parseJson(await fetch(`${API_URL}/addresses/`, { 
//       headers: getAuthHeaders() 
//     })),

//   addAddress: async (address: { name: string; street: string; city: string; zip_code: string; phone: string }) =>
//     parseJson(await fetch(`${API_URL}/addresses/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(address),
//     })),

//   deleteAddress: async (id: number) =>
//     parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     })),

//   updateAddress: async (id: number, data: any) =>
//     parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     })),

//   /* -------------------------------------------------------------------------- */
//   /* PROFILE                                    */
//   /* -------------------------------------------------------------------------- */

//   updateProfile: async (data: { name: string }) =>
//     parseJson(await fetch(`${AUTH_URL}/profile/`, { 
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     })),
// };

// lib/api.ts

// ✅ Base URL for Store API
// const API_URL = "http://127.0.0.1:8000/api/store";
// const AUTH_URL = "http://127.0.0.1:8000/api/auth";

// // ✅ Helper to get headers safely
// export const getAuthHeaders = () => {
//   const token = localStorage.getItem("access");
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// // ✅ Helper to parse JSON responses safely
// async function parseJson(res: Response) {
//   const text = await res.text();
//   const data = text ? JSON.parse(text) : null;

//   if (!res.ok) {
//     throw { status: res.status, message: res.statusText, ...data };
//   }
//   return data;
// }

// export const api = {
//   /* -------------------------------------------------------------------------- */
//   /* CART                                                                       */
//   /* -------------------------------------------------------------------------- */
  
//   getCart: async (locationId?: string) => 
//     parseJson(await fetch(`${API_URL}/cart/${locationId ? `?location=${locationId}` : ''}`, { 
//       headers: getAuthHeaders() 
//     })),

//   addToCart: async (productId: number, quantity = 1, locationId?: string) =>
//     parseJson(await fetch(`${API_URL}/cart/add/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId, quantity, location_id: locationId }),
//     })),

//   updateCartItem: async (productId: number, quantity: number) =>
//     parseJson(await fetch(`${API_URL}/cart/update/`, {
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId, quantity }),
//     })),

//   removeCartItem: async (productId: number) =>
//     parseJson(await fetch(`${API_URL}/cart/remove/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ product_id: productId }),
//     })),

//   clearCart: async () =>
//     parseJson(await fetch(`${API_URL}/cart/clear/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     })),

//   /* -------------------------------------------------------------------------- */
//   /* NEW: CHARGES & PROMOS                                                      */
//   /* -------------------------------------------------------------------------- */

//   // ✅ Fetch dynamic fees (Service Charge, Delivery Fee, etc.)
//   getMiscCharges: async () => 
//     parseJson(await fetch(`${API_URL}/miscellaneous-charges/`, { 
//       headers: getAuthHeaders() 
//     })),

//   // ✅ Validate a promo code and get discount data
//   validatePromoCode: async (code: string) =>
//     parseJson(await fetch(`${API_URL}/promo-codes/validate/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ code }),
//     })),

//   /* -------------------------------------------------------------------------- */
//   /* ORDERS                                                                     */
//   /* -------------------------------------------------------------------------- */

//   getOrders: async () => 
//     parseJson(await fetch(`${API_URL}/orders/`, { 
//       headers: getAuthHeaders() 
//     })),

//   // ✅ Updated: Sends location_id and applied_promo to backend for accurate totals
//   createCheckoutSession: async (items: any[], address: any, locationId?: string, promoCode?: string) =>
//     parseJson(await fetch(`${API_URL}/create-checkout-session/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ 
//         items, 
//         address, 
//         location_id: locationId,
//         promo_code: promoCode 
//       }),
//     })),

//   /* -------------------------------------------------------------------------- */
//   /* ADDRESSES                                                                  */
//   /* -------------------------------------------------------------------------- */

//   getAddresses: async () => 
//     parseJson(await fetch(`${API_URL}/addresses/`, { 
//       headers: getAuthHeaders() 
//     })),

//   addAddress: async (address: { name: string; street: string; city: string; zip_code: string; phone: string }) =>
//     parseJson(await fetch(`${API_URL}/addresses/`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(address),
//     })),

//   deleteAddress: async (id: number) =>
//     parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     })),

//   updateAddress: async (id: number, data: any) =>
//     parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     })),

//   /* -------------------------------------------------------------------------- */
//   /* PROFILE                                                                    */
//   /* -------------------------------------------------------------------------- */

//   googleLogin: async (token: string) =>
//     parseJson(await fetch(`http://127.0.0.1:8000/api/accounts/google/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     })),

//   updateProfile: async (data: { name: string }) =>
//     parseJson(await fetch(`${AUTH_URL}/profile/`, { 
//       method: "PATCH",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     })),
// };

const API_URL = "https://api.desigrocery.ie/api/store";
const AUTH_URL = "https://api.desigrocery.ie/api/auth";

// ✅ Helper to get headers safely
export const getAuthHeaders = () => {
  const token = localStorage.getItem("access");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ✅ Helper to parse JSON responses safely
async function parseJson(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw { status: res.status, message: res.statusText, ...data };
  }
  return data;
}

export const api = {
  /* -------------------------------------------------------------------------- */
  /* CART                                                                        */
  /* -------------------------------------------------------------------------- */
  
  getCart: async (locationId?: string) => 
    parseJson(await fetch(`${API_URL}/cart/${locationId ? `?location=${locationId}` : ''}`, { 
      headers: getAuthHeaders() 
    })),

  addToCart: async (productId: number, quantity = 1, locationId?: string) =>
    parseJson(await fetch(`${API_URL}/cart/add/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity, location_id: locationId }),
    })),

  updateCartItem: async (productId: number, quantity: number) =>
    parseJson(await fetch(`${API_URL}/cart/update/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity }),
    })),

  removeCartItem: async (productId: number) =>
    parseJson(await fetch(`${API_URL}/cart/remove/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId }),
    })),

  clearCart: async () =>
    parseJson(await fetch(`${API_URL}/cart/clear/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })),

  /* -------------------------------------------------------------------------- */
  /* CHARGES & PROMOS                                                            */
  /* -------------------------------------------------------------------------- */

  getMiscCharges: async () => 
    parseJson(await fetch(`${API_URL}/miscellaneous-charges/`, { 
      headers: getAuthHeaders() 
    })),

  validatePromoCode: async (code: string) =>
    parseJson(await fetch(`${API_URL}/promo-codes/validate/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code }),
    })),

  /* -------------------------------------------------------------------------- */
  /* ORDERS                                                                      */
  /* -------------------------------------------------------------------------- */

  getOrders: async () => 
    parseJson(await fetch(`${API_URL}/orders/`, { 
      headers: getAuthHeaders() 
    })),

  createCheckoutSession: async (items: any[], address: any, locationId?: string, promoCode?: string) =>
    parseJson(await fetch(`${API_URL}/create-checkout-session/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        items, 
        address, 
        location_id: locationId,
        promo_code: promoCode 
      }),
    })),

  /* -------------------------------------------------------------------------- */
  /* ADDRESSES                                                                   */
  /* -------------------------------------------------------------------------- */

  getAddresses: async () => 
    parseJson(await fetch(`${API_URL}/addresses/`, { 
      headers: getAuthHeaders() 
    })),

  addAddress: async (address: { name: string; street: string; city: string; zip_code: string; phone: string }) =>
    parseJson(await fetch(`${API_URL}/addresses/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(address),
    })),

  deleteAddress: async (id: number) =>
    parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })),

  updateAddress: async (id: number, data: any) =>
    parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })),

  /* -------------------------------------------------------------------------- */
  /* AUTH & PROFILE                                                              */
  /* -------------------------------------------------------------------------- */

  // ✅ Fixed: Points to /api/auth/google/ as defined in your Django root urls.py
  googleLogin: async (token: string) =>
    parseJson(await fetch(`${AUTH_URL}/google/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })),

  updateProfile: async (data: { name: string }) =>
    parseJson(await fetch(`${AUTH_URL}/profile/`, { 
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })),
};