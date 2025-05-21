"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProductColorSelectorProps {
  colors: string[]
}

export default function ProductColorSelector({ colors }: ProductColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState("")

  return (
    <div>
      <h3 className="font-medium mb-2">Color</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Button
            key={color}
            variant={selectedColor === color ? "default" : "outline"}
            className="h-10 px-4"
            onClick={() => setSelectedColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </div>
  )
}
