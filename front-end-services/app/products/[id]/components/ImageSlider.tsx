import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: { image_id: string; image_url: string }[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, currentImageIndex, setCurrentImageIndex }) => {
  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    const imageService = process.env.NEXT_PUBLIC_IMAGE_URL;
    console.log(imageService)
    console.log(images)
    console.log(currentImageIndex)

  // Drag/swipe support
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
      setDragging(false);
      setDragStartX(null);
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
    setDragStartX(null);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || dragStartX === null) return;
    const diff = e.touches[0].clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
      setDragging(false);
      setDragStartX(null);
    }
  };
  const handleTouchEnd = () => {
    setDragging(false);
    setDragStartX(null);
  };

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square bg-muted rounded-lg overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
              <img
                //   src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.Images[0].image_url}`}
                src={
                  images[currentImageIndex]?.image_url
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${images[currentImageIndex].image_url.replace(/\\/g, '/')}`
                    : "/placeholder.svg"
                }
                alt="Product Image"
                className="w-full h-full object-cover"
              />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevImage}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextImage}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            className={`aspect-square bg-muted rounded-md overflow-hidden border-2 transition-colors ${index === currentImageIndex ? "border-primary" : "border-transparent"}`}
            onClick={() => setCurrentImageIndex(index)}>
            <img
                    // src={image.image_url}
                    src={
                  image.image_url
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.image_url.replace(/\\/g, '/')}`
                    : "/placeholder.svg"
                }
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 