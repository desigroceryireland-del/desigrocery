import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Store, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { products, categories } from '@/data/products';

const Index = () => {
  const offerProducts = products.filter(p => p.in_offer);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-saffron-light text-saffron-dark text-sm font-medium px-4 py-2 rounded-full mb-4">
                🎉 Free Delivery on orders over €50
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Fresh <span className="text-gradient">Desi Groceries</span> Delivered to Your Door
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Authentic Indian groceries, fresh produce, spices, and essentials. Experience the taste of home with our carefully curated selection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/category/all">
                  <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground gap-2">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/category/all">
                  <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    Order for Pickup
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"
                  alt="Spices"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400"
                  alt="Fresh fruits"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"
                  alt="Rice"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"
                  alt="Indian food"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of authentic Indian groceries
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Today's Offers</h2>
              <p className="text-muted-foreground">Don't miss out on these amazing deals!</p>
            </div>
            <Link to="/offers">
              <Button variant="outline" className="hidden sm:flex gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Offers
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {offerProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <Link to="/offers" className="sm:hidden mt-6 block">
            <Button variant="outline" className="w-full gap-2 border-primary text-primary">
              View All Offers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Delivery Info Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4">Why Choose Desi Grocery?</h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
              We offer home delivery and store collection across Ireland
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: 'Home Delivery',
                description: 'Free delivery on orders over €50 across Ireland',
              },
              {
                icon: Store,
                title: 'Store Pickup',
                description: 'Order online and collect from your nearest store',
              },
              {
                icon: Clock,
                title: 'Same Day Delivery',
                description: 'Order before 2pm for same-day delivery in Dublin',
              },
              {
                icon: Shield,
                title: 'Fresh Guarantee',
                description: '100% fresh produce or your money back',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 text-center shadow-card"
              >
                <div className="w-14 h-14 rounded-full gradient-saffron flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Popular Products</h2>
              <p className="text-muted-foreground">Customer favorites you'll love</p>
            </div>
            <Link to="/category/all">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
