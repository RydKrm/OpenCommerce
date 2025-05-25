"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageSquare,
  Star,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

const mockProductPerformance = [
  {
    id: "prod_1",
    name: "Wireless Headphones",
    category: "Electronics",
    currentMonthSales: 156,
    previousMonthSales: 134,
    revenue: 46680,
    views: 2847,
    likes: 234,
    comments: 45,
    reviews: 89,
    rating: 4.8,
    conversionRate: 5.5,
    stockLevel: 45,
    trend: "up",
  },
  {
    id: "prod_2",
    name: "Cotton T-Shirt",
    category: "Clothing",
    currentMonthSales: 89,
    previousMonthSales: 112,
    revenue: 2225,
    views: 1456,
    likes: 167,
    comments: 23,
    reviews: 45,
    rating: 4.3,
    conversionRate: 6.1,
    stockLevel: 120,
    trend: "down",
  },
  {
    id: "prod_3",
    name: "Gaming Mouse",
    category: "Electronics",
    currentMonthSales: 67,
    previousMonthSales: 45,
    revenue: 5360,
    views: 1234,
    likes: 98,
    comments: 12,
    reviews: 34,
    rating: 4.6,
    conversionRate: 5.4,
    stockLevel: 78,
    trend: "up",
  },
  {
    id: "prod_4",
    name: "Yoga Mat",
    category: "Sports",
    currentMonthSales: 34,
    previousMonthSales: 56,
    revenue: 1360,
    views: 890,
    likes: 45,
    comments: 8,
    reviews: 23,
    rating: 4.2,
    conversionRate: 3.8,
    stockLevel: 67,
    trend: "down",
  },
  {
    id: "prod_5",
    name: "Coffee Maker",
    category: "Home & Garden",
    currentMonthSales: 23,
    previousMonthSales: 18,
    revenue: 2760,
    views: 567,
    likes: 34,
    comments: 5,
    reviews: 12,
    rating: 4.5,
    conversionRate: 4.1,
    stockLevel: 23,
    trend: "up",
  },
];

export default function ProductAnalyticsPage() {
  const [products, setProducts] = useState(mockProductPerformance);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("sales");

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "sales":
          return b.currentMonthSales - a.currentMonthSales;
        case "revenue":
          return b.revenue - a.revenue;
        case "views":
          return b.views - a.views;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const getTrendIcon = (trend: string, current: number, previous: number) => {
    const percentage = ((current - previous) / previous) * 100;
    if (trend === "up") {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+{percentage.toFixed(1)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm">{percentage.toFixed(1)}%</span>
        </div>
      );
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const totalSales = products.reduce((sum, p) => sum + p.currentMonthSales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const averageRating =
    products.reduce((sum, p) => sum + p.rating, 0) / products.length;
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Product Performance"
        description="Analyze individual product performance and metrics"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Performance Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Volume</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">Export Report</Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Product Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{product.name}</h3>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Stock: {product.stockLevel} units
                      </div>
                    </div>

                    {/* Sales Performance */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Sales This Month
                        </span>
                        {getTrendIcon(
                          product.trend,
                          product.currentMonthSales,
                          product.previousMonthSales
                        )}
                      </div>
                      <div className="text-2xl font-bold">
                        {product.currentMonthSales}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Previous: {product.previousMonthSales}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Revenue: ${product.revenue.toLocaleString()}
                      </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>Views</span>
                        </div>
                        <span className="font-medium">{product.views}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>Likes</span>
                        </div>
                        <span className="font-medium">{product.likes}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>Comments</span>
                        </div>
                        <span className="font-medium">{product.comments}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>Reviews</span>
                        </div>
                        <span className="font-medium">{product.reviews}</span>
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Conversion Rate</span>
                          <span className="font-medium">
                            {product.conversionRate}%
                          </span>
                        </div>
                        <Progress
                          value={product.conversionRate * 10}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Stock Level</span>
                          <span className="font-medium">
                            {product.stockLevel}
                          </span>
                        </div>
                        <Progress
                          value={Math.min(
                            (product.stockLevel / 150) * 100,
                            100
                          )}
                          className="h-2"
                        />
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
