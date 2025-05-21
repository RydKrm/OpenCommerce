import type { Metadata } from "next"
import CartItems from "@/components/cart/cart-items"
import CartSummary from "@/components/cart/cart-summary"

export const metadata: Metadata = {
  title: "Shopping Cart | ThreadZone",
  description: "View and manage your shopping cart",
}

export default function CartPage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartItems />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
