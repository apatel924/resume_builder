"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useResume } from "@/contexts/resume-context"
import { Trash2 } from "lucide-react"

interface ExperienceEditModalProps {
  experienceId: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ExperienceEditModal({ experienceId, isOpen, onClose }: ExperienceEditModalProps) {
  const { resumeData, updateExperience, removeExperience } = useResume()

  const experience = resumeData.experience.find((exp) => exp.id === experienceId)

  if (!experience) return null

  const handleSave = () => {
    onClose()
  }

  const handleDelete = () => {
    if (experienceId) {
      removeExperience(experienceId)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#03256C]">Edit Professional Experience</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="title" className="text-[#1768AC] font-medium">
              Job Title <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Input
              id="title"
              value={experience.title}
              onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-[#1768AC] font-medium">
              Employer <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Input
              id="company"
              value={experience.company}
              onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-[#1768AC] font-medium">
                City <span className="text-gray-400 text-sm">optional</span>
              </Label>
              <Input
                id="city"
                value={experience.location.split(", ")[0] || ""}
                onChange={(e) => {
                  const parts = experience.location.split(", ")
                  const newLocation = `${e.target.value}${parts[1] ? `, ${parts[1]}` : ""}`
                  updateExperience(experience.id, "location", newLocation)
                }}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-[#1768AC] font-medium">
                Country <span className="text-gray-400 text-sm">optional</span>
              </Label>
              <Input
                id="country"
                value={experience.location.split(", ")[1] || ""}
                onChange={(e) => {
                  const parts = experience.location.split(", ")
                  const newLocation = `${parts[0] || ""}${e.target.value ? `, ${e.target.value}` : ""}`
                  updateExperience(experience.id, "location", newLocation)
                }}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-[#1768AC] font-medium">
                Start Date <span className="text-gray-400 text-sm">optional</span>
              </Label>
              <Input
                id="startDate"
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-[#1768AC] font-medium">
                End Date <span className="text-gray-400 text-sm">optional</span>
              </Label>
              <Input
                id="endDate"
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                disabled={experience.current}
                className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={experience.current}
              onCheckedChange={(checked) => updateExperience(experience.id, "current", checked as boolean)}
            />
            <Label htmlFor="current" className="text-[#1768AC] font-medium">
              Present (Current)
            </Label>
          </div>

          <div>
            <Label htmlFor="description" className="text-[#1768AC] font-medium">
              Description <span className="text-gray-400 text-sm">optional</span>
            </Label>
            <Textarea
              id="description"
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
              rows={6}
              className="mt-1 border-[#06BEE1]/30 focus:border-[#06BEE1] rounded-xl"
              placeholder="• Describe your key achievements and responsibilities"
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
