import { useState } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { categories } from '@/data/products';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface FilterSidebarProps {
  selectedCategory?: string;
  selectedSubcategories: string[];
  priceRange: [number, number];
  offersOnly: boolean;
  minRating: number;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onOffersChange: (offersOnly: boolean) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

const FilterContent = ({
  selectedCategory,
  selectedSubcategories,
  priceRange,
  offersOnly,
  minRating,
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
  onOffersChange,
  onRatingChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    subcategory: true,
    price: true,
    offers: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      onSubcategoryChange(selectedSubcategories.filter(s => s !== subcategory));
    } else {
      onSubcategoryChange([...selectedSubcategories, subcategory]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-primary">
          Clear all
        </Button>
      </div>

      {/* Categories */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Category
          {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subcategories */}
      {currentCategory && (
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('subcategory')}
            className="flex items-center justify-between w-full text-left font-medium mb-3"
          >
            Subcategory
            {expandedSections.subcategory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.subcategory && (
            <div className="space-y-2">
              {currentCategory.subcategories.map(sub => (
                <label key={sub} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedSubcategories.includes(sub)}
                    onCheckedChange={() => toggleSubcategory(sub)}
                  />
                  <span className="text-sm">{sub}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Price Range
          {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.price && (
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              min={0}
              max={50}
              step={1}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Offers Only */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Offers Only</span>
          <Switch checked={offersOnly} onCheckedChange={onOffersChange} />
        </div>
      </div>

      {/* Ratings */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Minimum Rating
          {expandedSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => onRatingChange(rating)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  minRating === rating ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <span className="text-sm">{rating}+ ⭐</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const FilterSidebar = (props: FilterSidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-32 bg-card rounded-xl p-6 shadow-card border">
          <FilterContent {...props} />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
