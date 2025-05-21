"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProductQuantitySelectorProps {
  maxQuantity: number
}

export default function ProductQuantitySelector({ maxQuantity }: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div>
      <h3 className="font-medium mb-2">Quantity</h3>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
          disabled={quantity >= maxQuantity}
        >
          +
        </Button>
        <span className="text-sm text-muted-foreground ml-2">{maxQuantity} items available</span>
      </div>
    </div>
  )
}
