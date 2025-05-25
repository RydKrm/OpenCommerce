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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Send,
  Users,
  Mail,
  Eye,
  Edit,
  Trash2,
  Target,
} from "lucide-react";

const mockUsers = [
  {
    id: "user_1",
    name: "John Smith",
    email: "john@example.com",
    location: "New York, NY",
    totalOrders: 12,
    totalSpent: 1250.99,
    lastOrderDate: "2024-01-15",
    status: "active",
    segment: "vip",
  },
  {
    id: "user_2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "Los Angeles, CA",
    totalOrders: 8,
    totalSpent: 650.5,
    lastOrderDate: "2024-01-18",
    status: "active",
    segment: "regular",
  },
  {
    id: "user_3",
    name: "Mike Chen",
    email: "mike@example.com",
    location: "Chicago, IL",
    totalOrders: 3,
    totalSpent: 180.25,
    lastOrderDate: "2024-01-10",
    status: "active",
    segment: "new",
  },
  {
    id: "user_4",
    name: "Emma Davis",
    email: "emma@example.com",
    location: "Miami, FL",
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: null,
    status: "inactive",
    segment: "new",
  },
];

const mockCampaigns = [
  {
    id: "camp_1",
    name: "20% Off Winter Sale",
    subject: "🎉 Exclusive 20% Off - Limited Time!",
    status: "sent",
    recipientCount: 1250,
    openRate: 24.5,
    clickRate: 3.2,
    sentDate: "2024-01-15",
    couponCode: "WINTER20",
  },
  {
    id: "camp_2",
    name: "New Product Launch",
    subject: "Introducing Our Latest Collection",
    status: "draft",
    recipientCount: 0,
    openRate: 0,
    clickRate: 0,
    sentDate: null,
    couponCode: null,
  },
  {
    id: "camp_3",
    name: "VIP Customer Rewards",
    subject: "Special Rewards Just for You",
    status: "scheduled",
    recipientCount: 89,
    openRate: 0,
    clickRate: 0,
    sentDate: "2024-01-25",
    couponCode: "VIP50",
  },
];

const emailTemplates = [
  {
    id: "template_1",
    name: "Discount Promotion",
    subject: "🎉 Special Discount Just for You!",
    content: `
      <h2>Exclusive Discount Inside!</h2>
      <p>Hi {{customer_name}},</p>
      <p>We're excited to offer you an exclusive {{discount_percentage}}% discount on your next purchase!</p>
      <div style="text-align: center; margin: 20px 0;">
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; display: inline-block;">
          <strong>Use code: {{coupon_code}}</strong>
        </div>
      </div>
      <p>This offer is valid until {{expiry_date}}. Don't miss out!</p>
      <a href="{{shop_url}}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Shop Now</a>
    `,
  },
  {
    id: "template_2",
    name: "Product Announcement",
    subject: "🚀 New Products Just Arrived!",
    content: `
      <h2>New Arrivals You'll Love</h2>
      <p>Hello {{customer_name}},</p>
      <p>We're thrilled to introduce our latest collection of amazing products!</p>
      <p>As one of our valued customers, you get early access to these new items.</p>
      <a href="{{shop_url}}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Explore New Products</a>
    `,
  },
  {
    id: "template_3",
    name: "Welcome Email",
    subject: "Welcome to Our Store!",
    content: `
      <h2>Welcome to Our Family!</h2>
      <p>Hi {{customer_name}},</p>
      <p>Thank you for joining us! We're excited to have you as part of our community.</p>
      <p>To get you started, here's a special welcome offer:</p>
      <div style="text-align: center; margin: 20px 0;">
        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; display: inline-block;">
          <strong>{{discount_percentage}}% OFF your first order with code: {{coupon_code}}</strong>
        </div>
      </div>
      <a href="{{shop_url}}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Start Shopping</a>
    `,
  },
];

export default function EmailCampaignsPage() {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userFilters, setUserFilters] = useState({
    segment: "all",
    location: "all",
    minOrders: "",
    minSpent: "",
    status: "all",
  });
  const [campaignData, setCampaignData] = useState({
    name: "",
    subject: "",
    template: "",
    customContent: "",
    couponCode: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSegment =
      userFilters.segment === "all" || user.segment === userFilters.segment;
    const matchesLocation =
      userFilters.location === "all" ||
      user.location.toLowerCase().includes(userFilters.location.toLowerCase());
    const matchesMinOrders =
      !userFilters.minOrders ||
      user.totalOrders >= Number.parseInt(userFilters.minOrders);
    const matchesMinSpent =
      !userFilters.minSpent ||
      user.totalSpent >= Number.parseFloat(userFilters.minSpent);
    const matchesStatus =
      userFilters.status === "all" || user.status === userFilters.status;

    return (
      matchesSegment &&
      matchesLocation &&
      matchesMinOrders &&
      matchesMinSpent &&
      matchesStatus
    );
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllFiltered = () => {
    const filteredUserIds = filteredUsers.map((user) => user.id);
    setSelectedUsers(filteredUserIds);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Sent</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campaign data:", campaignData);
    console.log("Selected users:", selectedUsers);
    // Handle campaign creation/sending
  };

  const totalCampaigns = mockCampaigns.length;
  const sentCampaigns = mockCampaigns.filter((c) => c.status === "sent").length;
  const avgOpenRate =
    mockCampaigns
      .filter((c) => c.status === "sent")
      .reduce((sum, c) => sum + c.openRate, 0) / sentCampaigns || 0;
  const totalRecipients = mockCampaigns.reduce(
    (sum, c) => sum + c.recipientCount,
    0
  );

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Email Campaigns"
        description="Create and manage email marketing campaigns"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Campaign Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sent Campaigns
              </CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sentCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Open Rate
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgOpenRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Email opens</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Recipients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecipients}</div>
              <p className="text-xs text-muted-foreground">Emails sent</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
          </TabsList>

          {/* Create Campaign Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* User Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Select Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* User Filters */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Filter Users
                    </Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Select
                        value={userFilters.segment}
                        onValueChange={(value) =>
                          setUserFilters({ ...userFilters, segment: value })
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="Customer Segment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Segments</SelectItem>
                          <SelectItem value="new">New Customers</SelectItem>
                          <SelectItem value="regular">
                            Regular Customers
                          </SelectItem>
                          <SelectItem value="vip">VIP Customers</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={userFilters.status}
                        onValueChange={(value) =>
                          setUserFilters({ ...userFilters, status: value })
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="User Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Min Orders"
                        type="number"
                        value={userFilters.minOrders}
                        onChange={(e) =>
                          setUserFilters({
                            ...userFilters,
                            minOrders: e.target.value,
                          })
                        }
                      />

                      <Input
                        placeholder="Min Spent ($)"
                        type="number"
                        value={userFilters.minSpent}
                        onChange={(e) =>
                          setUserFilters({
                            ...userFilters,
                            minSpent: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* User Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">
                        Select Users ({selectedUsers.length} selected)
                      </Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={selectAllFiltered}>
                          Select All Filtered ({filteredUsers.length})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearSelection}>
                          Clear
                        </Button>
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-3 p-2 border rounded-lg">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleUserSelection(user.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {user.segment}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.email} • {user.totalOrders} orders • $
                              {user.totalSpent}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaignName">Campaign Name *</Label>
                      <Input
                        id="campaignName"
                        value={campaignData.name}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter campaign name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailSubject">Email Subject *</Label>
                      <Input
                        id="emailSubject"
                        value={campaignData.subject}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            subject: e.target.value,
                          })
                        }
                        placeholder="Enter email subject line"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailTemplate">Email Template</Label>
                      <Select
                        value={campaignData.template}
                        onValueChange={(value) =>
                          setCampaignData({ ...campaignData, template: value })
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom Email</SelectItem>
                          {emailTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailContent">Email Content *</Label>
                      <Textarea
                        id="emailContent"
                        value={campaignData.customContent}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            customContent: e.target.value,
                          })
                        }
                        placeholder="Write your email content here. Use {{customer_name}}, {{coupon_code}}, {{discount_percentage}} for personalization."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                      <Input
                        id="couponCode"
                        value={campaignData.couponCode}
                        onChange={(e) =>
                          setCampaignData({
                            ...campaignData,
                            couponCode: e.target.value,
                          })
                        }
                        placeholder="Enter coupon code to include"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="scheduleDate">
                          Schedule Date (Optional)
                        </Label>
                        <Input
                          id="scheduleDate"
                          type="date"
                          value={campaignData.scheduleDate}
                          onChange={(e) =>
                            setCampaignData({
                              ...campaignData,
                              scheduleDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scheduleTime">Schedule Time</Label>
                        <Input
                          id="scheduleTime"
                          type="time"
                          value={campaignData.scheduleTime}
                          onChange={(e) =>
                            setCampaignData({
                              ...campaignData,
                              scheduleTime: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-1">
                        {campaignData.scheduleDate
                          ? "Schedule Campaign"
                          : "Send Now"}
                      </Button>
                      <Button type="button" variant="outline">
                        Save Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* All Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium">{campaign.name}</h3>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {campaign.subject}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Recipients: {campaign.recipientCount}</span>
                            {campaign.sentDate && (
                              <span>Sent: {campaign.sentDate}</span>
                            )}
                            {campaign.couponCode && (
                              <span>Coupon: {campaign.couponCode}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
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

                      {campaign.status === "sent" && (
                        <div className="grid gap-4 md:grid-cols-3 pt-4 border-t">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {campaign.openRate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Open Rate
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {campaign.clickRate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Click Rate
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {campaign.recipientCount}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Recipients
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Email Templates</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {emailTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {template.subject}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: template.content.substring(0, 200) + "...",
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
