"use client"

import type React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ZoomOut, Download } from "lucide-react"
import { useState } from "react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  template: React.ReactNode
}

export default function ResumeModal({ isOpen, onClose, template }: ResumeModalProps) {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-gray-50 flex flex-col">
        {/* Header Controls */}
        <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[#03256C]">Resume Preview</h2>
            <span className="text-sm text-[#1768AC]/70">({Math.round(zoom * 100)}%)</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleZoomOut}
              variant="outline"
              size="sm"
              className="border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 bg-transparent"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>

            <Button
              onClick={resetZoom}
              variant="outline"
              size="sm"
              className="border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 min-w-[60px] bg-transparent"
            >
              {Math.round(zoom * 100)}%
            </Button>

            <Button
              onClick={handleZoomIn}
              variant="outline"
              size="sm"
              className="border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 bg-transparent"
              disabled={zoom >= 2}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <Button
              variant="outline"
              size="sm"
              className="border-[#2541B2]/30 text-[#2541B2] hover:bg-[#2541B2]/10 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>

            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Resume Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="flex justify-center min-h-full">
            <div
              className="transition-transform duration-200 origin-top"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            >
              {template}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
