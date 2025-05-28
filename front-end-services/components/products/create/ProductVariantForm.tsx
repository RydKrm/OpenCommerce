"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TabsContent } from "@/components/ui/tabs";
import { X, Plus, Package, Minus, ImageIcon, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-menubar";
import { ICreateProduct, IProductVariant } from "@/api/product/useProductStore";

interface ProductVariantFormProps {
  formData: ICreateProduct;
  setFormData: React.Dispatch<React.SetStateAction<ICreateProduct>>;
}

interface ProductProperty {
  id: string;
  key: string;
  value: string;
}

const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  formData,
  setFormData,
}) => {
  // Variant Management
  const addVariant = () => {
    const newVariant: IProductVariant = {
      id: `variant_${Date.now()}`,
      price: 0,
      previousPrice: 0,
      quantity: 0,
      image: undefined as unknown as File,
      properties: [],
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const updateVariant = (
    variantId: string,
    field: keyof IProductVariant,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const removeVariant = (variantId: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((variant) => variant.id !== variantId),
    }));
  };

  // Variant Properties Management
  const addVariantProperty = (variantId: string) => {
    const newProperty: ProductProperty = {
      id: `vprop_${Date.now()}`,
      key: "",
      value: "",
    };
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId
          ? { ...variant, properties: [...variant.properties, newProperty] }
          : variant
      ),
    }));
  };

  const updateVariantProperty = (
    variantId: string,
    propertyId: string,
    field: "key" | "value",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              properties: variant.properties.map((prop) =>
                prop.id === propertyId ? { ...prop, [field]: value } : prop
              ),
            }
          : variant
      ),
    }));
  };

  const removeVariantProperty = (variantId: string, propertyId: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              properties: variant.properties.filter(
                (prop) => prop.id !== propertyId
              ),
            }
          : variant
      ),
    }));
  };

  return (
    <TabsContent value="variants" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Product Variants</span>
            <Button type="button" onClick={addVariant} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Variant
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.variants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No variants added yet. Click "Add Variant" to create different
                versions of this product.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {formData.variants.map((variant, index) => (
                <Card key={variant.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>Variant {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeVariant(variant.id)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Variant Image Upload */}
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      {/* <img
                        src={URL.createObjectURL(variant.image)}
                        alt="Variant Preview"
                        className="mx-auto mt-2 h-24 object-contain rounded-md"
                      /> */}

                      <input
                        id={`file-input-${variant.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            updateVariant(variant.id, "image", file);
                          }
                        }}
                      />
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-2">
                        Upload variant image
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById(
                            `file-input-${variant.id}`
                          ) as HTMLInputElement;
                          input?.click();
                        }}>
                        <Upload className="w-3 h-3 mr-2" />
                        Choose File
                      </Button>
                    </div>

                    {/* Variant Basic Info */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "price",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Previous Price ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={variant.previousPrice || ""}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "previousPrice",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={variant.quantity}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "quantity",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Variant Properties */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">
                          Variant Properties
                        </Label>
                        <Button
                          type="button"
                          onClick={() => addVariantProperty(variant.id)}
                          variant="outline"
                          size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Property
                        </Button>
                      </div>

                      {variant.properties.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No properties for this variant
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {variant.properties.map((property) => (
                            <div
                              key={property.id}
                              className="flex gap-3 items-end">
                              <div className="flex-1">
                                <Input
                                  value={property.key}
                                  onChange={(e) =>
                                    updateVariantProperty(
                                      variant.id,
                                      property.id,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Property name (e.g., Size, Color)"
                                />
                              </div>
                              <div className="flex-1">
                                <Input
                                  value={property.value}
                                  onChange={(e) =>
                                    updateVariantProperty(
                                      variant.id,
                                      property.id,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Property value (e.g., Large, Red)"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  removeVariantProperty(variant.id, property.id)
                                }>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProductVariantForm;
