import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {},
) {
  const { currency = "USD", notation = "standard" } = options

  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function getInitials(name: string) {
  const parts = name.split(" ")
  let initials = ""

  if (parts.length > 0) {
    initials += parts[0].charAt(0)

    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0)
    }
  }

  return initials.toUpperCase()
}
