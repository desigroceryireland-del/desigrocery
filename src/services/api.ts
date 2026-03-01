const API_BASE = "http://api.desigrocery.ie/api";

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
