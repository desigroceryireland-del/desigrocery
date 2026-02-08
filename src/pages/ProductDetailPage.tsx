import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { ReviewCard, sampleReviews } from '@/components/ReviewCard';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { productId } = useParams(); // this is slug now
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch product details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/store/products/${productId}/`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);

        // Fetch related products
        fetch(`http://127.0.0.1:8000/api/store/products/?category=${data.category}`)
          .then(res => res.json())
          .then(rel => setRelatedProducts(rel.filter((p: Product) => p.slug !== data.slug).slice(0, 4)));
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <Layout><div className="container py-16">Loading...</div></Layout>;
  if (!product) return <Layout><div className="container py-16">Product not found</div></Layout>;

  const discountPercent = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.in_stock) {
      toast({ title: "Out of Stock", description: "This product is unavailable", variant: "destructive" });
      return;
    }

    for (let i = 0; i < quantity; i++) addToCart(product);
    toast({ title: "Added to cart!", description: `${quantity}x ${product.name} added.` });
  };

  const images = [product.image, product.image, product.image];

  return (
    <Layout>
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/category/all" className="hover:text-primary">Categories</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/category/${product.category}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative rounded-2xl overflow-hidden bg-muted mb-4">
              <img src={images[selectedImage]} alt={product.name} className="w-full aspect-square object-cover" />
              {product.in_offer && (
                <span className="absolute top-4 left-4 bg-spice-red text-white text-sm px-3 py-1 rounded-full">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-turmeric text-turmeric" />
              <span>{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold">€{Number(product.price).toFixed(2)}</span>
              €{product.original_price && (
  <span className="line-through text-muted-foreground">
    €{Number(product.original_price).toFixed(2)}
  </span>
)}
            </div>

            <p className={`font-semibold mb-4 ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </p>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" disabled={!product.in_stock} onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
              <Button onClick={handleAddToCart} disabled={!product.in_stock} className="flex-1">
                <ShoppingCart className="h-5 w-5" />
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
