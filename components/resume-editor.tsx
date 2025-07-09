"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useResume } from "@/contexts/resume-context"
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen, GripVertical, Eye } from "lucide-react"
import CollapsibleSection from "./collapsible-section"
import ExperienceEditModal from "./experience-edit-modal"
import ProjectEditModal from "./project-edit-modal"

export default function ResumeEditor() {
  const {
    resumeData,
    updateProfile,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addProject,
    updateProject,
    removeProject,
    reorderProjects,
  } = useResume()

  const [editingExperience, setEditingExperience] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [draggedExperience, setDraggedExperience] = useState<number | null>(null)
  const [draggedProject, setDraggedProject] = useState<number | null>(null)

  const handleSkillsChange = (categoryId: string, value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    updateSkillCategory(categoryId, "skills", skills)
  }

  const handleExperienceDrag = {
    start: (e: React.DragEvent, index: number) => {
      setDraggedExperience(index)
      e.dataTransfer.effectAllowed = "move"
    },
    over: (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
    },
    drop: (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault()
      if (draggedExperience !== null && draggedExperience !== dropIndex) {
        reorderExperience(draggedExperience, dropIndex)
      }
      setDraggedExperience(null)
    },
  }

  const handleProjectDrag = {
    start: (e: React.DragEvent, index: number) => {
      setDraggedProject(index)
      e.dataTransfer.effectAllowed = "move"
    },
    over: (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
    },
    drop: (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault()
      if (draggedProject !== null && draggedProject !== dropIndex) {
        reorderProjects(draggedProject, dropIndex)
      }
      setDraggedProject(null)
    },
  }

  return (
    <div className="space-y-4">
      {/* Profile Section */}
      <CollapsibleSection
        title="Personal Information"
        icon={<User className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-[#06BEE1] to-[#1768AC]"
        defaultOpen={true}
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-[#1768AC] font-medium text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                value={resumeData.profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-[#1768AC] font-medium text-sm">
                Professional Title
              </Label>
              <Input
                id="title"
                value={resumeData.profile.title}
                onChange={(e) => updateProfile("title", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-[#1768AC] font-medium text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={resumeData.profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[#1768AC] font-medium text-sm">
                Phone
              </Label>
              <Input
                id="phone"
                value={resumeData.profile.phone}
                onChange={(e) => updateProfile("phone", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-[#1768AC] font-medium text-sm">
                Location
              </Label>
              <Input
                id="location"
                value={resumeData.profile.location}
                onChange={(e) => updateProfile("location", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-[#1768AC] font-medium text-sm">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={resumeData.profile.linkedin}
                onChange={(e) => updateProfile("linkedin", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary" className="text-[#1768AC] font-medium text-sm">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              value={resumeData.profile.summary}
              onChange={(e) => updateProfile("summary", e.target.value)}
              rows={3}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Experience Section */}
      <CollapsibleSection
        title="Work Experience"
        icon={<Briefcase className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-[#2541B2] to-[#1768AC]"
      >
        <div className="space-y-3">
          {resumeData.experience.map((exp, index) => (
            <div
              key={exp.id}
              draggable
              onDragStart={(e) => handleExperienceDrag.start(e, index)}
              onDragOver={handleExperienceDrag.over}
              onDrop={(e) => handleExperienceDrag.drop(e, index)}
              className={`flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-[#06BEE1]/20 hover:bg-white/80 transition-colors cursor-pointer ${
                draggedExperience === index ? "opacity-50" : ""
              }`}
              onClick={() => setEditingExperience(exp.id)}
            >
              <div className="cursor-grab active:cursor-grabbing text-[#1768AC]/50 hover:text-[#1768AC]">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#03256C] text-sm truncate">
                      {exp.title || "Untitled Position"}
                    </h4>
                    <p className="text-[#1768AC] text-xs">
                      {exp.company && exp.location
                        ? `${exp.company} • ${exp.location}`
                        : exp.company || exp.location || "No company specified"}
                    </p>
                  </div>
                  <div className="text-right text-xs text-[#1768AC]/70">
                    {exp.startDate && (exp.current || exp.endDate) ? (
                      <span>
                        {exp.startDate} - {exp.current ? "present" : exp.endDate}
                      </span>
                    ) : (
                      <span>No dates specified</span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-[#1768AC]/50 hover:text-[#1768AC] hover:bg-[#06BEE1]/10 rounded-xl h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingExperience(exp.id)
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            onClick={addExperience}
            variant="outline"
            className="w-full border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 rounded-xl h-10 border-dashed bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Work Experience
          </Button>
        </div>
      </CollapsibleSection>

      {/* Education Section */}
      <CollapsibleSection
        title="Education"
        icon={<GraduationCap className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-[#1768AC] to-[#03256C]"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#1768AC]/70">Add your education</p>
            <Button
              onClick={addEducation}
              size="sm"
              className="bg-[#1768AC] hover:bg-[#1768AC]/80 text-white rounded-xl h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="bg-white/60 rounded-xl p-3 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-[#03256C] text-sm">Education {index + 1}</h4>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium text-xs">Details</Label>
                <Textarea
                  value={edu.details}
                  onChange={(e) => updateEducation(edu.id, "details", e.target.value)}
                  rows={2}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl text-sm"
                  placeholder="Relevant coursework, honors, GPA..."
                />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Skills Section */}
      <CollapsibleSection
        title="Skills"
        icon={<Code className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-[#2541B2] to-[#06BEE1]"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#1768AC]/70">Organize your skills by category</p>
            <Button
              onClick={addSkillCategory}
              size="sm"
              className="bg-[#2541B2] hover:bg-[#2541B2]/80 text-white rounded-xl h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Category
            </Button>
          </div>

          {resumeData.skillCategories.map((category, index) => (
            <div key={category.id} className="bg-white/60 rounded-xl p-3 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-[#03256C] text-sm">Category {index + 1}</h4>
                <Button
                  onClick={() => removeSkillCategory(category.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="mb-3">
                <Label className="text-[#1768AC] font-medium text-xs">Category Name</Label>
                <Input
                  value={category.name}
                  onChange={(e) => updateSkillCategory(category.id, "name", e.target.value)}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  placeholder="e.g., Programming Languages, Frameworks, Tools"
                />
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium text-xs">Skills (comma-separated)</Label>
                <Textarea
                  value={category.skills.join(", ")}
                  onChange={(e) => handleSkillsChange(category.id, e.target.value)}
                  rows={2}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl text-sm"
                  placeholder="JavaScript, React, Node.js..."
                />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Projects Section */}
      <CollapsibleSection
        title="Projects"
        icon={<FolderOpen className="w-6 h-6 text-white" />}
        gradient="bg-gradient-to-br from-[#1768AC] to-[#2541B2]"
      >
        <div className="space-y-3">
          {resumeData.projects.map((project, index) => (
            <div
              key={project.id}
              draggable
              onDragStart={(e) => handleProjectDrag.start(e, index)}
              onDragOver={handleProjectDrag.over}
              onDrop={(e) => handleProjectDrag.drop(e, index)}
              className={`flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-[#06BEE1]/20 hover:bg-white/80 transition-colors cursor-pointer ${
                draggedProject === index ? "opacity-50" : ""
              }`}
              onClick={() => setEditingProject(project.id)}
            >
              <div className="cursor-grab active:cursor-grabbing text-[#1768AC]/50 hover:text-[#1768AC]">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#03256C] text-sm truncate">
                      {project.name || "Untitled Project"}
                    </h4>
                    <p className="text-[#1768AC] text-xs truncate">
                      {project.technologies || "No technologies specified"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-[#1768AC]/50 hover:text-[#1768AC] hover:bg-[#06BEE1]/10 rounded-xl h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingProject(project.id)
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            onClick={addProject}
            variant="outline"
            className="w-full border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 rounded-xl h-10 border-dashed bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Project
          </Button>
        </div>
      </CollapsibleSection>

      {/* Modals */}
      <ExperienceEditModal
        experienceId={editingExperience}
        isOpen={!!editingExperience}
        onClose={() => setEditingExperience(null)}
      />

      <ProjectEditModal projectId={editingProject} isOpen={!!editingProject} onClose={() => setEditingProject(null)} />
    </div>
  )
}
