"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { products } from "@/lib/data";

interface ProductListProps {
  category?: string;
  sort?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default function ProductList({
  category,
  sort: initialSort,
  search: initialSearch,
  minPrice: initialMinPrice,
  maxPrice: initialMaxPrice,
}: ProductListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMinPrice || 0,
    initialMaxPrice || 200,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(initialSort || "default");
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");

  // Filter sections expand/collapse
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    color: true,
    size: true,
  });

  // Get filtered products
  // const products = getFilteredProducts({
  //   category,
  //   brands: selectedBrands,
  //   colors: selectedColors,
  //   sizes: selectedSizes,
  //   minPrice: priceRange[0],
  //   maxPrice: priceRange[1],
  //   search: searchQuery,
  //   sort: sortBy,
  // });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle filter changes
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
    setSortBy("default");
  };

  // All available filter options
  const allBrands = [
    "ThreadZone",
    "Denim Co.",
    "Chic Styles",
    "Luxe",
    "Timepiece",
  ];
  const allColors = [
    "Black",
    "White",
    "Gray",
    "Blue",
    "Navy",
    "Red",
    "Brown",
    "Tan",
    "Gold",
    "Silver",
    "Rose Gold",
  ];
  const allSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "32",
    "34",
    "36",
    "One Size",
  ];
  const allCategories = [
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "accessories", name: "Accessories" },
    { id: "footwear", name: "Footwear" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
        </Button>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view">
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform transform ${
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div className="absolute top-0 left-0 h-full w-80 bg-background p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileFiltersOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          {/* Filter Content - same as desktop but for mobile */}
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("category")}>
              <h3 className="text-lg font-semibold">Categories</h3>
              {expandedSections.category ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.category && (
              <ul className="mt-3 space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat.id}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`category-${cat.id}`}
                        checked={category === cat.id}
                        onCheckedChange={() => {
                          /* Handle navigation to category */
                        }}
                      />
                      <label
                        htmlFor={`category-${cat.id}`}
                        className="ml-2 text-sm cursor-pointer">
                        {cat.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("price")}>
              <h3 className="text-lg font-semibold">Price Range</h3>
              {expandedSections.price ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.price && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>

                <Slider
                  defaultValue={[0, 200]}
                  min={0}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                />
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("brand")}>
              <h3 className="text-lg font-semibold">Brands</h3>
              {expandedSections.brand ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.brand && (
              <ul className="mt-3 space-y-2">
                {allBrands.map((brand) => (
                  <li key={brand}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("category")}>
              <h3 className="text-lg font-semibold">Categories</h3>
              {expandedSections.category ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.category && (
              <ul className="mt-3 space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat.id}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`category-${cat.id}`}
                        checked={category === cat.id}
                        onCheckedChange={() => {
                          /* Handle navigation to category */
                        }}
                      />
                      <label
                        htmlFor={`category-${cat.id}`}
                        className="ml-2 text-sm cursor-pointer">
                        {cat.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("price")}>
              <h3 className="text-lg font-semibold">Price Range</h3>
              {expandedSections.price ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.price && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>

                <Slider
                  defaultValue={[0, 200]}
                  min={0}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                />
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("brand")}>
              <h3 className="text-lg font-semibold">Brands</h3>
              {expandedSections.brand ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.brand && (
              <ul className="mt-3 space-y-2">
                {allBrands.map((brand) => (
                  <li key={brand}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("color")}>
              <h3 className="text-lg font-semibold">Colors</h3>
              {expandedSections.color ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.color && (
              <ul className="mt-3 space-y-2">
                {allColors.map((color) => (
                  <li key={color}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => handleColorChange(color)}
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="ml-2 text-sm cursor-pointer">
                        {color}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("size")}>
              <h3 className="text-lg font-semibold">Sizes</h3>
              {expandedSections.size ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {expandedSections.size && (
              <div className="mt-3 flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`min-w-[36px] h-9 px-2 border rounded-md flex items-center justify-center text-sm ${
                      selectedSizes.includes(size)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1">
        {/* Desktop Sort & View Options */}
        <div className="hidden lg:flex justify-end items-center mb-6 gap-4">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view">
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedBrands.length > 0 ||
          selectedColors.length > 0 ||
          selectedSizes.length > 0 ||
          searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>

            {searchQuery && (
              <div className="inline-flex items-center bg-muted text-muted-foreground text-xs rounded-full px-3 py-1">
                Search: {searchQuery}
                <button
                  className="ml-1"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search">
                  <X size={14} />
                </button>
              </div>
            )}

            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="inline-flex items-center bg-muted text-muted-foreground text-xs rounded-full px-3 py-1">
                Brand: {brand}
                <button
                  className="ml-1"
                  onClick={() => handleBrandChange(brand)}
                  aria-label={`Remove ${brand} filter`}>
                  <X size={14} />
                </button>
              </div>
            ))}

            {selectedColors.map((color) => (
              <div
                key={color}
                className="inline-flex items-center bg-muted text-muted-foreground text-xs rounded-full px-3 py-1">
                Color: {color}
                <button
                  className="ml-1"
                  onClick={() => handleColorChange(color)}
                  aria-label={`Remove ${color} filter`}>
                  <X size={14} />
                </button>
              </div>
            ))}

            {selectedSizes.map((size) => (
              <div
                key={size}
                className="inline-flex items-center bg-muted text-muted-foreground text-xs rounded-full px-3 py-1">
                Size: {size}
                <button
                  className="ml-1"
                  onClick={() => handleSizeChange(size)}
                  aria-label={`Remove ${size} filter`}>
                  <X size={14} />
                </button>
              </div>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs h-7">
              Clear All
            </Button>
          </div>
        )}

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="mt-2">
                      {product.discount ? (
                        <div className="flex space-x-2 items-center">
                          <span className="font-bold">${product.discount}</span>
                          <span className="text-sm line-through text-muted-foreground">
                            ${product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">${product.price}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-card">
                <div className="w-full md:w-64 h-64 relative">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>

                <div className="flex-1 p-4 flex flex-col">
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`${
                            star <= product.rating
                              ? "text-yellow-400"
                              : "text-muted-foreground"
                          }`}>
                          {star <= product.rating ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-2">
                    {product.subcategory}
                  </p>

                  <p className="text-sm mb-4">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-baseline">
                      {product.discount ? (
                        <>
                          <span className="text-lg font-bold">
                            ${product.discount.toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Link href={`/products/${product.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
