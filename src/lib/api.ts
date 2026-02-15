// lib/api.ts

// ✅ Base URL for Store API
const API_URL = "http://127.0.0.1:8000/api/store";
const AUTH_URL = "http://127.0.0.1:8000/api/auth"; // For auth related calls if needed

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
  // Avoid crashing on empty body (e.g., 204 No Content)
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  // `res.ok` means status is in the range 200-299
  if (!res.ok) {
    throw { status: res.status, message: res.statusText, ...data };
  }
  return data;
}

export const api = {
  /* -------------------------------------------------------------------------- */
  /*                                    CART                                    */
  /* -------------------------------------------------------------------------- */
  
  getCart: async () => 
    parseJson(await fetch(`${API_URL}/cart/`, { 
      headers: getAuthHeaders() 
    })),

  addToCart: async (productId: number, quantity = 1) =>
    parseJson(await fetch(`${API_URL}/cart/add/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity }),
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
  /*                                   ORDERS                                   */
  /* -------------------------------------------------------------------------- */

  // Fetch all orders for the logged-in user
  getOrders: async () => 
    parseJson(await fetch(`${API_URL}/orders/`, { 
      headers: getAuthHeaders() 
    })),

  // Create a Stripe checkout session (initiates payment & order creation)
  createCheckoutSession: async (items: any[], address: any) =>
    parseJson(await fetch(`${API_URL}/create-checkout-session/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ items, address }),
    })),


  /* -------------------------------------------------------------------------- */
  /*                                  ADDRESSES                                 */
  /* -------------------------------------------------------------------------- */

  // List all saved addresses
  getAddresses: async () => 
    parseJson(await fetch(`${API_URL}/addresses/`, { 
      headers: getAuthHeaders() 
    })),

  // Add a new address (Backend enforces max 3 limit)
  addAddress: async (address: { name: string; street: string; city: string; zip_code: string; phone: string }) =>
    parseJson(await fetch(`${API_URL}/addresses/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(address),
    })),

  // Delete an address by ID
  deleteAddress: async (id: number) =>
    parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })),

  // Update an address (e.g., set as default)
  updateAddress: async (id: number, data: any) =>
    parseJson(await fetch(`${API_URL}/addresses/${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })),

    updateProfile: async (data: { name: string }) =>
    parseJson(await fetch(`${AUTH_URL}/profile/`, { 
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })),
};
