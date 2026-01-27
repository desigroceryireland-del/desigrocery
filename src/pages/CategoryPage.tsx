import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { products, categories } from '@/data/products';
import { useEffect } from "react";


type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedCategory, setSelectedCategory] = useState(categoryId === 'all' ? undefined : categoryId);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [offersOnly, setOffersOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
    useEffect(() => {
    setSelectedCategory(categoryId === 'all' ? undefined : categoryId);
    setSelectedSubcategories([]);
    setPriceRange([0, 50]);
    setOffersOnly(false);
    setMinRating(0);
  }, [categoryId]);


  const currentCategory = categories.find(c => c.id === selectedCategory);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Offers filter
    if (offersOnly) {
      filtered = filtered.filter(p => p.in_offer);
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return filtered;
  }, [selectedCategory, selectedSubcategories, priceRange, offersOnly, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(categoryId === 'all' ? undefined : categoryId);
    setSelectedSubcategories([]);
    setPriceRange([0, 50]);
    setOffersOnly(false);
    setMinRating(0);
  };

  // If showing all categories
  if (categoryId === 'all' && !selectedCategory) {
    return (
      <Layout>
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">All Categories</span>
          </nav>

          <h1 className="text-3xl font-bold text-foreground mb-8">All Categories</h1>

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
      {/* Breadcrumb */}
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

      <div className="flex gap-8">
        {/* ✅ Sidebar ONLY on desktop */}
        <div className="hidden lg:block">
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            priceRange={priceRange}
            offersOnly={offersOnly}
            minRating={minRating}
            onCategoryChange={setSelectedCategory}
            onSubcategoryChange={setSelectedSubcategories}
            onPriceChange={setPriceRange}
            onOffersChange={setOffersOnly}
            onRatingChange={setMinRating}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* ✅ Responsive Header */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-foreground break-words">
                {currentCategory?.name || 'All Products'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex items-center gap-3 overflow-x-auto">
              {/* ✅ Mobile Filter Button */}
              <Button variant="outline" className="lg:hidden shrink-0">
                Filters
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px] shrink-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularity</SelectItem>
                  <SelectItem value="price-low">Price ↑</SelectItem>
                  <SelectItem value="price-high">Price ↓</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode (hide on very small screens) */}
              <div className="hidden sm:flex border rounded-lg overflow-hidden shrink-0">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-4 lg:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No products found matching your criteria.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </Layout>
);

};

export default CategoryPage;
