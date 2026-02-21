// Types matching backend API

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  unit: string;
  stock_count: number;

  in_stock: boolean;
  in_offer: boolean;
  rating: number;
  reviews_count: number;

  category: string;     // category name from backend
  subcategory: string;  // subcategory name from backend
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  subcategories: SubCategory[];
}
