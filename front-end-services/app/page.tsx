import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"

export default function Home() {
  // Featured products (first 4 products)
  const featuredProducts = products.slice(0, 4)

  // New arrivals (next 4 products)
  const newArrivals = products.slice(4, 8)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="container relative flex min-h-[500px] flex-col items-start justify-center py-16 md:min-h-[600px]">
          <div className="max-w-lg space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Summer Collection 2025
            </h1>
            <p className="text-lg text-white/90">
              Discover our latest collection of premium clothing designed for comfort and style.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/placeholder.svg?height=600&width=1200"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products" className="flex items-center text-sm font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-lg border bg-background p-3 transition-colors hover:border-foreground"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-secondary">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    {product.rating && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="ml-1 text-yellow-500">★</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Men", "Women", "Accessories"].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="relative flex aspect-[4/3] items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category}</h3>
                </div>
                <div className="absolute inset-0 -z-10">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=${category}`}
                    alt={category}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <Link href="/products?new=true" className="flex items-center text-sm font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-lg border bg-background p-3 transition-colors hover:border-foreground"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-secondary">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    {product.rating && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="ml-1 text-yellow-500">★</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">Subscribe to our newsletter</h2>
            <p className="mt-2 text-primary-foreground/90">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
