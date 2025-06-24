import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductPricingProps {
  price: number;
  previousPrice?: number;
  quantity: number;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ price, previousPrice, quantity }) => {
  let discountPercentage = 0;
  if (previousPrice && previousPrice > price) {
    discountPercentage = Math.round(((previousPrice - price) / previousPrice) * 100);
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${price}</span>
        {previousPrice && previousPrice > price && (
          <>
            <span className="text-xl text-muted-foreground line-through">${previousPrice}</span>
            <Badge variant="destructive">{discountPercentage}% OFF</Badge>
          </>
        )}
      </div>
      <p className="text-sm text-muted-foreground">Stock: {quantity} units available</p>
    </div>
  );
};

export default ProductPricing; 