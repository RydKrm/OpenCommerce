"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
