import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categoriesData } from "@/data/categories";

export const metadata = {
  title: "Categories | ThreadZone",
  description: "Browse our product categories",
};

export default function CategoriesPage() {
  return (
    <div className="container-custom py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse our product categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                  {category.productCount} products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{category.description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/categories/${category.id}`}
                  className="text-sm text-primary font-medium">
                  Browse Category
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
