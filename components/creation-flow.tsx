"use client"

import { useState, useEffect } from "react"
import { 
  Monitor, Video, Mic, Volume2, Camera, Play, Square, Pause,
  X, Check, CheckCircle2, ArrowRight, FileText, Presentation,
  GraduationCap, Layers, Loader2, ChevronRight, Settings
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
  | "recording-mode"
  | "recording-setup"
  | "recording"
  | "processing"
  | "ai-understanding"
  | "choose-output"
  | "generating"
  | "review"

type RecordingMode = "screen" | "screen-camera" | "screen-audio" | "screen-camera-audio"
type OutputType = "video" | "documentation" | "demo" | "training" | "multiple"

interface CreationFlowProps {
  onClose: () => void
}

export function CreationFlow({ onClose }: CreationFlowProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>("recording-mode")
  const [recordingMode, setRecordingMode] = useState<RecordingMode | null>(null)
  const [selectedOutput, setSelectedOutput] = useState<OutputType | null>(null)

  // Handle mode selection
  const handleModeSelect = (mode: RecordingMode) => {
    setRecordingMode(mode)
    setFlowStep("recording-setup")
  }

  // Handle output selection
  const handleOutputSelect = (output: OutputType) => {
    setSelectedOutput(output)
    setFlowStep("generating")
  }

  // Render based on flow step
  if (flowStep === "recording-mode") {
    return <RecordingModeModal onSelect={handleModeSelect} onClose={onClose} />
  }

  if (flowStep === "recording-setup") {
    return <RecordingSetup 
      mode={recordingMode} 
      onStart={() => setFlowStep("recording")} 
      onBack={() => setFlowStep("recording-mode")} 
    />
  }

  if (flowStep === "recording") {
    return <RecordingState onStop={() => setFlowStep("processing")} />
  }

  if (flowStep === "processing") {
    return <ProcessingExperience onComplete={() => setFlowStep("ai-understanding")} />
  }

  if (flowStep === "ai-understanding") {
    return <AIUnderstandingScreen onContinue={() => setFlowStep("choose-output")} />
  }

  if (flowStep === "choose-output") {
    return <ChooseOutputScreen onSelect={handleOutputSelect} />
  }

  if (flowStep === "generating") {
    return <GeneratingScreen output={selectedOutput} onComplete={() => setFlowStep("review")} />
  }

  if (flowStep === "review") {
    return <ReviewScreen output={selectedOutput} onClose={onClose} />
  }

  return null
}


// STEP 1: Recording Mode Selection
interface RecordingModeModalProps {
  onSelect: (mode: RecordingMode) => void
  onClose: () => void
}

function RecordingModeModal({ onSelect, onClose }: RecordingModeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-8">
      <div className="bg-white rounded-[16px] w-full max-w-[580px] shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#E4E4E7]">
          <div>
            <h2 className="text-[20px] font-semibold text-[#111111] mb-1">What would you like to record?</h2>
            <p className="text-[14px] text-[#71717A]">Choose your recording setup</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#F4F4F5] rounded-[6px] transition-colors"
          >
            <X className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Mode Cards */}
        <div className="p-6 grid grid-cols-2 gap-3">
          <ModeCard
            icon={<Monitor className="w-5 h-5" strokeWidth={1.5} />}
            title="Screen Only"
            description="Record your screen"
            onClick={() => onSelect("screen")}
          />
          <ModeCard
            icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
            title="Screen + Camera"
            description="Add webcam overlay"
            onClick={() => onSelect("screen-camera")}
          />
          <ModeCard
            icon={<Volume2 className="w-5 h-5" strokeWidth={1.5} />}
            title="Screen + Audio"
            description="Capture system sound"
            onClick={() => onSelect("screen-audio")}
          />
          <ModeCard
            icon={<Camera className="w-5 h-5" strokeWidth={1.5} />}
            title="Screen + Camera + Audio"
            description="Full recording setup"
            recommended
            onClick={() => onSelect("screen-camera-audio")}
          />
        </div>

      </div>
    </div>
  )
}

interface ModeCardProps {
  icon: React.ReactNode
  title: string
  description: string
  recommended?: boolean
  onClick: () => void
}

function ModeCard({ icon, title, description, recommended, onClick }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group text-left p-4 rounded-[12px] border transition-all ${
        recommended
          ? "border-[#6C5DD3] bg-[#FAFAFA]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-[8px] flex-shrink-0 ${
          recommended ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F4F4F5] text-[#52525B] group-hover:text-[#6C5DD3]"
        } transition-colors`}>
          {icon}
        </div>
        {recommended && (
          <Check className="w-4 h-4 text-[#6C5DD3] ml-auto" strokeWidth={2} />
        )}
      </div>
      
      <h3 className="text-[15px] font-medium text-[#111111] mb-1">{title}</h3>
      <p className="text-[13px] text-[#71717A] leading-relaxed">{description}</p>
    </button>
  )
}


// STEP 2: Recording Setup
interface RecordingSetupProps {
  mode: RecordingMode | null
  onStart: () => void
  onBack: () => void
}

function RecordingSetup({ mode, onStart, onBack }: RecordingSetupProps) {
  const [source, setSource] = useState<"screen" | "window" | "tab">("screen")

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
          <h2 className="text-[20px] font-semibold text-[#111111] mb-1">Recording setup</h2>
          <p className="text-[14px] text-[#71717A]">Choose what to record</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Source Selection */}
          <div>
            <label className="text-[13px] font-medium text-[#111111] mb-2.5 block">
              What would you like to record?
            </label>
            <div className="grid grid-cols-3 gap-2">
              <SourceOption
                label="Entire Screen"
                selected={source === "screen"}
                onClick={() => setSource("screen")}
              />
              <SourceOption
                label="Window"
                selected={source === "window"}
                onClick={() => setSource("window")}
              />
              <SourceOption
                label="Browser Tab"
                selected={source === "tab"}
                onClick={() => setSource("tab")}
              />
            </div>
          </div>

          {/* Camera Preview */}
          {mode?.includes("camera") && (
            <div>
              <label className="text-[13px] font-medium text-[#111111] mb-2.5 block">
                Camera preview
              </label>
              <div className="aspect-video bg-[#111111] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Camera className="w-10 h-10 text-white/20" strokeWidth={1.5} />
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-[6px]">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-white text-[11px] font-medium">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Microphone Preview */}
          <div>
            <label className="text-[13px] font-medium text-[#111111] mb-2.5 block">
              Microphone
            </label>
            <div className="flex items-center gap-3 p-3 bg-[#F4F4F5] rounded-[10px]">
              <Mic className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#111111] mb-1.5">Default Microphone</div>
                <div className="flex items-center gap-1.5">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full rounded-full ${
                        i < 6 ? "bg-[#6C5DD3]" : "bg-[#D4D4D8]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onStart}
            className="w-full py-2.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-medium text-[14px] rounded-[10px] transition-colors"
          >
            Start Recording
          </button>
        </div>

      </div>
    </div>
  )
}

interface SourceOptionProps {
  label: string
  selected: boolean
  onClick: () => void
}

function SourceOption({ label, selected, onClick }: SourceOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 rounded-[10px] border text-[13px] font-medium transition-all ${
        selected
          ? "border-[#6C5DD3] bg-[#FAFAFA] text-[#111111]"
          : "border-[#E4E4E7] bg-white text-[#71717A] hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
      }`}
    >
      {label}
    </button>
  )
}


// STEP 3: Recording State
interface RecordingStateProps {
  onStop: () => void
}

function RecordingState({ onStop }: RecordingStateProps) {
  const [seconds, setSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [micActive, setMicActive] = useState(true)
  const [cameraActive, setCameraActive] = useState(true)

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
    <div className="fixed inset-0 z-50">
      {/* Floating Controller - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2">
        <div className="bg-[#111111]/95 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl flex items-center gap-4">
          
          {/* Recording Indicator & Timer */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-[15px] font-semibold font-mono">{formatTime(seconds)}</span>
          </div>

          <div className="w-px h-5 bg-white/20" />

          {/* Mic Toggle */}
          <button
            onClick={() => setMicActive(!micActive)}
            className={`p-1.5 rounded-full transition-colors ${
              micActive ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 hover:bg-red-500/30"
            }`}
            title={micActive ? "Mute" : "Unmute"}
          >
            <Mic className={`w-4 h-4 ${micActive ? "text-white" : "text-red-500"}`} strokeWidth={1.5} />
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setCameraActive(!cameraActive)}
            className={`p-1.5 rounded-full transition-colors ${
              cameraActive ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 hover:bg-red-500/30"
            }`}
            title={cameraActive ? "Hide camera" : "Show camera"}
          >
            <Camera className={`w-4 h-4 ${cameraActive ? "text-white" : "text-red-500"}`} strokeWidth={1.5} />
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
    </div>
  )
}


// STEP 4: Processing Experience (Full Page)
interface ProcessingExperienceProps {
  onComplete: () => void
}

function ProcessingExperience({ onComplete }: ProcessingExperienceProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Upload Complete",
    "Transcript Ready",
    "Scenes Detected",
    "Chapters Created",
    "Suggestions Generated",
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
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="w-full max-w-[420px] px-8">
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto mb-8">
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#6C5DD3] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] text-center mb-2">
          Processing recording
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
                  ? "bg-[#6C5DD3]"
                  : index === currentStep
                  ? "border-2 border-[#6C5DD3]"
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


// STEP 5: AI Understanding Screen (The Magic Moment)
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
              Recording ready
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Here's what we found in your recording
            </p>
          </div>

          {/* Insights */}
          <div className="space-y-3 mb-6">
            <InsightRow label="Actions detected" value="12" />
            <InsightRow label="Chapters created" value="8" />
            <InsightRow label="Content type" value="Product walkthrough" />
            <InsightRow label="Duration" value="4:32" />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E4E4E7] my-5" />

          {/* Recommendations */}
          <div>
            <h3 className="text-[13px] font-medium text-[#111111] mb-3">
              Recommended outputs
            </h3>
            <div className="space-y-2">
              <RecommendationRow text="Step-by-step documentation" primary />
              <RecommendationRow text="Interactive demo" />
              <RecommendationRow text="Training guide" />
            </div>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full py-2.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-medium text-[14px] rounded-[10px] transition-colors"
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

interface RecommendationRowProps {
  text: string
  primary?: boolean
}

function RecommendationRow({ text, primary }: RecommendationRowProps) {
  return (
    <div className={`flex items-center gap-2.5 py-2 px-3 rounded-[8px] ${
      primary ? "bg-[#FAFAFA]" : ""
    }`}>
      <Check className="w-4 h-4 text-[#6C5DD3] flex-shrink-0" strokeWidth={2} />
      <span className={`text-[13px] ${primary ? "font-medium text-[#111111]" : "text-[#71717A]"}`}>
        {text}
      </span>
    </div>
  )
}


// STEP 6: Choose Output (Most Important Screen)
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
            icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
            title="Video"
            description="Polished video with captions and chapters"
            onClick={() => onSelect("video")}
          />
          <OutputCard
            icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
            title="Documentation"
            description="Step-by-step guide with screenshots"
            recommended
            onClick={() => onSelect("documentation")}
          />
          <OutputCard
            icon={<Presentation className="w-5 h-5" strokeWidth={1.5} />}
            title="Interactive Demo"
            description="Clickable walkthrough with hotspots"
            onClick={() => onSelect("demo")}
          />
          <OutputCard
            icon={<GraduationCap className="w-5 h-5" strokeWidth={1.5} />}
            title="Training Guide"
            description="Learning materials with quizzes"
            onClick={() => onSelect("training")}
          />
        </div>

        {/* Multiple Outputs Option */}
        <button
          onClick={() => onSelect("multiple")}
          className="w-full p-4 bg-white border border-[#E4E4E7] rounded-[12px] hover:border-[#6C5DD3] hover:bg-[#FAFAFA] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#F4F4F5] group-hover:bg-[#F5F4FF] flex items-center justify-center flex-shrink-0 transition-colors">
              <Layers className="w-5 h-5 text-[#52525B] group-hover:text-[#6C5DD3]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-[15px] font-medium text-[#111111] mb-0.5">Multiple Outputs</h3>
              <p className="text-[13px] text-[#71717A]">
                Generate video, documentation, and demo
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#6C5DD3] transition-colors" strokeWidth={1.5} />
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
          ? "border-[#6C5DD3] bg-[#FAFAFA]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-[8px] flex-shrink-0 ${
          recommended ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F4F4F5] text-[#52525B]"
        }`}>
          {icon}
        </div>
        {recommended && (
          <Check className="w-4 h-4 text-[#6C5DD3] ml-auto" strokeWidth={2} />
        )}
      </div>
      
      <h3 className="text-[15px] font-medium text-[#111111] mb-1">{title}</h3>
      <p className="text-[13px] text-[#71717A] leading-relaxed">{description}</p>
    </button>
  )
}


// STEP 7: Generating
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
          <div className="w-full h-full border-[3px] border-[#E4E4E7] border-t-[#6C5DD3] rounded-full animate-spin" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-[#111111] text-center mb-2">
          Creating {output}
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
                  ? "bg-[#6C5DD3]"
                  : index === currentStep
                  ? "border-2 border-[#6C5DD3]"
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


// STEP 8: Review Screen
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
              Your {output} is ready
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
                <Play className="w-5 h-5 text-[#6C5DD3] ml-0.5" strokeWidth={1.5} fill="#6C5DD3" />
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
            <button className="flex-1 py-2.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-medium text-[14px] rounded-[10px] transition-colors">
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

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-[#71717A]">{label}</span>
      <span className="text-[13px] font-medium text-[#111111]">{value}</span>
    </div>
  )
}
