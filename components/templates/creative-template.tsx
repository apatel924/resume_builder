"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, LinkedinIcon, Calendar, ExternalLink } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-[#03256C] to-[#1768AC] text-white p-6 rounded-l-3xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#06BEE1] rounded-full flex items-center justify-center text-[#03256C] font-bold text-xl">
              {data.profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.profile.name}</h1>
          <p className="text-[#06BEE1] font-medium">{data.profile.title}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-[#06BEE1]">Contact</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#06BEE1]" />
              <span className="break-all">{data.profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#06BEE1]" />
              <span>{data.profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#06BEE1]" />
              <span>{data.profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-4 h-4 text-[#06BEE1]" />
              <span className="break-all">{data.profile.linkedin}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-[#06BEE1]">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-white/10 rounded-full px-3 py-1 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#06BEE1]">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-[#06BEE1]">{edu.institution}</p>
                  <p className="text-white/80">{edu.year}</p>
                  {edu.details && <p className="text-white/70 text-xs mt-1">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {data.profile.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#03256C] mb-4 relative">
              <span className="bg-gradient-to-r from-[#06BEE1] to-[#1768AC] bg-clip-text text-transparent">
                About Me
              </span>
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#06BEE1] to-[#1768AC] rounded-full"></div>
            </h2>
            <p className="text-[#03256C]/80 leading-relaxed">{data.profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#03256C] mb-6 relative">
              <span className="bg-gradient-to-r from-[#2541B2] to-[#1768AC] bg-clip-text text-transparent">
                Experience
              </span>
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#2541B2] to-[#1768AC] rounded-full"></div>
            </h2>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#06BEE1] to-[#1768AC]"></div>

              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-10">
                  <div className="absolute left-2 top-2 w-4 h-4 bg-[#06BEE1] rounded-full border-4 border-white shadow-lg"></div>

                  <div className="bg-gradient-to-r from-[#06BEE1]/5 to-transparent rounded-r-2xl p-4 border-l-4 border-[#06BEE1]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[#03256C]">{exp.title}</h3>
                        <p className="text-[#1768AC] font-medium">{exp.company}</p>
                        <p className="text-[#1768AC]/70 text-sm">{exp.location}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#1768AC]/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-[#03256C]/80 whitespace-pre-line leading-relaxed text-sm">
                        {exp.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#03256C] mb-6 relative">
              <span className="bg-gradient-to-r from-[#1768AC] to-[#2541B2] bg-clip-text text-transparent">
                Projects
              </span>
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#1768AC] to-[#2541B2] rounded-full"></div>
            </h2>

            <div className="grid gap-4">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-r from-[#2541B2]/5 to-transparent rounded-2xl p-4 border border-[#2541B2]/20"
                >
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
                      </a>
                    )}
                  </div>
                  <p className="text-[#1768AC] font-medium text-sm mb-2">{project.technologies}</p>
                  <p className="text-[#03256C]/80 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
