"use client";

import type React from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import useCategoryStore, {
  ICategory,
  ICreateCategory,
} from "@/api/category/useCategoryStore";

const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    productCount: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Clothing",
    description: "Apparel and fashion items",
    productCount: 120,
    status: "active",
  },
  {
    id: 3,
    name: "Books",
    description: "Books and educational materials",
    productCount: 78,
    status: "active",
  },
  {
    id: 4,
    name: "Home & Garden",
    description: "Home improvement and gardening supplies",
    productCount: 32,
    status: "active",
  },
];

const CategoriesPage = observer(() => {
  const {
    categories,
    createCategory,
    getCategoryById,
    getCategoryList,
    isLoading,
  } = useCategoryStore;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ICreateCategory>({
    name: "",
    description: "",
    image: null,
    parentId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category data:", formData);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Category Management"
        description="Organize your products into categories"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Product Categories</span>
                  <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <FolderTree className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {category.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {category.totalItem} products
                              </Badge>
                              <Badge variant="default">{category.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Category Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter category name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Textarea
                        id="categoryDescription"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter category description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">
                        Parent Category
                      </Label>
                      <Input
                        id="categoryDescription"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter category description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoryImage">Image</Label>
                      <input
                        type="file"
                        id="categoryImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              // File is loaded (though you're not using the dataURL here)
                              setFormData((prev) => ({
                                ...prev,
                                image: file,
                              }));
                            };
                            reader.readAsDataURL(file);
                          } else {
                            alert("No file selected");
                          }
                        }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Create Category
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

export default CategoriesPage;
