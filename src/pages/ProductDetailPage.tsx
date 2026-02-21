// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ChevronRight, Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Layout } from '@/components/layout/Layout';
// import { ProductCard } from '@/components/ProductCard';
// import { ReviewCard, sampleReviews } from '@/components/ReviewCard';
// import { Product } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useToast } from '@/hooks/use-toast';

// const ProductDetailPage = () => {
//   const { productId } = useParams(); // this is slug now
//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   // Fetch product details
//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/store/products/${productId}/`)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);

//         // Fetch related products
//         fetch(`http://127.0.0.1:8000/api/store/products/?category=${data.category}`)
//           .then(res => res.json())
//           .then(rel => setRelatedProducts(rel.filter((p: Product) => p.slug !== data.slug).slice(0, 4)));
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [productId]);

//   if (loading) return <Layout><div className="container py-16">Loading...</div></Layout>;
//   if (!product) return <Layout><div className="container py-16">Product not found</div></Layout>;

//   const discountPercent = product.original_price
//     ? Math.round((1 - product.price / product.original_price) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     if (!product.in_stock) {
//       toast({ title: "Out of Stock", description: "This product is unavailable", variant: "destructive" });
//       return;
//     }

//     for (let i = 0; i < quantity; i++) addToCart(product);
//     toast({ title: "Added to cart!", description: `${quantity}x ${product.name} added.` });
//   };

//   const images = [product.image, product.image, product.image];

//   return (
//     <Layout>
//       <div className="container py-8">
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
//           <Link to="/" className="hover:text-primary">Home</Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to="/category/all" className="hover:text-primary">Categories</Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to={`/category/${product.category}`} className="hover:text-primary">{product.category}</Link>
//           <ChevronRight className="h-4 w-4" />
//           <span className="text-foreground">{product.name}</span>
//         </nav>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="relative rounded-2xl overflow-hidden bg-muted mb-4">
//               <img src={images[selectedImage]} alt={product.name} className="w-full aspect-square object-cover" />
//               {product.in_offer && (
//                 <span className="absolute top-4 left-4 bg-spice-red text-white text-sm px-3 py-1 rounded-full">
//                   {discountPercent}% OFF
//                 </span>
//               )}
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="flex items-center gap-2 mb-4">
//               <Star className="h-5 w-5 fill-turmeric text-turmeric" />
//               <span>{product.rating}</span>
//               <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
//             </div>

//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

//             <div className="flex items-center gap-4 mb-2">
//               <span className="text-3xl font-bold">€{Number(product.price).toFixed(2)}</span>
//               €{product.original_price && (
//   <span className="line-through text-muted-foreground">
//     €{Number(product.original_price).toFixed(2)}
//   </span>
// )}
//             </div>

//             <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
//               {product.in_stock ? "In Stock" : "Out of Stock"}
//             </p>

//             <p className="text-muted-foreground mb-8">{product.description}</p>

//             <div className="flex items-center gap-4 mb-8">
//               <div className="flex items-center border rounded-lg">
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
//               </div>
//               <Button onClick={handleAddToCart} disabled={!product.in_stock} className="flex-1">
//                 <ShoppingCart className="h-5 w-5" />
//                 {product.in_stock ? "Add to Cart" : "Out of Stock"}
//               </Button>
//             </div>
//           </motion.div>
//         </div>

//         {relatedProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p, i) => (
//                 <ProductCard key={p.id} product={p} index={i} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetailPage;



// import { useState, useEffect } from 'react';
// import { useParams, Link, useSearchParams } from 'react-router-dom'; // ✅ Added useSearchParams
// import { ChevronRight, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Layout } from '@/components/layout/Layout';
// import { ProductCard } from '@/components/ProductCard';
// import { Product } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useToast } from '@/hooks/use-toast';

// const ProductDetailPage = () => {
//   const { productId } = useParams(); // This is the slug
  
//   // ✅ 1. Access the URL search params to get ?location=ID
//   const [searchParams] = useSearchParams();
//   const locationId = searchParams.get('location');

//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   // ✅ 2. Fetch product details with location context
//   useEffect(() => {
//     setLoading(true);
    
//     // Append location ID to the detail request
//     const detailUrl = `http://127.0.0.1:8000/api/store/products/${productId}/?${locationId ? `location=${locationId}` : ''}`;

//     fetch(detailUrl)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);

//         // ✅ 3. Fetch related products with location context
//         const relatedUrl = `http://127.0.0.1:8000/api/store/products/?category=${data.category}${locationId ? `&location=${locationId}` : ''}`;
        
//         fetch(relatedUrl)
//           .then(res => res.json())
//           .then(rel => setRelatedProducts(rel.filter((p: Product) => p.slug !== data.slug).slice(0, 4)));
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [productId, locationId]); // ✅ Re-run if either the product OR location changes

//   if (loading) return <Layout><div className="container py-16">Loading...</div></Layout>;
//   if (!product) return <Layout><div className="container py-16">Product not found</div></Layout>;

//   const discountPercent = product.original_price
//     ? Math.round((1 - product.price / product.original_price) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     if (!product.in_stock) {
//       toast({ title: "Out of Stock", description: "This product is unavailable in your location", variant: "destructive" });
//       return;
//     }
//     for (let i = 0; i < quantity; i++) addToCart(product);
//     toast({ title: "Added to cart!", description: `${quantity}x ${product.name} added.` });
//   };

//   return (
//     <Layout>
//       <div className="container py-8">
//         {/* Breadcrumbs - ✅ Maintain location context in links */}
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
//           <Link to={`/${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary">Home</Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to={`/category/${product.category}${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary">
//             {product.category}
//           </Link>
//           <ChevronRight className="h-4 w-4" />
//           <span className="text-foreground">{product.name}</span>
//         </nav>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//              <div className="relative rounded-2xl overflow-hidden bg-muted mb-4">
//                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
//                {product.in_offer && discountPercent > 0 && (
//                  <span className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-3 py-1 rounded-full">
//                    {discountPercent}% OFF
//                  </span>
//                )}
//              </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="flex items-center gap-2 mb-4">
//               <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
//               <span>{product.rating}</span>
//               <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
//             </div>

//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

//             <div className="flex items-center gap-4 mb-2">
//               <span className="text-3xl font-bold">€{Number(product.price).toFixed(2)}</span>
//               {product.original_price && (
//                 <span className="line-through text-muted-foreground">
//                   €{Number(product.original_price).toFixed(2)}
//                 </span>
//               )}
//             </div>

//             {/* ✅ Location-specific stock message */}
//             <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
//               {product.in_stock ? `In Stock (${product.stock_count} units available)` : "Currently Out of Stock at this location"}
//             </p>

//             <p className="text-muted-foreground mb-8">{product.description}</p>
// <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
//               {product.in_stock ? "In Stock" : "Out of Stock"}
//             </p>

//             {/* <p className="text-muted-foreground mb-8">{product.description}</p> */}

//             <div className="flex items-center gap-4 mb-8">
//               <div className="flex items-center border rounded-lg">
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
//               </div>
//               <Button onClick={handleAddToCart} disabled={!product.in_stock} className="flex-1">
//                 <ShoppingCart className="h-5 w-5" />
//                 {product.in_stock ? "Add to Cart" : "Out of Stock"}
//               </Button>
//             </div>
//           </motion.div>
//         </div>

//         {relatedProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p, i) => (
//                 <ProductCard key={p.id} product={p} index={i} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetailPage;

// import { useState, useEffect } from 'react';
// import { useParams, Link, useSearchParams } from 'react-router-dom'; // ✅ Added useSearchParams
// import { ChevronRight, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Layout } from '@/components/layout/Layout';
// import { ProductCard } from '@/components/ProductCard';
// import { Product } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useToast } from '@/hooks/use-toast';

// const ProductDetailPage = () => {
//   const { productId } = useParams(); // This is the slug
  
//   // ✅ 1. Access the URL search params to get ?location=ID
//   const [searchParams] = useSearchParams();
//   const locationId = searchParams.get('location');

//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   // ✅ 2. Fetch product details with location context
//   useEffect(() => {
//     setLoading(true);
    
//     // Append location ID to the detail request
//     const detailUrl = `http://127.0.0.1:8000/api/store/products/${productId}/?${locationId ? `location=${locationId}` : ''}`;

//     fetch(detailUrl)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);

//         // ✅ 3. Fetch related products with location context
//         const relatedUrl = `http://127.0.0.1:8000/api/store/products/?category=${data.category}${locationId ? `&location=${locationId}` : ''}`;
        
//         fetch(relatedUrl)
//           .then(res => res.json())
//           .then(rel => setRelatedProducts(rel.filter((p: Product) => p.slug !== data.slug).slice(0, 4)));
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [productId, locationId]); // ✅ Re-run if either the product OR location changes

//   if (loading) return <Layout><div className="container py-16">Loading...</div></Layout>;
//   if (!product) return <Layout><div className="container py-16">Product not found</div></Layout>;

//   const discountPercent = product.original_price
//     ? Math.round((1 - product.price / product.original_price) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     if (!product.in_stock) {
//       toast({ title: "Out of Stock", description: "This product is unavailable in your location", variant: "destructive" });
//       return;
//     }
//     for (let i = 0; i < quantity; i++) addToCart(product);
//     toast({ title: "Added to cart!", description: `${quantity}x ${product.name} added.` });
//   };

//   return (
//     <Layout>
//       <div className="container py-8">
//         {/* Breadcrumbs - ✅ Maintain location context in links */}
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
//           <Link to={`/${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary">Home</Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to={`/category/${product.category}${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary">
//             {product.category}
//           </Link>
//           <ChevronRight className="h-4 w-4" />
//           <span className="text-foreground">{product.name}</span>
//         </nav>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//              <div className="relative rounded-2xl overflow-hidden bg-muted mb-4">
//                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
//                {product.in_offer && discountPercent > 0 && (
//                  <span className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-3 py-1 rounded-full">
//                    {discountPercent}% OFF
//                  </span>
//                )}
//              </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="flex items-center gap-2 mb-4">
//               <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
//               <span>{product.rating}</span>
//               <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
//             </div>

//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

//             <div className="flex items-center gap-4 mb-2">
//               <span className="text-3xl font-bold">€{Number(product.price).toFixed(2)}</span>
//               {product.original_price && (
//                 <span className="line-through text-muted-foreground">
//                   €{Number(product.original_price).toFixed(2)}
//                 </span>
//               )}
//             </div>

//             {/* ✅ Location-specific stock message */}
//             <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
//               {product.in_stock ? `In Stock (${product.stock_count} units available)` : "Currently Out of Stock at this location"}
//             </p>

//             <p className="text-muted-foreground mb-8">{product.description}</p>
// <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
//               {product.in_stock ? "In Stock" : "Out of Stock"}
//             </p>

//             {/* <p className="text-muted-foreground mb-8">{product.description}</p> */}

//             <div className="flex items-center gap-4 mb-8">
//               <div className="flex items-center border rounded-lg">
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
//               </div>
//               <Button onClick={handleAddToCart} disabled={!product.in_stock} className="flex-1">
//                 <ShoppingCart className="h-5 w-5" />
//                 {product.in_stock ? "Add to Cart" : "Out of Stock"}
//               </Button>
//             </div>
//           </motion.div>
//         </div>

//         {relatedProducts.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {relatedProducts.map((p, i) => (
//                 <ProductCard key={p.id} product={p} index={i} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetailPage;

import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const locationId = searchParams.get('location');

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const detailUrl = `http://127.0.0.1:8000/api/store/products/${productId}/?${locationId ? `location=${locationId}` : ''}`;

    fetch(detailUrl)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);

        const relatedUrl = `http://127.0.0.1:8000/api/store/products/?category=${data.category}${locationId ? `&location=${locationId}` : ''}`;
        fetch(relatedUrl)
          .then(res => res.json())
          .then(rel => setRelatedProducts(rel.filter((p: Product) => p.slug !== data.slug).slice(0, 4)));
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId, locationId]);

  if (loading) return <Layout><div className="container py-16 flex justify-center italic text-muted-foreground tracking-widest animate-pulse">Loading fresh items...</div></Layout>;
  if (!product) return <Layout><div className="container py-16 text-center">Product not found</div></Layout>;

  const discountPercent = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.in_stock) {
      toast({ title: "Out of Stock", description: "This item is currently unavailable.", variant: "destructive" });
      return;
    }
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast({ title: "Added to cart! ✨", description: `${quantity}x ${product.name} ready for checkout.` });
  };

  return (
    <Layout>
      <div className="container py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-10">
          <Link to={`/${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.category}${locationId ? `?location=${locationId}` : ''}`} className="hover:text-primary transition-colors tracking-tighter italic uppercase">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Image Container - Controlled Size for a "Cute" Look */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4 max-w-[480px] mx-auto lg:mx-0 w-full"
          >
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-slate-100 bg-white shadow-sm group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-700" 
              />
              {product.in_offer && discountPercent > 0 && (
                <Badge className="absolute top-6 left-6 bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5 text-xs font-black shadow-lg rounded-full border-2 border-white">
                  {discountPercent}% OFF ✨
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col pt-4">
            <div className="flex items-center gap-2 mb-4">
    <div className="flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
      <Star className="h-3 w-3 fill-primary text-primary mr-1" />
      <span className="text-[10px] font-black text-primary">{product.rating}</span>
    </div>
    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest underline decoration-slate-200 underline-offset-4 cursor-pointer hover:text-primary transition-colors">
      {product.reviews_count} reviews
    </span>
  </div>

  {/* Product Name - Reduced from 4xl/5xl to 2xl/3xl */}
  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 leading-tight  italic tracking-tighter">
    {product.name}
  </h1>
  
  {/* Unit - Reduced text size */}
  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-6">
    {product.unit} pack
  </p>

  {/* Price Section - Reduced from 5xl to 3xl */}
  <div className="flex items-baseline gap-3 mb-8">
    <span className="text-3xl font-black text-slate-900 tracking-tighter">
      €{Number(product.price).toFixed(2)}
    </span>
    {product.original_price && (
      <span className="text-base line-through text-slate-300 font-bold decoration-slate-200 decoration-2">
        €{Number(product.original_price).toFixed(2)}
      </span>
    )}
  </div>

            {/* Product Meta Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 mb-10 shadow-sm space-y-5">
              <p className={`text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2.5 ${product.in_stock ? "text-green-600" : "text-rose-500"}`}>
                <span className={`h-2 w-2 rounded-full ${product.in_stock ? "bg-green-600 animate-pulse" : "bg-rose-500"}`} />
                {product.in_stock ? `Fresh & In Stock (${product.stock_count} units)` : "Currently Sold Out"}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium italic border-t border-slate-50 pt-5">
                {product.description || "Fresh and authentic essentials selected specifically for your local pantry."}
              </p>
            </div>

            {/* Purchase Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-slate-50 rounded-2xl overflow-hidden h-14 border border-slate-100 px-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10 hover:bg-white hover:shadow-sm transition-all"
                  disabled={!product.in_stock || quantity <= 1} 
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-black text-xl text-slate-900">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10 hover:bg-white hover:shadow-sm transition-all"
                  disabled={!product.in_stock} 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                onClick={handleAddToCart} 
                disabled={!product.in_stock} 
                className="flex-1 h-14 rounded-2xl bg-primary hover:opacity-90 text-primary-foreground font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                <ShoppingCart className="h-4 w-4 mr-2.5" />
                {product.in_stock ? "Add to Basket" : "Waitlist Item"}
              </Button>

              <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:border-rose-200 group transition-colors">
                <Heart className="h-5 w-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-slate-100 border-dashed">
            <div className="flex items-end justify-between mb-10 px-2">
              <div>
                <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-2">Matches for you</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected from {product.category}</p>
              </div>
              <Link to="/category/all" className="text-[10px] font-black text-primary uppercase underline underline-offset-8 decoration-2 tracking-widest hover:opacity-80 transition-opacity">
                Browse More
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;