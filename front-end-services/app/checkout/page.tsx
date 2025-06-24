import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout | ThreadZone",
  description: "Complete your purchase",
};

const CheckoutPage = () => {
  const isAuthenticated = true;
  const hasItems = true;

  if (!isAuthenticated || !hasItems) {
    redirect("/cart");
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
