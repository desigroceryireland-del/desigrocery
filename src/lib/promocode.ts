const PROMO_API = "http://127.0.0.1:8000/api/promocodes";

export const applyPromoCode = async (code: string, cartTotal: number) => {
  const res = await fetch(`${PROMO_API}/apply/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      cart_total: cartTotal,
    }),
  });

  if (!res.ok) {
    throw new Error("Invalid promo code");
  }

  return res.json();
};
