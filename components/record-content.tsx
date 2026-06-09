"use client"

import { useState, useEffect } from "react"
import { 
  Monitor, Video, Upload, Mic, Volume2, 
  Camera, Play, Edit, FileText, Presentation,
  CheckCircle2, Clock, X, Square, Pause, Minimize2,
  Loader2, ArrowRight, LayoutGrid, BookOpen,
  GraduationCap, Layers, Check, ChevronRight, Search,
  Zap, Users, Briefcase, FileCheck, Megaphone, Settings,
  RotateCcw, ChevronDown
} from "lucide-react"
import Image from "next/image"

// Real screenshot images
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
  | "welcome" 
  | "quick-setup"
  | "countdown"
  | "recording" 
  | "upload" 
  | "templates" 
  | "template-preview"
  | "processing" 
  | "instant-review"
  | "editor-ready"

type WorkflowPath = "record" | "upload" | "template"

export function RecordContent() {
  const [flowStep, setFlowStep] = useState<FlowStep>("welcome")
  const [workflowPath, setWorkflowPath] = useState<WorkflowPath | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showQuickSetup, setShowQuickSetup] = useState(false)

  // Handle workflow selection
  const handleWorkflowSelect = (path: WorkflowPath) => {
    setWorkflowPath(path)
    if (path === "record") {
      setShowQuickSetup(true)
    } else if (path === "upload") {
      setFlowStep("upload")
    } else if (path === "template") {
      setFlowStep("templates")
    }
  }

  // Handle quick setup start
  const handleQuickSetupStart = () => {
    setShowQuickSetup(false)
    setFlowStep("countdown")
  }

  // Render different screens based on flow step
  if (flowStep === "countdown") {
    return <CountdownScreen onComplete={() => setFlowStep("recording")} />
  }

  if (flowStep === "recording") {
    return <RecordingState onStop={() => setFlowStep("processing")} />
  }

  if (flowStep === "upload") {
    return <UploadFlow onUpload={() => setFlowStep("processing")} onBack={() => setFlowStep("welcome")} />
  }

  if (flowStep === "templates") {
    return <TemplateGallery 
      onSelect={(template) => {
        setSelectedTemplate(template)
        setFlowStep("template-preview")
      }} 
      onBack={() => setFlowStep("welcome")} 
    />
  }

  if (flowStep === "template-preview") {
    return <TemplatePreview 
      template={selectedTemplate} 
      onUse={() => setFlowStep("editor-ready")} 
      onBack={() => setFlowStep("templates")} 
    />
  }

  if (flowStep === "processing") {
    return <ProcessingScreen onComplete={() => setFlowStep("instant-review")} />
  }

  if (flowStep === "instant-review") {
    return <InstantReview 
      onContinue={() => setFlowStep("editor-ready")} 
      onReRecord={() => {
        setShowQuickSetup(true)
        setFlowStep("welcome")
      }}
    />
  }

  if (flowStep === "editor-ready") {
    return <EditorReady path={workflowPath} />
  }

  // Default: Welcome screen with Quick Setup Sheet
  return (
    <>
      <WelcomeScreen onSelect={handleWorkflowSelect} />
      {showQuickSetup && (
        <QuickSetupSheet 
          onStart={handleQuickSetupStart} 
          onClose={() => setShowQuickSetup(false)} 
        />
      )}
    </>
  )
}


// SCREEN 1: Welcome Screen
interface WelcomeScreenProps {
  onSelect: (path: WorkflowPath) => void
}

function WelcomeScreen({ onSelect }: WelcomeScreenProps) {
  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto px-12 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[48px] font-serif leading-tight tracking-tight text-[#111111] mb-4">
            How would you like to create<br />your walkthrough?
          </h1>
          <p className="text-[17px] text-[#52525B]">
            Choose a starting point. You can always switch later.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <WorkflowCard
            icon={<Monitor className="w-7 h-7" strokeWidth={1.5} />}
            title="Record Screen"
            description="Capture a new walkthrough"
            metadata="Fastest way to start"
            onClick={() => onSelect("record")}
          />
          <WorkflowCard
            icon={<Upload className="w-7 h-7" strokeWidth={1.5} />}
            title="Upload Recording"
            description="Import an existing video"
            metadata="Supports MP4 & Loom"
            onClick={() => onSelect("upload")}
          />
          <WorkflowCard
            icon={<LayoutGrid className="w-7 h-7" strokeWidth={1.5} />}
            title="Start from Template"
            description="Use a proven workflow"
            metadata="25+ templates"
            onClick={() => onSelect("template")}
          />
        </div>

      </div>
    </main>
  )
}

interface WorkflowCardProps {
  icon: React.ReactNode
  title: string
  description: string
  metadata: string
  onClick: () => void
}

function WorkflowCard({ icon, title, description, metadata, onClick }: WorkflowCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white border-2 border-[#E4E4E7] rounded-[14px] p-8 hover:border-[#6C5DD3] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-[12px] bg-[#F4F4F5] group-hover:bg-[#F5F4FF] flex items-center justify-center mb-6 transition-colors">
        <div className="text-[#52525B] group-hover:text-[#6C5DD3] transition-colors">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-[20px] font-semibold text-[#111111] mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-[15px] text-[#52525B] leading-relaxed mb-6">
        {description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#71717A]">{metadata}</span>
        <ChevronRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#6C5DD3] group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
      </div>
    </button>
  )
}


// STEP 1: Quick Setup Sheet (Side Panel)
interface QuickSetupSheetProps {
  onStart: () => void
  onClose: () => void
}

function QuickSetupSheet({ onStart, onClose }: QuickSetupSheetProps) {
  const [projectName, setProjectName] = useState("Untitled Walkthrough")
  const [recordSource, setRecordSource] = useState<"screen" | "window" | "tab">("screen")
  const [micEnabled, setMicEnabled] = useState(true)
  const [systemAudioEnabled, setSystemAudioEnabled] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Side Sheet */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E4E4E7]">
          <h2 className="text-[20px] font-semibold text-[#111111]">Create New Walkthrough</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F4F4F5] rounded-[8px] transition-colors"
          >
            <X className="w-5 h-5 text-[#52525B]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          
          {/* Project Name */}
          <div>
            <label className="text-[14px] font-semibold text-[#111111] mb-2 block">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E4E4E7] rounded-[10px] text-[15px] text-[#111111] focus:outline-none focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all"
              placeholder="Enter project name"
            />
          </div>

          {/* What to Record */}
          <div>
            <label className="text-[14px] font-semibold text-[#111111] mb-3 block">
              What would you like to record?
            </label>
            <div className="space-y-2">
              <RecordSourceOption
                icon={<Monitor className="w-5 h-5" strokeWidth={1.5} />}
                label="Entire Screen"
                selected={recordSource === "screen"}
                onClick={() => setRecordSource("screen")}
              />
              <RecordSourceOption
                icon={<LayoutGrid className="w-5 h-5" strokeWidth={1.5} />}
                label="Window"
                selected={recordSource === "window"}
                onClick={() => setRecordSource("window")}
              />
              <RecordSourceOption
                icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
                label="Browser Tab"
                selected={recordSource === "tab"}
                onClick={() => setRecordSource("tab")}
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="text-[14px] font-semibold text-[#111111] mb-3 block">
              Options
            </label>
            <div className="space-y-2">
              <QuickToggle
                icon={<Mic className="w-5 h-5" strokeWidth={1.5} />}
                label="Microphone"
                enabled={micEnabled}
                onToggle={() => setMicEnabled(!micEnabled)}
              />
              <QuickToggle
                icon={<Volume2 className="w-5 h-5" strokeWidth={1.5} />}
                label="System Audio"
                enabled={systemAudioEnabled}
                onToggle={() => setSystemAudioEnabled(!systemAudioEnabled)}
              />
            </div>
          </div>

          {/* Advanced Settings (Collapsed) */}
          {showAdvanced && (
            <div className="pt-4 border-t border-[#E4E4E7]">
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-[#52525B] mb-2 block">
                    Resolution
                  </label>
                  <select className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#E4E4E7] rounded-[8px] text-[14px] text-[#111111] focus:outline-none focus:border-[#6C5DD3]">
                    <option>1080p (Recommended)</option>
                    <option>720p</option>
                    <option>4K</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#52525B] mb-2 block">
                    Frame Rate
                  </label>
                  <select className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#E4E4E7] rounded-[8px] text-[14px] text-[#111111] focus:outline-none focus:border-[#6C5DD3]">
                    <option>30 FPS (Recommended)</option>
                    <option>60 FPS</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E4E4E7] space-y-3">
          <button
            onClick={onStart}
            className="w-full py-3.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[16px] rounded-[10px] transition-colors"
          >
            Start Recording
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full py-2.5 text-[#52525B] hover:text-[#111111] font-medium text-[14px] transition-colors flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            {showAdvanced ? "Hide" : "Show"} Advanced Settings
          </button>
        </div>

      </div>
    </>
  )
}

interface RecordSourceOptionProps {
  icon: React.ReactNode
  label: string
  selected: boolean
  onClick: () => void
}

function RecordSourceOption({ icon, label, selected, onClick }: RecordSourceOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-[10px] border-2 transition-all ${
        selected
          ? "border-[#6C5DD3] bg-[#F5F4FF]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8]"
      }`}
    >
      <div className={selected ? "text-[#6C5DD3]" : "text-[#52525B]"}>
        {icon}
      </div>
      <span className={`text-[15px] font-medium ${selected ? "text-[#111111]" : "text-[#52525B]"}`}>
        {label}
      </span>
      {selected && (
        <Check className="w-5 h-5 text-[#6C5DD3] ml-auto" strokeWidth={2} />
      )}
    </button>
  )
}

interface QuickToggleProps {
  icon: React.ReactNode
  label: string
  enabled: boolean
  onToggle: () => void
}

function QuickToggle({ icon, label, enabled, onToggle }: QuickToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 rounded-[10px] bg-[#FAFAFA] hover:bg-[#F4F4F5] transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={enabled ? "text-[#6C5DD3]" : "text-[#A1A1AA]"}>
          {icon}
        </div>
        <span className="text-[15px] font-medium text-[#111111]">{label}</span>
      </div>
      <div className={`w-11 h-6 rounded-full transition-colors relative ${
        enabled ? "bg-[#6C5DD3]" : "bg-[#D4D4D8]"
      }`}>
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "left-5" : "left-0.5"
        }`} />
      </div>
    </button>
  )
}


// STEP 2: Countdown Screen
interface CountdownScreenProps {
  onComplete: () => void
}

function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 300)
    }
  }, [count, onComplete])

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-white text-[120px] font-bold mb-4 animate-pulse">
          {count}
        </div>
        <p className="text-white/70 text-[18px]">Get ready...</p>
      </div>
    </div>
  )
}

// STEP 3: Recording State (Minimal Floating Recorder)
interface RecordingStateProps {
  onStop: () => void
}

function RecordingState({ onStop }: RecordingStateProps) {
  const [seconds, setSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [micActive, setMicActive] = useState(true)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Minimal Floating Recorder - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#111111]/95 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl flex items-center gap-4">
          
          {/* Recording Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-[14px] font-semibold">{formatTime(seconds)}</span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20" />

          {/* Mic Status */}
          <button
            onClick={() => setMicActive(!micActive)}
            className={`p-1.5 rounded-full transition-colors ${
              micActive ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 hover:bg-red-500/30"
            }`}
            title={micActive ? "Mute" : "Unmute"}
          >
            <Mic className={`w-4 h-4 ${micActive ? "text-white" : "text-red-500"}`} strokeWidth={1.5} />
          </button>

          {/* Pause/Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <Play className="w-4 h-4 text-white" strokeWidth={1.5} />
            ) : (
              <Pause className="w-4 h-4 text-white" strokeWidth={1.5} />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20" />

          {/* Stop Button */}
          <button
            onClick={onStop}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold text-[13px] transition-colors flex items-center gap-1.5"
          >
            <Square className="w-3.5 h-3.5" strokeWidth={1.5} fill="white" />
            Stop
          </button>

        </div>
      </div>

      {/* Instruction (fades out after 3 seconds) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-fade-out">
        <div className="bg-white/95 backdrop-blur-md rounded-[10px] px-5 py-3 shadow-lg">
          <p className="text-[14px] text-[#52525B]">
            Recording in progress. Click <span className="font-semibold text-[#111111]">Stop</span> when finished.
          </p>
        </div>
      </div>
    </>
  )
}


// STEP 4: Processing Screen (Professional, No AI References)
interface ProcessingScreenProps {
  onComplete: () => void
}

function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { label: "Uploading recording", completed: false },
    { label: "Extracting key moments", completed: false },
    { label: "Preparing walkthrough", completed: false },
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
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="max-w-[420px] w-full px-8">
        
        {/* Spinner */}
        <div className="w-14 h-14 mx-auto mb-8">
          <div className="w-full h-full border-4 border-[#E4E4E7] border-t-[#6C5DD3] rounded-full animate-spin" />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transition-opacity ${
                index <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                index < currentStep
                  ? "bg-[#6C5DD3]"
                  : index === currentStep
                  ? "bg-[#F5F4FF] border-2 border-[#6C5DD3]"
                  : "bg-[#E4E4E7]"
              }`}>
                {index < currentStep && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>
              <span className={`text-[15px] ${
                index <= currentStep ? "text-[#111111] font-medium" : "text-[#A1A1AA]"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

// STEP 5: Instant Review Screen
interface InstantReviewProps {
  onContinue: () => void
  onReRecord: () => void
}

function InstantReview({ onContinue, onReRecord }: InstantReviewProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="max-w-[800px] w-full px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[32px] font-serif text-[#111111] mb-3">Review your recording</h2>
          <p className="text-[16px] text-[#52525B]">
            Everything looks good? Continue to start editing.
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-white border border-[#E4E4E7] rounded-[14px] overflow-hidden mb-8">
          
          {/* Video Preview */}
          <div className="aspect-video bg-[#111111] relative">
            <Image
              src={getScreenshot(0)}
              alt="Recording preview"
              fill
              className="object-cover opacity-90"
              sizes="800px"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-[#6C5DD3] ml-1" strokeWidth={1.5} fill="#6C5DD3" />
              </button>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[13px] font-semibold px-3 py-1.5 rounded-[8px] backdrop-blur-sm">
              4:32
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">
              Untitled Walkthrough
            </h3>
            <div className="flex items-center gap-4 text-[14px] text-[#71717A]">
              <span>Recorded just now</span>
              <span>•</span>
              <span>1920x1080</span>
              <span>•</span>
              <span>4:32 duration</span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReRecord}
            className="flex-1 py-3.5 bg-white border-2 border-[#E4E4E7] hover:border-[#D4D4D8] text-[#52525B] hover:text-[#111111] font-semibold text-[15px] rounded-[10px] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
            Re-record
          </button>
          <button
            onClick={onContinue}
            className="flex-[2] py-3.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[15px] rounded-[10px] transition-colors flex items-center justify-center gap-2"
          >
            Continue Editing
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </div>
  )
}


// STEP 6: Editor Ready (Simulated Editor State)
interface EditorReadyProps {
  path: WorkflowPath | null
}

function EditorReady({ path }: EditorReadyProps) {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex flex-col z-50">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E4E4E7] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            defaultValue="Untitled Walkthrough"
            className="text-[18px] font-semibold text-[#111111] bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <span className="text-[13px] text-[#71717A]">Saved 2 seconds ago</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-[14px] font-medium text-[#52525B] hover:bg-[#F4F4F5] rounded-[8px] transition-colors">
            Preview
          </button>
          <button className="px-5 py-2 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[14px] rounded-[8px] transition-colors">
            Publish
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-[600px] text-center">
          
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#F5F4FF] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#6C5DD3]" strokeWidth={1.5} />
          </div>

          {/* Message */}
          <h2 className="text-[36px] font-serif text-[#111111] mb-4">
            Your walkthrough is ready
          </h2>
          <p className="text-[17px] text-[#52525B] mb-8 leading-relaxed">
            We've loaded your recording, generated a timeline, suggested chapters, and created a title. 
            Most of the work is already done.
          </p>

          {/* What's Ready */}
          <div className="bg-white border border-[#E4E4E7] rounded-[12px] p-6 mb-8">
            <div className="space-y-3">
              <ReadyItem icon={<Video className="w-5 h-5" strokeWidth={1.5} />} label="Video loaded and optimized" />
              <ReadyItem icon={<Layers className="w-5 h-5" strokeWidth={1.5} />} label="Timeline generated" />
              <ReadyItem icon={<FileText className="w-5 h-5" strokeWidth={1.5} />} label="Chapters suggested" />
              <ReadyItem icon={<Edit className="w-5 h-5" strokeWidth={1.5} />} label="Title and description created" />
            </div>
          </div>

          {/* CTA */}
          <p className="text-[14px] text-[#71717A]">
            In a real implementation, the editor would open here with all content pre-loaded.
          </p>

        </div>
      </div>

    </div>
  )
}

interface ReadyItemProps {
  icon: React.ReactNode
  label: string
}

function ReadyItem({ icon, label }: ReadyItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#6C5DD3]">{icon}</div>
      <span className="text-[15px] text-[#111111] font-medium">{label}</span>
      <Check className="w-4 h-4 text-[#15803D] ml-auto" strokeWidth={2} />
    </div>
  )
}


// Upload Flow (Simplified)
interface UploadFlowProps {
  onUpload: () => void
  onBack: () => void
}

function UploadFlow({ onUpload, onBack }: UploadFlowProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setTimeout(onUpload, 500)
  }

  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="max-w-[700px] mx-auto px-12 py-16">
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] text-[#52525B] hover:text-[#111111] mb-8 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
          Back
        </button>

        <div className="mb-10">
          <h1 className="text-[36px] font-serif text-[#111111] mb-3 leading-tight">
            Upload your recording
          </h1>
          <p className="text-[16px] text-[#52525B]">
            Import an existing video to transform into a walkthrough.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[14px] p-16 text-center transition-all ${
            isDragging
              ? "border-[#6C5DD3] bg-[#F5F4FF]"
              : "border-[#D4D4D8] bg-white hover:border-[#6C5DD3] hover:bg-[#FAFAFA]"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#F4F4F5] flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-[#52525B]" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-[18px] font-semibold text-[#111111] mb-2">
            Drop your file here
          </h3>
          <p className="text-[15px] text-[#52525B] mb-6">
            or click to browse
          </p>

          <button
            onClick={onUpload}
            className="px-6 py-3 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[15px] rounded-[10px] transition-colors"
          >
            Choose File
          </button>

          <div className="mt-8 pt-8 border-t border-[#E4E4E7]">
            <p className="text-[13px] text-[#71717A]">
              Supports MP4, MOV, WebM, and Loom links
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}

// Template Gallery (Simplified)
interface TemplateGalleryProps {
  onSelect: (template: string) => void
  onBack: () => void
}

function TemplateGallery({ onSelect, onBack }: TemplateGalleryProps) {
  const templates = [
    { id: "1", title: "Product Demo Walkthrough", uses: "2.4k", screenshotIndex: 0 },
    { id: "2", title: "Customer Onboarding Guide", uses: "1.8k", screenshotIndex: 1 },
    { id: "3", title: "New Employee Setup", uses: "1.5k", screenshotIndex: 2 },
    { id: "4", title: "API Integration Tutorial", uses: "1.2k", screenshotIndex: 3 },
    { id: "5", title: "Feature Release", uses: "980", screenshotIndex: 4 },
    { id: "6", title: "Support Process SOP", uses: "850", screenshotIndex: 5 },
  ]

  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-12 py-16">
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] text-[#52525B] hover:text-[#111111] mb-8 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
          Back
        </button>

        <div className="mb-10">
          <h1 className="text-[36px] font-serif text-[#111111] mb-3 leading-tight">
            Choose a template
          </h1>
          <p className="text-[16px] text-[#52525B]">
            Start with a proven workflow and customize it.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="group text-left bg-white border border-[#E4E4E7] rounded-[12px] overflow-hidden hover:border-[#D4D4D8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="aspect-video bg-[#F4F4F5] relative overflow-hidden">
                <Image
                  src={getScreenshot(template.screenshotIndex)}
                  alt={template.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[15px] text-[#111111] mb-2">{template.title}</h3>
                <span className="text-[13px] text-[#71717A]">{template.uses} uses</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </main>
  )
}

// Template Preview (Simplified)
interface TemplatePreviewProps {
  template: string | null
  onUse: () => void
  onBack: () => void
}

function TemplatePreview({ template, onUse, onBack }: TemplatePreviewProps) {
  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto px-12 py-16">
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] text-[#52525B] hover:text-[#111111] mb-8 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
          Back
        </button>

        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-[36px] font-serif text-[#111111] mb-3">
              Product Demo Walkthrough
            </h1>
            <p className="text-[16px] text-[#52525B]">
              A proven template for showcasing product features.
            </p>
          </div>
          <button
            onClick={onUse}
            className="px-6 py-3 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[15px] rounded-[10px] transition-colors"
          >
            Use Template
          </button>
        </div>

        <div className="bg-white border border-[#E4E4E7] rounded-[14px] p-8">
          <h2 className="text-[20px] font-semibold text-[#111111] mb-6">Template includes 8 steps</h2>
          <p className="text-[15px] text-[#52525B]">
            Pre-written structure, customizable content, and proven workflow.
          </p>
        </div>

      </div>
    </main>
  )
}
