import type { Metadata } from "next";
// import { OrdersList } from "@/components/account/orders-list"

export const metadata: Metadata = {
  title: "My Orders | ThreadZone",
  description: "View your order history",
};

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      {/* <OrdersList /> */}
    </div>
  );
}
