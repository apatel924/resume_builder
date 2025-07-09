"use client"

import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sparkles, FileText, Linkedin, Zap } from "lucide-react"

export default function LoginPage() {
  const { status } = useSession()
  const loading = status === "loading"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-400/10 rounded-full blur-lg animate-bounce" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-400/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-400/10 rounded-full blur-xl animate-bounce delay-500" />

        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-ping delay-700" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl mb-4 shadow-2xl animate-in zoom-in duration-700 delay-300">
            <FileText className="w-8 h-8 text-white animate-in fade-in duration-500 delay-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight animate-in slide-in-from-left duration-800 delay-200">
            Resume
            <span className="text-blue-300 animate-in slide-in-from-right duration-800 delay-400">
              Craft
            </span>
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-600">
            Create beautiful, professional resumes with our intuitive builder.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
          {/* Login Card */}
          <div className="order-2 lg:order-1">
            <div className="animate-in slide-in-from-left duration-800 delay-700">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-3xl hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl font-bold text-white">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-sm">
                    Sign in to continue crafting your perfect resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => signIn("google")}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm border-0 group"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Signing you in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                        <svg
                          className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                          viewBox="0 0 24 24"
                        >
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
                        <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                          Continue with Google
                        </span>
                      </div>
                    )}
                  </Button>
                  <p className="text-center text-slate-400 text-xs">
                    By signing in, you agree to our terms of service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features panel */}
          <div className="order-1 lg:order-2 space-y-4 animate-in slide-in-from-right duration-800 delay-800">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">
                    Instant Templates
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Switch between beautiful resume templates instantly with our live preview system.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">
                    LinkedIn Integration
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Future development includes integration of LinkedIn so data transfer is direct from LinkedIn.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">
                    Auto-Save Magic
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Your progress is automatically saved, so you never lose your work while crafting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
