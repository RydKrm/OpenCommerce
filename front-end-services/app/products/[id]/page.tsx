import { notFound } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import AddToCartButton from "@/components/products/add-to-cart-button";
import AddToWishlistButton from "@/components/products/add-to-wishlist-button";
import ProductSizeSelector from "@/components/products/product-size-selector";
import ProductColorSelector from "@/components/products/product-color-selector";
import ProductQuantitySelector from "@/components/products/product-quantity-selector";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products[0];

  if (!product) {
    return {
      title: "Product Not Found | ThreadZone",
    };
  }

  return {
    title: `${product.name} | ThreadZone`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[0];

  if (!product) {
    notFound();
  }

  return (
    <div className="container-custom py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border bg-background relative">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-md overflow-hidden border cursor-pointer relative">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < Math.floor(product.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {product.discount ? (
              <>
                <span className="text-2xl font-bold">${product.discount}</span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price}
                </span>
                <Badge variant="secondary" className="ml-2">
                  {Math.round((1 - product.discount / product.price) * 100)}%
                  OFF
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <ProductSizeSelector sizes={product.sizes} />
            <ProductColorSelector colors={product.colors} />
            <ProductQuantitySelector maxQuantity={product.rating} />
          </div>

          {/* <div className="flex space-x-4 pt-4">
            <AddToCartButton product={product} className="flex-1" />
            <AddToWishlistButton product={product} />
          </div> */}

          <Separator className="my-6" />

          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 py-2">
                    <span className="font-medium">{spec.name}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <p>Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
