"use client"

import { useSession } from "next-auth/react"
import LoginPage from "@/components/login-page"
import ResumeBuilder from "@/components/resume-builder"

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#06BEE1] via-[#1768AC] to-[#03256C] flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto" />
          <p className="text-white mt-4 text-center font-medium">
            Loading your magical workspace...
          </p>
        </div>
      </div>
    )
  }

  return session ? <ResumeBuilder /> : <LoginPage />
}
