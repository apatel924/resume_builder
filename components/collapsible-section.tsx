"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  gradient: string
}

export default function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  gradient,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className="w-full justify-between p-0 h-auto hover:bg-transparent"
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>{icon}</div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#03256C]">{title}</h2>
              <p className="text-sm text-[#1768AC]/70">{isOpen ? "Click to collapse" : "Click to expand"}</p>
            </div>
          </div>
          <div className="w-8 h-8 bg-[#06BEE1]/20 rounded-xl flex items-center justify-center">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-[#06BEE1]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#06BEE1]" />
            )}
          </div>
        </Button>
      </CardHeader>

      {isOpen && (
        <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
          <div className="bg-white/40 rounded-2xl p-4 border border-[#06BEE1]/20">{children}</div>
        </CardContent>
      )}
    </Card>
  )
}
