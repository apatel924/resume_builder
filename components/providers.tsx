// components/Providers.tsx
"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/contexts/auth-context"
import { ResumeProvider } from "@/contexts/resume-context"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
