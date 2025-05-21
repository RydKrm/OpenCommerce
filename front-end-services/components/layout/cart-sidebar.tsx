"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { useCart } from "@/providers/cart-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatPrice } from "@/lib/utils"

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span> / </span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <span>-</span>
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <span>+</span>
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 px-1">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
            </div>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartSidebar
