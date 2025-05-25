"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Plus,
  Search,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data based on your Prisma models
interface ProductProperty {
  id: string;
  key: string;
  value: string;
}

interface ProductVariant {
  id: string;
  price: number;
  previousPrice?: number;
  image?: string;
  sku?: string;
  quantity: number;
  status: boolean;
  properties: ProductProperty[];
}

interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  sku?: string;
  previousPrice?: number;
  description: string;
  quantity: number;
  rating: number;
  visitCount: number;
  commentCount: number;
  reviewCount: number;
  status: boolean;
  category: {
    id: string;
    name: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  variants: ProductVariant[];
  properties: ProductProperty[];
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    categoryId: "smartphones",
    price: 999,
    previousPrice: 1099,
    sku: "IPH15PRO",
    description:
      "Latest iPhone with advanced camera system and titanium design",
    quantity: 50,
    rating: 4.8,
    visitCount: 1250,
    commentCount: 89,
    reviewCount: 156,
    status: true,
    category: { id: "smartphones", name: "Smartphones" },
    images: [
      {
        id: "1",
        url: "/placeholder.svg?height=300&width=300",
        alt: "iPhone 15 Pro",
      },
    ],
    variants: [
      {
        id: "v1",
        price: 999,
        previousPrice: 1099,
        image: "/placeholder.svg?height=300&width=300",
        sku: "IPH15PRO-128",
        quantity: 20,
        status: true,
        properties: [
          { id: "p1", key: "Storage", value: "128GB" },
          { id: "p2", key: "Color", value: "Natural Titanium" },
          { id: "p3", key: "RAM", value: "8GB" },
        ],
      },
      {
        id: "v2",
        price: 1199,
        previousPrice: 1299,
        image: "/placeholder.svg?height=300&width=300",
        sku: "IPH15PRO-256",
        quantity: 15,
        status: true,
        properties: [
          { id: "p4", key: "Storage", value: "256GB" },
          { id: "p5", key: "Color", value: "Blue Titanium" },
          { id: "p6", key: "RAM", value: "8GB" },
        ],
      },
    ],
    properties: [
      { id: "bp1", key: "Brand", value: "Apple" },
      { id: "bp2", key: "Operating System", value: "iOS 17" },
      { id: "bp3", key: "Display", value: "6.1-inch Super Retina XDR" },
      { id: "bp4", key: "Processor", value: "A17 Pro" },
      {
        id: "bp5",
        key: "Camera",
        value: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      },
      { id: "bp6", key: "Battery", value: "Up to 23 hours video playback" },
      { id: "bp7", key: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3" },
      { id: "bp8", key: "Water Resistance", value: "IP68" },
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    categoryId: "smartphones",
    price: 1199,
    previousPrice: 1299,
    sku: "SGS24U",
    description:
      "Premium Android smartphone with S Pen and advanced AI features",
    quantity: 35,
    rating: 4.7,
    visitCount: 980,
    commentCount: 67,
    reviewCount: 134,
    status: true,
    category: { id: "smartphones", name: "Smartphones" },
    images: [
      {
        id: "2",
        url: "/placeholder.svg?height=300&width=300",
        alt: "Galaxy S24 Ultra",
      },
    ],
    variants: [
      {
        id: "v3",
        price: 1199,
        previousPrice: 1299,
        image: "/placeholder.svg?height=300&width=300",
        sku: "SGS24U-256",
        quantity: 18,
        status: true,
        properties: [
          { id: "p7", key: "Storage", value: "256GB" },
          { id: "p8", key: "Color", value: "Titanium Black" },
          { id: "p9", key: "RAM", value: "12GB" },
        ],
      },
      {
        id: "v4",
        price: 1419,
        previousPrice: 1519,
        image: "/placeholder.svg?height=300&width=300",
        sku: "SGS24U-512",
        quantity: 12,
        status: true,
        properties: [
          { id: "p10", key: "Storage", value: "512GB" },
          { id: "p11", key: "Color", value: "Titanium Violet" },
          { id: "p12", key: "RAM", value: "12GB" },
        ],
      },
    ],
    properties: [
      { id: "bp9", key: "Brand", value: "Samsung" },
      { id: "bp10", key: "Operating System", value: "Android 14" },
      { id: "bp11", key: "Display", value: "6.8-inch Dynamic AMOLED 2X" },
      { id: "bp12", key: "Processor", value: "Snapdragon 8 Gen 3" },
      {
        id: "bp13",
        key: "Camera",
        value: "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto",
      },
      { id: "bp14", key: "Battery", value: "5000mAh with 45W fast charging" },
      { id: "bp15", key: "Connectivity", value: "5G, Wi-Fi 7, Bluetooth 5.3" },
      { id: "bp16", key: "Water Resistance", value: "IP68" },
      { id: "bp17", key: "S Pen", value: "Included" },
    ],
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    categoryId: "smartphones",
    price: 899,
    previousPrice: 999,
    sku: "GP8PRO",
    description:
      "AI-powered smartphone with exceptional camera and pure Android experience",
    quantity: 28,
    rating: 4.6,
    visitCount: 756,
    commentCount: 45,
    reviewCount: 98,
    status: true,
    category: { id: "smartphones", name: "Smartphones" },
    images: [
      {
        id: "3",
        url: "/placeholder.svg?height=300&width=300",
        alt: "Pixel 8 Pro",
      },
    ],
    variants: [
      {
        id: "v5",
        price: 899,
        previousPrice: 999,
        image: "/placeholder.svg?height=300&width=300",
        sku: "GP8PRO-128",
        quantity: 15,
        status: true,
        properties: [
          { id: "p13", key: "Storage", value: "128GB" },
          { id: "p14", key: "Color", value: "Obsidian" },
          { id: "p15", key: "RAM", value: "12GB" },
        ],
      },
      {
        id: "v6",
        price: 1099,
        previousPrice: 1199,
        image: "/placeholder.svg?height=300&width=300",
        sku: "GP8PRO-256",
        quantity: 13,
        status: true,
        properties: [
          { id: "p16", key: "Storage", value: "256GB" },
          { id: "p17", key: "Color", value: "Bay" },
          { id: "p18", key: "RAM", value: "12GB" },
        ],
      },
    ],
    properties: [
      { id: "bp18", key: "Brand", value: "Google" },
      { id: "bp19", key: "Operating System", value: "Android 14" },
      { id: "bp20", key: "Display", value: "6.7-inch LTPO OLED" },
      { id: "bp21", key: "Processor", value: "Google Tensor G3" },
      {
        id: "bp22",
        key: "Camera",
        value: "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      },
      { id: "bp23", key: "Battery", value: "5050mAh with 30W fast charging" },
      { id: "bp24", key: "Connectivity", value: "5G, Wi-Fi 7, Bluetooth 5.3" },
      { id: "bp25", key: "Water Resistance", value: "IP68" },
      {
        id: "bp26",
        key: "AI Features",
        value: "Magic Eraser, Live Translate, Call Screen",
      },
    ],
  },
];

export default function ProductComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const addProductToCompare = (product: Product) => {
    if (
      selectedProducts.length < 4 &&
      !selectedProducts.find((p) => p.id === product.id)
    ) {
      setSelectedProducts([...selectedProducts, product]);
      // Set default variant for the product
      if (product.variants.length > 0) {
        setSelectedVariants((prev) => ({
          ...prev,
          [product.id]: product.variants[0].id,
        }));
      }
    }
  };

  const removeProductFromCompare = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    setSelectedVariants((prev) => {
      const newVariants = { ...prev };
      delete newVariants[productId];
      return newVariants;
    });
  };

  const getSelectedVariant = (product: Product) => {
    const variantId = selectedVariants[product.id];
    return (
      product.variants.find((v) => v.id === variantId) || product.variants[0]
    );
  };

  const getAllProperties = () => {
    const allKeys = new Set<string>();
    selectedProducts.forEach((product) => {
      product.properties.forEach((prop) => allKeys.add(prop.key));
      const variant = getSelectedVariant(product);
      if (variant) {
        variant.properties.forEach((prop) => allKeys.add(prop.key));
      }
    });
    return Array.from(allKeys).sort();
  };

  const getPropertyValue = (product: Product, key: string) => {
    // First check variant properties
    const variant = getSelectedVariant(product);
    if (variant) {
      const variantProp = variant.properties.find((p) => p.key === key);
      if (variantProp) return variantProp.value;
    }

    // Then check product properties
    const productProp = product.properties.find((p) => p.key === key);
    return productProp?.value || "-";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Compare Products</h1>
              <p className="text-muted-foreground mt-2">
                Compare up to 4 products side by side to find the perfect match
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Search Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Add Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Search Products</Label>
                  <Input
                    id="search"
                    placeholder="Search by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addProductToCompare(product)}
                        disabled={
                          selectedProducts.length >= 4 ||
                          selectedProducts.some((p) => p.id === product.id)
                        }>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {selectedProducts.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">
                      Selected ({selectedProducts.length}/4)
                    </p>
                    <div className="space-y-2">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm truncate">
                            {product.name}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              removeProductFromCompare(product.id)
                            }>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-3">
            {selectedProducts.length === 0 ? (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Products Selected
                  </h3>
                  <p className="text-muted-foreground">
                    Select products from the sidebar to start comparing
                  </p>
                </div>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="border-b p-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="specifications">
                          Specifications
                        </TabsTrigger>
                        <TabsTrigger value="variants">Variants</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="overview" className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left p-4 w-48">Product</th>
                              {selectedProducts.map((product) => (
                                <th
                                  key={product.id}
                                  className="text-center p-4 min-w-64">
                                  <div className="space-y-4">
                                    <Image
                                      src={
                                        product.images[0]?.url ||
                                        "/placeholder.svg"
                                      }
                                      alt={product.name}
                                      width={200}
                                      height={200}
                                      className="mx-auto rounded-lg object-cover"
                                    />
                                    <div>
                                      <h3 className="font-semibold text-lg">
                                        {product.name}
                                      </h3>
                                      <Badge
                                        variant="secondary"
                                        className="mt-1">
                                        {product.category.name}
                                      </Badge>
                                    </div>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-4 font-medium">Price</td>
                              {selectedProducts.map((product) => {
                                const variant = getSelectedVariant(product);
                                const price = variant?.price || product.price;
                                const previousPrice =
                                  variant?.previousPrice ||
                                  product.previousPrice;
                                return (
                                  <td
                                    key={product.id}
                                    className="p-4 text-center">
                                    <div className="space-y-1">
                                      <div className="text-2xl font-bold text-green-600">
                                        ${price}
                                      </div>
                                      {previousPrice && (
                                        <div className="text-sm text-muted-foreground line-through">
                                          ${previousPrice}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-t">
                              <td className="p-4 font-medium">Rating</td>
                              {selectedProducts.map((product) => (
                                <td
                                  key={product.id}
                                  className="p-4 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">
                                      {product.rating}
                                    </span>
                                    <span className="text-muted-foreground">
                                      ({product.reviewCount})
                                    </span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-t">
                              <td className="p-4 font-medium">Availability</td>
                              {selectedProducts.map((product) => {
                                const variant = getSelectedVariant(product);
                                const quantity =
                                  variant?.quantity || product.quantity;
                                return (
                                  <td
                                    key={product.id}
                                    className="p-4 text-center">
                                    <Badge
                                      variant={
                                        quantity > 0 ? "default" : "destructive"
                                      }>
                                      {quantity > 0
                                        ? `${quantity} in stock`
                                        : "Out of stock"}
                                    </Badge>
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-t">
                              <td className="p-4 font-medium">Engagement</td>
                              {selectedProducts.map((product) => (
                                <td
                                  key={product.id}
                                  className="p-4 text-center">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-center gap-1 text-sm">
                                      <Eye className="w-4 h-4" />
                                      {product.visitCount}
                                    </div>
                                    <div className="flex items-center justify-center gap-1 text-sm">
                                      <MessageSquare className="w-4 h-4" />
                                      {product.commentCount}
                                    </div>
                                  </div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-t">
                              <td className="p-4 font-medium">Actions</td>
                              {selectedProducts.map((product) => (
                                <td
                                  key={product.id}
                                  className="p-4 text-center">
                                  <div className="space-y-2">
                                    <Button className="w-full">
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      Add to Cart
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="w-full">
                                      <Heart className="w-4 h-4 mr-2" />
                                      Wishlist
                                    </Button>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left p-4 w-48">
                                Specification
                              </th>
                              {selectedProducts.map((product) => (
                                <th
                                  key={product.id}
                                  className="text-center p-4 min-w-64">
                                  <div className="flex items-center justify-center gap-2">
                                    <Image
                                      src={
                                        product.images[0]?.url ||
                                        "/placeholder.svg"
                                      }
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                      className="rounded object-cover"
                                    />
                                    <span className="font-semibold">
                                      {product.name}
                                    </span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {getAllProperties().map((property, index) => (
                              <tr
                                key={property}
                                className={
                                  index % 2 === 0 ? "bg-muted/30" : ""
                                }>
                                <td className="p-4 font-medium">{property}</td>
                                {selectedProducts.map((product) => (
                                  <td
                                    key={product.id}
                                    className="p-4 text-center">
                                    {getPropertyValue(product, property)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="variants" className="p-6">
                      <div className="space-y-6">
                        {selectedProducts.map((product) => (
                          <Card key={product.id}>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-3">
                                <Image
                                  src={
                                    product.images[0]?.url || "/placeholder.svg"
                                  }
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                {product.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {product.variants.map((variant) => (
                                  <div
                                    key={variant.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                      selectedVariants[product.id] ===
                                      variant.id
                                        ? "border-primary bg-primary/5"
                                        : "hover:border-muted-foreground"
                                    }`}
                                    onClick={() =>
                                      setSelectedVariants((prev) => ({
                                        ...prev,
                                        [product.id]: variant.id,
                                      }))
                                    }>
                                    {variant.image && (
                                      <Image
                                        src={
                                          variant.image || "/placeholder.svg"
                                        }
                                        alt={`${product.name} variant`}
                                        width={100}
                                        height={100}
                                        className="mx-auto rounded object-cover mb-3"
                                      />
                                    )}
                                    <div className="space-y-2">
                                      <div className="text-center">
                                        <div className="font-semibold text-lg">
                                          ${variant.price}
                                        </div>
                                        {variant.previousPrice && (
                                          <div className="text-sm text-muted-foreground line-through">
                                            ${variant.previousPrice}
                                          </div>
                                        )}
                                      </div>
                                      <div className="space-y-1">
                                        {variant.properties.map((prop) => (
                                          <div
                                            key={prop.id}
                                            className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                              {prop.key}:
                                            </span>
                                            <span className="font-medium">
                                              {prop.value}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="text-center">
                                        <Badge
                                          variant={
                                            variant.quantity > 0
                                              ? "default"
                                              : "destructive"
                                          }>
                                          {variant.quantity > 0
                                            ? `${variant.quantity} available`
                                            : "Out of stock"}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
