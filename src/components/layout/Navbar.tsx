import { useState } from 'react';
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
import { products, stores } from '@/data/products';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const searchResults = searchQuery.length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-card">
      {/* Top Bar */}
      <div className="bg-secondary">
        <div className="container py-2">
          <p className="text-center text-sm text-secondary-foreground">
            🎉 Free delivery on orders over €50! Use code <strong>DESI10</strong> for 10% off
          </p>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-xl">
              🛒
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">Desi Grocery</h1>
              <p className="text-xs text-muted-foreground">Ireland</p>
            </div>
          </Link>

          {/* Store Selector - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">{selectedStore.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {stores.map(store => (
                <DropdownMenuItem
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className="flex flex-col items-start py-3"
                >
                  <span className="font-medium">{store.name}</span>
                  <span className="text-xs text-muted-foreground">{store.address}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for groceries..."
                className="pl-10 pr-4 bg-muted border-0 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border overflow-hidden z-50">
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                      onClick={() => setSearchQuery('')}
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">€{product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to={`/search?q=${searchQuery}`}
                    className="block p-3 text-center text-sm text-primary hover:bg-muted transition-colors border-t"
                    onClick={() => setSearchQuery('')}
                  >
                    View all results
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button variant="default" size="sm" className="bg-primary hover:bg-saffron-dark text-primary-foreground">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="mt-4 md:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for groceries..."
              className="pl-10 pr-4 bg-muted border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg border overflow-hidden z-50">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                    onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">€{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden border-t pt-4 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{selectedStore.name}</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {stores.map(store => (
                  <DropdownMenuItem
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                  >
                    {store.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {!isAuthenticated && (
              <Link to="/login" className="block">
                <Button variant="default" className="w-full bg-primary hover:bg-saffron-dark">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>

      {/* Category Nav */}
      <nav className="border-t bg-card/80 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-hide">
            <Link to="/category/fruits-vegetables" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Fruits & Vegetables
            </Link>
            <Link to="/category/rice-atta" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Rice & Atta
            </Link>
            <Link to="/category/spices-masala" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Spices & Masala
            </Link>
            <Link to="/category/snacks-sweets" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Snacks & Sweets
            </Link>
            <Link to="/category/dairy-frozen" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Dairy & Frozen
            </Link>
            <Link to="/category/beverages" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Beverages
            </Link>
            <Link to="/category/ready-to-eat" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Ready to Eat
            </Link>
            <Link to="/category/personal-care" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Personal Care
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
