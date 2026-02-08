import { Link } from 'react-router-dom';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.in_stock) return;

    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountPercent = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="group bg-card rounded-xl overflow-hidden shadow-card card-hover border">
          
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.in_offer && (
                <span className="bg-spice-red text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {discountPercent}% OFF
                </span>
              )}

              {!product.in_stock && (
                <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quick Add */}
            {product.in_stock && (
              <Button
                onClick={handleAddToCart}
                size="icon"
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary shadow-lg"
              >
                <Plus className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
  <div className="flex items-center gap-1 mb-2">
    <Star className="h-4 w-4 fill-turmeric text-turmeric" />
    <span className="text-sm font-medium">{product.rating}</span>
    <span className="text-xs text-muted-foreground">({product.reviews_count})</span>
  </div>

  <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
    {product.name}
  </h3>

  <div className="flex items-center gap-2 mb-3">
    <span className="text-lg font-bold">
      €{Number(product.price).toFixed(2)}
    </span>

    {product.original_price && (
      <span className="text-sm text-muted-foreground line-through">
        €{Number(product.original_price).toFixed(2)}
      </span>
    )}

    <span className="text-xs text-muted-foreground">/ {product.unit}</span>
  </div>



            <Button
              onClick={handleAddToCart}
              variant="outline"
              disabled={!product.in_stock}
              className={`w-full ${
                product.in_stock
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.in_stock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
