import type { Metadata } from "next"
import { AddressForm } from "@/components/account/address-form"

export const metadata: Metadata = {
  title: "My Addresses | ThreadZone",
  description: "Manage your shipping addresses",
}

export default function AddressesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Addresses</h2>
      <AddressForm />
    </div>
  )
}
