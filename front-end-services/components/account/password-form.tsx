"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export function PasswordForm() {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.new !== password.confirm) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation must be identical",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, this would update password via an API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      })
      setPassword({
        current: "",
        new: "",
        confirm: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              name="current"
              type="password"
              value={password.current}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input id="new" name="new" type="password" value={password.new} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Card>
  )
}
