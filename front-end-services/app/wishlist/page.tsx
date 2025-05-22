import type { Metadata } from "next";
import { WishlistItems } from "@/components/wishlist/wishlist-items";

export const metadata: Metadata = {
  title: "Wishlist | ThreadZone",
  description: "View and manage your wishlist",
};

export default function WishlistPage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <WishlistItems />
    </div>
  );
}
