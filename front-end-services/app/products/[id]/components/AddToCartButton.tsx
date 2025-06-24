import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  price: number;
  quantity: number;
  onAddToCart: () => void;
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ price, quantity, onAddToCart, disabled }) => (
  <Button className="w-full" size="lg" onClick={onAddToCart} disabled={disabled}>
    <ShoppingCart className="w-4 h-4 mr-2" />
    Add to Cart - ${(price * quantity).toFixed(2)}
  </Button>
);

export default AddToCartButton; 