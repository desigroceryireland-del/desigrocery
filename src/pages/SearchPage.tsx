import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/data/products';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch search results
  useEffect(() => {
    if (query.length === 0) return;

    setLoading(true);

    fetch(`http://api.desigrocery.ie/api/store/products/?search=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Search error:", err);
        setLoading(false);
      });
  }, [query]);

  // Fetch recommended (offers)
  useEffect(() => {
    fetch("http://api.desigrocery.ie/api/store/products/")
      .then(res => res.json())
      .then(data => setRecommended(data.filter((p: Product) => p.in_offer).slice(0, 4)))
      .catch(err => console.error("Error fetching recommended:", err));
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-foreground text-center mb-6">
            Search Products
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for groceries, spices, rice..."
              className="pl-12 pr-4 h-14 text-lg bg-muted border-0 focus-visible:ring-primary"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        {query.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {loading
                  ? "Searching..."
                  : results.length > 0
                    ? `${results.length} results for "${query}"`
                    : `No results for "${query}"`}
              </h2>
            </div>

            {!loading && results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {results.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Try searching for something else or browse our categories.
                  </p>
                  <Link to="/category/all">
                    <span className="text-primary hover:underline">Browse all categories</span>
                  </Link>
                </div>
              )
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Recommended for You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommended.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
