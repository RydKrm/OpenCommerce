import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductList from "@/components/products/product-list";
import ProductListSkeleton from "@/components/products/product-list-skeleton";
// import { getCategoryById } from "@/lib/categories";
import { categories } from "@/lib/data";

export async function generateMetadata({ params }: { params: { id: string } }) {
  // const category = getCategoryById(params.id);
  const category = categories[0];

  if (!category) {
    return {
      title: "Category Not Found | ThreadZone",
    };
  }

  return {
    title: `${category.name} | ThreadZone`,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = categories[0];

  if (!category) {
    notFound();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList
          category={params.id}
          sort={sort}
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </Suspense>
    </div>
  );
}
