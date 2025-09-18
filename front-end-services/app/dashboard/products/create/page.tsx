"use client";

import type React from "react";
import { useRef, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import productStore, { ICreateProduct } from "@/api/product/useProductStore";
import { observer } from "mobx-react-lite";
import ProductPropertyForm from "@/components/products/create/ProductPropertyForm";
import ProductVariantForm from "@/components/products/create/ProductVariantForm";
import BasicForm from "@/components/products/create/BasicForm";
import { redirect } from "next/navigation";

// Types based on the Prisma schema

const CreateProductPage = observer(() => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<ICreateProduct>({
    name: "",
    categoryId: "",
    price: 0,
    previousPrice: 0,
    description: "",
    quantity: 0,
    properties: [],
    variants: [],
    images: [],
  });

  const { isLoading, fetchProductList, createProduct, productList } =
    productStore;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    createProduct(formData);
    redirect("/dashboard/products");
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

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
              Preview
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
});

export default CreateProductPage;
