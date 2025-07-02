"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useResume } from "@/contexts/resume-context"
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen } from "lucide-react"

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
    updateSkills,
    addProject,
    updateProject,
    removeProject,
  } = useResume()

  const handleSkillsChange = (value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    updateSkills(skills)
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#06BEE1] to-[#1768AC] rounded-2xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-[#03256C]">Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-[#1768AC] font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={resumeData.profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-[#1768AC] font-medium">
                Professional Title
              </Label>
              <Input
                id="title"
                value={resumeData.profile.title}
                onChange={(e) => updateProfile("title", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-[#1768AC] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={resumeData.profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[#1768AC] font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                value={resumeData.profile.phone}
                onChange={(e) => updateProfile("phone", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-[#1768AC] font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={resumeData.profile.location}
                onChange={(e) => updateProfile("location", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-[#1768AC] font-medium">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={resumeData.profile.linkedin}
                onChange={(e) => updateProfile("linkedin", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary" className="text-[#1768AC] font-medium">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              value={resumeData.profile.summary}
              onChange={(e) => updateProfile("summary", e.target.value)}
              rows={4}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2541B2] to-[#1768AC] rounded-2xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-[#03256C]">Work Experience</CardTitle>
            </div>
            <Button
              onClick={addExperience}
              size="sm"
              className="bg-[#06BEE1] hover:bg-[#06BEE1]/80 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="bg-white/40 rounded-2xl p-4 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-[#03256C]">Experience {index + 1}</h4>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-[#1768AC] font-medium">Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-[#1768AC] font-medium">Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, "current", checked as boolean)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-[#1768AC] font-medium">
                  I currently work here
                </Label>
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium">Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  rows={3}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  placeholder="• Describe your key achievements and responsibilities"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1768AC] to-[#03256C] rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-[#03256C]">Education</CardTitle>
            </div>
            <Button
              onClick={addEducation}
              size="sm"
              className="bg-[#1768AC] hover:bg-[#1768AC]/80 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="bg-white/40 rounded-2xl p-4 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-[#03256C]">Education {index + 1}</h4>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-[#1768AC] font-medium">Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-[#1768AC] font-medium">Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">Graduation Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium">Additional Details</Label>
                <Textarea
                  value={edu.details}
                  onChange={(e) => updateEducation(edu.id, "details", e.target.value)}
                  rows={2}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  placeholder="Relevant coursework, honors, GPA, etc."
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2541B2] to-[#06BEE1] rounded-2xl flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-[#03256C]">Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-[#1768AC] font-medium">Skills (comma-separated)</Label>
            <Textarea
              value={resumeData.skills.join(", ")}
              onChange={(e) => handleSkillsChange(e.target.value)}
              rows={3}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              placeholder="JavaScript, React, Node.js, Python, AWS..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-[#06BEE1]/20 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1768AC] to-[#2541B2] rounded-2xl flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-[#03256C]">Projects</CardTitle>
            </div>
            <Button onClick={addProject} size="sm" className="bg-[#2541B2] hover:bg-[#2541B2]/80 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <div key={project.id} className="bg-white/40 rounded-2xl p-4 border border-[#06BEE1]/20">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-[#03256C]">Project {index + 1}</h4>
                <Button
                  onClick={() => removeProject(project.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-[#1768AC] font-medium">Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-[#1768AC] font-medium">Link (optional)</Label>
                  <Input
                    value={project.link || ""}
                    onChange={(e) => updateProject(project.id, "link", e.target.value)}
                    className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                    placeholder="github.com/username/project"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-[#1768AC] font-medium">Technologies Used</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <Label className="text-[#1768AC] font-medium">Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  rows={3}
                  className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
                  placeholder="Describe what the project does and your role in it"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
