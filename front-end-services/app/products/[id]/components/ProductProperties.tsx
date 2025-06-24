import React from "react";
import { Label } from "@/components/ui/label";

interface Property {
  id: string;
  key: string;
  value: string;
}

interface ProductPropertiesProps {
  properties: Property[];
}

const ProductProperties: React.FC<ProductPropertiesProps> = ({ properties }) => (
  <div className="space-y-4">
    <Label className="text-base font-medium">Product Specifications</Label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {properties.map((property) => (
        <div key={property.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">{property.key}</span>
          <span className="text-sm text-muted-foreground">{property.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProductProperties; 