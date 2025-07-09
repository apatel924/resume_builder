"use client"

import { useState } from "react"
import { useResume } from "@/contexts/resume-context"
import ModernTemplate from "./templates/modern-template"
import CreativeTemplate from "./templates/creative-template"
import ProfessionalTemplate from "./templates/professional-template"
import ResumeModal from "./resume-modal"

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResume()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      {/* Resume Preview - Matching reference sizing exactly */}
      <div className="h-full bg-gray-50 overflow-auto cursor-zoom-in p-3" onClick={() => setIsModalOpen(true)}>
        <div
          className="bg-white shadow-lg border border-gray-200 mx-auto"
          style={{
            width: "100%",
            maxWidth: "700px", // Match reference width
            aspectRatio: "8.5 / 11", // Letter size proportions
          }}
        >
          <div
            style={{
              width: "612px",
              height: "792px",
              transform: "scale(1.14)", // Perfect scaling to match reference
              transformOrigin: "top left",
              overflow: "visible", // Allow content to flow to multiple pages
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Full-Size Modal */}
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} template={renderTemplate()} />
    </>
  )
}
