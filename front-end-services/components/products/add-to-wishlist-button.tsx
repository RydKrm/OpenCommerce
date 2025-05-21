"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useWishlist } from "@/hooks/use-wishlist"
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types";

interface AddToWishlistButtonProps {
  product: Product;
  className?: string;
}

export default function AddToWishlistButton({
  product,
  className,
}: AddToWishlistButtonProps) {
  // const { addItem } = useWishlist()

  const handleAddToWishlist = () => {
    // addItem({
    //   id: product.id,
    //   name: product.name,
    //   price: product.discountedPrice || product.price,
    //   image: product.images[0],
    // })

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleAddToWishlist}>
      <Heart className="h-5 w-5" />
    </Button>
  );
}
