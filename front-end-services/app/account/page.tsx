import type { Metadata } from "next"
import { ProfileForm } from "@/components/account/profile-form"

export const metadata: Metadata = {
  title: "My Account | ThreadZone",
  description: "Manage your account settings",
}

export default function AccountPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
      <ProfileForm />
    </div>
  )
}
