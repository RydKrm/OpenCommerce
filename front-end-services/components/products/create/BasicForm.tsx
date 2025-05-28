"use client";

import type React from "react";
import { useState } from "react";
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
import { TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Upload, X, ImageIcon } from "lucide-react";
import { ProductFormData } from "@/app/dashboard/products/create/page";

interface ProductPropertyProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const BasicForm: React.FC<ProductPropertyProps> = ({
  formData,
  setFormData,
}) => {
  return (
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

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                placeholder="Enter SKU"
              />
            </div>
          </div>

          {/* Rich Text Editor for Description */}
          <RichTextEditor
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            placeholder="Enter a detailed product description. Use the toolbar to format text, add lists, links, and more..."
          />

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
                {/* <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent> */}
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
                    previousPrice: Number.parseFloat(e.target.value) || 0,
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
            <Label className="text-base font-medium">Product Images</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop multiple images here, or click to select files
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supported formats: JPG, PNG, WebP. Max size: 5MB per image
              </p>
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose Images
              </Button>
            </div>

            {/* Image Preview Area */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* This would show uploaded images */}
              {Array.from({ length: 0 }).map((_, index) => (
                <div key={index} className="relative border rounded-lg p-2">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BasicForm;
