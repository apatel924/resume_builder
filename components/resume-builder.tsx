"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useResume } from "@/contexts/resume-context"
import { useSession, signOut } from "next-auth/react"
import ResumeEditor from "./resume-editor"
import ResumePreview from "./resume-preview"
import TemplateSelector from "./template-selector"
import { LogOut, FileText, Save, Download } from "lucide-react"

export default function ResumeBuilder() {
  const { user } = useAuth()
  const { data: session } = useSession()
  const { selectedTemplate } = useResume()
  const [showSaveNotification, setShowSaveNotification] = useState(false)

  const handleSave = () => {
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06BEE1]/10 via-white to-[#1768AC]/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-[#06BEE1]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#06BEE1] to-[#1768AC] rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#03256C]">ResumeCraft</h1>
                <p className="text-sm text-[#1768AC]/70">Welcome back, {session?.user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 rounded-xl bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-[#2541B2]/30 text-[#2541B2] hover:bg-[#2541B2]/10 rounded-xl bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>

              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="sm"
                className="text-[#03256C]/70 hover:text-[#03256C] hover:bg-[#03256C]/10 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Template Selector */}
      <div className="w-full px-6 py-6">
        <TemplateSelector />
      </div>

      {/* Main Content - EVEN MORE LEFT SIDE SPACE */}
      <div className="w-full px-6 pb-8">
        <div className="grid lg:grid-cols-12 gap-6 max-w-none">
          {/* Editor Panel - MUCH WIDER for optimal editing experience (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <ResumeEditor />
          </div>

          {/* Preview Panel - BALANCED for great preview (7 columns) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 h-[calc(100vh-6rem)]">
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#06BEE1]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-[#2541B2]/10 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-[#1768AC]/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </div>
  )
}
