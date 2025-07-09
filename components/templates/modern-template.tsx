"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, Calendar, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  // Calculate content sections and their estimated heights
  const sections = []

  // Header section (fixed height: 140px)
  const headerHeight = 140

  // Summary section
  if (data.profile.summary) {
    sections.push({
      id: "summary",
      component: (
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#03256C] mb-3 pb-2 border-b-2 border-[#06BEE1] flex items-center gap-2 w-full">
            <Award className="w-4 h-4 text-[#06BEE1]" />
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{data.profile.summary}</p>
        </div>
      ),
      estimatedHeight: 70 + Math.ceil(data.profile.summary.length / 120) * 18,
    })
  }

  // Skills section
  if (data.skillCategories.length > 0) {
    sections.push({
      id: "skills",
      component: (
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#03256C] mb-3 pb-2 border-b-2 border-[#06BEE1] flex items-center gap-2 w-full">
            <Award className="w-4 h-4 text-[#06BEE1]" />
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skillCategories.map((category) => (
              <div key={category.id}>
                <h3 className="font-semibold text-[#1768AC] mb-1 text-sm">{category.name}</h3>
                <p className="text-gray-700 text-xs">{category.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      estimatedHeight: 55 + Math.ceil(data.skillCategories.length / 2) * 35,
    })
  }

  // Experience sections (each experience as separate section)
  data.experience.forEach((exp, index) => {
    sections.push({
      id: `experience-${index}`,
      component: (
        <div className="mb-6">
          {index === 0 && (
            <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] flex items-center gap-2 w-full">
              <Briefcase className="w-4 h-4 text-[#06BEE1]" />
              WORK EXPERIENCE
            </h2>
          )}
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[#03256C]">{exp.title}</h3>
                <p className="text-[#1768AC] font-medium text-sm">{exp.company}</p>
                <p className="text-gray-600 text-xs">{exp.location}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <Calendar className="w-3 h-3" />
                <span>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
            </div>
            {exp.description && (
              <div className="text-gray-700 whitespace-pre-line text-xs leading-relaxed">{exp.description}</div>
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
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] flex items-center gap-2 w-full">
            <GraduationCap className="w-4 h-4 text-[#06BEE1]" />
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-[#1768AC] text-sm">{edu.institution}</h3>
                    <p className="text-[#03256C] font-medium text-xs">{edu.degree}</p>
                    <p className="text-gray-600 text-xs">{edu.location}</p>
                  </div>
                  <div className="text-gray-600 text-xs font-medium">{edu.year}</div>
                </div>
                {edu.details && <p className="text-gray-700 text-xs mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      ),
      estimatedHeight: 55 + data.education.length * 50,
    })
  }

  // Projects sections (each project as separate section)
  data.projects.forEach((project, index) => {
    sections.push({
      id: `project-${index}`,
      component: (
        <div className="mb-6">
          {index === 0 && (
            <h2 className="text-base font-bold text-[#03256C] mb-4 pb-2 border-b-2 border-[#06BEE1] flex items-center gap-2 w-full">
              <Award className="w-4 h-4 text-[#06BEE1]" />
              PROJECTS
            </h2>
          )}
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-[#03256C] text-sm">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#06BEE1] hover:text-[#1768AC] text-xs"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View</span>
                </a>
              )}
            </div>
            <p className="text-[#1768AC] font-medium text-xs mb-1">{project.technologies}</p>
            <p className="text-gray-700 text-xs leading-relaxed">{project.description}</p>
          </div>
        </div>
      ),
      estimatedHeight: 60 + Math.ceil(project.description.length / 90) * 14,
    })
  })

  // Distribute sections across pages - INCREASED USABLE SPACE
  const pages: typeof sections[] = []
  let currentPage: typeof sections = []
  let currentPageHeight = headerHeight + 48 // Header + reduced padding
  const maxPageHeight = 760 

  sections.forEach((section) => {
    if (currentPageHeight + section.estimatedHeight <= maxPageHeight) {
      currentPage.push(section)
      currentPageHeight += section.estimatedHeight
    } else {
      // Start new page
      if (currentPage.length > 0) {
        pages.push([...currentPage])
      }
      currentPage = [section]
      currentPageHeight = 48 + section.estimatedHeight 
    }
  })

  // Add remaining sections to last page
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
              <div className="bg-[#03256C] text-white px-12 py-8" style={{ height: "140px" }}>
                <h1 className="text-3xl font-bold mb-2 leading-tight">{data.profile.name}</h1>
                <p className="text-lg text-[#06BEE1] font-medium italic mb-4">{data.profile.title}</p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#06BEE1] flex-shrink-0" />
                    <span className="truncate">{data.profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#06BEE1] flex-shrink-0" />
                    <span className="truncate">{data.profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#06BEE1] flex-shrink-0" />
                    <span className="truncate">{data.profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#06BEE1] flex-shrink-0" />
                    <span className="truncate">{data.profile.linkedin}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Continuation header for subsequent pages */}
            {pageIndex > 0 && (
              <div className="bg-[#03256C] text-white px-12 py-3" style={{ height: "48px" }}>
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">{data.profile.name}</h1>
                  <span className="text-[#06BEE1] text-sm">Page {pageIndex + 1}</span>
                </div>
              </div>
            )}

            {/* Content - INCREASED AVAILABLE HEIGHT */}
            <div className="px-12 py-6" style={{ height: pageIndex === 0 ? "652px" : "744px" }}>
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
