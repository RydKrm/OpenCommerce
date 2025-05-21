"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
// import { useCart } from "@/hooks/use-cart"

export default function CheckoutForm() {
  const router = useRouter();
  // const { clearCart } = useCart()

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (
      formData.paymentMethod === "credit" &&
      (!formData.cardNumber ||
        !formData.cardName ||
        !formData.cardExpiry ||
        !formData.cardCvc)
    ) {
      toast({
        title: "Missing payment information",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // clearCart()
      setIsProcessing(false);

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase",
      });

      router.push("/account/orders");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="border rounded-lg p-6 bg-background space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-background space-y-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>

          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">Zip/Postal Code *</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-background space-y-4">
          <h2 className="text-xl font-semibold">Payment Method</h2>

          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={handlePaymentMethodChange}>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Credit/Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 py-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
          </RadioGroup>

          {formData.paymentMethod === "credit" && (
            <div className="space-y-4 pt-2">
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Expiration Date (MM/YY) *</Label>
                  <Input
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC *</Label>
                  <Input
                    id="cardCvc"
                    name="cardCvc"
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </form>
  );
}
