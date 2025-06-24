import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  category: string;
  sku?: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ name, category, sku }) => (
  <div className="flex items-start justify-between">
    <div className="space-y-2">
      <Badge variant="secondary">{category}</Badge>
      <h1 className="text-3xl font-bold">{name}</h1>
      {sku && <p className="text-muted-foreground">SKU: {sku}</p>}
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="icon">
        <Heart className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

export default ProductHeader; 