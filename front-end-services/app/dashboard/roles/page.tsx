"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Shield } from "lucide-react";

// Mock data for roles and permissions
const mockPages = [
  { id: "dashboard", name: "Dashboard", category: "Analytics" },
  { id: "products", name: "Products", category: "Inventory" },
  { id: "create-product", name: "Create Product", category: "Inventory" },
  { id: "categories", name: "Categories", category: "Inventory" },
  { id: "inventory", name: "Inventory", category: "Inventory" },
  { id: "orders", name: "Orders", category: "Sales" },
  { id: "shipping", name: "Order Shipping", category: "Sales" },
  { id: "payments", name: "Payment Status", category: "Sales" },
  { id: "users", name: "Users", category: "User Management" },
  { id: "roles", name: "Role Management", category: "User Management" },
  { id: "reviews", name: "Reviews", category: "Content" },
  { id: "banners", name: "Banner Management", category: "Content" },
  { id: "coupons", name: "Coupons", category: "Marketing" },
  { id: "analytics", name: "Product Performance", category: "Analytics" },
];

const mockRoles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access",
    userCount: 2,
    permissions: {
      dashboard: { read: true, write: true },
      products: { read: true, write: true },
      "create-product": { read: true, write: true },
      categories: { read: true, write: true },
      inventory: { read: true, write: true },
      orders: { read: true, write: true },
      shipping: { read: true, write: true },
      payments: { read: true, write: true },
      users: { read: true, write: true },
      roles: { read: true, write: true },
      reviews: { read: true, write: true },
      banners: { read: true, write: true },
      coupons: { read: true, write: true },
      analytics: { read: true, write: true },
    },
  },
  {
    id: "manager",
    name: "Manager",
    description: "Manage products and orders",
    userCount: 5,
    permissions: {
      dashboard: { read: true, write: false },
      products: { read: true, write: true },
      "create-product": { read: true, write: true },
      categories: { read: true, write: true },
      inventory: { read: true, write: true },
      orders: { read: true, write: true },
      shipping: { read: true, write: true },
      payments: { read: true, write: false },
      users: { read: true, write: false },
      roles: { read: false, write: false },
      reviews: { read: true, write: true },
      banners: { read: true, write: false },
      coupons: { read: true, write: true },
      analytics: { read: true, write: false },
    },
  },
  {
    id: "editor",
    name: "Content Editor",
    description: "Manage content and reviews",
    userCount: 3,
    permissions: {
      dashboard: { read: true, write: false },
      products: { read: true, write: false },
      "create-product": { read: false, write: false },
      categories: { read: true, write: false },
      inventory: { read: true, write: false },
      orders: { read: true, write: false },
      shipping: { read: false, write: false },
      payments: { read: false, write: false },
      users: { read: false, write: false },
      roles: { read: false, write: false },
      reviews: { read: true, write: true },
      banners: { read: true, write: true },
      coupons: { read: false, write: false },
      analytics: { read: true, write: false },
    },
  },
];

export default function RoleManagementPage() {
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const updatePermission = (
    roleId: string,
    pageId: string,
    permissionType: "read" | "write",
    value: boolean
  ) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [pageId]: {
                  ...role.permissions.banners,
                  [permissionType]: value,
                },
              },
            }
          : role
      )
    );
  };

  const groupedPages = mockPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, typeof mockPages>);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Role Management"
        description="Manage user roles and permissions"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Roles Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-colors ${
                selectedRole === role.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() =>
                setSelectedRole(selectedRole === role.id ? null : role.id)
              }>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {role.name}
                  </div>
                  <Badge variant="secondary">{role.userCount} users</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </CardHeader>
            </Card>
          ))}

          {/* Add New Role Card */}
          <Card
            className="cursor-pointer border-dashed hover:border-primary transition-colors"
            onClick={() => setShowCreateForm(true)}>
            <CardContent className="flex items-center justify-center h-full min-h-[120px]">
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Add New Role</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Role Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input
                    id="roleName"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Enter role name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Description</Label>
                  <Input
                    id="roleDescription"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    placeholder="Enter role description"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Create Role</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Permission Management */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Permissions for{" "}
                  {roles.find((r) => r.id === selectedRole)?.name}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Role
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Role
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedPages).map(([category, pages]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium">{category}</h3>
                    <div className="space-y-3">
                      {pages.map((page) => {
                        const role = roles.find((r) => r.id === selectedRole);
                        const permissions = role?.permissions[
                          page.id as keyof typeof role.permissions
                        ] || {
                          read: false,
                          write: false,
                        };

                        return (
                          <div
                            key={page.id}
                            className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{page.name}</span>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${page.id}-read`}
                                  checked={permissions.read}
                                  onCheckedChange={(checked) =>
                                    updatePermission(
                                      selectedRole,
                                      page.id,
                                      "read",
                                      checked as boolean
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`${page.id}-read`}
                                  className="text-sm">
                                  Read
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${page.id}-write`}
                                  checked={permissions.write}
                                  onCheckedChange={(checked) =>
                                    updatePermission(
                                      selectedRole,
                                      page.id,
                                      "write",
                                      checked as boolean
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`${page.id}-write`}
                                  className="text-sm">
                                  Write
                                </Label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
