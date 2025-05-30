"use client";

import type React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useCategoryStore, {
  ICategory,
  ICreateCategory,
} from "@/api/category/useCategoryStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChildCategory: React.FC<{ child: ICategory }> = ({ child }) => {
  const [open, setOpen] = useState(false);

  const toggleChildren = () => {
    if (child.children.length > 0) {
      setOpen(!open);
    }
  };

  return (
    <div>
      <DropdownMenuItem
        onClick={toggleChildren}
        className="ml-4 pl-4 border-l-2 flex items-start justify-between gap-2 cursor-pointer">
        <div>
          <p className="text-sm font-medium">{child.name}</p>
          <p className="text-sm text-muted-foreground">{child.description}</p>
          <Badge variant="secondary" className="ml-2">
            {child.children.length} categories
          </Badge>
        </div>

        {/* {child.children.length > 0 &&
          (open ? (
            <ChevronDown className="h-4 w-4 mt-1" />
          ) : (
            <ChevronRight className="h-4 w-4 mt-1" />
          ))} */}
      </DropdownMenuItem>

      {child.children.length > 0 && (
        // <div className="ml-6 mt-1 space-y-1">
        //   {child.children.map((grandchild) => (
        //     <ChildCategory key={grandchild.id} child={grandchild} />
        //   ))}
        // </div>

        <DropdownMenu>
          <DropdownMenuTrigger></DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <div className="mt-2 space-y-2">
              <DropdownMenuContent className="w-80">
                {child.children.map((child) => (
                  <ChildCategory key={child.id} child={child} />
                ))}
              </DropdownMenuContent>
            </div>
          </div>
        </DropdownMenu>
      )}
    </div>
  );
};

const CategoriesPage = observer(() => {
  const {
    categories,
    createCategory,
    getCategoryList,
    deleteCategory,
    isLoading,
  } = useCategoryStore;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ICreateCategory>({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    getCategoryList();
  }, []);

  // for Setting parent Id
  const handleParentChange = (parentId: string) => {
    setFormData({ ...formData, parentId });
    setShowForm(!showForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory(formData);
    setShowForm(false);
    setFormData({
      name: "",
      description: "",
      image: null,
    });
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
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
                  {isLoading === true && <div> Loading... </div>}
                  {isLoading === false &&
                    categories.map((category) => (
                      <div key={category.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <FolderTree className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <h3 className="font-medium">{category.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {category.description}
                                </p>
                              </div>
                              <div className="flex items-center flex-row">
                                <Badge variant="secondary">
                                  {category.totalItem} products
                                </Badge>

                                {category.children.length > 0 && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger>
                                      <Badge
                                        variant="secondary"
                                        className="ml-2">
                                        {category.children.length} categories
                                      </Badge>
                                    </DropdownMenuTrigger>
                                    <div className="flex items-center gap-2">
                                      <div className="mt-2 space-y-2">
                                        <DropdownMenuContent className="w-80">
                                          {category.children.map((child) => (
                                            <ChildCategory
                                              key={child.id}
                                              child={child}
                                            />
                                          ))}
                                        </DropdownMenuContent>
                                      </div>
                                    </div>
                                  </DropdownMenu>
                                )}
                                <Button
                                  variant="default"
                                  className="ml-2 rounded-xl h-5 w-28 text-xs"
                                  onClick={() => {
                                    handleParentChange(category.id);
                                  }}>
                                  + Add category
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {/* <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button> */}
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

                    {/* <div className="space-y-2">
                      <Label htmlFor="categoryParent">Parent Category</Label>
                      <Input
                        id="categoryParent"
                        value={formData.parentId}
                        disabled
                        placeholder="Parent Category"
                      />
                    </div> */}

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
