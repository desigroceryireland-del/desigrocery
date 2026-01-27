import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Grid3X3 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const MobileBottomBar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg md:hidden z-50">
      <div className="grid grid-cols-5 gap-1 py-2 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/search"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/search') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs">Search</span>
        </Link>

        <Link
          to="/category/all"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            location.pathname.startsWith('/category') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Grid3X3 className="h-5 w-5" />
          <span className="text-xs">Categories</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
            isActive('/cart') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </Link>

        <Link
          to={isAuthenticated ? '/profile' : '/login'}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            isActive('/profile') || isActive('/login') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">{isAuthenticated ? 'Profile' : 'Login'}</span>
        </Link>
      </div>
    </nav>
  );
};
