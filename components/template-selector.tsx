"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useResume } from "@/contexts/resume-context"
import { Palette, Layout, Sparkles } from "lucide-react"

const templates = [
  {
    id: "modern",
    name: "Modern Bubble",
    description: "Clean and contemporary with soft rounded elements",
    icon: Sparkles,
    preview: "Single column with floating sections and gentle shadows",
  },
  {
    id: "creative",
    name: "Creative Flow",
    description: "Two-column layout with artistic flair",
    icon: Palette,
    preview: "Sidebar design with colorful accents and organic shapes",
  },
  {
    id: "professional",
    name: "Professional Zen",
    description: "Traditional yet elegant with Studio Ghibli touches",
    icon: Layout,
    preview: "Classic layout enhanced with subtle magical elements",
  },
]

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume()

  return (
    <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2541B2] to-[#1768AC] rounded-2xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#03256C]">Choose Your Template</h2>
            <p className="text-sm text-[#1768AC]/70">Switch templates instantly to see your resume transform</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {templates.map((template) => {
            const Icon = template.icon
            const isSelected = selectedTemplate === template.id

            return (
              <Button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                variant="ghost"
                className={`h-auto p-4 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-br from-[#06BEE1]/20 to-[#1768AC]/20 border-2 border-[#06BEE1] shadow-lg scale-105"
                    : "bg-white/40 hover:bg-white/60 border border-[#06BEE1]/20 hover:shadow-md hover:scale-102"
                }`}
              >
                <div className="text-left w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-[#06BEE1] text-white" : "bg-[#1768AC]/20 text-[#1768AC]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`font-semibold ${isSelected ? "text-[#03256C]" : "text-[#1768AC]"}`}>
                      {template.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#03256C]/70 mb-2">{template.description}</p>
                  <p className="text-xs text-[#1768AC]/60">{template.preview}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
