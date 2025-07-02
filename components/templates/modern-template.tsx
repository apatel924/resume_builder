"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, Calendar, ExternalLink } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#06BEE1]/10 via-[#1768AC]/10 to-[#2541B2]/10 rounded-3xl -z-10"></div>
        <div className="py-8 px-6">
          <h1 className="text-4xl font-bold text-[#03256C] mb-2">{data.profile.name}</h1>
          <p className="text-xl text-[#1768AC] mb-4">{data.profile.title}</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#1768AC]/80">
            <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
              <Mail className="w-4 h-4" />
              <span>{data.profile.email}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
              <Phone className="w-4 h-4" />
              <span>{data.profile.phone}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>{data.profile.location}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/60 px-3 py-1 rounded-full">
              <Linkedin className="w-4 h-4" />
              <span>{data.profile.linkedin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.profile.summary && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#06BEE1]/20 to-[#1768AC]/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#03256C] mb-3">Professional Summary</h2>
            <p className="text-[#03256C]/80 leading-relaxed">{data.profile.summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#03256C] mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2541B2] to-[#1768AC] rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Work Experience
          </h2>

          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-gradient-to-r from-[#06BEE1]/5 to-[#1768AC]/5 rounded-2xl p-6 border-l-4 border-[#06BEE1]"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03256C]">{exp.title}</h3>
                    <p className="text-[#1768AC] font-medium">{exp.company}</p>
                    <p className="text-[#1768AC]/70 text-sm">{exp.location}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#1768AC]/70 text-sm mt-2 md:mt-0">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-[#03256C]/80 whitespace-pre-line leading-relaxed">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#03256C] mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1768AC] to-[#03256C] rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-gradient-to-r from-[#1768AC]/5 to-[#03256C]/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03256C]">{edu.degree}</h3>
                    <p className="text-[#1768AC] font-medium">{edu.institution}</p>
                    <p className="text-[#1768AC]/70 text-sm">{edu.location}</p>
                  </div>
                  <div className="text-[#1768AC]/70 text-sm mt-2 md:mt-0">{edu.year}</div>
                </div>
                {edu.details && <p className="text-[#03256C]/80 text-sm">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#03256C] mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2541B2] to-[#06BEE1] rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Skills
          </h2>

          <div className="bg-gradient-to-r from-[#06BEE1]/10 to-[#2541B2]/10 rounded-2xl p-6">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white/80 text-[#03256C] px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#03256C] mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1768AC] to-[#2541B2] rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Projects
          </h2>

          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-gradient-to-r from-[#2541B2]/5 to-[#1768AC]/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <h3 className="text-lg font-semibold text-[#03256C]">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#06BEE1] hover:text-[#1768AC] text-sm mt-2 md:mt-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-[#1768AC] font-medium text-sm mb-2">{project.technologies}</p>
                <p className="text-[#03256C]/80 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
