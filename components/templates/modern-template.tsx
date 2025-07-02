"use client"

import type { ResumeData } from "@/contexts/resume-context"
import { Mail, Phone, MapPin, Linkedin, Calendar, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Dark Header Section */}
      <div className="bg-[#03256C] text-white p-8 mb-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-wide">{data.profile.name}</h1>
            <p className="text-xl text-[#06BEE1] font-medium italic">{data.profile.title}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#06BEE1]" />
            <span>{data.profile.email}</span>
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
            <Linkedin className="w-4 h-4 text-[#06BEE1]" />
            <span>{data.profile.linkedin}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {data.profile.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#06BEE1]" />
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.profile.summary}</p>
          </div>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#06BEE1]" />
              SKILLS
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#1768AC] mb-2">Programming Languages</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {data.skills
                    .filter((skill) =>
                      [
                        "JavaScript",
                        "TypeScript",
                        "Python",
                        "Java",
                        "C#",
                        "PHP",
                        "Ruby",
                        "Go",
                        "Rust",
                        "Swift",
                        "Kotlin",
                      ].some((lang) => skill.toLowerCase().includes(lang.toLowerCase())),
                    )
                    .join(", ") || data.skills.slice(0, Math.ceil(data.skills.length / 3)).join(", ")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1768AC] mb-2">Frameworks/Libraries</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {data.skills
                    .filter((skill) =>
                      [
                        "React",
                        "Vue",
                        "Angular",
                        "Node.js",
                        "Express",
                        "Next.js",
                        "Django",
                        "Flask",
                        "Spring",
                        "Laravel",
                      ].some((framework) => skill.toLowerCase().includes(framework.toLowerCase())),
                    )
                    .join(", ") ||
                    data.skills
                      .slice(Math.ceil(data.skills.length / 3), Math.ceil((2 * data.skills.length) / 3))
                      .join(", ")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1768AC] mb-2">Tools and Platforms</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {data.skills
                    .filter((skill) =>
                      ["AWS", "Docker", "Git", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Kubernetes", "Jenkins"].some(
                        (tool) => skill.toLowerCase().includes(tool.toLowerCase()),
                      ),
                    )
                    .join(", ") || data.skills.slice(Math.ceil((2 * data.skills.length) / 3)).join(", ")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1768AC] mb-2">Other Skills</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {data.skills
                    .filter(
                      (skill) =>
                        ![
                          "JavaScript",
                          "TypeScript",
                          "Python",
                          "Java",
                          "C#",
                          "PHP",
                          "Ruby",
                          "Go",
                          "Rust",
                          "Swift",
                          "Kotlin",
                          "React",
                          "Vue",
                          "Angular",
                          "Node.js",
                          "Express",
                          "Next.js",
                          "Django",
                          "Flask",
                          "Spring",
                          "Laravel",
                          "AWS",
                          "Docker",
                          "Git",
                          "MongoDB",
                          "PostgreSQL",
                          "MySQL",
                          "Redis",
                          "Kubernetes",
                          "Jenkins",
                        ].some((known) => skill.toLowerCase().includes(known.toLowerCase())),
                    )
                    .join(", ") || "Agile/Scrum, Problem Solving, Team Leadership"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#06BEE1]" />
              EDUCATION
            </h2>

            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-[#1768AC]">{edu.institution}</h3>
                      <p className="text-[#03256C] font-medium italic">{edu.degree}</p>
                      <p className="text-gray-600 text-sm">{edu.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 text-sm font-medium">{edu.year}</div>
                    </div>
                  </div>
                  {edu.details && <p className="text-gray-700 text-sm mt-2">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#06BEE1]" />
              WORK EXPERIENCE
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[#03256C]">{exp.title}</h3>
                      <p className="text-[#1768AC] font-medium italic">{exp.company}</p>
                      <p className="text-gray-600 text-sm">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {exp.description && (
                    <div className="mt-3">
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">{exp.description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#03256C] mb-4 pb-2 border-b border-[#06BEE1]/30 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#06BEE1]" />
              PROJECTS
            </h2>

            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#03256C]">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#06BEE1] hover:text-[#1768AC] text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    )}
                  </div>
                  <p className="text-[#1768AC] font-medium text-sm mb-2 italic">{project.technologies}</p>
                  <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
