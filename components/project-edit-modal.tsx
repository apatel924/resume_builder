"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useResume } from "@/contexts/resume-context"
import { Trash2 } from "lucide-react"

interface ProjectEditModalProps {
  projectId: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectEditModal({ projectId, isOpen, onClose }: ProjectEditModalProps) {
  const { resumeData, updateProject, removeProject } = useResume()

  const project = resumeData.projects.find((proj) => proj.id === projectId)

  if (!project) return null

  const handleSave = () => {
    onClose()
  }

  const handleDelete = () => {
    if (projectId) {
      removeProject(projectId)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#03256C]">Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="name" className="text-[#1768AC] font-medium">
              Project Name <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Input
              id="name"
              value={project.name}
              onChange={(e) => updateProject(project.id, "name", e.target.value)}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="technologies" className="text-[#1768AC] font-medium">
              Technologies <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Input
              id="technologies"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <Label htmlFor="link" className="text-[#1768AC] font-medium">
              Link <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Input
              id="link"
              value={project.link || ""}
              onChange={(e) => updateProject(project.id, "link", e.target.value)}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              placeholder="github.com/username/project"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-[#1768AC] font-medium">
              Description <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) => updateProject(project.id, "description", e.target.value)}
              rows={6}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              placeholder="Describe the project and your role"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button onClick={handleDelete} variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#06BEE1]/30 text-[#1768AC] hover:bg-[#06BEE1]/10 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#06BEE1] hover:bg-[#06BEE1]/80 text-white">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
