"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Mock user type for demo purposes
interface User {
  uid: string
  name: string
  email: string
  photoURL?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("resume_builder_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    // Simulate Google sign-in with demo user
    const demoUser: User = {
      uid: "demo-user-123",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      photoURL: "/placeholder.svg?height=40&width=40",
    }

    setTimeout(() => {
      setUser(demoUser)
      localStorage.setItem("resume_builder_user", JSON.stringify(demoUser))
      setLoading(false)
    }, 1500)
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("resume_builder_user")
    localStorage.removeItem("resume_data_demo-user-123")
  }

  return <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
