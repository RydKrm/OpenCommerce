"use client";

import type React from "react";
import { useRef, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/rice-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Upload, X, ImageIcon, Package } from "lucide-react";
import productStore, { ICreateProduct } from "@/api/product/useProductStore";
import { observer } from "mobx-react-lite";
import { create } from "axios";

// Types based on the Prisma schema
interface ProductProperty {
  id: string;
  key: string;
  value: string;
}

interface ProductVariant {
  id: string;
  price: number;
  previousPrice?: number;
  image?: string;
  sku?: string;
  quantity: number;
  status: boolean;
  properties: ProductProperty[];
}

// interface ProductFormData {
//   name: string;
//   categoryId: string;
//   price: number;
//   sku?: string;
//   previousPrice?: number;
//   description: string;
//   quantity: number;
//   status: boolean;
//   properties: ProductProperty[];
//   variants: ProductVariant[];
//   images: string[];
// }

const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Books" },
  { id: "cat4", name: "Home & Garden" },
  { id: "cat5", name: "Sports" },
];

export const CreateProductPage = observer(() => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<ICreateProduct>({
    name: "",
    categoryId: "",
    price: 0,
    previousPrice: 0,
    description: "",
    quantity: 0,
    status: true,
    properties: [],
    variants: [],
    images: [],
  });

  // Product Properties Management
  const addProductProperty = () => {
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

  // Variant Management
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant_${Date.now()}`,
      price: 0,
      previousPrice: 0,
      sku: "",
      quantity: 0,
      status: true,
      properties: [],
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const updateVariant = (
    variantId: string,
    field: keyof ProductVariant,
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, fetchProductList, createProduct, productList } =
    productStore;
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger hidden input
    }

    createProduct(formData);
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Create Product"
        description="Add a new product with variants and properties"
      />

      <main className="flex-1 p-4 lg:p-6">
        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                  </div>

                  {/* Rich Text Editor for Description */}
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) =>
                      setFormData({ ...formData, description: value })
                    }
                  />

                  {/* <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter product description"
                    />
                  </div> */}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, categoryId: value })
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Initial Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: Number.parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previousPrice">Previous Price ($)</Label>
                      <Input
                        id="previousPrice"
                        type="number"
                        step="0.01"
                        value={formData.previousPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            previousPrice:
                              Number.parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={formData.status}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, status: checked })
                      }
                    />
                    <Label htmlFor="status">Product Active</Label>
                  </div>

                  <Separator />

                  {/* Product Images Section */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Product Images
                    </Label>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop multiple images here, or click to select
                        files
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported formats: JPG, PNG, WebP. Max size: 5MB per
                        image
                      </p>

                      {/* Trigger button for hidden input */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClick}>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Images
                      </Button>

                      {/* Hidden file input */}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={inputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>

                    {/* Image Preview Area */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images?.map((img, index) => (
                        <div
                          key={index}
                          className="relative border rounded-lg p-2 overflow-hidden">
                          <div className="aspect-square bg-muted rounded-md flex items-center justify-center overflow-hidden">
                            <img
                              src={img}
                              alt={`preview-${index}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6"
                            onClick={() => {
                              // Optional: Handle removing image
                            }}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Product Properties</span>
                    <Button
                      type="button"
                      onClick={addProductProperty}
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
                        No properties added yet. Click "Add Property" to get
                        started.
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

            {/* Variants Tab */}
            <TabsContent value="variants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Product Variants</span>
                    <Button
                      type="button"
                      onClick={addVariant}
                      variant="outline">
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
                        No variants added yet. Click "Add Variant" to create
                        different versions of this product.
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
                                <Badge
                                  variant={
                                    variant.status ? "default" : "secondary"
                                  }>
                                  {variant.status ? "Active" : "Inactive"}
                                </Badge>
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
                            <div className="space-y-2">
                              <Label>Variant Image</Label>
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground mb-2">
                                  Upload variant image
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm">
                                  <Upload className="w-3 h-3 mr-2" />
                                  Choose File
                                </Button>
                              </div>
                            </div>

                            {/* Variant Basic Info */}
                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="space-y-2">
                                <Label>Variant SKU</Label>
                                <Input
                                  value={variant.sku || ""}
                                  onChange={(e) =>
                                    updateVariant(
                                      variant.id,
                                      "sku",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Variant SKU"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Price ($)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
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
                              <div className="flex items-center space-x-2 pt-6">
                                <Switch
                                  checked={variant.status}
                                  onCheckedChange={(checked) =>
                                    updateVariant(variant.id, "status", checked)
                                  }
                                />
                                <Label>Variant Active</Label>
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
                                          removeVariantProperty(
                                            variant.id,
                                            property.id
                                          )
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
          </Tabs>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1">
              Create Product
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="button" variant="outline">
              Preview
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
});
