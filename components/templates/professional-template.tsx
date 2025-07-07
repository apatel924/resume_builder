"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, ExternalLink } from "lucide-react"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="border-b-4 border-gradient-to-r from-[#03256C] to-[#1768AC] pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#03256C] mb-2">{data.profile.name}</h1>
          <p className="text-xl text-[#1768AC] mb-4">{data.profile.title}</p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#03256C]/80">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1768AC]" />
              <span>{data.profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#1768AC]" />
              <span>{data.profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1768AC]" />
              <span>{data.profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-[#1768AC]" />
              <span>{data.profile.linkedin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.profile.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1]">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[#03256C]/80 leading-relaxed">{data.profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#03256C] mb-6 pb-2 border-b-2 border-[#06BEE1]">WORK EXPERIENCE</h2>

          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03256C]">{exp.title}</h3>
                    <p className="text-[#1768AC] font-medium">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="text-[#1768AC]/70 text-sm font-medium">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-[#03256C]/80 whitespace-pre-line leading-relaxed ml-4">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#03256C] mb-6 pb-2 border-b-2 border-[#06BEE1]">EDUCATION</h2>

          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03256C]">{edu.degree}</h3>
                    <p className="text-[#1768AC] font-medium">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>
                  <div className="text-[#1768AC]/70 text-sm font-medium">{edu.year}</div>
                </div>
                {edu.details && <p className="text-[#03256C]/80 text-sm ml-4">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skillCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1]">TECHNICAL SKILLS</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {data.skillCategories.map((category) => (
              <div key={category.id} className="text-[#03256C]/80 text-sm">
                • {category.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-[#03256C] mb-6 pb-2 border-b-2 border-[#06BEE1]">PROJECTS</h2>

          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#03256C]">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#06BEE1] hover:text-[#1768AC] text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  )}
                </div>
                <p className="text-[#1768AC] font-medium text-sm mb-1">{project.technologies}</p>
                <p className="text-[#03256C]/80 leading-relaxed ml-4">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
