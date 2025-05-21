"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "seller"
  avatar?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample user data for demo purposes
const DEMO_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password",
    role: "user" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Seller Account",
    email: "seller@example.com",
    password: "password",
    role: "seller" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in demo data
      const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists
      if (DEMO_USERS.some((u) => u.email === email)) {
        setError("Email already in use")
        setIsLoading(false)
        return
      }

      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push("/")
    } catch (err) {
      setError("An error occurred during registration")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
