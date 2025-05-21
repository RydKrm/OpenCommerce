"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Product } from "@/types";

export default function CartItems() {
  const [items, setItems] = useState<Product[]>([]);
  // const { items, removeItem, updateItemQuantity, clearCart } = useCart()

  const handleRemoveItem = (id: string) => {
    // removeItem(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    // updateItemQuantity(id, quantity)
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex border rounded-lg p-4 bg-background">
          <div className="w-24 h-24 rounded-md overflow-hidden relative">
            <Image
              src={item.images[0] || "/placeholder.svg?height=96&width=96"}
              alt={item.name}
              className="object-cover"
              fill
              sizes="96px"
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  {item.name}
                </Link>
              </h3>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              ${item.price.toFixed(2)} each
            </div>
            {item.size && item.color && (
              <div className="text-sm text-muted-foreground mt-1">
                Size: {item.size} | Color: {item.color}
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  disabled={item.quantity <= 1}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            // clearCart();
            toast({
              title: "Cart cleared",
              description: "All items have been removed from your cart",
            });
          }}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
