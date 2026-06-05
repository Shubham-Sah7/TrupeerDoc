"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Upload, X, Check, CheckCircle2, FileVideo, 
  FileText, Presentation, GraduationCap, Layers,
  Video, ChevronRight, Play
} from "lucide-react"
import Image from "next/image"

const SCREENSHOTS = [
  "/images/screenshot-1.png",
  "/images/screenshot-2.png",
  "/images/screenshot-3.png",
  "/images/screenshot-4.png",
  "/images/screenshot-5.png",
  "/images/screenshot-6.png",
  "/images/screenshot-7.png",
  "/images/screenshot-8.png",
]

function getScreenshot(index: number): string {
  return SCREENSHOTS[index % SCREENSHOTS.length]
}

type FlowStep = 
  | "upload"
  | "processing"
  | "ai-understanding"
  | "choose-output"
  | "preview"
  | "generating"
  | "review"

type OutputType = "video" | "documentation" | "demo" | "training" | "multiple"

interface UploadFlowProps {
  onClose: () => void
}

export function UploadFlow({ onClose }: UploadFlowProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>("upload")
  const [selectedOutput, setSelectedOutput] = useState<OutputType | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Handle file upload
  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setFlowStep("processing")
  }

  // Handle output selection
  const handleOutputSelect = (output: OutputType) => {
    setSelectedOutput(output)
    setFlowStep("preview")
  }

  // Render based on flow step
  if (flowStep === "upload") {
    return <UploadModal onUpload={handleFileUpload} onClose={onClose} />
  }

  if (flowStep === "processing") {
    return <ProcessingScreen onComplete={() => setFlowStep("ai-understanding")} />
  }

  if (flowStep === "ai-understanding") {
    return <AIUnderstandingScreen onContinue={() => setFlowStep("choose-output")} />
  }

  if (flowStep === "choose-output") {
    return <ChooseOutputScreen onSelect={handleOutputSelect} />
  }

  if (flowStep === "preview") {
    return <PreviewScreen 
      output={selectedOutput} 
      fileName={uploadedFile?.name || "Recording"}
      onGenerate={() => setFlowStep("generating")} 
    />
  }

  if (flowStep === "generating") {
    return <GeneratingScreen output={selectedOutput} onComplete={() => setFlowStep("review")} />
  }

  if (flowStep === "review") {
    return <ReviewScreen output={selectedOutput} onClose={onClose} />
  }

  return null
}


// STEP 1: Upload Modal
interface UploadModalProps {
  onUpload: (file: File) => void
  onClose: () => void
}

function UploadModal({ onUpload, onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && (file.type.includes('video') || file.name.match(/\.(mp4|mov|webm)$/i))) {
      onUpload(file)
    }
  }, [onUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }, [onUpload])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-8">
      <div className="bg-white rounded-[16px] w-full max-w-[580px] shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#E4E4E7]">
          <div>
            <h2 className="text-[20px] font-semibold text-[#111111] mb-1">Upload your recording</h2>
            <p className="text-[14px] text-[#71717A]">Turn an existing video into docs, demos, and training content</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#F4F4F5] rounded-[6px] transition-colors"
          >
            <X className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-[12px] p-8 text-center transition-all ${
              isDragging
                ? "border-[#D85BD6] bg-[#FDF4FD]"
                : "border-[#E4E4E7] hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
            }`}
          >
            <div className="w-12 h-12 rounded-[10px] bg-[#F4F4F5] flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-[#52525B]" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-[15px] font-medium text-[#111111] mb-2">
              Drag & drop your video here
            </h3>
            <p className="text-[13px] text-[#71717A] mb-4">
              or click to browse files
            </p>

            <input
              type="file"
              accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-5 py-2 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[13px] rounded-[10px] cursor-pointer transition-colors"
            >
              Browse Files
            </label>

            <div className="mt-5 pt-5 border-t border-[#E4E4E7]">
              <p className="text-[12px] text-[#A1A1AA]">
                Supported: MP4, MOV, WebM
              </p>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="mt-5">
            <h4 className="text-[13px] font-medium text-[#111111] mb-3">Recent uploads</h4>
            <div className="space-y-2">
              <RecentUploadItem name="Product Demo.mp4" duration="4:32" />
              <RecentUploadItem name="Feature Walkthrough.mov" duration="2:15" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

interface RecentUploadItemProps {
  name: string
  duration: string
}

function RecentUploadItem({ name, duration }: RecentUploadItemProps) {
  return (
    <button className="w-full flex items-center gap-3 p-3 bg-[#F4F4F5] hover:bg-[#E4E4E7] rounded-[10px] transition-colors text-left">
      <div className="w-8 h-8 rounded-[6px] bg-[#D4D4D8] flex items-center justify-center flex-shrink-0">
        <FileVideo className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#111111] truncate">{name}</p>
        <p className="text-[12px] text-[#71717A]">{duration}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#A1A1AA] flex-shrink-0" strokeWidth={1.5} />
    </button>
  )
}


// STEP 2: Processing Screen
interface ProcessingScreenProps {
  onComplete: () => void
}

function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Upload Complete",
    "Transcript Generated",
    "Scenes Identified",
    "Chapters Created",
    "Key Actions Detected",
    "Generating Suggestions",
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
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="w-full max-w-[420px] px-8">
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-8">
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#D85BD6] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] text-center mb-2">
          Analyzing your recording
        </h2>
        <p className="text-[14px] text-[#71717A] text-center mb-10">
          This will only take a moment
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


// STEP 3: AI Understanding Screen
interface AIUnderstandingScreenProps {
  onContinue: () => void
}

function AIUnderstandingScreen({ onContinue }: AIUnderstandingScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50 p-8">
      <div className="w-full max-w-[520px]">
        
        {/* Content Card */}
        <div className="bg-white border border-[#E4E4E7] rounded-[12px] p-6 mb-6">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#111111] mb-2">
              Recording summary
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Here's what we found in your recording
            </p>
          </div>

          {/* Insights */}
          <div className="space-y-3 mb-6">
            <InsightRow label="Actions detected" value="12" />
            <InsightRow label="Chapters identified" value="8" />
            <InsightRow label="Content type" value="Product walkthrough" />
            <InsightRow label="Duration" value="4:32" />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E4E4E7] my-5" />

          {/* AI Insights */}
          <div>
            <h3 className="text-[13px] font-medium text-[#111111] mb-3">
              AI insights
            </h3>
            <div className="space-y-2">
              <InsightBadge text="Product walkthrough detected" />
              <InsightBadge text="Feature demo detected" />
              <InsightBadge text="Strong documentation candidate" primary />
            </div>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full py-2.5 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[14px] rounded-[10px] transition-colors"
        >
          Continue
        </button>

      </div>
    </div>
  )
}

interface InsightRowProps {
  label: string
  value: string
}

function InsightRow({ label, value }: InsightRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[14px] text-[#71717A]">{label}</span>
      <span className="text-[14px] font-medium text-[#111111]">{value}</span>
    </div>
  )
}

interface InsightBadgeProps {
  text: string
  primary?: boolean
}

function InsightBadge({ text, primary }: InsightBadgeProps) {
  return (
    <div className={`flex items-center gap-2.5 py-2 px-3 rounded-[8px] ${
      primary ? "bg-[#FAFAFA]" : ""
    }`}>
      <Check className="w-4 h-4 text-[#D85BD6] flex-shrink-0" strokeWidth={2} />
      <span className={`text-[13px] ${primary ? "font-medium text-[#111111]" : "text-[#71717A]"}`}>
        {text}
      </span>
    </div>
  )
}


// STEP 4: Choose Output Screen
interface ChooseOutputScreenProps {
  onSelect: (output: OutputType) => void
}

function ChooseOutputScreen({ onSelect }: ChooseOutputScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50 p-8 overflow-auto">
      <div className="w-full max-w-[720px] py-12">
        
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-[28px] font-semibold text-[#111111] mb-2">
            What would you like to create?
          </h2>
          <p className="text-[15px] text-[#71717A]">
            Choose your desired output
          </p>
        </div>

        {/* Output Cards */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <OutputCard
            icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
            title="Documentation"
            description="Generate step-by-step guides"
            recommended
            onClick={() => onSelect("documentation")}
          />
          <OutputCard
            icon={<Presentation className="w-5 h-5" strokeWidth={1.5} />}
            title="Interactive Demo"
            description="Create clickable walkthroughs"
            recommended
            onClick={() => onSelect("demo")}
          />
          <OutputCard
            icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
            title="Video"
            description="Enhance and publish recording"
            onClick={() => onSelect("video")}
          />
          <OutputCard
            icon={<GraduationCap className="w-5 h-5" strokeWidth={1.5} />}
            title="Training Guide"
            description="Convert into learning material"
            onClick={() => onSelect("training")}
          />
        </div>

        {/* Multiple Outputs Option */}
        <button
          onClick={() => onSelect("multiple")}
          className="w-full p-4 bg-white border border-[#E4E4E7] rounded-[12px] hover:border-[#D85BD6] hover:bg-[#FAFAFA] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#F4F4F5] group-hover:bg-[#FDF4FD] flex items-center justify-center flex-shrink-0 transition-colors">
              <Layers className="w-5 h-5 text-[#52525B] group-hover:text-[#D85BD6]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-[15px] font-medium text-[#111111] mb-0.5">Multiple Outputs</h3>
              <p className="text-[13px] text-[#71717A]">
                Generate everything
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#D85BD6] transition-colors" strokeWidth={1.5} />
          </div>
        </button>

      </div>
    </div>
  )
}

interface OutputCardProps {
  icon: React.ReactNode
  title: string
  description: string
  recommended?: boolean
  onClick: () => void
}

function OutputCard({ icon, title, description, recommended, onClick }: OutputCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-[12px] border transition-all ${
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


// STEP 5: Preview Screen (Smart Recommendation)
interface PreviewScreenProps {
  output: OutputType | null
  fileName: string
  onGenerate: () => void
}

function PreviewScreen({ output, fileName, onGenerate }: PreviewScreenProps) {
  const getRecommendation = () => {
    if (output === "multiple") {
      return "Documentation + Interactive Demo + Video"
    }
    if (output === "documentation" || output === "demo") {
      return "Documentation + Interactive Demo"
    }
    return output
  }

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50 p-8">
      <div className="w-full max-w-[520px]">
        
        {/* Content Card */}
        <div className="bg-white border border-[#E4E4E7] rounded-[12px] p-6 mb-6">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#111111] mb-2">
              Ready to generate
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Review details before generating
            </p>
          </div>

          {/* Recording Details */}
          <div className="space-y-3 mb-6">
            <DetailRow label="Recording name" value={fileName} />
            <DetailRow label="Duration" value="4:32" />
            <DetailRow label="Detected chapters" value="8" />
            <DetailRow label="Transcript" value="Available" />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E4E4E7] my-5" />

          {/* Smart Recommendation */}
          <div className="bg-[#FDF4FD] border border-[#D85BD6]/20 rounded-[10px] p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#D85BD6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#D85BD6]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-medium text-[#111111] mb-1">
                  Recommended
                </h4>
                <p className="text-[13px] text-[#71717A]">
                  We recommend creating <span className="font-medium text-[#111111]">{getRecommendation()}</span> from this recording
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={onGenerate}
          className="w-full py-2.5 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[14px] rounded-[10px] transition-colors"
        >
          Generate
        </button>

      </div>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[14px] text-[#71717A]">{label}</span>
      <span className="text-[14px] font-medium text-[#111111]">{value}</span>
    </div>
  )
}


// STEP 6: Generating Screen
interface GeneratingScreenProps {
  output: OutputType | null
  onComplete: () => void
}

function GeneratingScreen({ output, onComplete }: GeneratingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const getSteps = () => {
    switch (output) {
      case "documentation":
        return ["Extracting Screenshots", "Generating Steps", "Writing Instructions"]
      case "demo":
        return ["Detecting Click Points", "Generating Hotspots", "Creating Tooltips"]
      case "video":
        return ["Adding Captions", "Improving Narration", "Finalizing Export"]
      case "training":
        return ["Generating Quiz Questions", "Creating Assessments", "Building Learning Path"]
      case "multiple":
        return ["Generating Documentation", "Creating Demo Steps", "Improving Narration", "Building Chapters"]
      default:
        return ["Generating Outputs", "Creating Content", "Finalizing"]
    }
  }

  const steps = getSteps()

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
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="w-full max-w-[420px] px-8">
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-8">
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#D85BD6] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] text-center mb-2">
          Generating {output === "multiple" ? "outputs" : output}
        </h2>
        <p className="text-[14px] text-[#71717A] text-center mb-10">
          This will only take a moment
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



// STEP 7: Review Screen
interface ReviewScreenProps {
  output: OutputType | null
  onClose: () => void
}

function ReviewScreen({ output, onClose }: ReviewScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50 p-8">
      <div className="w-full max-w-[680px]">
        
        {/* Content Card */}
        <div className="bg-white border border-[#E4E4E7] rounded-[12px] p-6 mb-6">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#111111] mb-2">
              Your {output === "multiple" ? "outputs are" : `${output} is`} ready
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Review and publish when ready
            </p>
          </div>

          {/* Preview */}
          <div className="aspect-video bg-[#F4F4F5] rounded-[10px] mb-6 relative overflow-hidden">
            <Image
              src={getScreenshot(0)}
              alt="Preview"
              fill
              className="object-cover"
              sizes="680px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-[#D85BD6] ml-0.5" strokeWidth={1.5} fill="#D85BD6" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-6">
            <DetailRow label="Title" value="Product Walkthrough Documentation" />
            <DetailRow label="Type" value={output || "Documentation"} />
            <DetailRow label="Duration" value="4:32" />
            <DetailRow label="Created" value="Just now" />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E4E4E7] my-5" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex-1 py-2.5 border border-[#E4E4E7] hover:border-[#D4D4D8] hover:bg-[#FAFAFA] text-[#52525B] hover:text-[#111111] font-medium text-[14px] rounded-[10px] transition-all">
              Edit
            </button>
            <button className="flex-1 py-2.5 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[14px] rounded-[10px] transition-colors">
              Publish
            </button>
          </div>

        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-[#71717A] hover:text-[#111111] font-medium text-[14px] transition-colors"
        >
          Back to Home
        </button>

      </div>
    </div>
  )
}
