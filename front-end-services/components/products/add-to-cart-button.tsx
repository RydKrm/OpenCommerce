"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { IProductList } from "@/api/product/useProductStore";

interface AddToCartButtonProps {
  product: IProductList;
  className?: string;
  variantId?: string;
}

const addItem = (product: Product) => {};

export default function AddToCartButton({
  product,
  className,
  variantId,
}: AddToCartButtonProps) {
  // const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // These states would typically be managed by a parent component
  // and passed down as props, but for simplicity we're using local state

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Select both size and color before adding to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <Button className={className} onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
