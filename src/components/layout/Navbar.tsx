import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/data/products';

const stores = [
  { id: "1", name: "Dublin City Centre", address: "123 O'Connell Street, Dublin 1" },
  { id: "2", name: "Blanchardstown", address: "Blanchardstown Shopping Centre" },
  { id: "3", name: "Tallaght", address: "The Square, Tallaght" },
  { id: "4", name: "Cork City", address: "Patrick Street, Cork" },
  { id: "5", name: "Galway", address: "Eyre Square, Galway" },
];

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  // 1️⃣ Add category state
  const [categories, setCategories] = useState<any[]>([]);

  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 2️⃣ Fetch categories from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  // Fetch announcements
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/announcements/")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error("Failed to load announcements", err));
  }, []);

  // Live product search from backend
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/store/products/?search=${searchQuery}`)
      .then(res => res.json())
      .then(data => setSearchResults(data.slice(0, 5)))
      .catch(err => console.error("Navbar search failed", err));
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-card">

      {/* Announcement Marquee */}
      <div className="bg-secondary overflow-hidden whitespace-nowrap">
        <div className="marquee">
          <div className="marquee-content">
            {announcements.map(item => (
              <span key={item.id} className="mx-8">📢 {item.message}</span>
            ))}
          </div>
          <div className="marquee-content">
            {announcements.map(item => (
              <span key={`dup-${item.id}`} className="mx-8">📢 {item.message}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-xl">🛒</div>
            <div>
              <h1 className="text-lg font-bold">Desi Grocery</h1>
              <p className="text-xs text-muted-foreground">Ireland</p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for groceries..."
              className="pl-10 pr-4 bg-muted border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border z-50">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-muted"
                    onClick={() => setSearchQuery('')}
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        €{Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/search?q=${searchQuery}`}
                  className="block p-3 text-center text-sm text-primary border-t"
                  onClick={() => setSearchQuery('')}
                >
                  View all results
                </Link>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-primary text-primary-foreground">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3️⃣ Categories Bar (Dynamic) */}
      <div className="hidden md:block border-t bg-background">
        <div className="container">
          <div className="flex items-center gap-6 py-3 text-sm overflow-x-auto no-scrollbar">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="whitespace-nowrap text-muted-foreground hover:text-primary transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};