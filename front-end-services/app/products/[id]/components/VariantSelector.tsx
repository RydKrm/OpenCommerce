import React from "react";
import { Label } from "@/components/ui/label";
import { IProductVariant } from "@/api/product/useProductStore";

type Variant = IProductVariant;

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  setSelectedVariant: (variant: Variant) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariant, setSelectedVariant }) => (
  <div className="space-y-4">
    <Label className="text-base font-medium">Choose Variant</Label>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          className={`p-3 border rounded-lg text-left transition-colors ${selectedVariant?.id === variant.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
          onClick={() => setSelectedVariant(variant)}>
          <div className="space-y-1">
            <div className="font-medium">
              {Array.isArray((variant as any).Product_Property)
                ? (variant as any).Product_Property.find((p: any) => p.key === "Color")?.value
                : null}
            </div>
            <div className="text-sm text-muted-foreground">${variant.price}</div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default VariantSelector; 