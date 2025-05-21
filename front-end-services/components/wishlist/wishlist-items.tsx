"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useWishlist } from "@/hooks/use-wishlist"
// import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function WishlistItems() {
  // const { items, removeItem } = useWishlist()
  // const { addItem } = useCart()
  const [items, setItems] = useState<
    {
      id: string;
      name: string;
      price: number;
      image: string;
    }[]
  >([]);

  const handleRemoveItem = (id: string) => {
    // removeItem(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist",
    });
  };

  const handleAddToCart = (item: any) => {
    // addItem({
    //   ...item,
    //   quantity: 1,
    //   size: "M", // Default size
    //   color: "Black", // Default color
    // });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your wishlist yet.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden bg-background">
          <div className="aspect-square relative">
            <Link href={`/products/${item.id}`}>
              <Image
                src={item.image || "/placeholder.svg?height=300&width=300"}
                alt={item.name}
                className="object-cover hover:scale-105 transition-transform"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </Link>
          </div>
          <div className="p-4">
            <Link href={`/products/${item.id}`}>
              <h3 className="font-medium hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            <div className="font-semibold mt-1">${item.price.toFixed(2)}</div>
            <div className="mt-4 flex space-x-2">
              <Button
                className="flex-1"
                size="sm"
                onClick={() => handleAddToCart(item)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
