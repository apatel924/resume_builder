"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, Calendar, ExternalLink } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const allSkills =
    data.skillCategories.length > 0 ? data.skillCategories.flatMap((cat) => cat.skills) : data.skills || []

  // Calculate sections for main content area
  const sections = []

  // About Me section
  if (data.profile.summary) {
    sections.push({
      id: "about",
      component: (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#03256C] mb-3 relative w-full">
            <span className="bg-gradient-to-r from-[#06BEE1] to-[#1768AC] bg-clip-text text-transparent">About Me</span>
            <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#06BEE1] to-[#1768AC] rounded-full"></div>
          </h2>
          <p className="text-[#03256C]/80 leading-relaxed text-xs">{data.profile.summary}</p>
        </div>
      ),
      estimatedHeight: 70 + Math.ceil(data.profile.summary.length / 130) * 14,
    })
  }

  // Experience sections
  data.experience.forEach((exp, index) => {
    sections.push({
      id: `experience-${index}`,
      component: (
        <div className="mb-5">
          {index === 0 && (
            <h2 className="text-lg font-bold text-[#03256C] mb-4 relative w-full">
              <span className="bg-gradient-to-r from-[#2541B2] to-[#1768AC] bg-clip-text text-transparent">
                Experience
              </span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#2541B2] to-[#1768AC] rounded-full"></div>
            </h2>
          )}
          <div className="relative pl-6">
            <div className="absolute left-1 top-1 w-2 h-2 bg-[#06BEE1] rounded-full border-2 border-white shadow-sm"></div>
            <div className="bg-gradient-to-r from-[#06BEE1]/5 to-transparent rounded-r-lg p-3 border-l-2 border-[#06BEE1]">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-semibold text-[#03256C] leading-tight">{exp.title}</h3>
                  <p className="text-[#1768AC] font-medium text-xs">{exp.company}</p>
                  <p className="text-[#1768AC]/70 text-xs">{exp.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[#1768AC]/70 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
              </div>
              {exp.description && <div className="text-[#03256C]/80 text-xs leading-relaxed">{exp.description}</div>}
            </div>
          </div>
        </div>
      ),
      estimatedHeight: 85 + (exp.description ? Math.ceil(exp.description.length / 110) * 14 : 0),
    })
  })

  // Projects sections
  data.projects.forEach((project, index) => {
    sections.push({
      id: `project-${index}`,
      component: (
        <div className="mb-4">
          {index === 0 && (
            <h2 className="text-lg font-bold text-[#03256C] mb-4 relative w-full">
              <span className="bg-gradient-to-r from-[#1768AC] to-[#2541B2] bg-clip-text text-transparent">
                Projects
              </span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#1768AC] to-[#2541B2] rounded-full"></div>
            </h2>
          )}
          <div className="bg-gradient-to-r from-[#2541B2]/5 to-transparent rounded-lg p-3 border border-[#2541B2]/20">
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
                </a>
              )}
            </div>
            <p className="text-[#1768AC] font-medium text-xs mb-1">{project.technologies}</p>
            <p className="text-[#03256C]/80 text-xs leading-relaxed">{project.description}</p>
          </div>
        </div>
      ),
      estimatedHeight: 80 + Math.ceil(project.description.length / 110) * 14,
    })
  })

  // Distribute sections across pages - INCREASED USABLE SPACE
  const pages: typeof sections[] = []
  let currentPage: typeof sections = []
  let currentPageHeight = 48 // Reduced initial padding
  const maxPageHeight = 740 // INCREASED from 720 - more space utilization!

  sections.forEach((section) => {
    if (currentPageHeight + section.estimatedHeight <= maxPageHeight) {
      currentPage.push(section)
      currentPageHeight += section.estimatedHeight
    } else {
      if (currentPage.length > 0) {
        pages.push([...currentPage])
      }
      currentPage = [section]
      currentPageHeight = 48 + section.estimatedHeight
    }
  })

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return (
    <div className="resume-container">
      {pages.map((pageSections, pageIndex) => (
        <div key={pageIndex} className="resume-page" style={{ width: "612px", height: "792px" }}>
          <div className="w-full h-full bg-white flex">
            {/* Sidebar - Consistent across all pages */}
            <div className="bg-gradient-to-b from-[#03256C] to-[#1768AC] text-white p-6" style={{ width: "200px" }}>
              {/* Profile - Only on first page */}
              {pageIndex === 0 && (
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#06BEE1] rounded-full flex items-center justify-center text-[#03256C] font-bold text-sm">
                      {data.profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <h1 className="text-lg font-bold mb-1 leading-tight">{data.profile.name}</h1>
                  <p className="text-[#06BEE1] font-medium text-sm">{data.profile.title}</p>
                </div>
              )}

              {/* Continuation header for subsequent pages */}
              {pageIndex > 0 && (
                <div className="text-center mb-6">
                  <h1 className="text-lg font-bold text-[#06BEE1]">{data.profile.name}</h1>
                  <p className="text-sm text-white/80">Page {pageIndex + 1}</p>
                </div>
              )}

              {/* Contact - Only on first page */}
              {pageIndex === 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold mb-3 text-[#06BEE1]">Contact</h2>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-[#06BEE1] flex-shrink-0" />
                      <span className="break-all leading-tight">{data.profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-[#06BEE1] flex-shrink-0" />
                      <span>{data.profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-[#06BEE1] flex-shrink-0" />
                      <span>{data.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-3 h-3 text-[#06BEE1] flex-shrink-0" />
                      <span className="break-all leading-tight">{data.profile.linkedin}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills - Only on first page */}
              {pageIndex === 0 && allSkills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold mb-3 text-[#06BEE1]">Skills</h2>
                  <div className="space-y-1">
                    {allSkills.slice(0, 8).map((skill, index) => (
                      <div key={index} className="bg-white/10 rounded-full px-2 py-1 text-xs">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education - Only on first page */}
              {pageIndex === 0 && data.education.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold mb-3 text-[#06BEE1]">Education</h2>
                  <div className="space-y-3">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <h3 className="font-semibold text-sm leading-tight">{edu.degree}</h3>
                        <p className="text-[#06BEE1] font-medium text-xs">{edu.institution}</p>
                        <p className="text-white/80 text-xs">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content - INCREASED AVAILABLE HEIGHT */}
            <div className="flex-1 p-5" style={{ width: "412px" }}>
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
