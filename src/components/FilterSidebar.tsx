import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory?: string;
  selectedSubcategories: string[];
  priceRange: [number, number];
  offersOnly: boolean;
  minRating: number;
  onCategoryChange: (category?: string) => void;
  onSubcategoryChange: (subcategories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onOffersChange: (value: boolean) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  categories,
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
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory);

  const toggleSubcategory = (slug: string) => {
    if (selectedSubcategories.includes(slug)) {
      onSubcategoryChange(selectedSubcategories.filter(s => s !== slug));
    } else {
      onSubcategoryChange([...selectedSubcategories, slug]);
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-xl p-6 shadow-card border space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear all
          </Button>
        </div>

        {/* Categories */}
        <div className="border-b pb-4">
          <button 
            onClick={() => toggleSection("category")} 
            className="flex justify-between w-full mb-3 font-medium"
          >
            Category {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.slug ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subcategories */}
        {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
          <div className="border-b pb-4">
            <button 
              onClick={() => toggleSection("subcategory")} 
              className="flex justify-between w-full mb-3 font-medium"
            >
              Subcategory {expandedSections.subcategory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.subcategory && (
              <div className="space-y-2">
                {currentCategory.subcategories.map(sub => (
                  <label key={sub.slug} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <Checkbox
                      checked={selectedSubcategories.includes(sub.slug)}
                      onCheckedChange={() => toggleSubcategory(sub.slug)}
                    />
                    <span className="text-sm">{sub.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="border-b pb-4">
          <button 
            onClick={() => toggleSection("price")} 
            className="flex justify-between w-full mb-3 font-medium"
          >
            Price Range {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.price && (
            <div className="px-2 pt-2 pb-4">
              <Slider
                value={priceRange}
                onValueChange={(v) => onPriceChange(v as [number, number])}
                min={0}
                max={100}
                step={1}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>€{priceRange[0]}</span>
                <span>€{priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Offers */}
        <div className="flex justify-between items-center border-b pb-4">
          <span className="font-medium">Offers Only</span>
          <Switch checked={offersOnly} onCheckedChange={onOffersChange} />
        </div>

        {/* Rating */}
        <div>
          <button 
            onClick={() => toggleSection("rating")} 
            className="flex justify-between w-full mb-3 font-medium"
          >
            Minimum Rating {expandedSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.rating && (
            <div className="space-y-1">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => onRatingChange(rating)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    minRating === rating ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  {rating}+ ⭐
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </aside>
  );
};