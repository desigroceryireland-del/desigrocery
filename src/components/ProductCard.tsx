// import { Link } from 'react-router-dom';
// import { Star, Plus, ShoppingCart } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Product } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useToast } from '@/hooks/use-toast';

// interface ProductCardProps {
//   product: Product;
//   index?: number;
// }

// export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!product.in_stock) return;

//     addToCart(product);
//     toast({
//       title: "Added to cart!",
//       description: `${product.name} has been added to your cart.`,
//     });
//   };

//   const discountPercent = product.original_price
//     ? Math.round((1 - product.price / product.original_price) * 100)
//     : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05 }}
//     >
//       <Link to={`/product/${product.slug}`}>
//         <div className="group bg-card rounded-xl overflow-hidden shadow-card card-hover border">
          
//           {/* Image */}
//           <div className="relative aspect-square overflow-hidden bg-muted">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />

//             {/* Badges */}
//             <div className="absolute top-3 left-3 flex flex-col gap-2">
//               {product.in_offer && (
//                 <span className="bg-spice-red text-white text-xs font-semibold px-2 py-1 rounded-full">
//                   {discountPercent}% OFF
//                 </span>
//               )}

//               {!product.in_stock && (
//                 <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                   Out of Stock
//                 </span>
//               )}
//             </div>

//             {/* Quick Add */}
//             {product.in_stock && (
//               <Button
//                 onClick={handleAddToCart}
//                 size="icon"
//                 className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary shadow-lg"
//               >
//                 <Plus className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           {/* Content */}
//           <div className="p-4">
//   <div className="flex items-center gap-1 mb-2">
//     <Star className="h-4 w-4 fill-turmeric text-turmeric" />
//     <span className="text-sm font-medium">{product.rating}</span>
//     <span className="text-xs text-muted-foreground">({product.reviews_count})</span>
//   </div>

//   <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
//     {product.name}
//   </h3>

//   <div className="flex items-center gap-2 mb-3">
//     <span className="text-lg font-bold">
//       €{Number(product.price).toFixed(2)}
//     </span>

//     {product.original_price && (
//       <span className="text-sm text-muted-foreground line-through">
//         €{Number(product.original_price).toFixed(2)}
//       </span>
//     )}

//     <span className="text-xs text-muted-foreground">/ {product.unit}</span>
//   </div>



//             <Button
//               onClick={handleAddToCart}
//               variant="outline"
//               disabled={!product.in_stock}
//               className={`w-full ${
//                 product.in_stock
//                   ? "border-primary text-primary hover:bg-primary hover:text-white"
//                   : "border-muted text-muted-foreground cursor-not-allowed"
//               }`}
//             >
//               <ShoppingCart className="h-4 w-4 mr-2" />
//               {product.in_stock ? "Add to Cart" : "Out of Stock"}
//             </Button>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

import { Link, useSearchParams } from 'react-router-dom'; // ✅ Added useSearchParams
import { Star, Plus, ShoppingCart, AlertCircle } from 'lucide-react';
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
  
  // ✅ 1. Get location from URL to preserve context when clicking the card
  const [searchParams] = useSearchParams();
  const locationId = searchParams.get('location');

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
      {/* ✅ 2. Maintain location context in the link */}
      <Link to={`/product/${product.slug}${locationId ? `?location=${locationId}` : ''}`}>
        <div className="group bg-card rounded-xl overflow-hidden shadow-card card-hover border">
          
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {/* ✅ Only show discount if it's > 0 */}
              {product.in_offer && discountPercent > 0 && (
                <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                  {discountPercent}% OFF
                </span>
              )}

              {!product.in_stock && (
                <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                  Out of Stock
                </span>
              )}
              
              {/* ✅ 3. Low Stock Badge: Shows if 5 or fewer items are left */}
              {product.in_stock && product.stock_count > 0 && product.stock_count <= 5 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Only {product.stock_count} left
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            {product.in_stock && (
              <Button
                onClick={handleAddToCart}
                size="icon"
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-600 hover:bg-orange-700 shadow-lg"
              >
                <Plus className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
              <span className="text-xs font-bold">{product.rating}</span>
              <span className="text-[10px] text-muted-foreground">({product.reviews_count})</span>
            </div>

            <h3 className="font-bold text-sm line-clamp-1 mb-1 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-base font-black text-slate-900">
                €{Number(product.price).toFixed(2)}
              </span>

              {product.original_price && discountPercent > 0 && (
                <span className="text-xs text-muted-foreground line-through decoration-slate-400">
                  €{Number(product.original_price).toFixed(2)}
                </span>
              )}

              <span className="text-[10px] font-bold text-muted-foreground uppercase">/ {product.unit}</span>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="outline"
              disabled={!product.in_stock}
              className={`w-full text-xs font-bold uppercase tracking-widest h-9 ${
                product.in_stock
                  ? "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                  : "border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50"
              }`}
            >
              <ShoppingCart className="h-3 w-3 mr-2" />
              {product.in_stock ? "Add to Cart" : "Sold Out"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
