"use client"

import { useState, useEffect } from "react"
import {
  X,
  Monitor,
  Camera,
  Mic,
  MicOff,
  CameraOff,
  Pause,
  Play,
  Square,
  Check,
  Video,
  FileText,
  BookOpen,
  MousePointerClick,
  Layers,
  ArrowRight,
  ChevronLeft,
  Film,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Step =
  | "mode"
  | "source"
  | "recording"
  | "processing"
  | "understanding"
  | "output"
  | "generating"
  | "review"

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODES = [
  { id: "screen",     icon: Monitor, title: "Screen Only",               desc: "Capture your screen without camera or audio." },
  { id: "camera",     icon: Camera,  title: "Screen + Camera",            desc: "Record with picture-in-picture camera overlay." },
  { id: "audio",      icon: Mic,     title: "Screen + Audio",             desc: "Record with voiceover narration." },
  { id: "full",       icon: Film,    title: "Screen + Camera + Audio",    desc: "Full production setup — recommended.", recommended: true },
]

const SOURCES = [
  { id: "entire-screen", label: "Entire Screen" },
  { id: "window",        label: "Window" },
  { id: "browser-tab",   label: "Browser Tab" },
]

const PROCESSING_STEPS = [
  "Uploading recording",
  "Generating transcript",
  "Detecting scenes",
  "Creating chapters",
  "Generating suggestions",
  "Improving audio",
  "Finalizing",
]

const AI_FINDINGS = [
  "12 actions detected",
  "8 chapters identified",
  "Product walkthrough identified",
  "Documentation opportunity found",
  "Interactive demo opportunity found",
]

const OUTPUTS = [
  { id: "video",             icon: Video,             title: "Video",             desc: "Polished video with captions and AI narration" },
  { id: "documentation",     icon: FileText,           title: "Documentation",     desc: "Step-by-step guide with screenshots" },
  { id: "interactive-demo",  icon: MousePointerClick,  title: "Interactive Demo",  desc: "Clickable product walkthrough" },
  { id: "training",          icon: BookOpen,           title: "Training Guide",    desc: "Structured learning material" },
  { id: "multiple",          icon: Layers,             title: "All Outputs",       desc: "Generate everything at once" },
]

const GEN_STEPS: Record<string, string[]> = {
  video:            ["Processing footage", "Adding captions", "Improving narration", "Rendering final video"],
  documentation:    ["Extracting screenshots", "Writing descriptions", "Formatting document", "Adding navigation"],
  "interactive-demo": ["Mapping interactions", "Creating hotspots", "Building click flow", "Adding annotations"],
  training:         ["Structuring content", "Writing exercises", "Adding assessments", "Formatting guide"],
  multiple:         ["Processing footage", "Generating all outputs", "Cross-linking assets", "Finalizing package"],
}

// ─── Logo mark ────────────────────────────────────────────────────────────────

function CluesoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 5.5 L15.6 12.4 L22.5 14 L15.6 15.6 L14 22.5 L12.4 15.6 L5.5 14 L12.4 12.4 Z"
        fill="white"
      />
    </svg>
  )
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export function RecordFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep]               = useState<Step>("mode")
  const [selectedMode, setMode]       = useState("full")
  const [selectedSource, setSource]   = useState("entire-screen")
  const [micEnabled, setMic]          = useState(true)
  const [cameraEnabled, setCamera]    = useState(false)
  const [isPaused, setPaused]         = useState(false)
  const [seconds, setSeconds]         = useState(0)
  const [processingIdx, setProcessing] = useState(-1)
  const [selectedOutput, setOutput]   = useState<string | null>(null)
  const [genProgress, setGenProgress] = useState(0)
  const [genStepIdx, setGenStep]      = useState(0)

  // Recording timer
  useEffect(() => {
    if (step !== "recording" || isPaused) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [step, isPaused])

  // Auto-advance processing steps
  useEffect(() => {
    if (step !== "processing") return
    setProcessing(-1)
    let i = 0
    const next = () => {
      setProcessing(i)
      i++
      if (i < PROCESSING_STEPS.length) {
        setTimeout(next, 900 + Math.random() * 400)
      } else {
        setTimeout(() => setStep("understanding"), 1000)
      }
    }
    const t = setTimeout(next, 500)
    return () => clearTimeout(t)
  }, [step])

  // Generation progress bar
  useEffect(() => {
    if (step !== "generating") return
    setGenProgress(0)
    setGenStep(0)
    const iv = setInterval(() => {
      setGenProgress((p) => {
        const next = Math.min(100, p + 1.2 + Math.random() * 2)
        setGenStep(Math.min(3, Math.floor((next / 100) * 4)))
        if (next >= 100) { clearInterval(iv); setTimeout(() => setStep("review"), 500) }
        return next
      })
    }, 60)
    return () => clearInterval(iv)
  }, [step])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  const outputMeta   = OUTPUTS.find((o) => o.id === selectedOutput)
  const outputLabel  = outputMeta?.title ?? "content"
  const currentGenSteps = GEN_STEPS[selectedOutput ?? "video"] ?? GEN_STEPS.video

  // ── STEP 1: Mode select ──────────────────────────────────────────────────────
  if (step === "mode") {
    return (
      <Backdrop>
        <Dialog>
          <DialogHeader title="What would you like to record?" subtitle="Choose your recording setup." onClose={onClose} />
          <div className="px-8 pb-8">
            <div className="grid grid-cols-2 gap-3 mb-7">
              {MODES.map((m) => {
                const Icon = m.icon
                const active = selectedMode === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={cn(
                      "relative text-left p-4 rounded-2xl border-2 transition-all",
                      active ? "border-[#6C5DD3] bg-[#F5F4FF]" : "border-[#E4E4E7] hover:border-[#D4D4D8] bg-white"
                    )}
                  >
                    {m.recommended && (
                      <span className="absolute top-3 right-3 text-[10px] font-semibold text-[#6C5DD3] bg-[#E4E1FF] px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors",
                      active ? "bg-[#6C5DD3]/15" : "bg-[#F4F4F5]"
                    )}>
                      <Icon className={cn("w-4 h-4", active ? "text-[#6C5DD3]" : "text-[#52525B]")} strokeWidth={1.5} />
                    </div>
                    <div className="font-semibold text-[14px] text-[#18181B] mb-1">{m.title}</div>
                    <div className="text-[12px] text-[#71717A] leading-relaxed">{m.desc}</div>
                    {active && (
                      <span className="absolute top-3 left-3 w-4 h-4 rounded-full bg-[#6C5DD3] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <PrimaryBtn onClick={() => setStep("source")}>
              Continue <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </PrimaryBtn>
          </div>
        </Dialog>
      </Backdrop>
    )
  }

  // ── STEP 2: Source select ────────────────────────────────────────────────────
  if (step === "source") {
    return (
      <Backdrop>
        <Dialog className="max-w-[440px]">
          <DialogHeader title="Choose your recording source" subtitle="Select what you want to capture." onClose={onClose} />
          <div className="px-8 pb-8 space-y-5">
            {/* Source radio */}
            <div className="space-y-2">
              {SOURCES.map((s) => {
                const active = selectedSource === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setSource(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all",
                      active ? "border-[#6C5DD3] bg-[#F5F4FF]" : "border-[#E4E4E7] hover:border-[#D4D4D8]"
                    )}
                  >
                    <span className={cn("font-medium text-[14px]", active ? "text-[#6E6BFF]" : "text-[#18181B]")}>
                      {s.label}
                    </span>
                    {active && (
                      <span className="w-5 h-5 rounded-full bg-[#6C5DD3] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Toggles */}
            <div className="border border-[#E4E4E7] rounded-xl overflow-hidden divide-y divide-[#F0F0F0]">
              <Toggle label="Microphone" icon={Mic} enabled={micEnabled} onToggle={() => setMic(!micEnabled)} />
              <Toggle label="Camera" icon={Camera} enabled={cameraEnabled} onToggle={() => setCamera(!cameraEnabled)} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setStep("mode")}
                className="flex items-center gap-1.5 px-4 py-3 text-[14px] font-medium text-[#52525B] hover:bg-[#F5F5F5] rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} /> Back
              </button>
              <button
                onClick={() => { setSeconds(0); setPaused(false); setStep("recording") }}
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[14px] py-3 rounded-xl transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Start Recording
              </button>
            </div>
          </div>
        </Dialog>
      </Backdrop>
    )
  }

  // ── STEP 3: Recording overlay ────────────────────────────────────────────────
  if (step === "recording") {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Red indicator bar at top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-500" />

        {/* Floating controller — pointer events restored */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="flex items-center gap-3 bg-[#111111]/95 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-2xl border border-white/10">
            {/* Timer */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[15px] font-medium text-white tracking-wide">{fmt(seconds)}</span>
            </div>

            {/* Pause / Resume */}
            <button
              onClick={() => setPaused(!isPaused)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              title={isPaused ? "Resume" : "Pause"}
            >
              {isPaused
                ? <Play  className="w-4 h-4 text-white" strokeWidth={2} />
                : <Pause className="w-4 h-4 text-white" strokeWidth={2} />}
            </button>

            {/* Stop */}
            <button
              onClick={() => setStep("processing")}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-[13px] px-4 py-2 rounded-xl transition-colors"
            >
              <Square className="w-3.5 h-3.5" strokeWidth={2} fill="currentColor" />
              Stop
            </button>

            <div className="w-px h-5 bg-white/10 mx-0.5" />

            {/* Mic */}
            <button
              onClick={() => setMic(!micEnabled)}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                micEnabled ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 hover:bg-red-500/30"
              )}
              title={micEnabled ? "Mute microphone" : "Unmute microphone"}
            >
              {micEnabled
                ? <Mic    className="w-4 h-4 text-white"    strokeWidth={1.5} />
                : <MicOff className="w-4 h-4 text-red-400"  strokeWidth={1.5} />}
            </button>

            {/* Camera */}
            <button
              onClick={() => setCamera(!cameraEnabled)}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                cameraEnabled ? "bg-white/10 hover:bg-white/20" : "bg-white/5 hover:bg-white/10"
              )}
              title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {cameraEnabled
                ? <Camera    className="w-4 h-4 text-white"     strokeWidth={1.5} />
                : <CameraOff className="w-4 h-4 text-white/40"  strokeWidth={1.5} />}
            </button>
          </div>

          <p className="text-center text-[12px] text-white/50 mt-3 drop-shadow">
            {isPaused ? "Recording paused" : "Recording in progress…"}
          </p>
        </div>
      </div>
    )
  }

  // ── STEP 4: Processing ───────────────────────────────────────────────────────
  if (step === "processing") {
    return (
      <FullPage>
        <div className="w-14 h-14 bg-[#6C5DD3] rounded-2xl flex items-center justify-center mb-10">
          <CluesoMark size={26} />
        </div>
        <h2 className="text-[28px] font-semibold text-[#111111] mb-3 text-center">Hold tight…</h2>
        <p className="text-[16px] text-[#71717A] text-center mb-12">Our AI is analyzing your recording.</p>

        <div className="w-full max-w-[360px] space-y-3 mb-10">
          {PROCESSING_STEPS.map((label, i) => {
            const done    = i <= processingIdx
            const current = i === processingIdx + 1
            return (
              <div key={label} className={cn("flex items-center gap-3.5 transition-opacity duration-300", done || current ? "opacity-100" : "opacity-25")}>
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                  done    ? "bg-[#6C5DD3]"               : "border-2 border-[#D4D4D8]"
                )}>
                  {done    && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
                  {current && <span className="w-2 h-2 rounded-full bg-[#6C5DD3] animate-pulse" />}
                </span>
                <span className={cn("text-[14px]", done ? "text-[#111111] font-medium" : "text-[#71717A]")}>{label}</span>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[360px] h-1 bg-[#F4F4F5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6C5DD3] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(4, ((processingIdx + 1) / PROCESSING_STEPS.length) * 100)}%` }}
          />
        </div>
      </FullPage>
    )
  }

  // ── STEP 5: AI Understanding ─────────────────────────────────────────────────
  if (step === "understanding") {
    return (
      <FullPage>
        <div className="w-20 h-20 rounded-full bg-[#F5F4FF] flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#6C5DD3] flex items-center justify-center">
            <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-[30px] font-semibold text-[#111111] mb-2 text-center">Your recording is ready.</h2>
        <p className="text-[16px] text-[#71717A] mb-10 text-center">Here&apos;s what we found:</p>

        <div className="w-full max-w-[380px] space-y-2.5 mb-12">
          {AI_FINDINGS.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#F5F4FF] border border-[#E4E1FF] rounded-xl px-4 py-3">
              <span className="w-5 h-5 rounded-full bg-[#6C5DD3] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-[14px] font-medium text-[#18181B]">{f}</span>
            </div>
          ))}
        </div>

        <PrimaryBtn onClick={() => setStep("output")} className="px-10 py-3.5 text-[15px]">
          Continue <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </PrimaryBtn>
      </FullPage>
    )
  }

  // ── STEP 6: Output select ────────────────────────────────────────────────────
  if (step === "output") {
    return (
      <FullPage className="relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
          <X className="w-4 h-4 text-[#71717A]" strokeWidth={2} />
        </button>

        <div className="text-center mb-12">
          <h2 className="text-[32px] font-semibold text-[#111111] mb-3">What would you like to create?</h2>
          <p className="text-[16px] text-[#71717A]">Choose an output. AI will generate it from your recording.</p>
        </div>

        <div className="grid grid-cols-5 gap-4 w-full max-w-[880px] mb-12">
          {OUTPUTS.map((o) => {
            const Icon   = o.icon
            const active = selectedOutput === o.id
            return (
              <button
                key={o.id}
                onClick={() => setOutput(o.id)}
                className={cn(
                  "flex flex-col items-center text-center p-6 rounded-[18px] border-2 transition-all",
                  active
                    ? "border-[#6C5DD3] bg-[#F5F4FF]"
                    : "border-[#E4E4E7] hover:border-[#D4D4D8] bg-white hover:shadow-md"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                  active ? "bg-[#6C5DD3]" : "bg-[#F4F4F5]"
                )}>
                  <Icon className={cn("w-5 h-5", active ? "text-white" : "text-[#52525B]")} strokeWidth={1.5} />
                </div>
                <div className={cn("font-semibold text-[14px] mb-1.5", active ? "text-[#6E6BFF]" : "text-[#18181B]")}>
                  {o.title}
                </div>
                <div className="text-[12px] text-[#71717A] leading-relaxed">{o.desc}</div>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => { if (selectedOutput) setStep("generating") }}
          disabled={!selectedOutput}
          className={cn(
            "flex items-center gap-2 font-semibold text-[15px] px-10 py-3.5 rounded-xl transition-all",
            selectedOutput
              ? "bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white"
              : "bg-[#F4F4F5] text-[#A1A1AA] cursor-not-allowed"
          )}
        >
          {selectedOutput ? `Create ${outputLabel}` : "Select an output"}
          {selectedOutput && <ArrowRight className="w-4 h-4" strokeWidth={2} />}
        </button>
      </FullPage>
    )
  }

  // ── STEP 7: Generating ───────────────────────────────────────────────────────
  if (step === "generating") {
    return (
      <FullPage>
        <div className="w-14 h-14 bg-[#6C5DD3] rounded-2xl flex items-center justify-center mb-10">
          <CluesoMark size={26} />
        </div>
        <h2 className="text-[26px] font-semibold text-[#111111] mb-2 text-center">
          Creating your {outputLabel}…
        </h2>
        <p className="text-[15px] text-[#71717A] mb-12">This usually takes 30–60 seconds.</p>

        <div className="w-full max-w-[400px] mb-8">
          <div className="flex items-center justify-between text-[13px] mb-2.5">
            <span className="text-[#52525B] font-medium">{currentGenSteps[Math.min(genStepIdx, currentGenSteps.length - 1)]}</span>
            <span className="text-[#6C5DD3] font-semibold">{Math.round(genProgress)}%</span>
          </div>
          <div className="h-2 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div className="h-full bg-[#6C5DD3] rounded-full transition-all duration-75" style={{ width: `${genProgress}%` }} />
          </div>
        </div>

        <div className="w-full max-w-[400px] space-y-2.5">
          {currentGenSteps.map((label, i) => {
            const done    = i < genStepIdx
            const current = i === Math.min(genStepIdx, currentGenSteps.length - 1)
            return (
              <div key={label} className={cn("flex items-center gap-3", done || current ? "opacity-100" : "opacity-25")}>
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                  done    ? "bg-[#6C5DD3]"                : current ? "border-2 border-[#6C5DD3]" : "border-2 border-[#D4D4D8]"
                )}>
                  {done    && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                  {current && <span className="w-2 h-2 rounded-full bg-[#6C5DD3] animate-pulse" />}
                </span>
                <span className={cn("text-[13px]", done || current ? "text-[#18181B]" : "text-[#A1A1AA]")}>{label}</span>
              </div>
            )
          })}
        </div>
      </FullPage>
    )
  }

  // ── STEP 8: Review ───────────────────────────────────────────────────────────
  if (step === "review") {
    const OutputIcon = outputMeta?.icon ?? Video
    return (
      <FullPage className="relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
          <X className="w-4 h-4 text-[#71717A]" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2 bg-[#F5F4FF] text-[#6C5DD3] text-[13px] font-semibold px-4 py-2 rounded-full mb-8">
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
          Generated successfully
        </div>

        <h2 className="text-[30px] font-semibold text-[#111111] mb-2 text-center">
          Your {outputLabel} is ready
        </h2>
        <p className="text-[15px] text-[#71717A] mb-10 text-center">
          Review and publish when you&apos;re happy with it.
        </p>

        {/* Preview placeholder */}
        <div className="w-full max-w-[680px] aspect-video bg-[#F8F8F7] rounded-2xl border border-[#E4E4E7] mb-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#6C5DD3]/10 flex items-center justify-center mx-auto mb-4">
              <OutputIcon className="w-8 h-8 text-[#6C5DD3]" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] text-[#A1A1AA]">{outputLabel} preview</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 text-[14px] font-medium text-[#52525B] border border-[#E4E4E7] hover:bg-[#F5F5F5] rounded-xl transition-colors">
            Edit
          </button>
          <button className="px-8 py-2.5 text-[14px] font-semibold bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white rounded-xl transition-colors">
            Publish
          </button>
          <button className="px-6 py-2.5 text-[14px] font-medium text-[#52525B] border border-[#E4E4E7] hover:bg-[#F5F5F5] rounded-xl transition-colors">
            Share
          </button>
        </div>
      </FullPage>
    )
  }

  return null
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      {children}
    </div>
  )
}

function Dialog({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-[20px] shadow-2xl w-full max-w-[540px] overflow-hidden", className)}>
      {children}
    </div>
  )
}

function DialogHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string
  subtitle: string
  onClose: () => void
}) {
  return (
    <div className="flex items-start justify-between p-8 pb-6">
      <div>
        <h2 className="text-[20px] font-semibold text-[#111111] mb-1">{title}</h2>
        <p className="text-[13px] text-[#71717A]">{subtitle}</p>
      </div>
      <button onClick={onClose} className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors ml-4 flex-shrink-0">
        <X className="w-4 h-4 text-[#71717A]" strokeWidth={2} />
      </button>
    </div>
  )
}

function FullPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("fixed inset-0 z-50 bg-white overflow-auto flex flex-col items-center justify-center px-8 py-16", className)}>
      {children}
    </div>
  )
}

function PrimaryBtn({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-semibold text-[14px] px-6 py-3 rounded-xl transition-colors w-full justify-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}

function Toggle({
  label,
  icon: Icon,
  enabled,
  onToggle,
}: {
  label: string
  icon: React.ElementType
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
        <span className="text-[14px] font-medium text-[#18181B]">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={cn("relative w-10 h-6 rounded-full transition-colors", enabled ? "bg-[#6C5DD3]" : "bg-[#D4D4D8]")}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
            enabled ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  )
}
