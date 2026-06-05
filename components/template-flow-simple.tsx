"use client"

import { useState, useEffect } from "react"
import { 
  X, Check, ArrowRight, Video, Upload, 
  Sparkles, FileText, Loader2, ChevronRight
} from "lucide-react"
import Image from "next/image"

// Real template images
const TEMPLATE_IMAGES = [
  "/images/template/template-1.png",
  "/images/template/template-2.png",
  "/images/template/template-3.png",
  "/images/template/template-4.png",
  "/images/template/template-5.png",
  "/images/template/template-6.png",
  "/images/template/template-7.png",
  "/images/template/template-8.png",
]

type FlowStep = 
  | "all-templates"
  | "personalization"
  | "content-source"
  | "ai-setup"
  | "workspace-creation"
  | "editor"

type ContentSource = "record" | "upload" | "ai-generate" | "import"

interface Template {
  id: string
  name: string
  category: string
  duration: string
  outputType: string
  bestFor: string
  imageIndex: number
}

const ALL_TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Product Walkthrough",
    category: "Product Demo",
    duration: "3-5 min",
    outputType: "Video + Demo",
    bestFor: "Feature showcases",
    imageIndex: 0
  },
  {
    id: "2",
    name: "Customer Onboarding",
    category: "Onboarding",
    duration: "5-7 min",
    outputType: "Interactive Demo",
    bestFor: "New user setup",
    imageIndex: 1
  },
  {
    id: "3",
    name: "Feature Launch",
    category: "Marketing",
    duration: "2-3 min",
    outputType: "Video",
    bestFor: "Announcements",
    imageIndex: 2
  },
  {
    id: "4",
    name: "Training Guide",
    category: "Training",
    duration: "8-10 min",
    outputType: "Documentation",
    bestFor: "Employee training",
    imageIndex: 3
  },
  {
    id: "5",
    name: "API Documentation",
    category: "Documentation",
    duration: "10-15 min",
    outputType: "Documentation",
    bestFor: "Developer guides",
    imageIndex: 4
  },
  {
    id: "6",
    name: "Help Center Article",
    category: "Support",
    duration: "3-4 min",
    outputType: "Documentation",
    bestFor: "Customer support",
    imageIndex: 5
  },
  {
    id: "7",
    name: "Sales Demo",
    category: "Sales",
    duration: "4-6 min",
    outputType: "Video + Demo",
    bestFor: "Prospect conversion",
    imageIndex: 6
  },
  {
    id: "8",
    name: "Interactive Tour",
    category: "Product Demo",
    duration: "3-5 min",
    outputType: "Interactive Demo",
    bestFor: "Product exploration",
    imageIndex: 7
  },
]

interface TemplateFlowProps {
  onClose: () => void
}

export function TemplateFlow({ onClose }: TemplateFlowProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>("all-templates")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [contentSource, setContentSource] = useState<ContentSource | null>(null)
  const [projectName, setProjectName] = useState("")
  const [productName, setProductName] = useState("")
  const [targetAudience, setTargetAudience] = useState("")

  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setFlowStep("personalization")
  }

  // Handle content source selection
  const handleContentSourceSelect = (source: ContentSource) => {
    setContentSource(source)
    setFlowStep("ai-setup")
  }

  // Render based on flow step
  if (flowStep === "all-templates") {
    return <AllTemplatesScreen onSelect={handleTemplateSelect} onClose={onClose} />
  }

  if (flowStep === "personalization") {
    return <PersonalizationScreen
      template={selectedTemplate}
      projectName={projectName}
      setProjectName={setProjectName}
      productName={productName}
      setProductName={setProductName}
      targetAudience={targetAudience}
      setTargetAudience={setTargetAudience}
      onContinue={() => setFlowStep("content-source")}
      onBack={() => setFlowStep("all-templates")}
    />
  }

  if (flowStep === "content-source") {
    return <ContentSourceScreen onSelect={handleContentSourceSelect} />
  }

  if (flowStep === "ai-setup") {
    return <AISetupScreen 
      template={selectedTemplate}
      onComplete={() => setFlowStep("workspace-creation")}
    />
  }

  if (flowStep === "workspace-creation") {
    return <WorkspaceCreationScreen 
      onComplete={() => setFlowStep("editor")}
    />
  }

  if (flowStep === "editor") {
    return <EditorPreview 
      template={selectedTemplate}
      projectName={projectName}
      onClose={onClose}
    />
  }

  return null
}


// STEP 1: All Templates (Simplified - No Categories)
interface AllTemplatesScreenProps {
  onSelect: (template: Template) => void
  onClose: () => void
}

function AllTemplatesScreen({ onSelect, onClose }: AllTemplatesScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] z-50 overflow-auto">
      
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E4E4E7] z-10">
        <div className="max-w-[1200px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F4F4F5] rounded-[8px] transition-colors"
            >
              <X className="w-5 h-5 text-[#71717A]" strokeWidth={1.5} />
            </button>
            <div>
              <h1 className="text-[24px] font-semibold text-[#111111] mb-1">All Templates</h1>
              <p className="text-[14px] text-[#71717A]">{ALL_TEMPLATES.length} templates available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-5">
          {ALL_TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => onSelect(template)}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

interface TemplateCardProps {
  template: Template
  onClick: () => void
}

function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white border border-[#E4E4E7] rounded-[12px] overflow-hidden hover:border-[#D85BD6] hover:shadow-lg transition-all"
    >
      {/* Real Template Image */}
      <div className="aspect-video bg-[#F4F4F5] relative overflow-hidden">
        <Image
          src={TEMPLATE_IMAGES[template.imageIndex]}
          alt={template.name}
          fill
          className="object-cover"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wide mb-1">
          {template.category}
        </div>
        <h3 className="text-[15px] font-semibold text-[#111111] mb-3">{template.name}</h3>
        
        <div className="space-y-1.5 mb-3">
          <InfoRow label="Duration" value={template.duration} />
          <InfoRow label="Output" value={template.outputType} />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7]">
          <span className="text-[12px] font-medium text-[#D85BD6]">Use Template</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D85BD6]" strokeWidth={1.5} />
        </div>
      </div>
    </button>
  )
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-[#71717A]">{label}</span>
      <span className="font-medium text-[#111111]">{value}</span>
    </div>
  )
}



// STEP 2: Personalization
interface PersonalizationScreenProps {
  template: Template | null
  projectName: string
  setProjectName: (value: string) => void
  productName: string
  setProductName: (value: string) => void
  targetAudience: string
  setTargetAudience: (value: string) => void
  onContinue: () => void
  onBack: () => void
}

function PersonalizationScreen({
  template,
  projectName,
  setProjectName,
  productName,
  setProductName,
  targetAudience,
  setTargetAudience,
  onContinue,
  onBack
}: PersonalizationScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-8">
      <div className="bg-white rounded-[16px] w-full max-w-[580px] shadow-xl">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#E4E4E7]">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[13px] text-[#71717A] hover:text-[#111111] mb-3 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" strokeWidth={1.5} />
            Back
          </button>
          <h2 className="text-[20px] font-semibold text-[#111111] mb-1">What are you creating?</h2>
          <p className="text-[14px] text-[#71717A]">Help us personalize your template</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          
          <div>
            <label className="text-[13px] font-medium text-[#111111] mb-2 block">
              Project name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Q1 Product Launch"
              className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-[10px] text-[14px] text-[#111111] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D85BD6] transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#111111] mb-2 block">
              Product name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Clueso"
              className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-[10px] text-[14px] text-[#111111] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D85BD6] transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#111111] mb-2 block">
              Target audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., New users, Sales team, Developers"
              className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-[10px] text-[14px] text-[#111111] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D85BD6] transition-colors"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onContinue}
            disabled={!projectName || !productName}
            className="w-full py-2.5 bg-[#D85BD6] hover:bg-[#C84AC7] disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA] text-white font-medium text-[14px] rounded-[10px] transition-colors"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  )
}



// STEP 3: Content Source
interface ContentSourceScreenProps {
  onSelect: (source: ContentSource) => void
}

function ContentSourceScreen({ onSelect }: ContentSourceScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50 p-8">
      <div className="w-full max-w-[720px]">
        
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-[#111111] mb-2">
            How would you like to create content?
          </h2>
          <p className="text-[15px] text-[#71717A]">
            Choose your preferred method
          </p>
        </div>

        {/* Source Cards */}
        <div className="grid grid-cols-2 gap-4">
          <ContentSourceCard
            icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
            title="Record Screen"
            description="Capture your screen with narration"
            onClick={() => onSelect("record")}
          />
          <ContentSourceCard
            icon={<Upload className="w-5 h-5" strokeWidth={1.5} />}
            title="Upload Recording"
            description="Use an existing video file"
            onClick={() => onSelect("upload")}
          />
          <ContentSourceCard
            icon={<Sparkles className="w-5 h-5" strokeWidth={1.5} />}
            title="Generate With AI"
            description="Let AI create content for you"
            recommended
            onClick={() => onSelect("ai-generate")}
          />
          <ContentSourceCard
            icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
            title="Import Existing Project"
            description="Start from previous work"
            onClick={() => onSelect("import")}
          />
        </div>

      </div>
    </div>
  )
}

interface ContentSourceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  recommended?: boolean
  onClick: () => void
}

function ContentSourceCard({ icon, title, description, recommended, onClick }: ContentSourceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 rounded-[12px] border transition-all ${
        recommended
          ? "border-[#D85BD6] bg-[#FAFAFA]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-[8px] flex-shrink-0 ${
          recommended ? "bg-[#FDF4FD] text-[#D85BD6]" : "bg-[#F4F4F5] text-[#52525B]"
        }`}>
          {icon}
        </div>
        {recommended && (
          <Check className="w-4 h-4 text-[#D85BD6] ml-auto" strokeWidth={2} />
        )}
      </div>
      
      <h3 className="text-[15px] font-medium text-[#111111] mb-1">{title}</h3>
      <p className="text-[13px] text-[#71717A] leading-relaxed">{description}</p>
    </button>
  )
}



// STEP 4: AI Setup
interface AISetupScreenProps {
  template: Template | null
  onComplete: () => void
}

function AISetupScreen({ template, onComplete }: AISetupScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="w-full max-w-[420px] px-8 text-center">
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-8">
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#D85BD6] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] mb-2">
          Preparing your template
        </h2>
        <p className="text-[14px] text-[#71717A] mb-10">
          AI is setting up your workspace
        </p>

        {/* Status */}
        <div className="inline-flex items-center gap-2 bg-[#FDF4FD] text-[#D85BD6] text-[13px] font-medium px-4 py-2 rounded-full">
          <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
          Template Ready
        </div>

      </div>
    </div>
  )
}


// STEP 5: Workspace Creation
interface WorkspaceCreationScreenProps {
  onComplete: () => void
}

function WorkspaceCreationScreen({ onComplete }: WorkspaceCreationScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Structure created",
    "Sections created",
    "Assets ready",
    "AI suggestions added",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return prev
        }
      })
    }, 800)
    return () => clearInterval(interval)
  }, [onComplete, steps.length])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="w-full max-w-[420px] px-8">
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-8">
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#D85BD6] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] text-center mb-2">
          Creating workspace
        </h2>
        <p className="text-[14px] text-[#71717A] text-center mb-10">
          Setting up your project
        </p>

        {/* Progress Steps */}
        <div className="space-y-2.5">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transition-opacity ${
                index <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                index < currentStep
                  ? "bg-[#D85BD6]"
                  : index === currentStep
                  ? "border-2 border-[#D85BD6]"
                  : "border-2 border-[#E4E4E7]"
              }`}>
                {index < currentStep && (
                  <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                )}
              </div>
              <span className={`text-[14px] ${
                index <= currentStep ? "text-[#111111] font-medium" : "text-[#A1A1AA]"
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}



// STEP 6: Editor Preview
interface EditorPreviewProps {
  template: Template | null
  projectName: string
  onClose: () => void
}

function EditorPreview({ template, projectName, onClose }: EditorPreviewProps) {
  const sections = [
    "Welcome",
    "Problem",
    "Feature Overview",
    "Walkthrough",
    "Summary"
  ]

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] z-50 overflow-auto">
      
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E4E4E7] z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-[#111111] mb-1">{projectName || "Untitled Project"}</h1>
            <p className="text-[13px] text-[#71717A]">Template: {template?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-[#E4E4E7] hover:border-[#D4D4D8] text-[#52525B] hover:text-[#111111] font-medium text-[14px] rounded-[10px] transition-all">
              Generate Script
            </button>
            <button className="px-4 py-2 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[14px] rounded-[10px] transition-colors">
              Publish
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F4F4F5] rounded-[8px] transition-colors"
            >
              <X className="w-5 h-5 text-[#71717A]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        
        {/* Success Message */}
        <div className="bg-[#FDF4FD] border border-[#D85BD6]/20 rounded-[12px] p-5 mb-8 flex items-start gap-3">
          <div className="w-8 h-8 rounded-[8px] bg-[#D85BD6]/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-[#D85BD6]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#111111] mb-1">
              Your workspace is ready
            </h3>
            <p className="text-[14px] text-[#71717A]">
              We've pre-filled your project with a proven structure. Customize it or generate content with AI.
            </p>
          </div>
        </div>

        {/* Pre-filled Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <SectionCard key={index} title={section} index={index + 1} />
          ))}
        </div>

      </div>

    </div>
  )
}

interface SectionCardProps {
  title: string
  index: number
}

function SectionCard({ title, index }: SectionCardProps) {
  return (
    <div className="bg-white border border-[#E4E4E7] rounded-[12px] p-5 hover:border-[#D4D4D8] transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-[8px] bg-[#F4F4F5] flex items-center justify-center flex-shrink-0">
          <span className="text-[14px] font-semibold text-[#52525B]">{index}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-[16px] font-semibold text-[#111111] mb-2">{title}</h3>
          <p className="text-[14px] text-[#71717A] leading-relaxed mb-4">
            AI-generated content will appear here. Click "Generate Script" to create content for this section.
          </p>
          <button className="text-[13px] font-medium text-[#D85BD6] hover:text-[#C84AC7] transition-colors">
            Edit section
          </button>
        </div>
      </div>
    </div>
  )
}
