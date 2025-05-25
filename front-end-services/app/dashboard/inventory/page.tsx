import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package, TrendingDown, TrendingUp } from "lucide-react"

const mockInventory = [
  {
    id: 1,
    product: "Wireless Headphones",
    sku: "WH-001",
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    status: "in-stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    product: "Cotton T-Shirt",
    sku: "CT-002",
    currentStock: 120,
    minStock: 20,
    maxStock: 200,
    status: "in-stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    product: "JavaScript Guide",
    sku: "JG-003",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    status: "low-stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    product: "Garden Tools Set",
    sku: "GT-004",
    currentStock: 0,
    minStock: 5,
    maxStock: 30,
    status: "out-of-stock",
    lastUpdated: "2024-01-12",
  },
]

export default function InventoryPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge variant="default">In Stock</Badge>
      case "low-stock":
        return <Badge variant="secondary">Low Stock</Badge>
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockIcon = (current: number, min: number) => {
    if (current === 0) return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (current <= min) return <TrendingDown className="w-4 h-4 text-yellow-500" />
    return <TrendingUp className="w-4 h-4 text-green-500" />
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Inventory Management" description="Monitor and manage product stock levels" />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Inventory Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInventory.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockInventory.filter((item) => item.status === "low-stock").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockInventory.filter((item) => item.status === "out-of-stock").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">SKU</th>
                    <th className="text-left p-2">Current Stock</th>
                    <th className="text-left p-2">Min/Max</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Last Updated</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getStockIcon(item.currentStock, item.minStock)}
                          <span className="font-medium">{item.product}</span>
                        </div>
                      </td>
                      <td className="p-2 font-mono text-sm">{item.sku}</td>
                      <td className="p-2">
                        <span className="font-medium">{item.currentStock}</span>
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">
                        {item.minStock} / {item.maxStock}
                      </td>
                      <td className="p-2">{getStatusBadge(item.status)}</td>
                      <td className="p-2 text-sm text-muted-foreground">{item.lastUpdated}</td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          Update Stock
                        </Button>
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
  )
}
