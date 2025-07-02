"use client"

import { Card } from "@/components/ui/card"
import { useResume } from "@/contexts/resume-context"
import ModernTemplate from "./templates/modern-template"
import CreativeTemplate from "./templates/creative-template"
import ProfessionalTemplate from "./templates/professional-template"

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResume()

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "creative":
        return <CreativeTemplate data={resumeData} />
      case "professional":
        return <ProfessionalTemplate data={resumeData} />
      default:
        return <ModernTemplate data={resumeData} />
    }
  }

  return (
    <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden border-[#06BEE1]/20">
      <div className="bg-gradient-to-r from-[#06BEE1]/10 to-[#1768AC]/10 p-4 border-b border-[#06BEE1]/20">
        <h3 className="text-lg font-semibold text-[#03256C] text-center">Live Preview</h3>
        <p className="text-sm text-[#1768AC]/70 text-center">Your resume updates in real-time</p>
      </div>

      <div className="p-6 bg-white min-h-[800px]">{renderTemplate()}</div>
    </Card>
  )
}
