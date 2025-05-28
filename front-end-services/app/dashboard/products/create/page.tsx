"use client";

import type React from "react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "@/components/products/create/BasicForm";
import ProductPropertyForm from "@/components/products/create/ProductPropertyForm";
import ProductVariantForm from "@/components/products/create/ProductVariantForm";

// Types based on the Prisma schema
interface ProductProperty {
  id: string;
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  price: number;
  previousPrice?: number;
  image?: string;
  sku?: string;
  quantity: number;
  status: boolean;
  properties: ProductProperty[];
}

export interface ProductFormData {
  name: string;
  categoryId: string;
  price: number;
  sku?: string;
  previousPrice?: number;
  description: string;
  quantity: number;
  status: boolean;
  properties: ProductProperty[];
  variants: ProductVariant[];
  images: string[];
}

export default function CreateProductPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    categoryId: "",
    price: 0,
    sku: "",
    previousPrice: 0,
    description: "",
    quantity: 0,
    status: true,
    properties: [],
    variants: [],
    images: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    // Handle form submission
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

            {/* Basic Info Tab */}
            <BasicForm formData={formData} setFormData={setFormData} />

            {/* Properties Tab */}
            <ProductPropertyForm
              formData={formData}
              setFormData={setFormData}
            />

            {/* Variants Tab */}
            <ProductVariantForm formData={formData} setFormData={setFormData} />
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
}
