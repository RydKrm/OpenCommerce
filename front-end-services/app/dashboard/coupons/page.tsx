"use client";

import type React from "react";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Percent,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";

const mockCoupons = [
  {
    id: "coup_1",
    code: "SAVE20",
    name: "20% Off Everything",
    description: "Get 20% off on all products",
    type: "percentage",
    value: 20,
    minOrderAmount: 100,
    maxDiscount: 50,
    usageLimit: 1000,
    usedCount: 234,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    categories: ["all"],
    userLimit: 1,
  },
  {
    id: "coup_2",
    code: "FIRST50",
    name: "First Order Discount",
    description: "50% off for first-time customers",
    type: "percentage",
    value: 50,
    minOrderAmount: 0,
    maxDiscount: 100,
    usageLimit: 500,
    usedCount: 89,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    status: "active",
    categories: ["all"],
    userLimit: 1,
    firstOrderOnly: true,
  },
  {
    id: "coup_3",
    code: "BULK1000",
    name: "Bulk Order Discount",
    description: "5% off on orders over $1000",
    type: "percentage",
    value: 5,
    minOrderAmount: 1000,
    maxDiscount: 200,
    usageLimit: 100,
    usedCount: 12,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    categories: ["all"],
    userLimit: 5,
  },
  {
    id: "coup_4",
    code: "FIXED25",
    name: "$25 Off",
    description: "Fixed $25 discount on orders over $200",
    type: "fixed",
    value: 25,
    minOrderAmount: 200,
    maxDiscount: 25,
    usageLimit: 200,
    usedCount: 67,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    status: "active",
    categories: ["Electronics"],
    userLimit: 1,
  },
  {
    id: "coup_5",
    code: "EXPIRED10",
    name: "Expired Coupon",
    description: "This coupon has expired",
    type: "percentage",
    value: 10,
    minOrderAmount: 50,
    maxDiscount: 20,
    usageLimit: 100,
    usedCount: 45,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    status: "expired",
    categories: ["all"],
    userLimit: 1,
  },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    usageLimit: 100,
    startDate: "",
    endDate: "",
    categories: "all",
    userLimit: 1,
    firstOrderOnly: false,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "disabled":
        return <Badge variant="secondary">Disabled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "percentage" ? (
      <Percent className="w-4 h-4" />
    ) : (
      <DollarSign className="w-4 h-4" />
    );
  };

  const formatValue = (type: string, value: number) => {
    return type === "percentage" ? `${value}%` : `$${value}`;
  };

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Coupon data:", formData);
    setShowCreateForm(false);
    setFormData({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      usageLimit: 100,
      startDate: "",
      endDate: "",
      categories: "all",
      userLimit: 1,
      firstOrderOnly: false,
    });
  };

  const activeCoupons = coupons.filter((c) => c.status === "active").length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0);
  const totalSavings = coupons.reduce((sum, c) => {
    if (c.type === "percentage") {
      return sum + c.usedCount * c.maxDiscount;
    }
    return sum + c.usedCount * c.value;
  }, 0);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Coupon Management"
        description="Create and manage discount coupons"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Coupon Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Coupons
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCoupons}</div>
              <p className="text-xs text-muted-foreground">
                Currently available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsage}</div>
              <p className="text-xs text-muted-foreground">Times used</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Savings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalSavings.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Customer savings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Discount
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalUsage > 0 ? (totalSavings / totalUsage).toFixed(2) : "0"}%
              </div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Coupon Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Manage Coupons</h2>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Coupon
          </Button>
        </div>

        {/* Create Coupon Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="couponCode">Coupon Code *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="couponCode"
                        value={formData.code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="Enter coupon code"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateCouponCode}>
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="couponName">Coupon Name *</Label>
                    <Input
                      id="couponName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter coupon name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter coupon description"
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountValue">
                      Discount Value *{" "}
                      {formData.type === "percentage" ? "(%)" : "($)"}
                    </Label>
                    <Input
                      id="discountValue"
                      type="number"
                      step={formData.type === "percentage" ? "1" : "0.01"}
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          value: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minOrder">Minimum Order Amount ($)</Label>
                    <Input
                      id="minOrder"
                      type="number"
                      step="0.01"
                      value={formData.minOrderAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minOrderAmount:
                            Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="maxDiscount">Max Discount Amount ($)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      step="0.01"
                      value={formData.maxDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDiscount: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usageLimit: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userLimit">Per User Limit</Label>
                    <Input
                      id="userLimit"
                      type="number"
                      value={formData.userLimit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userLimit: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Applicable Categories</Label>
                  <Select
                    value={formData.categories}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categories: value })
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Home & Garden">
                        Home & Garden
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="firstOrderOnly"
                    checked={formData.firstOrderOnly}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, firstOrderOnly: checked })
                    }
                  />
                  <Label htmlFor="firstOrderOnly">First Order Only</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Create Coupon
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Coupons List */}
        <Card>
          <CardHeader>
            <CardTitle>All Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-lg">{coupon.name}</h3>
                        {getStatusBadge(coupon.status)}
                        {coupon.firstOrderOnly && (
                          <Badge variant="outline" className="text-xs">
                            First Order Only
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {coupon.code}
                        </code>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {coupon.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(coupon.type)}
                        <span className="text-sm font-medium">Discount</span>
                      </div>
                      <div className="text-lg font-bold">
                        {formatValue(coupon.type, coupon.value)}
                      </div>
                      {coupon.maxDiscount > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Max: ${coupon.maxDiscount}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-medium">Min Order</span>
                      </div>
                      <div className="text-lg font-bold">
                        ${coupon.minOrderAmount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Per user: {coupon.userLimit} time
                        {coupon.userLimit !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Usage</span>
                      </div>
                      <div className="text-lg font-bold">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {((coupon.usedCount / coupon.usageLimit) * 100).toFixed(
                          1
                        )}
                        % used
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Validity</span>
                      </div>
                      <div className="text-sm">
                        <div>{coupon.startDate}</div>
                        <div className="text-muted-foreground">
                          to {coupon.endDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {coupon.categories[0] !== "all" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Categories:</span>
                        <Badge variant="outline">{coupon.categories}</Badge>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
