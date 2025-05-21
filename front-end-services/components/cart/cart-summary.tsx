"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
// import { useCart } from "@/hooks/use-cart"
// import { useAuth } from "@/hooks/use-auth"

export default function CartSummary() {
  // const { items } = useCart()
  // const { isAuthenticated } = useAuth()

  const [items, setItems] = useState<
    {
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }[]
  >([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2">
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
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full mt-4" asChild>
        {/* <Link
          href={isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}>
          Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Link> */}
      </Button>
    </Card>
  );
}
