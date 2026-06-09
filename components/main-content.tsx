"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FileText, Upload, Workflow, ArrowRight, Eye, Users,
  Clock, CheckCircle2, AlertCircle, Sparkles, BookOpen,
  Globe, Layers, Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { CreationFlow } from "@/components/creation-flow"
import { UploadFlow } from "@/components/upload-flow"
import { TemplateFlow } from "@/components/template-flow-simple"
import { TopNav } from "@/components/top-nav"

const SCREENSHOTS = [
  "/images/screenshot-1.png", "/images/screenshot-2.png",
  "/images/screenshot-3.png", "/images/screenshot-4.png",
  "/images/screenshot-5.png", "/images/screenshot-6.png",
  "/images/screenshot-7.png", "/images/screenshot-8.png",
]

export function MainContent() {
  const router = useRouter()
  const [showRecordFlow, setShowRecordFlow] = useState(false)
  const [showUploadFlow, setShowUploadFlow] = useState(false)
  const [showTemplateFlow, setShowTemplateFlow] = useState(false)

  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      {showRecordFlow   && <CreationFlow  onClose={() => setShowRecordFlow(false)}   />}
      {showUploadFlow   && <UploadFlow    onClose={() => setShowUploadFlow(false)}   />}
      {showTemplateFlow && <TemplateFlow  onClose={() => setShowTemplateFlow(false)} />}

      <TopNav
        onRecordClick={() => setShowRecordFlow(true)}
        onUploadClick={() => setShowUploadFlow(true)}
        onTemplateClick={() => setShowTemplateFlow(true)}
      />

      <div className="px-12 py-12 max-w-[1800px] mx-auto">

        {/* Hero */}
        <section className="mb-12 max-w-[820px]">
          <h1 className="font-serif text-[42px] leading-[1.15] tracking-[-0.02em] text-[#18181B] mb-4">
            Create product knowledge people actually use.
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#52525B] max-w-[660px]">
            Turn recordings, screenshots, and workflows into documentation, SOPs, onboarding guides, and interactive walkthroughs.
          </p>
        </section>

        {/* Quick Actions */}
        <section className="mb-16 max-w-[1400px]">
          <div className="grid grid-cols-3 gap-4">
            <QuickAction
              icon={<Workflow className="w-[18px] h-[18px]" strokeWidth={1.5} />}
              title="Capture Workflow"
              description="Record your screen and generate docs instantly"
              onClick={() => setShowRecordFlow(true)}
              primary
            />
            <QuickAction
              icon={<Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />}
              title="Upload Screenshots"
              description="Build a guide from images or recordings"
              disabled
            />
            <QuickAction
              icon={<FileText className="w-[18px] h-[18px]" strokeWidth={1.5} />}
              title="Create Documentation"
              description="Start from a proven template"
              disabled
            />
          </div>
        </section>

        {/* Continue Working */}
        <section className="mb-16 max-w-[1400px]">
          <SectionHeader title="Continue Working" action="View all" />
          <div className="grid grid-cols-3 gap-5">
            <DocCard
              title="Product Onboarding Guide"
              type="Onboarding Guide"
              status="In Progress"
              lastEdited="2 hours ago"
              views={284}
              contributors={3}
              screenshotIndex={0}
              onClick={() => router.push("/editor")}
              highlight
            />
            <DocCard
              title="API Documentation"
              type="Technical Docs"
              status="Published"
              lastEdited="Yesterday"
              views={1204}
              contributors={2}
              screenshotIndex={1}
              disabled
            />
            <DocCard
              title="Employee Training Guide"
              type="Training"
              status="Draft"
              lastEdited="3 days ago"
              views={47}
              contributors={1}
              screenshotIndex={2}
              disabled
            />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-16 max-w-[1400px]">
          <SectionHeader title="AI Recommendations" />
          <div className="grid grid-cols-3 gap-4 opacity-40 pointer-events-none select-none">
            <RecommendationCard
              icon={<FileText className="w-4 h-4" strokeWidth={1.5} />}
              title="Generate SOP"
              description="Turn your workflow recording into a standard operating procedure."
              action="Generate"
            />
            <RecommendationCard
              icon={<Layers className="w-4 h-4" strokeWidth={1.5} />}
              title="Create Interactive Walkthrough"
              description="Convert your guide into a clickable product tour."
              action="Create"
            />
            <RecommendationCard
              icon={<BookOpen className="w-4 h-4" strokeWidth={1.5} />}
              title="Generate API Documentation"
              description="Produce structured API docs from your workflow capture."
              action="Generate"
            />
            <RecommendationCard
              icon={<Sparkles className="w-4 h-4" strokeWidth={1.5} />}
              title="Improve Existing Documentation"
              description="AI rewrites, clarifies, and fills gaps in your current docs."
              action="Improve"
            />
            <RecommendationCard
              icon={<Globe className="w-4 h-4" strokeWidth={1.5} />}
              title="Translate Documentation"
              description="Instantly localize guides into Spanish, French, German, and more."
              action="Translate"
            />
            <RecommendationCard
              icon={<BookOpen className="w-4 h-4" strokeWidth={1.5} />}
              title="Generate Knowledge Base"
              description="Organize all your guides into a searchable knowledge hub."
              action="Generate"
            />
          </div>
        </section>

        {/* Popular Templates */}
        <section className="max-w-[1400px]">
          <SectionHeader title="Popular Templates" action="Browse all" />
          <div className="grid grid-cols-4 gap-4 opacity-40 pointer-events-none select-none">
            <TemplateCard title="Product Onboarding" category="Onboarding" uses="3.1k" src="/images/template/template-1.png" />
            <TemplateCard title="API Documentation"  category="Technical"  uses="2.4k" src="/images/template/template-2.png" />
            <TemplateCard title="Employee Training"  category="Training"   uses="1.9k" src="/images/template/template-3.png" />
            <TemplateCard title="Standard SOP"       category="Operations" uses="1.6k" src="/images/template/template-4.png" />
          </div>
        </section>

      </div>
    </main>
  )
}

// ── Shared ────────────────────────────────────────────────────────────────────

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[20px] font-semibold text-[#18181B]">{title}</h2>
      {action && (
        <button className="text-[13px] text-[#6C5DD3] hover:text-[#5B4EC2] font-medium transition-colors flex items-center gap-1.5">
          {action}
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}

// ── Quick Actions ─────────────────────────────────────────────────────────────

function QuickAction({
  icon, title, description, onClick, primary, disabled,
}: {
  icon: React.ReactNode; title: string; description: string; onClick?: () => void; primary?: boolean; disabled?: boolean
}) {
  if (disabled) {
    return (
      <div className="flex items-center gap-3.5 px-5 py-4 rounded-[10px] border border-[#E4E4E7] bg-white text-left opacity-40 cursor-default select-none">
        <div className="p-2 bg-[#F8F9FA] rounded-[8px] flex-shrink-0">
          <div className="text-[#52525B]">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[15px] mb-0.5 text-[#18181B]">{title}</div>
          <div className="text-[13px] text-[#71717A]">{description}</div>
        </div>
      </div>
    )
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3.5 px-5 py-4 rounded-[10px] border text-left transition-all duration-200 active:scale-[0.98]",
        primary
          ? "bg-[#6C5DD3] border-[#6C5DD3] hover:bg-[#5B4EC2] hover:border-[#5B4EC2] hover:shadow-lg"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:shadow-md"
      )}
    >
      <div className={cn(
        "p-2 rounded-[8px] flex-shrink-0 transition-colors duration-200",
        primary ? "bg-white/15" : "bg-[#F8F9FA] group-hover:bg-[#F5F4FF]"
      )}>
        <div className={cn(
          "transition-colors duration-200",
          primary ? "text-white" : "text-[#52525B] group-hover:text-[#6C5DD3]"
        )}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("font-semibold text-[15px] mb-0.5", primary ? "text-white" : "text-[#18181B]")}>
          {title}
        </div>
        <div className={cn("text-[13px]", primary ? "text-white/80" : "text-[#71717A]")}>
          {description}
        </div>
      </div>
    </button>
  )
}

// ── Doc Card ──────────────────────────────────────────────────────────────────

const statusConfig = {
  Published:    { color: "text-[#059669]", bg: "bg-[#ECFDF5]",   icon: CheckCircle2 },
  "In Progress":{ color: "text-[#6C5DD3]", bg: "bg-[#F5F4FF]",   icon: AlertCircle },
  Draft:        { color: "text-[#71717A]", bg: "bg-[#F4F4F5]",   icon: Clock },
} as const

function DocCard({
  title, type, status, lastEdited, views, contributors, screenshotIndex, onClick, highlight, disabled,
}: {
  title: string; type: string; status: "Published" | "In Progress" | "Draft"
  lastEdited: string; views: number; contributors: number; screenshotIndex: number
  onClick?: () => void; highlight?: boolean; disabled?: boolean
}) {
  const cfg = statusConfig[status]
  const StatusIcon = cfg.icon

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        "group bg-white rounded-[12px] overflow-hidden transition-all duration-200",
        disabled
          ? "border border-[#E4E4E7] opacity-50 cursor-default"
          : highlight
          ? "border border-[#C8BFEF] cursor-pointer hover:border-[#9B8FE0] hover:shadow-md hover:-translate-y-0.5"
          : "border border-[#E4E4E7] cursor-pointer hover:border-[#D4D4D8] hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className="aspect-[16/9] bg-[#F8F9FA] relative overflow-hidden">
        <Image
          src={SCREENSHOTS[screenshotIndex % SCREENSHOTS.length]}
          alt={title}
          fill
          className="object-cover"
          sizes="33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-lg">
          {type}
        </div>
      </div>

      <div className="p-4">
        <div className="font-semibold text-[15px] text-[#18181B] mb-3 leading-snug">{title}</div>

        <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold mb-3", cfg.bg, cfg.color)}>
          <StatusIcon className="w-3 h-3" strokeWidth={2} />
          {status}
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] text-[#71717A]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            <span className="truncate">{lastEdited}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            <span>{views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
            <span>{contributors}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── AI Recommendations ────────────────────────────────────────────────────────

function RecommendationCard({
  icon, title, description, action,
}: { icon: React.ReactNode; title: string; description: string; action: string }) {
  return (
    <div className="group bg-white border border-[#E4E4E7] rounded-[10px] p-4 hover:border-[#E4E1FF] hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-[#F5F4FF] rounded-[8px] flex-shrink-0 group-hover:bg-[#E4E1FF] transition-colors">
          <div className="text-[#6C5DD3]">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[14px] text-[#18181B] mb-1">{title}</h3>
          <p className="text-[12px] text-[#71717A] leading-relaxed">{description}</p>
        </div>
      </div>
      <button className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
        {action}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}

// ── Template Card ─────────────────────────────────────────────────────────────

function TemplateCard({ title, category, uses, src }: { title: string; category: string; uses: string; src: string }) {
  return (
    <div className="group bg-white border border-[#E4E4E7] rounded-[12px] overflow-hidden hover:border-[#D4D4D8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-[#18181B] font-semibold text-[12px] px-3.5 py-1.5 rounded-lg shadow-lg">
            Use Template
          </span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-lg">
          {category}
        </div>
      </div>
      <div className="px-3.5 py-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-[13px] text-[#18181B] leading-tight">{title}</div>
          <div className="text-[11px] text-[#A1A1AA] mt-0.5">{uses} uses</div>
        </div>
        <Play className="w-4 h-4 text-[#D4D4D8] group-hover:text-[#6C5DD3] transition-colors flex-shrink-0" strokeWidth={1.5} />
      </div>
    </div>
  )
}
