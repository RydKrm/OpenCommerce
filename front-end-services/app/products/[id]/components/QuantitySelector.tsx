import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (q: number) => void;
  maxQuantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, maxQuantity }) => (
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
      <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
        disabled={quantity >= maxQuantity}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

export default QuantitySelector; 