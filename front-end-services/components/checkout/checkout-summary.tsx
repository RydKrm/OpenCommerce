"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { useCart } from "@/hooks/use-cart"

export default function CheckoutSummary() {
  // const { items } = useCart()

  const items = [
    {
      id: "1",
      name: "Product 1",
      price: 19.99,
      image: "/placeholder.svg?height=48&width=48",
      quantity: 1,
      size: "M",
      color: "Black",
    },
    // Add more items here
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg?height=48&width=48"}
                  alt={item.name}
                  className="object-cover"
                  fill
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-medium">
                  {item.name}
                  <span className="text-muted-foreground">
                    {" "}
                    x{item.quantity}
                  </span>
                </div>
                {item.size && item.color && (
                  <div className="text-xs text-muted-foreground">
                    Size: {item.size} | Color: {item.color}
                  </div>
                )}
              </div>
            </div>
            <div className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2 my-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-bold pt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="mt-6 flex items-center text-sm text-muted-foreground">
        <Truck className="h-4 w-4 mr-2" />
        <span>Estimated delivery: 3-5 business days</span>
      </div>
    </Card>
  );
}
