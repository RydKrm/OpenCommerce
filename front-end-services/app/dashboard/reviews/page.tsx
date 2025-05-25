import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, Trash2 } from "lucide-react"

const mockReviews = [
  {
    id: 1,
    product: "Wireless Headphones",
    customer: "John Doe",
    rating: 5,
    comment: "Excellent sound quality and comfortable to wear for long periods.",
    date: "2024-01-15",
    status: "published",
  },
  {
    id: 2,
    product: "Cotton T-Shirt",
    customer: "Jane Smith",
    rating: 4,
    comment: "Good quality fabric, fits well. Would recommend.",
    date: "2024-01-14",
    status: "published",
  },
  {
    id: 3,
    product: "JavaScript Guide",
    customer: "Mike Johnson",
    rating: 3,
    comment: "Decent book but could use more practical examples.",
    date: "2024-01-13",
    status: "pending",
  },
]

export default function ReviewsPage() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Reviews" description="Manage customer reviews and ratings" />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium">{review.product}</h3>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                        <Badge variant={review.status === "published" ? "default" : "secondary"}>{review.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {review.customer} on {review.date}
                      </p>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
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
      </main>
    </div>
  )
}
