"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TabsContent } from "@/components/ui/tabs";
import { X, Plus, Package } from "lucide-react";
import { ProductFormData } from "@/app/dashboard/products/create/page";

interface ProductPropertyProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

interface ProductProperty {
  id: string;
  key: string;
  value: string;
}

const ProductPropertyForm: React.FC<ProductPropertyProps> = ({
  formData,
  setFormData,
}) => {
  // Product Properties Management
  const addProductProperty = (key: string, value: string) => {
    const newProperty: ProductProperty = {
      id: `prop_${Date.now()}`,
      key: "",
      value: "",
    };
    setFormData((prev) => ({
      ...prev,
      properties: [...prev.properties, newProperty],
    }));
  };

  const updateProductProperty = (
    id: string,
    field: "key" | "value",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.map((prop) =>
        prop.id === id ? { ...prop, [field]: value } : prop
      ),
    }));
  };

  const removeProductProperty = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((prop) => prop.id !== id),
    }));
  };
  return (
    <TabsContent value="properties" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Product Properties</span>
            <Button
              type="button"
              onClick={() => {
                addProductProperty;
              }}
              variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.properties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No properties added yet. Click "Add Property" to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.properties.map((property) => (
                <div key={property.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Property Name</Label>
                    <Input
                      value={property.key}
                      onChange={(e) =>
                        updateProductProperty(
                          property.id,
                          "key",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Material, Brand, Weight"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Property Value</Label>
                    <Input
                      value={property.value}
                      onChange={(e) =>
                        updateProductProperty(
                          property.id,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Cotton, Nike, 1.5kg"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeProductProperty(property.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProductPropertyForm;
