import corianderImg from "@/assets/coriander.png";
import chilliImg from "@/assets/chilli.png";
import toordalImg from "@/assets/toordal.png";
import kashmiriImg from "@/assets/kashmiri.png";
import tajmahalImg from "@/assets/tajmahal.png";
import kajukatliImg from "@/assets/kajukatli.png";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  in_offer: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400",
    icon: "🥬",
    subcategories: ["Fresh Fruits", "Fresh Vegetables", "Organic", "Exotic Fruits"]
  },
  {
    id: "rice-atta",
    name: "Rice & Atta",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    icon: "🌾",
    subcategories: ["Basmati Rice", "Non-Basmati Rice", "Atta & Flour", "Pulses & Lentils"]
  },
  {
    id: "spices-masala",
    name: "Spices & Masala",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
    icon: "🌶️",
    subcategories: ["Whole Spices", "Ground Spices", "Masala Blends", "Cooking Pastes"]
  },
  {
    id: "snacks-sweets",
    name: "Snacks & Sweets",
    image: kajukatliImg,
    icon: "🍬",
    subcategories: ["Namkeen", "Biscuits", "Mithai", "Chips & Crisps"]
  },
  {
    id: "dairy-frozen",
    name: "Dairy & Frozen",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    icon: "🥛",
    subcategories: ["Paneer & Cheese", "Milk & Cream", "Frozen Parathas", "Ice Cream"]
  },
  {
    id: "beverages",
    name: "Beverages",
    image: tajmahalImg,
    icon: "🍵",
    subcategories: ["Tea", "Coffee", "Juices", "Soft Drinks"]
  },
  {
    id: "ready-to-eat",
    name: "Ready to Eat",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    icon: "🍛",
    subcategories: ["Curries", "Rice Dishes", "Instant Mixes", "Pickles & Chutneys"]
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    icon: "🧴",
    subcategories: ["Hair Care", "Skin Care", "Oral Care", "Ayurvedic"]
  }
];

export const products: Product[] = [
  // Fruits & Vegetables
  {
    id: "1",
    name: "Fresh Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    price: 8.99,
    originalPrice: 12.99,
    category: "fruits-vegetables",
    subcategory: "Fresh Fruits",
    in_offer: true,
    rating: 4.8,
    reviewsCount: 234,
    description: "Premium Alphonso mangoes from Maharashtra, known for their rich, sweet flavor and smooth texture.",
    unit: "kg"
  },
  {
  id: "2",
  name: "Fresh Coriander Bunch",
  image: corianderImg,
  price: 1.49,
  category: "fruits-vegetables",
  subcategory: "Fresh Vegetables",
  in_offer: false,
  rating: 4.5,
  reviewsCount: 89,
  description: "Fresh, aromatic coriander leaves perfect for garnishing and cooking.",
  unit: "bunch"
},

  {
    id: "3",
    name: "Indian Green Chillies",
    image: chilliImg,
    price: 2.49,
    category: "fruits-vegetables",
    subcategory: "Fresh Vegetables",
    in_offer: false,
    rating: 4.6,
    reviewsCount: 156,
    description: "Spicy Indian green chillies, essential for authentic Indian cooking.",
    unit: "250g"
  },
  // Rice & Atta
  {
    id: "4",
    name: "Tilda Basmati Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    price: 15.99,
    originalPrice: 19.99,
    category: "rice-atta",
    subcategory: "Basmati Rice",
    in_offer: true,
    rating: 4.9,
    reviewsCount: 567,
    description: "Premium aged basmati rice with extra-long grains and aromatic fragrance.",
    unit: "5kg"
  },
  {
    id: "5",
    name: "Aashirvaad Whole Wheat Atta",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    price: 8.99,
    category: "rice-atta",
    subcategory: "Atta & Flour",
    in_offer: false,
    rating: 4.7,
    reviewsCount: 423,
    description: "100% whole wheat flour for soft, fluffy rotis.",
    unit: "5kg"
  },
  {
    id: "6",
    name: "Toor Dal (Arhar)",
    image: toordalImg,
    price: 6.99,
    originalPrice: 8.99,
    category: "rice-atta",
    subcategory: "Pulses & Lentils",
    in_offer: true,
    rating: 4.6,
    reviewsCount: 312,
    description: "Premium quality toor dal, perfect for making dal tadka.",
    unit: "1kg"
  },
  // Spices & Masala
  {
    id: "7",
    name: "MDH Garam Masala",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
    price: 4.99,
    category: "spices-masala",
    subcategory: "Masala Blends",
    in_offer: false,
    rating: 4.8,
    reviewsCount: 678,
    description: "Authentic blend of aromatic spices for rich Indian curries.",
    unit: "100g"
  },
  {
    id: "8",
    name: "Kashmiri Red Chilli Powder",
    image: kashmiriImg,
    price: 5.49,
    originalPrice: 6.99,
    category: "spices-masala",
    subcategory: "Ground Spices",
    in_offer: true,
    rating: 4.7,
    reviewsCount: 445,
    description: "Mild heat with vibrant red color, ideal for tandoori dishes.",
    unit: "200g"
  },
  {
    id: "9",
    name: "Organic Turmeric Powder",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
    price: 4.49,
    category: "spices-masala",
    subcategory: "Ground Spices",
    in_offer: false,
    rating: 4.9,
    reviewsCount: 234,
    description: "Pure organic turmeric with high curcumin content.",
    unit: "200g"
  },
  // Snacks & Sweets
  {
    id: "10",
    name: "Haldiram's Aloo Bhujia",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400",
    price: 3.99,
    category: "snacks-sweets",
    subcategory: "Namkeen",
    in_offer: false,
    rating: 4.5,
    reviewsCount: 567,
    description: "Crispy and spicy potato noodles, perfect tea-time snack.",
    unit: "400g"
  },
  {
    id: "11",
    name: "Kaju Katli Premium",
    image: kajukatliImg,
    price: 12.99,
    originalPrice: 15.99,
    category: "snacks-sweets",
    subcategory: "Mithai",
    in_offer: true,
    rating: 4.9,
    reviewsCount: 345,
    description: "Authentic cashew fudge, handcrafted with pure ghee.",
    unit: "500g"
  },
  {
    id: "12",
    name: "Parle-G Biscuits",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    price: 1.99,
    category: "snacks-sweets",
    subcategory: "Biscuits",
    in_offer: false,
    rating: 4.7,
    reviewsCount: 890,
    description: "India's favorite glucose biscuits since 1939.",
    unit: "pack"
  },
  // Dairy & Frozen
  {
    id: "13",
    name: "Fresh Paneer Block",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    price: 5.99,
    category: "dairy-frozen",
    subcategory: "Paneer & Cheese",
    in_offer: false,
    rating: 4.6,
    reviewsCount: 456,
    description: "Fresh, soft paneer made from full cream milk.",
    unit: "400g"
  },
  {
    id: "14",
    name: "Frozen Parathas (Family Pack)",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    price: 6.49,
    originalPrice: 7.99,
    category: "dairy-frozen",
    subcategory: "Frozen Parathas",
    in_offer: true,
    rating: 4.4,
    reviewsCount: 234,
    description: "Ready to cook layered parathas, pack of 20.",
    unit: "pack"
  },
  // Beverages
  {
    id: "15",
    name: "Taj Mahal Tea",
    image: tajmahalImg,
    price: 7.99,
    category: "beverages",
    subcategory: "Tea",
    in_offer: false,
    rating: 4.8,
    reviewsCount: 567,
    description: "Premium Assam tea leaves for a rich, strong brew.",
    unit: "500g"
  },
  {
    id: "16",
    name: "Frooti Mango Drink",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    price: 2.49,
    originalPrice: 2.99,
    category: "beverages",
    subcategory: "Juices",
    in_offer: true,
    rating: 4.3,
    reviewsCount: 234,
    description: "Refreshing mango drink, pack of 6.",
    unit: "6 pack"
  },
  // Ready to Eat
  {
    id: "17",
    name: "MTR Ready to Eat Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    price: 4.49,
    category: "ready-to-eat",
    subcategory: "Curries",
    in_offer: false,
    rating: 4.2,
    reviewsCount: 189,
    description: "Heat and eat authentic paneer butter masala.",
    unit: "300g"
  },
  {
    id: "18",
    name: "Priya Mango Pickle",
    image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400",
    price: 3.99,
    originalPrice: 4.99,
    category: "ready-to-eat",
    subcategory: "Pickles & Chutneys",
    in_offer: true,
    rating: 4.7,
    reviewsCount: 423,
    description: "Traditional Andhra style mango pickle.",
    unit: "400g"
  },
  // Personal Care
  {
    id: "19",
    name: "Dabur Amla Hair Oil",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    price: 5.99,
    category: "personal-care",
    subcategory: "Hair Care",
    in_offer: false,
    rating: 4.5,
    reviewsCount: 345,
    description: "Enriched with amla for strong, healthy hair.",
    unit: "200ml"
  },
  {
    id: "20",
    name: "Vicco Turmeric Cream",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    price: 4.49,
    originalPrice: 5.49,
    category: "personal-care",
    subcategory: "Skin Care",
    in_offer: true,
    rating: 4.6,
    reviewsCount: 267,
    description: "Ayurvedic turmeric cream for glowing skin.",
    unit: "70g"
  }
];

export const stores = [
  { id: "1", name: "Dublin City Centre", address: "123 O'Connell Street, Dublin 1" },
  { id: "2", name: "Blanchardstown", address: "Blanchardstown Shopping Centre" },
  { id: "3", name: "Tallaght", address: "The Square, Tallaght" },
  { id: "4", name: "Cork City", address: "Patrick Street, Cork" },
  { id: "5", name: "Galway", address: "Eyre Square, Galway" },
];
