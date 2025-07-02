"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Sparkles, FileText, Palette, Zap } from "lucide-react"

export default function LoginPage() {
  const { signInWithGoogle, loading } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06BEE1] via-[#1768AC] to-[#03256C] flex items-center justify-center p-4">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-[#2541B2]/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#06BEE1]/20 rounded-full blur-xl animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl mb-6 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Resume<span className="text-[#06BEE1]">Craft</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Create beautiful, professional resumes with our magical Studio Ghibli-inspired builder. Switch templates
            instantly and watch your story come to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Login Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <CardDescription className="text-white/70">
                Sign in to continue crafting your perfect resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full bg-white hover:bg-white/90 text-[#03256C] font-semibold py-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#03256C] border-t-transparent"></div>
                    Signing you in...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </div>
                )}
              </Button>

              <div className="text-center">
                <p className="text-white/60 text-sm">By signing in, you agree to our magical terms of service</p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#06BEE1]/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#06BEE1]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Magical Templates</h3>
              </div>
              <p className="text-white/70">
                Switch between beautiful resume templates instantly with our live preview.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#2541B2]/20 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-[#2541B2]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Studio Ghibli Inspired</h3>
              </div>
              <p className="text-white/70">Enjoy a whimsical, organic design that makes resume building delightful.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#1768AC]/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#1768AC]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Auto-Save Magic</h3>
              </div>
              <p className="text-white/70">Your progress is automatically saved, so you never lose your work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
