"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  ThumbsUp,
  Reply,
} from "lucide-react";
import { useCart } from "@/providers/cart-provider";

// Mock product data with all variants and properties
const mockProduct = {
  id: "prod_123",
  name: "Premium Wireless Headphones",
  categoryId: "cat1",
  category: "Electronics",
  price: 299.99,
  previousPrice: 399.99,
  sku: "WH-PREM-001",
  description: `
    <h3>Premium Audio Experience</h3>
    <p>Experience crystal-clear sound with our premium wireless headphones featuring advanced noise cancellation technology.</p>
    
    <h4>Key Features:</h4>
    <ul>
      <li>Active Noise Cancellation (ANC)</li>
      <li>30-hour battery life</li>
      <li>Quick charge: 5 minutes = 3 hours playback</li>
      <li>Premium leather ear cushions</li>
      <li>Bluetooth 5.2 connectivity</li>
    </ul>
    
    <blockquote>
      "The best headphones I've ever owned. The sound quality is incredible!" - Verified Customer
    </blockquote>
    
    <p><strong>Perfect for:</strong> Music lovers, professionals, travelers, and anyone who values premium audio quality.</p>
  `,
  quantity: 45,
  rating: 4.8,
  reviewCount: 156,
  status: true,
  images: [
    "/product-01.jpg?height=600&width=600",
    "/product-02.jpg?height=600&width=600",
    "/product-01.jpg?height=600&width=600",
    "/product-02.jpg?height=600&width=600",
  ],
  properties: [
    { id: "1", key: "Brand", value: "AudioTech" },
    { id: "2", key: "Weight", value: "280g" },
    { id: "3", key: "Connectivity", value: "Bluetooth 5.2, 3.5mm" },
    { id: "4", key: "Battery Life", value: "30 hours" },
    { id: "5", key: "Warranty", value: "2 years" },
    { id: "6", key: "Driver Size", value: "40mm" },
    { id: "7", key: "Frequency Response", value: "20Hz - 20kHz" },
  ],
  variants: [
    {
      id: "var1",
      price: 299.99,
      previousPrice: 399.99,
      image: "/placeholder.svg?height=600&width=600",
      sku: "WH-PREM-001-BLK",
      quantity: 25,
      status: true,
      properties: [
        { id: "vp1", key: "Color", value: "Midnight Black" },
        { id: "vp2", key: "Material", value: "Premium Leather" },
        { id: "vp3", key: "Finish", value: "Matte" },
      ],
    },
    {
      id: "var2",
      price: 319.99,
      previousPrice: 419.99,
      image: "/placeholder.svg?height=600&width=600",
      sku: "WH-PREM-001-WHT",
      quantity: 20,
      status: true,
      properties: [
        { id: "vp3", key: "Color", value: "Pearl White" },
        { id: "vp4", key: "Material", value: "Premium Leather" },
        { id: "vp5", key: "Finish", value: "Glossy" },
      ],
    },
    {
      id: "var3",
      price: 329.99,
      previousPrice: 429.99,
      image: "/placeholder.svg?height=600&width=600",
      sku: "WH-PREM-001-ROSE",
      quantity: 15,
      status: true,
      properties: [
        { id: "vp6", key: "Color", value: "Rose Gold" },
        { id: "vp7", key: "Material", value: "Premium Leather" },
        { id: "vp8", key: "Finish", value: "Metallic" },
      ],
    },
  ],
  reviews: [
    {
      id: "rev1",
      user: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely amazing headphones! The sound quality is incredible and the noise cancellation works perfectly.",
      verified: true,
      helpful: 12,
    },
    {
      id: "rev2",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great headphones overall. Battery life is excellent, though I wish they were a bit lighter.",
      verified: true,
      helpful: 8,
    },
    {
      id: "rev3",
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Best purchase I've made this year. Perfect for work from home and travel.",
      verified: false,
      helpful: 15,
    },
  ],
  comments: [
    {
      id: "com1",
      user: "Alex Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-20",
      comment: "Does this work well with iPhone?",
      replies: [
        {
          id: "rep1",
          user: "AudioTech Support",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "2024-01-20",
          comment:
            "Yes! It works perfectly with all iPhone models and supports AAC codec for best quality.",
          isSupport: true,
        },
      ],
    },
    {
      id: "com2",
      user: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-18",
      comment: "How long does shipping usually take?",
      replies: [
        {
          id: "rep2",
          user: "Customer Service",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "2024-01-18",
          comment:
            "Standard shipping takes 3-5 business days, express shipping 1-2 days.",
          isSupport: true,
        },
      ],
    },
  ],
};

export default function ProductSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedVariant, setSelectedVariant] = useState(
    mockProduct.variants[0]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");

  // Get all images (product + selected variant)
  const allImages = [
    ...mockProduct.images,
    ...(selectedVariant.image ? [selectedVariant.image] : []),
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const discountPercentage = selectedVariant.previousPrice
    ? Math.round(
        ((selectedVariant.previousPrice - selectedVariant.price) /
          selectedVariant.previousPrice) *
          100
      )
    : 0;

  const { addItem } = useCart();

  const addToCart = () => {
    addItem({
      id: selectedVariant.id,
      name: mockProduct.name,
      price: selectedVariant.price,
      quantity,
      image: selectedVariant.image,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Image Slider */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={allImages[currentImageIndex] || "/placeholder.svg"}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={prevImage}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={nextImage}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square bg-muted rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${mockProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="secondary">{mockProduct.category}</Badge>
                  <h1 className="text-3xl font-bold">{mockProduct.name}</h1>
                  <p className="text-muted-foreground">
                    SKU: {selectedVariant.sku}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(mockProduct.rating)}
                </div>
                <span className="font-medium">{mockProduct.rating}</span>
                <span className="text-muted-foreground">
                  ({mockProduct.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${selectedVariant.price}
                </span>
                {selectedVariant.previousPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${selectedVariant.previousPrice}
                    </span>
                    <Badge variant="destructive">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Stock: {selectedVariant.quantity} units available
              </p>
            </div>

            {/* Product Properties */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Product Specifications
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProduct.properties.map((property) => (
                  <div
                    key={property.id}
                    className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">{property.key}</span>
                    <span className="text-sm text-muted-foreground">
                      {property.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Choose Variant</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mockProduct.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      selectedVariant.id === variant.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedVariant(variant)}>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {
                          variant.properties.find((p) => p.key === "Color")
                            ?.value
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${variant.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Properties */}
            {selectedVariant.properties.length > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Variant Details</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVariant.properties.map((property) => (
                    <div
                      key={property.id}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">
                        {property.key}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {property.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="text-base font-medium">Quantity</Label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(
                        Math.min(selectedVariant.quantity, quantity + 1)
                      )
                    }
                    disabled={quantity >= selectedVariant.quantity}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={addToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ${(selectedVariant.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center space-y-2">
                <Truck className="w-6 h-6 mx-auto text-muted-foreground" />
                <div className="text-xs">
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-muted-foreground">Orders over $50</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Shield className="w-6 h-6 mx-auto text-muted-foreground" />
                <div className="text-xs">
                  <div className="font-medium">2 Year Warranty</div>
                  <div className="text-muted-foreground">Full coverage</div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="w-6 h-6 mx-auto text-muted-foreground" />
                <div className="text-xs">
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-muted-foreground">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none [&_h3]:text-lg [&_h4]:text-base [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: mockProduct.description }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Customer Reviews ({mockProduct.reviewCount})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockProduct.reviews.map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Questions & Answers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment Form */}
              <div className="space-y-4">
                <Label htmlFor="comment">Ask a question</Label>
                <Textarea
                  id="comment"
                  placeholder="Ask anything about this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button>Post Question</Button>
              </div>

              <Separator />

              {/* Comments List */}
              {mockProduct.comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-sm text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-12 flex items-start gap-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.user}</span>
                          {reply.isSupport && (
                            <Badge variant="default" className="text-xs">
                              Official
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-sm">{reply.comment}</p>
                      </div>
                    </div>
                  ))}

                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
