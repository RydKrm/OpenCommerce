"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, ImageIcon } from "lucide-react"
import { useState } from "react"

const mockBanners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on summer collection",
    position: "hero",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    position: "secondary",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    position: "footer",
    status: "inactive",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
]

export default function BannersPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    position: "",
    startDate: "",
    endDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Banner data:", formData)
    setFormData({ title: "", description: "", position: "", startDate: "", endDate: "" })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Banner Management" description="Manage homepage banners and promotional content" />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Banners List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Banners</span>
                  <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Banner
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBanners.map((banner) => (
                    <div key={banner.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{banner.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{banner.description}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">{banner.position}</Badge>
                              <Badge variant={banner.status === "active" ? "default" : "secondary"}>
                                {banner.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {banner.startDate} - {banner.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
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

          {/* Add Banner Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Banner</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bannerTitle">Banner Title</Label>
                      <Input
                        id="bannerTitle"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter banner title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bannerDescription">Description</Label>
                      <Textarea
                        id="bannerDescription"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter banner description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bannerPosition">Position</Label>
                      <Select
                        value={formData.position}
                        onValueChange={(value) => setFormData({ ...formData, position: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero Section</SelectItem>
                          <SelectItem value="secondary">Secondary Banner</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Banner Image</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Upload banner image</p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Create Banner
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
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
  )
}
