"use client"

import { useState } from "react"
import {
  Share2, Download, Check, Clock, Plus, ChevronLeft, ChevronRight,
  ArrowLeft, Sparkles, FileText, Languages, Globe, CheckCircle2,
  Loader2, ArrowRight, ImageIcon, Layers, PenLine, MousePointer,
  Variable, AlignLeft, LayoutList, Wand2, Users, Eye,
} from "lucide-react"
import Image from "next/image"

interface EditorWorkspaceProps {
  onBack?: () => void
}

type LeftTab = "overview" | "steps" | "screenshots" | "content" | "variables" | "interactive" | "translations"
type RightTab = "copilot" | "settings"

export function EditorWorkspace({ onBack }: EditorWorkspaceProps = {}) {
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab>("steps")
  const [selectedStep, setSelectedStep] = useState(2)
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("copilot")

  const steps = [
    { id: 1, title: "Introduction",         status: "complete"   as const, screenshot: "/images/screenshot-1.png" },
    { id: 2, title: "Navigate to Settings", status: "complete"   as const, screenshot: "/images/screenshot-2.png" },
    { id: 3, title: "Configure Options",    status: "complete"   as const, screenshot: "/images/screenshot-3.png" },
    { id: 4, title: "Add Team Members",     status: "processing" as const, screenshot: "/images/screenshot-4.png" },
    { id: 5, title: "Review & Publish",     status: "pending"    as const, screenshot: "/images/screenshot-5.png" },
  ]

  const currentStep = steps.find(s => s.id === selectedStep)

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">

      {/* Top Toolbar */}
      <header className="h-12 border-b border-[#E4E4E7] bg-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-[6px] transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="w-px h-5 bg-[#E4E4E7]" />
          <h1 className="text-[14px] font-semibold text-[#18181B]">Product Onboarding Guide</h1>
          <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            <span>Saved 2m ago</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ECFDF5] text-[#059669] text-[11px] font-semibold rounded-full">
            <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
            Published
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: PenLine,      label: "Edit" },
            { icon: Wand2,        label: "AI Rewrite" },
            { icon: ImageIcon,    label: "Add screenshot" },
            { icon: Globe,        label: "Translate" },
            { icon: MousePointer, label: "Add hotspot" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} title={label}
              className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-[6px] transition-all">
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[12px] text-[#71717A]">
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>284 views</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#71717A]">
            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>3</span>
          </div>
          <div className="w-px h-4 bg-[#E4E4E7]" />
          <button className="px-3 py-1.5 text-[12px] font-medium text-[#71717A] bg-white border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] transition-all flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Share
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium text-[#71717A] bg-white border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] transition-all flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            Export
          </button>
          <button className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] transition-all flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" strokeWidth={2} />
            Publish
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-[240px] border-r border-[#E4E4E7] bg-white flex flex-col shrink-0">
          {/* Tab strip */}
          <div className="border-b border-[#E4E4E7] p-2">
            <div className="grid grid-cols-4 gap-1">
              <TabBtn icon={LayoutList}  label="Overview"    active={activeLeftTab === "overview"}     onClick={() => setActiveLeftTab("overview")} />
              <TabBtn icon={AlignLeft}   label="Steps"       active={activeLeftTab === "steps"}        onClick={() => setActiveLeftTab("steps")} />
              <TabBtn icon={ImageIcon}   label="Screens"     active={activeLeftTab === "screenshots"}  onClick={() => setActiveLeftTab("screenshots")} />
              <TabBtn icon={FileText}    label="Content"     active={activeLeftTab === "content"}      onClick={() => setActiveLeftTab("content")} />
            </div>
            <div className="grid grid-cols-3 gap-1 mt-1">
              <TabBtn icon={Variable}     label="Variables"  active={activeLeftTab === "variables"}    onClick={() => setActiveLeftTab("variables")} />
              <TabBtn icon={MousePointer} label="Interactive" active={activeLeftTab === "interactive"} onClick={() => setActiveLeftTab("interactive")} />
              <TabBtn icon={Languages}    label="Translate"  active={activeLeftTab === "translations"} onClick={() => setActiveLeftTab("translations")} />
            </div>
          </div>

          <div className="flex-1 overflow-auto">

            {activeLeftTab === "overview" && (
              <div className="p-4 space-y-1">
                {[
                  ["Steps", "5"], ["Screenshots", "12"], ["Words", "1,840"],
                  ["Views", "284"], ["Completion", "78%"], ["Languages", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-[#F4F4F5]">
                    <span className="text-[12px] text-[#71717A]">{label}</span>
                    <span className="text-[13px] font-semibold text-[#18181B]">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "steps" && (
              <div className="p-3 space-y-2">
                {steps.map((step) => (
                  <StepCard key={step.id} step={step} active={selectedStep === step.id} onClick={() => setSelectedStep(step.id)} />
                ))}
                <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] border border-dashed border-[#E4E1FF] rounded-[8px] hover:bg-[#F5F4FF] transition-all flex items-center justify-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  Add Step
                </button>
              </div>
            )}

            {activeLeftTab === "screenshots" && (
              <div className="p-3">
                <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[8px] hover:bg-[#E4E1FF] transition-all mb-3 flex items-center justify-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  Add Screenshot
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="aspect-video rounded-[6px] overflow-hidden border border-[#E4E4E7] hover:border-[#6C5DD3] cursor-pointer transition-all relative">
                      <Image src={`/images/screenshot-${i}.png`} alt={`Screenshot ${i}`} fill className="object-cover" sizes="120px" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLeftTab === "content" && (
              <div className="p-4 space-y-2">
                {[
                  { type: "Title",   preview: "Product Onboarding Guide" },
                  { type: "Intro",   preview: "Welcome to the platform. This guide..." },
                  { type: "Section", preview: "Step 1: Navigate to Settings" },
                  { type: "Note",    preview: "Tip: You can also access settings from..." },
                  { type: "Warning", preview: "Important: Save your changes before..." },
                ].map(({ type, preview }) => (
                  <div key={type} className="p-2.5 rounded-[8px] border border-[#E4E4E7] bg-white hover:border-[#6C5DD3] cursor-pointer transition-all">
                    <div className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wide mb-1">{type}</div>
                    <div className="text-[12px] text-[#52525B] truncate">{preview}</div>
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "variables" && (
              <div className="p-4 space-y-3">
                <p className="text-[11px] text-[#71717A]">Variables are auto-filled when generating docs.</p>
                {[
                  ["product_name", "Clueso"], ["company_name", "Acme Corp"],
                  ["support_email", "help@acme.com"], ["doc_version", "v2.1"],
                ].map(([name, value]) => (
                  <div key={name} className="flex items-center gap-2">
                    <code className="text-[11px] text-[#6C5DD3] bg-[#F5F4FF] px-2 py-1 rounded flex-1 truncate">{`{{${name}}}`}</code>
                    <span className="text-[12px] text-[#52525B] flex-1 truncate">{value}</span>
                  </div>
                ))}
                <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] border border-dashed border-[#E4E1FF] rounded-[8px] hover:bg-[#F5F4FF] transition-all flex items-center justify-center gap-1.5 mt-1">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  Add Variable
                </button>
              </div>
            )}

            {activeLeftTab === "interactive" && (
              <div className="p-4">
                <p className="text-[12px] text-[#71717A] mb-3">
                  Add interactive hotspots to turn this guide into a clickable walkthrough.
                </p>
                <button className="w-full py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] transition-all flex items-center justify-center gap-1.5 mb-3">
                  <MousePointer className="w-4 h-4" strokeWidth={1.5} />
                  Add Hotspot
                </button>
                {[["1", "Click Settings icon"], ["2", "Select Team tab"], ["3", "Enter email address"]].map(([num, label]) => (
                  <div key={num} className="flex items-center gap-2 py-2 border-b border-[#F4F4F5]">
                    <div className="w-5 h-5 rounded-full bg-[#6C5DD3] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{num}</div>
                    <span className="text-[12px] text-[#18181B]">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "translations" && (
              <div className="p-4 space-y-2">
                <LangItem language="Spanish" status="complete" />
                <LangItem language="French"  status="processing" />
                <LangItem language="German"  status="pending" />
                <button className="w-full py-2.5 text-[13px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[8px] hover:bg-[#E4E1FF] transition-all mt-3 flex items-center justify-center gap-1.5">
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  Add Language
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER — Documentation Canvas */}
        <div className="flex-1 flex flex-col bg-[#F8F9FA] overflow-auto">
          <div className="h-12 border-b border-[#E4E4E7] bg-white flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <button className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-[6px] transition-all">
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <span className="text-[13px] font-medium text-[#18181B]">
                Step {selectedStep}: {currentStep?.title}
              </span>
              <button className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-[6px] transition-all">
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <span className="text-[12px] text-[#A1A1AA]">{selectedStep} / {steps.length}</span>
          </div>

          {/* Doc canvas */}
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <div className="w-full max-w-[740px] bg-white rounded-[12px] border border-[#E4E4E7] shadow-sm overflow-hidden">

              {/* Screenshot */}
              <div className="aspect-[16/9] bg-[#F8F9FA] relative overflow-hidden border-b border-[#E4E4E7]">
                {currentStep && (
                  <Image src={currentStep.screenshot} alt={currentStep.title} fill className="object-cover" sizes="740px" />
                )}
                <div className="absolute top-[42%] left-[68%] w-6 h-6 rounded-full bg-[#6C5DD3] border-2 border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <span className="text-[10px] text-white font-bold">1</span>
                </div>
              </div>

              {/* Step content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6C5DD3] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                    {selectedStep}
                  </div>
                  <h2 className="text-[22px] font-semibold text-[#18181B] leading-tight">
                    {currentStep?.title}
                  </h2>
                </div>

                <div className="space-y-4 text-[15px] text-[#374151] leading-[1.7]">
                  <p>
                    To navigate to the settings panel, click the gear icon in the top-right corner of the dashboard.
                    This opens the global settings menu where you can configure your workspace preferences.
                  </p>

                  <div className="bg-[#F5F4FF] border-l-4 border-[#6C5DD3] rounded-r-[8px] px-4 py-3">
                    <p className="text-[13px] text-[#52525B] font-medium">
                      💡 <strong className="text-[#18181B]">Tip:</strong> You can also open settings with{" "}
                      <code className="bg-[#E4E1FF] text-[#6C5DD3] px-1.5 py-0.5 rounded text-[12px] font-mono">⌘ ,</code>
                    </p>
                  </div>

                  <p>
                    In the settings menu, you&apos;ll find options for Account, Team, Notifications, Integrations, and Billing.
                  </p>

                  <ol className="space-y-2 pl-1">
                    {["Click the gear icon ⚙️ in the top-right corner", "Select Settings from the dropdown", "Choose your configuration section"].map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#E4E1FF] text-[#6C5DD3] text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-[14px] text-[#374151]">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Step nav */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F0F0F0]">
                  <button
                    onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
                    disabled={selectedStep === 1}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#71717A] border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                    Previous
                  </button>
                  <span className="text-[12px] text-[#A1A1AA]">{selectedStep} / {steps.length}</span>
                  <button
                    onClick={() => setSelectedStep(Math.min(steps.length, selectedStep + 1))}
                    disabled={selectedStep === steps.length}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — AI Copilot */}
        <aside className="w-[300px] border-l border-[#E4E4E7] bg-white flex flex-col shrink-0">
          <div className="flex border-b border-[#E4E4E7]">
            {(["copilot", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveRightTab(tab)}
                className={`flex-1 px-4 py-3 text-[12px] font-medium border-b-2 transition-colors capitalize flex items-center justify-center gap-1.5 ${
                  activeRightTab === tab
                    ? "text-[#18181B] border-[#6C5DD3]"
                    : "text-[#71717A] border-transparent hover:text-[#18181B]"
                }`}
              >
                {tab === "copilot" && <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />}
                {tab === "copilot" ? "AI Copilot" : "Settings"}
              </button>
            ))}
          </div>

          {activeRightTab === "copilot" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto p-4 space-y-4">
                <AIMsg
                  message="I've analyzed your guide. I can rewrite content, generate missing steps, improve clarity, translate, add screenshots, or build an interactive walkthrough."
                  timestamp="2m ago"
                />
                <UserMsg message="Make Step 3 clearer and more concise" timestamp="1m ago" />
                <AIMsg
                  message="Done — rewrote Step 3 to be 40% shorter with clearer action language. Numbered sub-steps now match screenshot hotspots."
                  timestamp="Just now"
                  actions={["Apply Changes", "View Diff"]}
                />
              </div>

              <div className="border-t border-[#E4E4E7] p-3">
                <div className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wide mb-2">Quick Actions</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { icon: PenLine,       label: "Rewrite Content" },
                    { icon: Layers,        label: "Generate Steps" },
                    { icon: Wand2,         label: "Improve Clarity" },
                    { icon: Globe,         label: "Translate" },
                    { icon: ImageIcon,     label: "Gen Screenshots" },
                    { icon: MousePointer,  label: "Make Interactive" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-[#52525B] bg-[#F8F9FA] rounded-[6px] hover:bg-[#F5F4FF] hover:text-[#6C5DD3] transition-all text-left">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-[#E4E4E7]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask AI to help with your doc..."
                    className="w-full pl-3 pr-9 py-2.5 text-[13px] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[8px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:bg-white transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
                <p className="text-[10px] text-[#A1A1AA] mt-1.5">
                  Try: &quot;Add a warning note&quot; or &quot;Translate to Spanish&quot;
                </p>
              </div>
            </div>
          )}

          {activeRightTab === "settings" && (
            <div className="flex-1 overflow-auto p-4 space-y-5">
              <SettingsSection title="Document">
                <SettingsField label="Title" value="Product Onboarding Guide" />
                <SettingsField label="Slug"  value="product-onboarding-guide" />
                <SettingsToggle label="Public access"  enabled />
                <SettingsToggle label="Allow comments" enabled={false} />
              </SettingsSection>
              <SettingsSection title="Format">
                <SettingsSelect label="Layout"   options={["Single page", "Multi-step", "FAQ"]} />
                <SettingsSelect label="Language" options={["English", "Spanish", "French"]} />
              </SettingsSection>
              <SettingsSection title="Interactive">
                <SettingsToggle label="Enable hotspots"    enabled />
                <SettingsToggle label="Show step numbers"  enabled />
                <SettingsToggle label="Require completion" enabled={false} />
              </SettingsSection>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function TabBtn({ icon: Icon, label, active, onClick }: {
  icon: React.ElementType; label: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-[6px] transition-all ${
        active
          ? "bg-[#F5F4FF] text-[#6C5DD3]"
          : "text-[#71717A] hover:bg-[#F8F9FA] hover:text-[#18181B]"
      }`}
    >
      <Icon className="w-4 h-4" strokeWidth={1.5} />
      <span className="text-[9px] font-medium leading-none">{label}</span>
    </button>
  )
}

function StepCard({ step, active, onClick }: {
  step: { id: number; title: string; status: "complete" | "processing" | "pending"; screenshot: string }
  active: boolean; onClick: () => void
}) {
  const dot = { complete: "bg-[#10B981]", processing: "bg-[#6C5DD3]", pending: "bg-[#D4D4D8]" }
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-[8px] border transition-all ${
        active
          ? "border-[#6C5DD3] bg-[#F5F4FF]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8]"
      }`}
    >
      <div className="aspect-video bg-[#F8F9FA] rounded-t-[7px] overflow-hidden relative">
        <Image src={step.screenshot} alt={step.title} fill className="object-cover" sizes="200px" />
      </div>
      <div className="p-2.5 flex items-start justify-between gap-2">
        <div>
          <div className="text-[11px] text-[#A1A1AA] mb-0.5">Step {step.id}</div>
          <div className="text-[12px] font-medium text-[#18181B] leading-tight">{step.title}</div>
        </div>
        <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${dot[step.status]}`} />
      </div>
    </div>
  )
}

function LangItem({ language, status }: { language: string; status: "complete" | "processing" | "pending" }) {
  const cfg = {
    complete:   { icon: CheckCircle2, color: "text-[#10B981]", bg: "bg-[#ECFDF5]", label: "Complete" },
    processing: { icon: Loader2,      color: "text-[#6C5DD3]", bg: "bg-[#F5F4FF]", label: "Processing" },
    pending:    { icon: Clock,        color: "text-[#71717A]", bg: "bg-[#F4F4F5]",  label: "Pending" },
  }[status]
  const Icon = cfg.icon
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-[#E4E4E7] rounded-[8px]">
      <span className="text-[13px] font-medium text-[#18181B]">{language}</span>
      <div className={`flex items-center gap-1.5 px-2 py-1 ${cfg.bg} rounded-full`}>
        <Icon className={`w-3 h-3 ${cfg.color} ${status === "processing" ? "animate-spin" : ""}`} strokeWidth={1.5} />
        <span className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
      </div>
    </div>
  )
}

function AIMsg({ message, timestamp, actions }: { message: string; timestamp: string; actions?: string[] }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-6 h-6 rounded-full bg-[#6C5DD3] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <div className="bg-[#F8F9FA] rounded-[10px] rounded-tl-[2px] p-3 text-[12px] text-[#18181B] leading-relaxed">
          {message}
        </div>
        {actions && (
          <div className="flex gap-2 mt-2">
            {actions.map((a) => (
              <button key={a} className="px-3 py-1.5 text-[11px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[6px] hover:bg-[#E4E1FF] transition-all">
                {a}
              </button>
            ))}
          </div>
        )}
        <div className="text-[10px] text-[#A1A1AA] mt-1">{timestamp}</div>
      </div>
    </div>
  )
}

function UserMsg({ message, timestamp }: { message: string; timestamp: string }) {
  return (
    <div className="flex gap-2.5 flex-row-reverse">
      <div className="w-6 h-6 rounded-full bg-[#18181B] flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">S</div>
      <div className="flex-1">
        <div className="bg-[#18181B] rounded-[10px] rounded-tr-[2px] p-3 text-[12px] text-white leading-relaxed">
          {message}
        </div>
        <div className="text-[10px] text-[#A1A1AA] mt-1 text-right">{timestamp}</div>
      </div>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold text-[#18181B] mb-3 uppercase tracking-wide">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[11px] text-[#71717A] mb-1.5 block">{label}</label>
      <input
        defaultValue={value}
        className="w-full px-3 py-2 text-[13px] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[8px] text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all"
      />
    </div>
  )
}

function SettingsSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-[11px] text-[#71717A] mb-1.5 block">{label}</label>
      <select className="w-full px-3 py-2 text-[13px] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[8px] text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}

function SettingsToggle({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-[#18181B]">{label}</span>
      <div className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${enabled ? "bg-[#6C5DD3]" : "bg-[#E4E4E7]"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${enabled ? "left-[18px]" : "left-0.5"}`} />
      </div>
    </div>
  )
}
