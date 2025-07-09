"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, ExternalLink } from "lucide-react"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const allSkills =
    data.skillCategories.length > 0 ? data.skillCategories.flatMap((cat) => cat.skills) : data.skills || []

  // Calculate content sections
  const sections = []

  // Header height: 120px
  const headerHeight = 120

  // Summary section
  if (data.profile.summary) {
    sections.push({
      id: "summary",
      component: (
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#03256C] mb-3 pb-2 border-b-2 border-[#06BEE1] w-full">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[#03256C]/80 leading-relaxed text-sm">{data.profile.summary}</p>
        </div>
      ),
      estimatedHeight: 70 + Math.ceil(data.profile.summary.length / 110) * 18,
    })
  }

  // Experience sections
  data.experience.forEach((exp, index) => {
    sections.push({
      id: `experience-${index}`,
      component: (
        <div className="mb-5">
          {index === 0 && (
            <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] w-full">
              WORK EXPERIENCE
            </h2>
          )}
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[#03256C]">{exp.title}</h3>
                <p className="text-[#1768AC] font-medium text-sm">
                  {exp.company} • {exp.location}
                </p>
              </div>
              <div className="text-[#1768AC]/70 text-sm font-medium">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
            </div>
            {exp.description && (
              <div className="text-[#03256C]/80 text-xs leading-relaxed ml-4 whitespace-pre-line">
                {exp.description}
              </div>
            )}
          </div>
        </div>
      ),
      estimatedHeight: 70 + (exp.description ? Math.ceil(exp.description.length / 90) * 14 : 0),
    })
  })

  // Education section
  if (data.education.length > 0) {
    sections.push({
      id: "education",
      component: (
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] w-full">EDUCATION</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[#03256C]">{edu.degree}</h3>
                    <p className="text-[#1768AC] font-medium text-sm">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>
                  <div className="text-[#1768AC]/70 text-sm font-medium">{edu.year}</div>
                </div>
                {edu.details && <p className="text-[#03256C]/80 text-xs ml-4">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      ),
      estimatedHeight: 55 + data.education.length * 50,
    })
  }

  // Skills section
  if (allSkills.length > 0) {
    sections.push({
      id: "skills",
      component: (
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#03256C] mb-3 pb-2 border-b-2 border-[#06BEE1] w-full">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {allSkills.map((skill, index) => (
              <div key={index} className="text-[#03256C]/80 text-xs">
                • {skill}
              </div>
            ))}
          </div>
        </div>
      ),
      estimatedHeight: 55 + Math.ceil(allSkills.length / 3) * 18,
    })
  }

  // Projects sections
  data.projects.forEach((project, index) => {
    sections.push({
      id: `project-${index}`,
      component: (
        <div className="mb-4">
          {index === 0 && (
            <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] w-full">
              PROJECTS
            </h2>
          )}
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-semibold text-[#03256C]">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#06BEE1] hover:text-[#1768AC] text-xs"
                >
                  <ExternalLink className="w-3 h-3" />
                  View
                </a>
              )}
            </div>
            <p className="text-[#1768AC] font-medium text-xs mb-1">{project.technologies}</p>
            <p className="text-[#03256C]/80 ml-4 text-xs leading-relaxed">{project.description}</p>
          </div>
        </div>
      ),
      estimatedHeight: 65 + Math.ceil(project.description.length / 90) * 14,
    })
  })

  // Distribute sections across pages - INCREASED USABLE SPACE
  const pages: typeof sections[] = []
  let currentPage: typeof sections = []
  let currentPageHeight = headerHeight + 48 // Header + reduced padding
  const maxPageHeight = 760 // INCREASED from 720 - maximize space usage!

  sections.forEach((section) => {
    if (currentPageHeight + section.estimatedHeight <= maxPageHeight) {
      currentPage.push(section)
      currentPageHeight += section.estimatedHeight
    } else {
      if (currentPage.length > 0) {
        pages.push([...currentPage])
      }
      currentPage = [section]
      currentPageHeight = 48 + section.estimatedHeight // Reduced new page padding + section
    }
  })

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return (
    <div className="resume-container">
      {pages.map((pageSections, pageIndex) => (
        <div key={pageIndex} className="resume-page" style={{ width: "612px", height: "792px" }}>
          <div className="w-full h-full bg-white">
            {/* Header - Only on first page */}
            {pageIndex === 0 && (
              <div className="text-center px-12 py-8 border-b-4 border-[#03256C] w-full" style={{ height: "120px" }}>
                <h1 className="text-2xl font-bold text-[#03256C] mb-2 leading-tight">{data.profile.name}</h1>
                <p className="text-lg text-[#1768AC] mb-3">{data.profile.title}</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-[#03256C]/80">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#1768AC]" />
                    <span>{data.profile.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#1768AC]" />
                    <span>{data.profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1768AC]" />
                    <span>{data.profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-[#1768AC]" />
                    <span>{data.profile.linkedin}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Continuation header for subsequent pages */}
            {pageIndex > 0 && (
              <div className="text-center px-12 py-3 border-b-2 border-[#03256C]" style={{ height: "48px" }}>
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold text-[#03256C]">{data.profile.name}</h1>
                  <span className="text-[#1768AC] text-sm">Page {pageIndex + 1}</span>
                </div>
              </div>
            )}

            {/* Content - INCREASED AVAILABLE HEIGHT */}
            <div className="px-12 py-5" style={{ height: pageIndex === 0 ? "672px" : "744px" }}>
              {pageSections.map((section) => (
                <div key={section.id}>{section.component}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
