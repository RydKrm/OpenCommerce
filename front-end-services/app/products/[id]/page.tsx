"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/providers/cart-provider";
import { observer } from "mobx-react-lite";
import productStore, { IProductVariant } from "@/api/product/useProductStore";
import ImageSlider from "./components/ImageSlider";
import ProductHeader from "./components/ProductHeader";
import ProductRating from "./components/ProductRating";
import ProductPricing from "./components/ProductPricing";
import ProductProperties from "./components/ProductProperties";
import VariantSelector from "./components/VariantSelector";
import VariantDetails from "./components/VariantDetails";
import QuantitySelector from "./components/QuantitySelector";
import AddToCartButton from "./components/AddToCartButton";
import TrustIndicators from "./components/TrustIndicators";
import ProductDescription from "./components/ProductDescription";
import QuestionsSection from "./components/QuestionsSection";
import { Star } from "lucide-react";
import React from "react";

// Mock product data with all variants and properties

const ProductSinglePage = observer(({ params }: { params: any }) => {
  // Unwrap params if it's a Promise (Next.js 14+ convention)
  const { id } = React.use(params as any) as { id: string };
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [allImage, setAllImages] = useState<
    { image_id: string; image_url: string }[]
  >([]);

  const { singleProduct, isLoading, error } = productStore;

  const { addItem } = useCart();

  useEffect(() => {
    productStore.findBySlug(id);
  }, [id]);
  
  useEffect(() => {
    if (productStore.singleProduct) {
      // Use product images by default
      const productImages = (productStore.singleProduct.Images || []).map(img => ({
        ...img,
        image_url: (img.image_url as string)?.replace(/\\/g, "/") || '',
      }));
      setAllImages(productImages);
      // Set first variant as selected
      setSelectedVariant(productStore.singleProduct.Product_Variant?.[0] || null);
    }
  }, [productStore.singleProduct]);

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % allImage.length);
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex(
  //     (prev) => (prev - 1 + allImage.length) % allImage.length
  //   );
  // };

  // const renderStars = (rating: number) => {
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <Star
  //       key={i}
  //       className={`w-4 h-4 ${
  //         i < Math.floor(rating)
  //           ? "fill-yellow-400 text-yellow-400"
  //           : "text-muted-foreground"
  //       }`}
  //     />
  //   ));
  // };

  /**
   * Adds the selected product variant to the shopping cart.
   * The product variant includes its ID, name, price, quantity, and image URL.
   * Utilizes the addItem function from the cart provider to update cart state.
   */

  const addToCart = () => {
    if (!selectedVariant || typeof selectedVariant.price !== "number" || !selectedVariant.id) return;
    addItem({
      id: selectedVariant.id,
      name: singleProduct?.name || "Unknown Product",
      price: selectedVariant.price,
      quantity,
      image: allImage[currentImageIndex]?.image_url || "/placeholder.svg",
    });
  };

  // Helper to handle variant selection
  const handleVariantSelect = (variant: IProductVariant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
    // If the variant has an image, use it; otherwise, use product images
    if (variant.image && typeof variant.image === 'string') {
      setAllImages([
        { image_id: variant.id, image_url: (variant.image as string)?.replace(/\\/g, "/") || '' },
      ]);
    } else {
      const productImages = (singleProduct?.Images || []).map(img => ({
        ...img,
        image_url: (img.image_url as string)?.replace(/\\/g, "/") || '',
      }));
      setAllImages(productImages);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Image Slider */}
          <ImageSlider
            images={allImage}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          {/* Right Side - Product Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <ProductHeader
                name={singleProduct?.name || ""}
                category={singleProduct?.Category?.name || ""}
                sku={selectedVariant?.sku}
              />
              <ProductRating
                rating={singleProduct?.rating || 0}
                totalSold={singleProduct?.totalSold}
              />
            </div>
            <ProductPricing
              price={selectedVariant?.price ?? 0}
              previousPrice={selectedVariant?.previousPrice}
              quantity={selectedVariant?.quantity ?? 0}
            />
            {singleProduct?.Product_Property && singleProduct.Product_Property.length > 0 && (
              <ProductProperties properties={singleProduct.Product_Property} />
            )}
            {singleProduct?.Product_Variant && singleProduct.Product_Variant.length > 0 && (
              <VariantSelector
                variants={singleProduct.Product_Variant}
                selectedVariant={selectedVariant}
                setSelectedVariant={handleVariantSelect}
              />
            )}
            {Array.isArray((selectedVariant as any)?.Product_Property) && (selectedVariant as any).Product_Property.length > 0 && (
              <VariantDetails properties={(selectedVariant as any).Product_Property} />
            )}
            <div className="space-y-4">
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={selectedVariant?.quantity ?? 1}
              />
              <AddToCartButton
                price={selectedVariant?.price ?? 0}
                quantity={quantity}
                onAddToCart={addToCart}
                disabled={
                  !selectedVariant ||
                  typeof selectedVariant.price !== "number" ||
                  quantity > (selectedVariant?.quantity ?? 0) ||
                  quantity < 1
                }
              />
            </div>
            <TrustIndicators />
          </div>
        </div>
        <ProductDescription description={singleProduct?.description || ""} />
        <QuestionsSection newComment={newComment} setNewComment={setNewComment} />
      </div>
    </div>
  );
});

export default ProductSinglePage;
