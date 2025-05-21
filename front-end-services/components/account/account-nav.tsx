"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Orders",
    href: "/account/orders",
  },
  {
    title: "Addresses",
    href: "/account/addresses",
  },
  {
    title: "Security",
    href: "/account/security",
  },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md",
            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
