import React from "react";
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  totalSold?: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, totalSold }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
      />
    ));
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">{renderStars(rating)}</div>
      <span className="font-medium">{rating}</span>
      {typeof totalSold === "number" && (
        <span className="text-muted-foreground">({totalSold} reviews)</span>
      )}
    </div>
  );
};

export default ProductRating; 