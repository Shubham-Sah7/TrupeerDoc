"use client"

import { useState } from "react"
import {
  ArrowLeft, Clock, CheckCircle2, Share2, Download, History,
  Sparkles, ChevronLeft, ChevronRight, Plus, Video, FileText,
  LayoutList, AlignLeft, ImageIcon, Variable, MousePointer,
  Languages, Globe, Check, Eye, Users, X, Code2,
  AlertTriangle, Info, Hash, Wand2, PenLine, Layers,
  ArrowRight, Loader2, BookOpen, HelpCircle, List,
  MoreHorizontal, Copy, ExternalLink, RefreshCw,
  CheckSquare, Link2, ChevronDown, Search, Zap,
  GitBranch, Lock, Unlock, Settings,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface EditorWorkspaceProps { onBack?: () => void }
type LeftTab = "overview" | "steps" | "screenshots" | "content" | "variables" | "interactive" | "translations"

const STEPS = [
  { id: 1, title: "Introduction",         status: "complete"   as const, screenshot: "/images/screenshot-1.png" },
  { id: 2, title: "Navigate to Settings", status: "complete"   as const, screenshot: "/images/screenshot-2.png" },
  { id: 3, title: "Configure Options",    status: "complete"   as const, screenshot: "/images/screenshot-3.png" },
  { id: 4, title: "Add Team Members",     status: "processing" as const, screenshot: "/images/screenshot-4.png" },
  { id: 5, title: "Review & Publish",     status: "pending"    as const, screenshot: "/images/screenshot-5.png" },
]

const SLASH_GROUPS = [
  {
    label: "Text",
    items: [
      { icon: Hash,          cmd: "Heading 1",       desc: "Large section title",       key: "h1" },
      { icon: Hash,          cmd: "Heading 2",       desc: "Medium heading",            key: "h2" },
      { icon: AlignLeft,     cmd: "Paragraph",       desc: "Plain text block",          key: "p"  },
    ],
  },
  {
    label: "Blocks",
    items: [
      { icon: Info,          cmd: "Callout",         desc: "Tip or info highlight",     key: "callout"  },
      { icon: AlertTriangle, cmd: "Warning",         desc: "Important warning",         key: "warning"  },
      { icon: BookOpen,      cmd: "Note",            desc: "Side note",                 key: "note"     },
      { icon: HelpCircle,    cmd: "FAQ",             desc: "Question & answer pair",    key: "faq"      },
      { icon: List,          cmd: "Checklist",       desc: "Task list",                 key: "check"    },
      { icon: Code2,         cmd: "Code Block",      desc: "Syntax highlighted code",   key: "code"     },
      { icon: CheckSquare,   cmd: "Steps",           desc: "Numbered step list",        key: "steps"    },
    ],
  },
  {
    label: "AI",
    items: [
      { icon: Sparkles,      cmd: "AI Section",      desc: "Generate a new section",    key: "ai-gen"   },
      { icon: Wand2,         cmd: "AI Improve",      desc: "Improve current content",   key: "ai-imp"   },
    ],
  },
  {
    label: "Media",
    items: [
      { icon: ImageIcon,     cmd: "Screenshot",      desc: "Insert screenshot",         key: "img"      },
      { icon: Video,         cmd: "Video",           desc: "Embed video clip",          key: "vid"      },
    ],
  },
]

const VERSIONS = [
  { id: 1, author: "You",         time: "Just now",    desc: "Rewrote Step 2 intro paragraph",        tag: "Current"  },
  { id: 2, author: "You",         time: "2h ago",      desc: "Added warning block to Step 4",         tag: null       },
  { id: 3, author: "Sarah Chen",  time: "Yesterday",   desc: "Reordered steps, improved clarity",     tag: null       },
  { id: 4, author: "You",         time: "3 days ago",  desc: "Added code snippet and FAQ section",    tag: null       },
  { id: 5, author: "AI",          time: "5 days ago",  desc: "Auto-generated from screen recording",  tag: "Original" },
]

export function EditorWorkspace({ onBack }: EditorWorkspaceProps = {}) {
  const [activeLeftTab, setActiveLeftTab]   = useState<LeftTab>("steps")
  const [selectedStep,  setSelectedStep]    = useState(2)
  const [rightTab,      setRightTab]        = useState<"copilot" | "settings">("copilot")
  const [activeView,    setActiveView]      = useState<"doc" | "video">("doc")
  const [copilotOpen,   setCopilotOpen]     = useState(true)

  // Overlays
  const [showSlash,    setShowSlash]        = useState(false)
  const [slashQuery,   setSlashQuery]       = useState("")
  const [showHistory,  setShowHistory]      = useState(false)
  const [showShare,    setShowShare]        = useState(false)
  const [showPublish,  setShowPublish]      = useState(false)

  // Rewrite flow
  const [selectedBlock,   setSelectedBlock]   = useState<string | null>(null)
  const [rewritingBlock,  setRewritingBlock]  = useState<string | null>(null)
  const [suggestion,      setSuggestion]      = useState<string | null>(null)

  const step = STEPS.find(s => s.id === selectedStep)!

  function triggerRewrite(action: string) {
    setSelectedBlock(null)
    setRewritingBlock("para-1")
    setSuggestion(null)
    setTimeout(() => {
      setRewritingBlock(null)
      setSuggestion("Navigate to your workspace settings by clicking the gear icon (⚙️) in the top-right corner. A settings dropdown will appear — select Preferences to open the configuration panel.")
    }, 1500)
  }

  const filteredSlash = SLASH_GROUPS.map(g => ({
    ...g,
    items: g.items.filter(i =>
      !slashQuery || i.cmd.toLowerCase().includes(slashQuery.toLowerCase())
    ),
  })).filter(g => g.items.length > 0)

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F6]">

      {/* ── TOPBAR ─────────────────────────────────────────────────── */}
      <header className="h-[52px] bg-white border-b border-[#E4E4E7] flex items-center gap-4 px-4 shrink-0">

        {/* Left */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <button onClick={onBack} className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-[6px] transition-all shrink-0">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="w-px h-5 bg-[#E4E4E7] shrink-0" />
          <h1 className="text-[14px] font-semibold text-[#18181B] truncate">Product Onboarding Guide</h1>
          <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA] shrink-0">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            <span>Saved</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ECFDF5] text-[#059669] text-[10px] font-semibold rounded-full shrink-0">
            <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={2.5} />
            Published
          </span>
        </div>

        {/* Center — view toggle */}
        <div className="flex items-center bg-[#F4F4F5] rounded-[8px] p-0.5 shrink-0">
          {(["video", "doc"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all capitalize",
                activeView === v ? "bg-white text-[#18181B] shadow-sm" : "text-[#71717A] hover:text-[#18181B]"
              )}
            >
              {v === "video" ? <Video className="w-3.5 h-3.5" strokeWidth={1.5} /> : <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />}
              {v === "video" ? "Video" : "Document"}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 text-[12px] text-[#A1A1AA]">
            <div className="flex -space-x-1.5">
              {["S","J","M"].map(l => (
                <div key={l} className="w-6 h-6 rounded-full bg-[#E4E4E7] border-2 border-white flex items-center justify-center text-[9px] font-semibold text-[#71717A]">{l}</div>
              ))}
            </div>
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>284</span>
          </div>
          <div className="w-px h-4 bg-[#E4E4E7]" />
          <button onClick={() => setShowHistory(true)} title="Version History"
            className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-[6px] transition-all">
            <History className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button onClick={() => setShowShare(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#52525B] bg-white border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] transition-all">
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />Share
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#52525B] bg-white border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] transition-all">
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />Export
          </button>
          <button onClick={() => setShowPublish(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] transition-all">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />Publish
          </button>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-[52px] border-r border-[#E4E4E7] bg-white flex flex-col items-center py-3 gap-1 shrink-0">
          {([
            { id: "overview",     icon: LayoutList,   tip: "Overview"     },
            { id: "steps",        icon: AlignLeft,    tip: "Steps"        },
            { id: "screenshots",  icon: ImageIcon,    tip: "Screenshots"  },
            { id: "content",      icon: FileText,     tip: "Content"      },
            { id: "variables",    icon: Variable,     tip: "Variables"    },
            { id: "interactive",  icon: MousePointer, tip: "Interactive"  },
            { id: "translations", icon: Languages,    tip: "Translate"    },
          ] as const).map(({ id, icon: Icon, tip }) => (
            <button
              key={id}
              title={tip}
              onClick={() => setActiveLeftTab(id as LeftTab)}
              className={cn(
                "w-8 h-8 rounded-[8px] flex items-center justify-center transition-all",
                activeLeftTab === id
                  ? "bg-[#F5F4FF] text-[#6C5DD3]"
                  : "text-[#A1A1AA] hover:text-[#18181B] hover:bg-[#F4F4F5]"
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ))}
        </aside>

        {/* LEFT PANEL */}
        <aside className="w-[200px] border-r border-[#E4E4E7] bg-white flex flex-col shrink-0 overflow-auto">
          <LeftPanel
            tab={activeLeftTab}
            steps={STEPS}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        </aside>

        {/* CENTER — DOC CANVAS */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Step breadcrumb bar */}
          <div className="h-10 border-b border-[#E4E4E7] bg-white flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))} disabled={selectedStep === 1}
                className="p-1 text-[#A1A1AA] hover:text-[#52525B] disabled:opacity-30 transition-all shrink-0">
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStep(s.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-[6px] whitespace-nowrap transition-all",
                    s.id === selectedStep
                      ? "bg-[#F5F4FF] text-[#6C5DD3]"
                      : "text-[#A1A1AA] hover:text-[#52525B] hover:bg-[#F4F4F5]"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", {
                    "bg-[#10B981]": s.status === "complete",
                    "bg-[#6C5DD3] animate-pulse": s.status === "processing",
                    "bg-[#D4D4D8]": s.status === "pending",
                  })} />
                  {s.id}. {s.title}
                </button>
              ))}
              <button onClick={() => setSelectedStep(Math.min(STEPS.length, selectedStep + 1))} disabled={selectedStep === STEPS.length}
                className="p-1 text-[#A1A1AA] hover:text-[#52525B] disabled:opacity-30 transition-all shrink-0">
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
            <button
              onClick={() => setShowSlash(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#A1A1AA] hover:text-[#52525B] hover:bg-[#F4F4F5] rounded-[6px] transition-all shrink-0"
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
              Add block
            </button>
          </div>

          {/* Doc scroll area */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-[720px] mx-auto py-10 px-8">

              {/* Screenshot */}
              <div className="group relative mb-8 rounded-[12px] overflow-hidden border border-[#E4E4E7] shadow-sm">
                <div className="aspect-[16/9] relative bg-[#F4F4F5]">
                  <Image src={step.screenshot} alt={step.title} fill className="object-cover" sizes="720px" />
                  <div className="absolute top-[42%] left-[68%] w-6 h-6 rounded-full bg-[#6C5DD3] border-2 border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-10">
                    <span className="text-[10px] text-white font-bold">1</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[{ l: "Replace", i: RefreshCw }, { l: "Hotspot", i: MousePointer }, { l: "More", i: MoreHorizontal }].map(({ l, i: Icon }) => (
                    <button key={l} className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#18181B] bg-white/95 border border-[#E4E4E7] rounded-[5px] shadow-sm hover:border-[#6C5DD3] transition-all">
                      <Icon className="w-3 h-3" strokeWidth={1.5} />{l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#6C5DD3] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                  {selectedStep}
                </div>
                <h2 className="text-[28px] font-semibold text-[#18181B] leading-tight tracking-[-0.02em]">{step.title}</h2>
              </div>

              {/* Paragraph block — click to select + rewrite */}
              <div
                onClick={() => {
                  if (rewritingBlock === "para-1") return
                  setSelectedBlock(selectedBlock === "para-1" ? null : "para-1")
                  setSuggestion(null)
                }}
                className={cn(
                  "relative group mb-5 rounded-[8px] px-3 py-2.5 -mx-3 cursor-pointer transition-all",
                  selectedBlock === "para-1" ? "bg-[#F5F4FF] ring-1 ring-[#6C5DD3]/25" : "hover:bg-[#F7F7F6]"
                )}
              >
                {/* Inline rewrite toolbar */}
                {selectedBlock === "para-1" && (
                  <div className="absolute -top-10 left-0 flex items-center gap-0.5 bg-[#1C1C1E] rounded-[10px] px-1.5 py-1 shadow-xl z-20">
                    {[
                      { label: "✦ Improve",   action: "improve"   },
                      { label: "↓ Simplify",  action: "simplify"  },
                      { label: "↑ Expand",    action: "expand"    },
                      { label: "← Shorten",   action: "shorten"   },
                      { label: "⚙ Technical", action: "technical" },
                      { label: "🌐 Translate", action: "translate" },
                    ].map(({ label, action }) => (
                      <button
                        key={action}
                        onClick={(e) => { e.stopPropagation(); triggerRewrite(action) }}
                        className="px-2.5 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-[6px] transition-all whitespace-nowrap"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Loading shimmer */}
                {rewritingBlock === "para-1" && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#F5F4FF]/80 rounded-[8px] backdrop-blur-[2px]">
                    <Loader2 className="w-4 h-4 text-[#6C5DD3] animate-spin" strokeWidth={2} />
                    <span className="text-[12px] font-medium text-[#6C5DD3]">Rewriting…</span>
                  </div>
                )}

                <p className={cn("text-[15px] text-[#374151] leading-[1.75]", rewritingBlock === "para-1" && "opacity-30")}>
                  {suggestion
                    ? suggestion
                    : "To navigate to the settings panel, click the gear icon in the top-right corner of the dashboard. This opens the global settings menu where you can configure your workspace preferences."
                  }
                </p>

                {/* Suggestion actions */}
                {suggestion && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E4E1FF]">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSuggestion(null); setSelectedBlock(null) }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white bg-[#6C5DD3] rounded-[6px] hover:bg-[#5B4EC2] transition-all"
                    >
                      <Check className="w-3 h-3" strokeWidth={2.5} />Apply
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSuggestion(null) }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-[#52525B] border border-[#E4E4E7] rounded-[6px] hover:border-[#D4D4D8] transition-all"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />Discard
                    </button>
                    <span className="text-[10px] text-[#A1A1AA] ml-1">AI suggestion · click to select text to try another</span>
                  </div>
                )}

                {/* Select hint */}
                {!selectedBlock && !suggestion && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#A1A1AA] bg-white border border-[#E4E4E7] px-2 py-1 rounded-[5px] shadow-sm whitespace-nowrap">
                      Click to rewrite with AI
                    </span>
                  </div>
                )}
              </div>

              {/* Callout block */}
              <div className="flex items-start gap-3 bg-[#F5F4FF] border-l-[3px] border-[#6C5DD3] rounded-r-[10px] px-4 py-3.5 mb-5">
                <span className="text-base mt-0.5">💡</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#18181B] mb-0.5">Keyboard shortcut</p>
                  <p className="text-[13px] text-[#52525B]">
                    Open settings instantly with{" "}
                    <code className="bg-white border border-[#E4E1FF] text-[#6C5DD3] px-1.5 py-0.5 rounded text-[12px] font-mono">⌘ ,</code>
                  </p>
                </div>
              </div>

              {/* Body paragraph */}
              <p className="text-[15px] text-[#374151] leading-[1.75] mb-5">
                In the settings menu you&apos;ll find sections for Account, Team, Notifications, Integrations, and Billing. Each section has independent configuration options that persist across sessions.
              </p>

              {/* Steps block */}
              <div className="mb-6 space-y-3">
                {[
                  "Click the gear icon ⚙️ in the top-right corner of the dashboard",
                  "Select Settings from the dropdown menu that appears",
                  "Choose your desired configuration section from the left navigation",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#F5F4FF] border border-[#E4E1FF] text-[#6C5DD3] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[15px] text-[#374151] leading-[1.65] pt-0.5">{text}</p>
                  </div>
                ))}
              </div>

              {/* Code block */}
              <div className="mb-6 rounded-[10px] overflow-hidden border border-[#E4E4E7]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E1E2E] border-b border-[#2D2D3F]">
                  <span className="text-[11px] text-[#6E6C7E] font-mono">settings.json</span>
                  <button className="text-[#6E6C7E] hover:text-[#CDD6F4] transition-colors">
                    <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
                <pre className="p-4 bg-[#1E1E2E] text-[13px] font-mono leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-[#CDD6F4]">{"{"}</span>{"\n"}
                    <span className="text-[#89B4FA]">{"  \"notifications\""}</span><span className="text-[#CDD6F4]">{": "}</span><span className="text-[#A6E3A1]">{"true"}</span><span className="text-[#CDD6F4]">{","}</span>{"\n"}
                    <span className="text-[#89B4FA]">{"  \"theme\""}</span><span className="text-[#CDD6F4]">{": "}</span><span className="text-[#F9E2AF]">{"\"system\""}</span><span className="text-[#CDD6F4]">{","}</span>{"\n"}
                    <span className="text-[#89B4FA]">{"  \"language\""}</span><span className="text-[#CDD6F4]">{": "}</span><span className="text-[#F9E2AF]">{"\"en-US\""}</span>{"\n"}
                    <span className="text-[#CDD6F4]">{"}"}</span>
                  </code>
                </pre>
              </div>

              {/* Warning block */}
              <div className="flex items-start gap-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] px-4 py-3.5 mb-10">
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[13px] font-semibold text-[#92400E] mb-0.5">Save before leaving</p>
                  <p className="text-[13px] text-[#92400E]/80">Changes won&apos;t apply until you click Save. Navigating away will discard unsaved edits.</p>
                </div>
              </div>

              {/* Add block affordance */}
              <button
                onClick={() => setShowSlash(true)}
                className="group flex items-center gap-2 w-full py-2 px-3 -mx-3 rounded-[6px] hover:bg-[#F4F4F5] transition-all"
              >
                <div className="w-5 h-5 rounded-full border border-[#D4D4D8] group-hover:border-[#6C5DD3] group-hover:bg-[#F5F4FF] flex items-center justify-center transition-all">
                  <Plus className="w-3 h-3 text-[#A1A1AA] group-hover:text-[#6C5DD3]" strokeWidth={2.5} />
                </div>
                <span className="text-[13px] text-[#A1A1AA] group-hover:text-[#52525B] transition-colors">
                  Type <span className="text-[#6C5DD3] font-mono bg-[#F5F4FF] px-1 py-0.5 rounded text-[11px]">/</span> for commands
                </span>
              </button>

              {/* Step nav */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#E4E4E7]">
                <button
                  onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
                  disabled={selectedStep === 1}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#52525B] border border-[#E4E4E7] rounded-[8px] hover:border-[#D4D4D8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />Previous
                </button>
                <span className="text-[12px] text-[#A1A1AA]">{selectedStep} / {STEPS.length}</span>
                <button
                  onClick={() => setSelectedStep(Math.min(STEPS.length, selectedStep + 1))}
                  disabled={selectedStep === STEPS.length}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next<ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT — AI COPILOT */}
        {copilotOpen ? (
          <aside className="w-[280px] border-l border-[#E4E4E7] bg-white flex flex-col shrink-0">
            <div className="flex items-center border-b border-[#E4E4E7]">
              {(["copilot", "settings"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setRightTab(t)}
                  className={cn(
                    "flex-1 py-3 text-[12px] font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 capitalize",
                    rightTab === t ? "text-[#18181B] border-[#6C5DD3]" : "text-[#71717A] border-transparent hover:text-[#18181B]"
                  )}
                >
                  {t === "copilot" && <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />}
                  {t === "copilot" ? "AI Copilot" : "Settings"}
                </button>
              ))}
              <button onClick={() => setCopilotOpen(false)} className="p-2 text-[#A1A1AA] hover:text-[#18181B] transition-colors mr-1">
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {rightTab === "copilot" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  <AIMsg
                    message="I've analysed your guide. I can rewrite content, generate missing steps, improve clarity, add translations, or build an interactive walkthrough."
                    time="2m ago"
                  />
                  <UserMsg message="Make Step 3 clearer and more concise" time="1m ago" />
                  <AIMsg
                    message="Done — rewrote Step 3 to be 40% shorter with clearer action language. Numbered sub-steps now align with screenshot hotspots."
                    time="Just now"
                    actions={["Apply Changes", "View Diff"]}
                  />
                </div>

                <div className="border-t border-[#E4E4E7] px-3 pt-3 pb-2">
                  <p className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Quick actions</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { icon: PenLine,      label: "Rewrite Step"    },
                      { icon: Layers,       label: "Add Steps"       },
                      { icon: Wand2,        label: "Improve Clarity" },
                      { icon: Globe,        label: "Translate"       },
                      { icon: HelpCircle,   label: "Generate FAQ"    },
                      { icon: AlertTriangle,label: "Add Warning"     },
                    ].map(({ icon: Icon, label }) => (
                      <button key={label} className="flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-medium text-[#52525B] bg-[#F8F9FA] rounded-[6px] hover:bg-[#F5F4FF] hover:text-[#6C5DD3] transition-all text-left">
                        <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />{label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-t border-[#E4E4E7]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask AI anything…"
                      className="w-full pl-3 pr-9 py-2.5 text-[13px] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[8px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:bg-white transition-all"
                    />
                    <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6C5DD3] hover:text-[#5B4EC2]">
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#A1A1AA] mt-1.5">Try: &quot;Add a troubleshooting section&quot;</p>
                </div>
              </div>
            )}

            {rightTab === "settings" && (
              <div className="flex-1 overflow-auto p-4 space-y-6">
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
        ) : (
          <button
            onClick={() => setCopilotOpen(true)}
            className="w-10 border-l border-[#E4E4E7] bg-white flex flex-col items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
            <span className="text-[10px] font-semibold text-[#A1A1AA] [writing-mode:vertical-rl] tracking-wide">AI Copilot</span>
          </button>
        )}
      </div>

      {/* ── SLASH COMMAND OVERLAY ──────────────────────────────────── */}
      {showSlash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8" onClick={() => setShowSlash(false)}>
          <div
            className="bg-white rounded-[14px] w-[380px] shadow-2xl border border-[#E4E4E7] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#E4E4E7]">
              <span className="text-[13px] font-mono text-[#6C5DD3] bg-[#F5F4FF] px-2 py-0.5 rounded font-semibold">/</span>
              <input
                autoFocus
                value={slashQuery}
                onChange={e => setSlashQuery(e.target.value)}
                placeholder="Search blocks…"
                className="flex-1 text-[14px] text-[#18181B] placeholder:text-[#A1A1AA] bg-transparent outline-none"
              />
              <kbd className="text-[10px] text-[#A1A1AA] border border-[#E4E4E7] px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-[400px] overflow-auto py-2">
              {filteredSlash.map(group => (
                <div key={group.label}>
                  <p className="px-4 py-1.5 text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">{group.label}</p>
                  {group.items.map(item => (
                    <button
                      key={item.key}
                      onClick={() => { setShowSlash(false); setSlashQuery("") }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F5F4FF] transition-all text-left group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#F4F4F5] group-hover:bg-[#E4E1FF] flex items-center justify-center transition-colors shrink-0">
                        <item.icon className="w-4 h-4 text-[#52525B] group-hover:text-[#6C5DD3]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-[#18181B]">{item.cmd}</p>
                        <p className="text-[11px] text-[#A1A1AA]">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VERSION HISTORY PANEL ─────────────────────────────────── */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setShowHistory(false)}>
          <div className="flex-1" />
          <div
            className="w-[360px] h-full bg-white border-l border-[#E4E4E7] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E4E7]">
              <div>
                <h3 className="text-[16px] font-semibold text-[#18181B]">Version History</h3>
                <p className="text-[12px] text-[#71717A]">Compare and restore previous versions</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-[6px] transition-all">
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-auto py-4">
              {VERSIONS.map((v, i) => (
                <div key={v.id} className="group relative">
                  {i < VERSIONS.length - 1 && (
                    <div className="absolute left-[29px] top-10 w-px h-full bg-[#E4E4E7]" />
                  )}
                  <div className="flex items-start gap-3 px-5 py-3 hover:bg-[#F8F9FA] transition-colors rounded-[8px] mx-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 z-10",
                      v.id === 1 ? "bg-[#6C5DD3] border-[#6C5DD3]" : "bg-white border-[#D4D4D8]"
                    )}>
                      {v.id === 1 && <div className="w-full h-full flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[13px] font-medium text-[#18181B]">{v.author}</span>
                        {v.tag && (
                          <span className={cn(
                            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                            v.tag === "Current" ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F4F4F5] text-[#71717A]"
                          )}>
                            {v.tag}
                          </span>
                        )}
                        <span className="text-[11px] text-[#A1A1AA] ml-auto">{v.time}</span>
                      </div>
                      <p className="text-[12px] text-[#52525B] leading-relaxed">{v.desc}</p>
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[11px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">Restore</button>
                        <span className="text-[#E4E4E7]">·</span>
                        <button className="text-[11px] font-medium text-[#52525B] hover:text-[#18181B] transition-colors">Preview</button>
                        <span className="text-[#E4E4E7]">·</span>
                        <button className="text-[11px] font-medium text-[#52525B] hover:text-[#18181B] transition-colors">Compare</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SHARE MODAL ───────────────────────────────────────────── */}
      {showShare && (
        <Modal onClose={() => setShowShare(false)}>
          <div className="p-6">
            <h3 className="text-[18px] font-semibold text-[#18181B] mb-1">Share document</h3>
            <p className="text-[13px] text-[#71717A] mb-6">Anyone with the link can view this guide.</p>

            <div className="flex items-center gap-2 p-3 bg-[#F8F9FA] rounded-[10px] border border-[#E4E4E7] mb-5">
              <Link2 className="w-4 h-4 text-[#71717A] shrink-0" strokeWidth={1.5} />
              <span className="flex-1 text-[13px] text-[#52525B] truncate font-mono">https://clueso.io/docs/product-onboarding-guide</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#6C5DD3] rounded-[7px] hover:bg-[#5B4EC2] transition-all shrink-0">
                <Copy className="w-3 h-3" strokeWidth={2} />Copy
              </button>
            </div>

            <p className="text-[11px] font-semibold text-[#18181B] uppercase tracking-wider mb-3">Access</p>
            <div className="space-y-2 mb-6">
              {[
                { icon: Globe,  label: "Public",       desc: "Anyone with the link can view",        active: true  },
                { icon: Users,  label: "Team only",    desc: "Only team members can access",         active: false },
                { icon: Lock,   label: "Private",      desc: "Only invited people can access",       active: false },
              ].map(({ icon: Icon, label, desc, active }) => (
                <button key={label} className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-[10px] border transition-all text-left",
                  active ? "border-[#6C5DD3] bg-[#F5F4FF]" : "border-[#E4E4E7] hover:border-[#D4D4D8]"
                )}>
                  <div className={cn("p-2 rounded-[8px]", active ? "bg-[#E4E1FF]" : "bg-[#F4F4F5]")}>
                    <Icon className={cn("w-4 h-4", active ? "text-[#6C5DD3]" : "text-[#71717A]")} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#18181B]">{label}</p>
                    <p className="text-[12px] text-[#71717A]">{desc}</p>
                  </div>
                  {active && <Check className="w-4 h-4 text-[#6C5DD3] ml-auto" strokeWidth={2.5} />}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-semibold text-[#18181B] uppercase tracking-wider mb-3">Embed</p>
            <div className="p-3 bg-[#1E1E2E] rounded-[8px] font-mono text-[12px] text-[#89B4FA] mb-2">
              {`<iframe src="https://clueso.io/embed/product-onboarding-guide" />`}
            </div>
            <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />View live
            </button>
          </div>
        </Modal>
      )}

      {/* ── PUBLISH MODAL ─────────────────────────────────────────── */}
      {showPublish && (
        <Modal onClose={() => setShowPublish(false)} width="max-w-[440px]">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F4FF] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#18181B]">Publish guide</h3>
                <p className="text-[12px] text-[#71717A]">Make this guide available to your audience</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "All steps complete",    ok: true  },
                { label: "5 screenshots attached", ok: true  },
                { label: "3 translations ready",  ok: true  },
                { label: "SEO title set",          ok: false },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", ok ? "bg-[#ECFDF5]" : "bg-[#FEF3C7]")}>
                    {ok
                      ? <Check className="w-3 h-3 text-[#059669]" strokeWidth={2.5} />
                      : <AlertTriangle className="w-3 h-3 text-[#D97706]" strokeWidth={2} />
                    }
                  </div>
                  <span className="text-[13px] text-[#374151]">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#F8F9FA] rounded-[10px] border border-[#E4E4E7] mb-5">
              <p className="text-[12px] font-semibold text-[#18181B] mb-1">Publish URL</p>
              <p className="text-[12px] text-[#6C5DD3] font-mono">clueso.io/docs/product-onboarding-guide</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPublish(false)}
                className="flex-1 px-4 py-2.5 text-[13px] font-medium text-[#52525B] border border-[#E4E4E7] rounded-[9px] hover:border-[#D4D4D8] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPublish(false)}
                className="flex-1 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#6C5DD3] rounded-[9px] hover:bg-[#5B4EC2] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" strokeWidth={1.5} />Publish Now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── LEFT PANEL CONTENT ────────────────────────────────────────────────────────

function LeftPanel({ tab, steps, selectedStep, setSelectedStep }: {
  tab: LeftTab
  steps: typeof STEPS
  selectedStep: number
  setSelectedStep: (n: number) => void
}) {
  if (tab === "overview") return (
    <div className="p-4 space-y-px">
      {[["Steps","5"],["Screenshots","12"],["Words","1,840"],["Views","284"],["Completion","78%"],["Languages","3"]].map(([l, v]) => (
        <div key={l} className="flex items-center justify-between py-2.5 border-b border-[#F4F4F5] last:border-0">
          <span className="text-[12px] text-[#71717A]">{l}</span>
          <span className="text-[13px] font-semibold text-[#18181B]">{v}</span>
        </div>
      ))}
    </div>
  )

  if (tab === "steps") return (
    <div className="p-3 space-y-2">
      {steps.map(s => (
        <StepCard key={s.id} step={s} active={selectedStep === s.id} onClick={() => setSelectedStep(s.id)} />
      ))}
      <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] border border-dashed border-[#E4E1FF] rounded-[8px] hover:bg-[#F5F4FF] transition-all flex items-center justify-center gap-1.5">
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />Add Step
      </button>
    </div>
  )

  if (tab === "screenshots") return (
    <div className="p-3">
      <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[8px] hover:bg-[#E4E1FF] transition-all mb-3 flex items-center justify-center gap-1.5">
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />Add Screenshot
      </button>
      <div className="grid grid-cols-2 gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-video rounded-[6px] overflow-hidden border border-[#E4E4E7] hover:border-[#6C5DD3] cursor-pointer transition-all relative">
            <Image src={`/images/screenshot-${i}.png`} alt="" fill className="object-cover" sizes="96px" />
          </div>
        ))}
      </div>
    </div>
  )

  if (tab === "content") return (
    <div className="p-3 space-y-1.5">
      {[
        { type: "Title",   text: "Product Onboarding Guide"       },
        { type: "Intro",   text: "Welcome to the platform..."     },
        { type: "Section", text: "Step 1: Navigate to Settings"   },
        { type: "Callout", text: "Tip: You can also access..."    },
        { type: "Warning", text: "Important: Save your changes..."  },
      ].map(({ type, text }) => (
        <div key={type} className="p-2.5 rounded-[8px] border border-[#E4E4E7] hover:border-[#6C5DD3] cursor-pointer transition-all">
          <div className="text-[9px] font-semibold text-[#A1A1AA] uppercase tracking-wide mb-1">{type}</div>
          <div className="text-[11px] text-[#52525B] truncate">{text}</div>
        </div>
      ))}
    </div>
  )

  if (tab === "variables") return (
    <div className="p-4 space-y-3">
      <p className="text-[11px] text-[#71717A]">Auto-filled when generating docs.</p>
      {[["product_name","Clueso"],["company","Acme Corp"],["support_email","help@acme.com"],["doc_version","v2.1"]].map(([n, v]) => (
        <div key={n} className="flex items-center gap-2">
          <code className="text-[11px] text-[#6C5DD3] bg-[#F5F4FF] px-2 py-1 rounded flex-1 truncate">{`{{${n}}}`}</code>
          <span className="text-[11px] text-[#52525B] flex-1 truncate">{v}</span>
        </div>
      ))}
      <button className="w-full py-2 text-[12px] font-medium text-[#6C5DD3] border border-dashed border-[#E4E1FF] rounded-[8px] hover:bg-[#F5F4FF] transition-all flex items-center justify-center gap-1.5">
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />Add Variable
      </button>
    </div>
  )

  if (tab === "interactive") return (
    <div className="p-4">
      <p className="text-[12px] text-[#71717A] mb-3">Add hotspots to make this guide clickable.</p>
      <button className="w-full py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-[8px] hover:bg-[#5B4EC2] transition-all flex items-center justify-center gap-1.5 mb-3">
        <MousePointer className="w-4 h-4" strokeWidth={1.5} />Add Hotspot
      </button>
      {[["1","Click Settings icon"],["2","Select Team tab"],["3","Enter email address"]].map(([num, label]) => (
        <div key={num} className="flex items-center gap-2 py-2 border-b border-[#F4F4F5]">
          <div className="w-5 h-5 rounded-full bg-[#6C5DD3] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{num}</div>
          <span className="text-[12px] text-[#18181B]">{label}</span>
        </div>
      ))}
    </div>
  )

  // translations
  return (
    <div className="p-3 space-y-2">
      <LangItem language="Spanish" status="complete" />
      <LangItem language="French"  status="processing" />
      <LangItem language="German"  status="pending" />
      <button className="w-full py-2.5 text-[13px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[8px] hover:bg-[#E4E1FF] transition-all mt-2 flex items-center justify-center gap-1.5">
        <Plus className="w-4 h-4" strokeWidth={1.5} />Add Language
      </button>
    </div>
  )
}

// ── SHARED OVERLAY ────────────────────────────────────────────────────────────

function Modal({ children, onClose, width = "max-w-[520px]" }: { children: React.ReactNode; onClose: () => void; width?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-[2px]" onClick={onClose}>
      <div className={cn("bg-white rounded-[16px] w-full shadow-2xl border border-[#E4E4E7] relative", width)} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-[6px] transition-all">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>
  )
}

// ── HELPER COMPONENTS ─────────────────────────────────────────────────────────

function StepCard({ step, active, onClick }: {
  step: typeof STEPS[0]; active: boolean; onClick: () => void
}) {
  const dot = { complete: "bg-[#10B981]", processing: "bg-[#6C5DD3]", pending: "bg-[#D4D4D8]" }
  return (
    <div onClick={onClick} className={cn(
      "cursor-pointer rounded-[8px] border transition-all",
      active ? "border-[#6C5DD3] bg-[#F5F4FF]" : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8]"
    )}>
      <div className="aspect-video bg-[#F8F9FA] rounded-t-[7px] overflow-hidden relative">
        <Image src={step.screenshot} alt={step.title} fill className="object-cover" sizes="160px" />
      </div>
      <div className="p-2.5 flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] text-[#A1A1AA] mb-0.5">Step {step.id}</div>
          <div className="text-[12px] font-medium text-[#18181B] leading-tight">{step.title}</div>
        </div>
        <div className={cn("w-2 h-2 rounded-full shrink-0 mt-1", dot[step.status])} />
      </div>
    </div>
  )
}

function LangItem({ language, status }: { language: string; status: "complete" | "processing" | "pending" }) {
  const cfg = {
    complete:   { color: "text-[#059669]", bg: "bg-[#ECFDF5]", label: "Complete"   },
    processing: { color: "text-[#6C5DD3]", bg: "bg-[#F5F4FF]", label: "Processing" },
    pending:    { color: "text-[#71717A]", bg: "bg-[#F4F4F5]",  label: "Pending"   },
  }[status]
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-[#E4E4E7] rounded-[8px]">
      <span className="text-[13px] font-medium text-[#18181B]">{language}</span>
      <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full", cfg.bg, cfg.color)}>{cfg.label}</span>
    </div>
  )
}

function AIMsg({ message, time, actions }: { message: string; time: string; actions?: string[] }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-6 h-6 rounded-full bg-[#6C5DD3] flex items-center justify-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <div className="bg-[#F8F9FA] rounded-[10px] rounded-tl-[2px] p-3 text-[12px] text-[#18181B] leading-relaxed">{message}</div>
        {actions && (
          <div className="flex gap-2 mt-2">
            {actions.map(a => (
              <button key={a} className="px-3 py-1.5 text-[11px] font-medium text-[#6C5DD3] bg-[#F5F4FF] border border-[#E4E1FF] rounded-[6px] hover:bg-[#E4E1FF] transition-all">{a}</button>
            ))}
          </div>
        )}
        <div className="text-[10px] text-[#A1A1AA] mt-1">{time}</div>
      </div>
    </div>
  )
}

function UserMsg({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex gap-2.5 flex-row-reverse">
      <div className="w-6 h-6 rounded-full bg-[#18181B] flex items-center justify-center shrink-0 text-white text-[10px] font-bold">S</div>
      <div className="flex-1">
        <div className="bg-[#18181B] rounded-[10px] rounded-tr-[2px] p-3 text-[12px] text-white leading-relaxed">{message}</div>
        <div className="text-[10px] text-[#A1A1AA] mt-1 text-right">{time}</div>
      </div>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-semibold text-[#A1A1AA] mb-3 uppercase tracking-wider">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[11px] text-[#71717A] mb-1.5 block">{label}</label>
      <input defaultValue={value} className="w-full px-3 py-2 text-[13px] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[8px] text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all" />
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
      <div className={cn("relative w-9 h-5 rounded-full cursor-pointer transition-colors", enabled ? "bg-[#6C5DD3]" : "bg-[#E4E4E7]")}>
        <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all", enabled ? "left-[18px]" : "left-0.5")} />
      </div>
    </div>
  )
}
