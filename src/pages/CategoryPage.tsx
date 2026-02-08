import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { ChevronRight, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Product, Category } from '@/data/products';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const CategoryPage = () => {
  // 1. Get the categoryId directly from the URL
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  
  // 2. We use the URL param as our "selectedCategory"
  const activeCategory = categoryId === 'all' ? undefined : categoryId;
  
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [offersOnly, setOffersOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Reset filters when category changes via URL
  useEffect(() => {
    setSelectedSubcategories([]);
    setPriceRange([0, 50]);
    setOffersOnly(false);
    setMinRating(0);
  }, [categoryId]);

  // Fetch Categories once
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // 3. Re-fetch products whenever categoryId or subcategories change
  useEffect(() => {
    setLoading(true);

    let url = "http://127.0.0.1:8000/api/store/products/?";
    // Use activeCategory (derived from URL) here
    if (activeCategory) url += `category=${activeCategory}&`;
    if (selectedSubcategories.length === 1) url += `subcategory=${selectedSubcategories[0]}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [activeCategory, selectedSubcategories]); // Dependency on activeCategory is key!

  const currentCategory = categories.find(c => c.slug === activeCategory);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (offersOnly) filtered = filtered.filter(p => p.in_offer);
    if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: filtered.sort((a, b) => b.reviews_count - a.reviews_count);
    }
    return filtered;
  }, [products, priceRange, offersOnly, minRating, sortBy]);

  // 4. Update the handler to navigate rather than just setting state
  const handleCategoryChange = (slug: string | undefined) => {
    if (!slug || slug === 'all') {
      navigate('/category/all');
    } else {
      navigate(`/category/${slug}`);
    }
  };

  const clearFilters = () => {
    handleCategoryChange('all');
  };

  // All Categories Overview Page
  if (categoryId === 'all') {
    return (
      <Layout>
        <div className="container py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">All Categories</span>
          </nav>
          <h1 className="text-3xl font-bold mb-8">All Categories</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/category/all" className="hover:text-primary">Categories</Link>
          {currentCategory && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{currentCategory.name}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={activeCategory} // Pass the URL value
              selectedSubcategories={selectedSubcategories}
              priceRange={priceRange}
              offersOnly={offersOnly}
              minRating={minRating}
              onCategoryChange={handleCategoryChange} // Use the new navigation handler
              onSubcategoryChange={setSelectedSubcategories}
              onPriceChange={setPriceRange}
              onOffersChange={setOffersOnly}
              onRatingChange={setMinRating}
              onClearFilters={clearFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">Filters</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <FilterSidebar
                      categories={categories}
                      selectedCategory={activeCategory}
                      selectedSubcategories={selectedSubcategories}
                      priceRange={priceRange}
                      offersOnly={offersOnly}
                      minRating={minRating}
                      onCategoryChange={handleCategoryChange}
                      onSubcategoryChange={setSelectedSubcategories}
                      onPriceChange={setPriceRange}
                      onOffersChange={setOffersOnly}
                      onRatingChange={setMinRating}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <p className="text-muted-foreground animate-pulse">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-4 lg:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found in this category.</p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;