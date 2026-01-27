import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const OffersPage = () => {
  const offerProducts = products.filter(p => p.in_offer);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-spice-red text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🔥 Limited Time Offers
          </span>
          <h1 className="text-4xl font-bold text-foreground mb-4">Today's Best Deals</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these amazing discounts! Fresh produce, spices, and more at unbeatable prices.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {offerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {offerProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No offers available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OffersPage;
