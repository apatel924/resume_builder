"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useResume } from "@/contexts/resume-context"
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen } from "lucide-react"
import CollapsibleSection from "./collapsible-section"

export default function ResumeEditor() {
  const {
    resumeData,
    updateProfile,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addProject,
    updateProject,
    removeProject,
  } = useResume()

  const handleSkillsChange = (categoryId: string, value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    updateSkillCategory(categoryId, "skills", skills)
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#1768AC]/70">Add your work experience</p>
            <Button
              onClick={addExperience}
              size="sm"
              className="bg-[#06BEE1] hover:bg-[#06BEE1]/80 text-white rounded-xl h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="bg-white/60 rounded-xl p-3 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-[#03256C] text-sm">Experience {index + 1}</h4>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, "current", checked as boolean)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-[#1768AC] font-medium text-xs">
                  I currently work here
                </Label>
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium text-xs">Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  rows={2}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl text-sm"
                  placeholder="• Describe your key achievements"
                />
              </div>
            </div>
          ))}
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#1768AC]/70">Add your projects</p>
            <Button
              onClick={addProject}
              size="sm"
              className="bg-[#2541B2] hover:bg-[#2541B2]/80 text-white rounded-xl h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {resumeData.projects.map((project, index) => (
            <div key={project.id} className="bg-white/60 rounded-xl p-3 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-[#03256C] text-sm">Project {index + 1}</h4>
                <Button
                  onClick={() => removeProject(project.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium text-xs">Link (optional)</Label>
                  <Input
                    value={project.link || ""}
                    onChange={(e) => updateProject(project.id, "link", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                    placeholder="github.com/username/project"
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label className="text-[#1768AC] font-medium text-xs">Technologies</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl h-8 text-sm"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium text-xs">Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  rows={2}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl text-sm"
                  placeholder="Describe the project and your role"
                />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  )
}
