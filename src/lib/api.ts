const API_URL = "http://127.0.0.1:8000/api/store";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("access");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const api = {
  getCart: () =>
    fetch(`${API_URL}/cart/`, {
      headers: getAuthHeaders(),
    }).then(res => res.json()),

  addToCart: (productId: number, quantity = 1) =>
    fetch(`${API_URL}/cart/add/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        product_id: productId,   // ✅ number
        quantity,
      }),
    }),

  updateCartItem: (productId: number, quantity: number) =>
    fetch(`${API_URL}/cart/update/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        product_id: productId,   // ✅ number
        quantity,
      }),
    }),

  removeCartItem: (productId: number) =>
    fetch(`${API_URL}/cart/remove/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        product_id: productId,   // ✅ number
      }),
    }),

  clearCart: () =>
    fetch(`${API_URL}/cart/clear/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    }),
};
