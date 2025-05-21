import type { Metadata } from "next"
import { PasswordForm } from "@/components/account/password-form"

export const metadata: Metadata = {
  title: "Security Settings | ThreadZone",
  description: "Manage your security settings",
}

export default function SecurityPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
      <PasswordForm />
    </div>
  )
}
