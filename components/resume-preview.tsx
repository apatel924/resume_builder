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
    <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden border-[#06BEE1]/20 h-full">
      {/* Resume content fills the entire container */}
      <div className="h-full bg-white overflow-auto">{renderTemplate()}</div>
    </Card>
  )
}
