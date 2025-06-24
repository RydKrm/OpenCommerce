import { Suspense } from "react";
import ProductList from "@/components/products/product-list";
import ProductListSkeleton from "@/components/products/product-list-skeleton";

export const metadata = {
  title: "Products | ThreadZone",
  description: "Browse our collection of premium clothing and accessories",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let selectedCategories: string[] = [];
  if (Array.isArray(searchParams.category)) {
    selectedCategories = searchParams.category as string[];
  } else if (typeof searchParams.category === "string") {
    selectedCategories = [searchParams.category];
  }
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? Number.parseInt(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? Number.parseInt(searchParams.maxPrice)
      : undefined;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList
          selectedCategories={selectedCategories}
          sort={sort}
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </Suspense>
    </div>
  );
}
