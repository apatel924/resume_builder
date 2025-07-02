"use client"
import { AuthProvider } from "@/contexts/auth-context"
import { ResumeProvider } from "@/contexts/resume-context"
import LoginPage from "@/components/login-page"
import ResumeBuilder from "@/components/resume-builder"
import { useAuth } from "@/contexts/auth-context"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#06BEE1] via-[#1768AC] to-[#03256C] flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="text-white mt-4 text-center font-medium">Loading your magical workspace...</p>
        </div>
      </div>
    )
  }

  return user ? <ResumeBuilder /> : <LoginPage />
}

export default function Home() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  )
}
