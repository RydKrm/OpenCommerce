"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProductSizeSelectorProps {
  sizes: string[]
}

export default function ProductSizeSelector({ sizes }: ProductSizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState("")

  return (
    <div>
      <h3 className="font-medium mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="h-10 px-4"
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}
