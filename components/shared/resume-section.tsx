"use client"

import type React from "react"

interface ResumeSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}

export default function ResumeSection({ title, icon, children, className = "" }: ResumeSectionProps) {
  return (
    <div className={`mb-8 break-inside-avoid ${className}`}>
      <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  )
}
