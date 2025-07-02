"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"

export interface ResumeData {
  profile: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    summary: string
  }
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    year: string
    details: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link?: string
  }>
}

interface ResumeContextType {
  resumeData: ResumeData
  updateProfile: (field: keyof ResumeData["profile"], value: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: string, value: string | boolean) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: string, value: string) => void
  removeEducation: (id: string) => void
  updateSkills: (skills: string[]) => void
  addProject: () => void
  updateProject: (id: string, field: string, value: string) => void
  removeProject: (id: string) => void
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
}

const defaultResumeData: ResumeData = {
  profile: {
    name: "Alex Chen",
    title: "Senior Software Engineer",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexchen",
    summary:
      "Passionate software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Love creating intuitive user experiences and solving complex technical challenges.",
  },
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description:
        "• Led development of customer-facing web applications serving 100K+ users\n• Architected microservices infrastructure reducing response time by 40%\n• Mentored junior developers and established code review best practices",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "Palo Alto, CA",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description:
        "• Built responsive React applications with modern JavaScript (ES6+)\n• Implemented RESTful APIs using Node.js and Express\n• Collaborated with design team to create pixel-perfect UI components",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      year: "2020",
      details: "Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "Git",
    "Agile/Scrum",
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce application with payment integration, inventory management, and admin dashboard.",
      technologies: "React, Node.js, PostgreSQL, Stripe API",
      link: "github.com/alexchen/ecommerce",
    },
  ],
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  // Load data from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`resume_data_${user.uid}`)
      if (savedData) {
        setResumeData(JSON.parse(savedData))
      }
    }
  }, [user])

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`resume_data_${user.uid}`, JSON.stringify(resumeData))
    }
  }, [resumeData, user])

  const updateProfile = (field: keyof ResumeData["profile"], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      year: "",
      details: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
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
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
