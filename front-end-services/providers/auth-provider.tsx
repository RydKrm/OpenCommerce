"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "seller";
  avatar?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => Promise<void>;
  logout: () => void;
  error: string | null;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = `${API_URL}/v1/user/profile`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("base url  ", API_BASE);
      const res = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        const userData = (res.data as any).results.user;
        const access_token = (res.data as any).results.token;
        setUser(userData);
        toast({
          title: "Login successful",
          description: "You have successfully logged in",
        });
        localStorage.setItem("@authUser", JSON.stringify(userData));
        localStorage.setItem("accessToken", access_token);
        router.push("/");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          (err as any).response?.data.message?.message ||
          "An error occurred during login",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_BASE}/create`, {
        name,
        email,
        password,
        phoneNumber,
      });

      if (res.status === 200) {
        toast({
          title: "Registration successful",
          description: "You have successfully registered",
        });
        router.push("/login");
      }
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

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
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
