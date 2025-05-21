import type React from "react"
import { redirect } from "next/navigation"
import { AccountNav } from "@/components/account/account-nav"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would check if the user is authenticated
  const isAuthenticated = true // This would come from your auth system

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64">
          <AccountNav />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
