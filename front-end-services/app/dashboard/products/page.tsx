"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import productStore from "@/api/product/useProductStore";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

const ProductsPage = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { limit, skip, productList,deleteProduct } = productStore;
  const [list, setList] = useState(productList);

  

  const deleteSingleProduct = (id: string) => {
    deleteProduct(id);
    productStore.fetchProductList();
  }

  useEffect(() => {
    productStore.fetchProductList();
  }, [limit, skip]);

  const updateFeaturesStatus = (productId:string) =>{
    // update the is_featured status of the product
    console.log("Updating featured status for product ID:", productId);
    productStore.updateFeaturedStatus(productId);
    productStore.fetchProductList();
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "low-stock":
        return <Badge variant="secondary">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="All Products"
        description="Manage your product inventory"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Product Filters</span>
              <Link href="/dashboard/products/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products {productList.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                    {/* <th className="text-left p-2">More </th> */}
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product) => (
                    <tr
                      key={product.categoryId}
                      className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.Images[0].image_url}`}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-2">{product.Category.name}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">
                        {product.status
                          ? getStatusBadge("active")
                          : getStatusBadge("Out of stock")}
                      </td>
                      {/* <td className="p-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteSingleProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td> */}
                      <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => redirect(`/products/${product.slug}`)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateFeaturesStatus(product.id)}>
                            {product?.is_featured ? "Unfeature" : "Feature"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteSingleProduct(product.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
});

export default ProductsPage;
