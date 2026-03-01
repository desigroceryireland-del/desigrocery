import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/data/products';

const OffersPage = () => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://api.desigrocery.ie/api/store/products/")
      .then(res => res.json())
      .then(data => {
        const offers = data.filter((p: Product) => p.in_offer);
        setOfferProducts(offers);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching offers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-spice-red text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🔥 Limited Time Offers
          </span>
          <h1 className="text-4xl font-bold mb-4">Today's Best Deals</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these amazing discounts! Fresh produce, spices, and more at unbeatable prices.
          </p>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-muted-foreground">Loading offers...</p>}

        {/* Products */}
        {!loading && offerProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {offerProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && offerProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No offers available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OffersPage;
