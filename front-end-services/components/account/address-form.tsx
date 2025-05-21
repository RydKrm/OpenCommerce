"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function AddressForm() {
  const [address, setAddress] = useState({
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would update address via an API call
    setTimeout(() => {
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2"></div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
          />
        </div>
      </form>
    </Card>
  );
}
