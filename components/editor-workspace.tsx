"use client"

import { useState, useRef, useEffect, memo, useMemo } from "react"
import {
  ArrowLeft, History, Share2, Zap, Sparkles, Plus, MoreHorizontal,
  Check, X, Copy, AlertTriangle, Info,
  List, Code2, Hash, AlignLeft,
  Globe,
  Lock, Users, Link2, ArrowRight, RefreshCw,
  ChevronRight, ChevronLeft, FileText,
  LayoutList, MessageSquare, Minus,
  Bold, Italic, Underline, Strikethrough,
  GripVertical, ImageIcon, Search,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type BlockType = "p" | "h1" | "h2" | "h3" | "ul" | "ol" | "blockquote" | "code" | "callout" | "warning" | "divider" | "image"

interface DocBlock {
  id: string; type: BlockType; html: string; emoji?: string
  src?: string; caption?: string
  hotspot?: { step: number; x: number; y: number }
}
interface DocSection { id: string; step: number; heading: string; blocks: DocBlock[] }

interface SlashMenu {
  sectionId: string; blockId: string; query: string
  selectedIdx: number; top: number; left: number
}
interface SelTool {
  x: number; y: number; text: string
  blockId: string; sectionId: string; aiMore: boolean
}
interface AIRewrite {
  sectionId: string; blockId: string
  original: string; suggestion: string; status: "loading" | "done"
}

interface AIMessage {
  id: string
  type: "user" | "ai" | "proposal"
  content: string
  time: string
  status?: "loading" | "done"
  proposal?: {
    title: string
    preview: string[]
    wordDelta: number
    applied: boolean
    dismissed: boolean
    suggested?: string
  }
  suggestions?: string[]
}

interface AICtx {
  sectionId?: string
  sectionName?: string
  sectionStep?: number
  selectedWords?: number
}

// ── Utilities ─────────────────────────────────────────────────────────────────

let _idN = 0
function uid() { return `b${++_idN}_${Math.random().toString(36).slice(2, 5)}` }

function moveCaretToEnd(el: HTMLElement) {
  const sel = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  sel?.removeAllRanges()
  sel?.addRange(range)
}

function getOlNumber(section: DocSection, blockId: string): number {
  const idx = section.blocks.findIndex(b => b.id === blockId)
  let n = 0
  for (let i = idx; i >= 0; i--) {
    if (section.blocks[i].type === "ol") n++
    else break
  }
  return n
}

// ── Editable: memoized contentEditable wrapper ────────────────────────────────
// Keeps DOM content as source of truth; only resets innerHTML when html prop
// changes from an external source (e.g. AI rewrite, block type conversion).

interface EditableProps {
  blockId: string
  html: string
  className?: string
  placeholder?: string
  onInput: (html: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onFocus?: () => void
}

const Editable = memo(function Editable({
  blockId, html, className, placeholder, onInput, onKeyDown, onFocus,
}: EditableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lastHtml = useRef(html)

  // Set content on mount
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = html
      lastHtml.current = html
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // External updates only (AI rewrites, type changes)
  useEffect(() => {
    if (ref.current && html !== lastHtml.current) {
      ref.current.innerHTML = html
      lastHtml.current = html
    }
  }, [html])

  return (
    <div
      ref={ref}
      id={`block-${blockId}`}
      contentEditable
      suppressContentEditableWarning
      onFocus={onFocus}
      onInput={e => {
        const h = (e.currentTarget as HTMLDivElement).innerHTML
        lastHtml.current = h
        onInput(h)
      }}
      onKeyDown={onKeyDown}
      data-placeholder={placeholder}
      className={cn(
        "outline-none focus:ring-0",
        "before:pointer-events-none",
        "[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-[#C8C8C8]",
        className,
      )}
    />
  )
})

// ── Slash highlight: bolds matching characters in label ───────────────────────
function SlashHighlight({ text, query }: { text: string; query: string }) {
  const lower = text.toLowerCase()
  const idx = lower.indexOf(query)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-[#F0EEFF] text-[#6C5DD3] rounded-[2px] px-[1px]">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  )
}

// ── Static data ───────────────────────────────────────────────────────────────

const INIT_SECTIONS: DocSection[] = [
  {
    id: "s1", step: 1, heading: "Introduction",
    blocks: [
      { id: "img1a", type: "image",   html: "", src: "/images/screenshot-1.png", hotspot: { step: 1, x: 65, y: 40 } },
      { id: "p1a",   type: "p",       html: "This guide walks you through setting up your workspace from scratch. Follow each step carefully to ensure a smooth configuration process." },
      { id: "p1b",   type: "p",       html: "By the end you'll have a fully configured workspace with all integrations connected and your team members invited." },
      { id: "c1a",   type: "callout", emoji: "⏱️", html: "Estimated time: <strong>10–15 minutes.</strong> No technical background required." },
    ],
  },
  {
    id: "s2", step: 2, heading: "Navigate to Settings",
    blocks: [
      { id: "p2a",   type: "p",       html: "Access the settings panel from anywhere in the app:" },
      { id: "ol2a",  type: "ol",      html: "Click the <strong>gear icon</strong> ⚙️ in the top-right corner of the dashboard" },
      { id: "ol2b",  type: "ol",      html: "The settings panel opens on the right — use the left nav to jump to any section" },
      { id: "ol2c",  type: "ol",      html: "Your changes are applied immediately when you click <strong>Save</strong>" },
      { id: "c2a",   type: "callout", emoji: "💡", html: "Open settings instantly with <strong>⌘ ,</strong> on Mac or <strong>Ctrl ,</strong> on Windows." },
      { id: "p2b",   type: "p",       html: "The settings panel has six sections: <strong>Account</strong>, <strong>Workspace</strong>, <strong>Team</strong>, <strong>Notifications</strong>, <strong>Integrations</strong>, and <strong>Billing</strong>." },
    ],
  },
  {
    id: "s3", step: 3, heading: "Configure Workspace Options",
    blocks: [
      { id: "p3a",    type: "p",       html: "Before inviting your team, configure the core workspace settings shown below." },
      { id: "img3a",  type: "image",   html: "", src: "/images/screenshot-3.png", hotspot: { step: 3, x: 65, y: 40 } },
      { id: "h3a",    type: "h3",      html: "Required settings" },
      { id: "ol3a",   type: "ol",      html: "Set your workspace <strong>Display Name</strong> — this appears to all members" },
      { id: "ol3b",   type: "ol",      html: "Choose a <strong>Default Timezone</strong> for scheduling and notifications" },
      { id: "ol3c",   type: "ol",      html: "Toggle <strong>Public Access</strong> based on your organisation's security policy" },
      { id: "code3a", type: "code",    html: '{\n  "notifications": true,\n  "theme": "system",\n  "language": "en-US"\n}' },
      { id: "w3a",    type: "warning", html: "Changes won't apply until you click <strong>Save Changes</strong>. Navigating away will discard unsaved edits." },
    ],
  },
  {
    id: "s4", step: 4, heading: "Add Team Members",
    blocks: [
      { id: "p4a",   type: "p",       html: "Navigate to <strong>Team</strong> in the left settings nav to start inviting colleagues." },
      { id: "h4a",   type: "h3",      html: "Invite by email" },
      { id: "ol4a",  type: "ol",      html: "Click <strong>Invite Members</strong>" },
      { id: "ol4b",  type: "ol",      html: "Enter one or more email addresses, separated by commas" },
      { id: "ol4c",  type: "ol",      html: "Choose a role: <strong>Viewer</strong>, <strong>Editor</strong>, or <strong>Admin</strong>" },
      { id: "ol4d",  type: "ol",      html: "Click <strong>Send Invites</strong> — teammates receive an email within a few minutes" },
      { id: "c4a",   type: "callout", emoji: "👥", html: "You can invite up to <strong>25 members</strong> on the free plan. Upgrade to Pro for unlimited seats." },
      { id: "w4a",   type: "warning", html: "Invites expire after <strong>7 days</strong>. Resend from the Pending Invites tab if needed." },
    ],
  },
  {
    id: "s5", step: 5, heading: "Review &amp; Publish",
    blocks: [
      { id: "p5a",   type: "p",       html: "Before publishing, run through this checklist:" },
      { id: "ul5a",  type: "ul",      html: "All section headings are clear and descriptive" },
      { id: "ul5b",  type: "ul",      html: "Screenshots match the described actions" },
      { id: "ul5c",  type: "ul",      html: "Callouts highlight the right information" },
      { id: "ul5d",  type: "ul",      html: "Links are working and point to the correct destination" },
      { id: "h5a",   type: "h3",      html: "Publishing options" },
      { id: "p5b",   type: "p",       html: "Click <strong>Publish</strong> in the top bar. Share your guide via:" },
      { id: "ol5a",  type: "ol",      html: "<strong>Direct link</strong> — copy from the Share dialog" },
      { id: "ol5b",  type: "ol",      html: "<strong>Embed</strong> — paste the iframe snippet into any webpage" },
      { id: "ol5c",  type: "ol",      html: "<strong>Knowledge base</strong> — add to your help center automatically" },
      { id: "c5a",   type: "callout", emoji: "✅", html: "Published guides are immediately accessible. You can unpublish or update at any time without breaking existing links." },
    ],
  },
]

type SlashGroup = "Basic" | "Lists" | "Media" | "Advanced"
const SLASH_GROUP_ORDER: SlashGroup[] = ["Basic", "Lists", "Media", "Advanced"]

const SLASH_CMDS: { icon: React.ElementType; label: string; desc: string; type: BlockType; group: SlashGroup }[] = [
  { icon: AlignLeft,     label: "Text",          desc: "Plain paragraph text",          type: "p",          group: "Basic"    },
  { icon: Hash,          label: "Heading 1",      desc: "Large section title",           type: "h1",         group: "Basic"    },
  { icon: Hash,          label: "Heading 2",      desc: "Medium section heading",        type: "h2",         group: "Basic"    },
  { icon: Hash,          label: "Heading 3",      desc: "Small section heading",         type: "h3",         group: "Basic"    },
  { icon: List,          label: "Bullet List",    desc: "Simple unordered list",         type: "ul",         group: "Lists"    },
  { icon: FileText,      label: "Numbered List",  desc: "Ordered step-by-step list",     type: "ol",         group: "Lists"    },
  { icon: ImageIcon,     label: "Image",          desc: "Insert an image block",         type: "image",      group: "Media"    },
  { icon: MessageSquare, label: "Quote",          desc: "Highlight a quotation",         type: "blockquote", group: "Advanced" },
  { icon: Code2,         label: "Code Block",     desc: "Monospace syntax-highlighted code", type: "code",   group: "Advanced" },
  { icon: Info,          label: "Callout",        desc: "Highlight important information", type: "callout",  group: "Advanced" },
  { icon: AlertTriangle, label: "Warning",        desc: "Draw attention with a warning", type: "warning",    group: "Advanced" },
  { icon: Minus,         label: "Divider",        desc: "Horizontal separator line",     type: "divider",    group: "Advanced" },
]

const VERSIONS = [
  { id: 1, author: "You",        time: "Just now",   desc: "Edited introduction paragraph",       tag: "Current"  },
  { id: 2, author: "You",        time: "2h ago",     desc: "Added warning block",                 tag: null       },
  { id: 3, author: "Sarah Chen", time: "Yesterday",  desc: "Improved step 3 clarity",             tag: null       },
  { id: 4, author: "You",        time: "3 days ago", desc: "Added code snippet",                  tag: null       },
  { id: 5, author: "AI",         time: "5 days ago", desc: "Auto-generated from screen recording",tag: "Original" },
]

// ── AI mock responses ─────────────────────────────────────────────────────────

const AI_RESPONSES: Record<string, string> = {
  improve:      "Navigate to your workspace settings by clicking the gear icon (⚙️) in the top-right corner. A settings panel will open — select the section you need from the left navigation.",
  simplify:     "Click the gear icon to open settings, then choose the section you want to configure.",
  expand:       "To access the settings panel, locate the gear icon (⚙️) positioned in the upper-right corner of the main dashboard interface. Clicking this icon triggers a slide-out settings panel containing all workspace configuration options, organized into clearly labeled sections: Account, Team, Notifications, Integrations, and Billing.",
  shorten:      "Click ⚙️ (top-right) to open settings and configure your workspace.",
  professional: "Access the settings panel by selecting the gear icon in the upper-right portion of the dashboard. The configuration panel provides namespaced settings for workspace, team, notifications, integrations, and billing management.",
  technical:    "Invoke the settings modal via the ⚙️ control in the header toolbar (keyboard shortcut: ⌘,). The settings API exposes configuration namespaces: workspace, team, notifications, integrations, and billing.",
  friendly:     "Ready to customise your workspace? Just click the little gear icon ⚙️ in the top-right corner — it opens up all the settings you need in one handy panel!",
  grammar:      "To navigate to the settings panel, click the gear icon in the top-right corner of the dashboard. This opens the global settings menu where you can configure your workspace preferences.",
  faq:          "Q: How do I open settings?\nA: Click the gear icon ⚙️ in the top-right corner.\n\nQ: What can I configure?\nA: Account, Team, Notifications, Integrations, and Billing.",
  troubleshoot: "If you cannot find the settings panel:\n• Ensure you are logged in with admin permissions\n• Try refreshing the page (⌘ R)\n• Clear your browser cache\n• Contact support if the issue persists",
  custom:       "Here is your custom rewrite with improved clarity and flow. The content has been restructured to better guide the reader through each step.",
}

function pickAIResponse(action: string): string {
  const key = action.toLowerCase()
    .replace(/\s+/g, "")
    .replace("writing", "improve")
    .replace("improvewri", "improve")
    .replace("improvewriting", "improve")
    .replace("fixgrammar", "grammar")
    .replace("generatefaq", "faq")
    .replace("troubleshootingsteps", "troubleshoot")
    .replace("troubleshoot", "troubleshoot")
    .replace("professional", "professional")
    .replace("technical", "technical")
    .replace("friendly", "friendly")
  return AI_RESPONSES[key] ?? AI_RESPONSES.improve
}

// ── AI Panel static data ───────────────────────────────────────────────────────

const AI_SUGGESTIONS = [
  { icon: "✨", label: "Make this more concise" },
  { icon: "🎯", label: "Rewrite for technical audience" },
  { icon: "📖", label: "Improve readability" },
  { icon: "❓", label: "Generate FAQ" },
  { icon: "🔧", label: "Add troubleshooting section" },
  { icon: "📋", label: "Create executive summary" },
  { icon: "📸", label: "Suggest missing screenshots" },
  { icon: "📝", label: "Convert into step-by-step guide" },
]

function pickProposalTitle(action: string): string {
  const a = action.toLowerCase()
  if (a.includes("faq")) return "Generate FAQ Section"
  if (a.includes("troubleshoot")) return "Add Troubleshooting Section"
  if (a.includes("summary") || a.includes("executive")) return "Executive Summary"
  if (a.includes("step")) return "Step-by-Step Guide Rewrite"
  if (a.includes("concise")) return "Concise Rewrite"
  if (a.includes("technical")) return "Technical Audience Rewrite"
  if (a.includes("readab")) return "Readability Improvements"
  if (a.includes("screenshot")) return "Screenshot Recommendations"
  return "AI Improvement"
}

function pickProposalPreview(action: string): string[] {
  const a = action.toLowerCase()
  if (a.includes("faq")) return ["How do I open settings?", "What permissions are needed?", "Can I undo changes?", "How do I invite team members?"]
  if (a.includes("troubleshoot")) return ["Browser not detected — clear cache and retry", "Permission denied — ensure admin access", "Recording failed — check screen share permissions", "Screenshots not saving — verify storage access"]
  if (a.includes("summary") || a.includes("executive")) return ["5-step workspace configuration process", "Team invitation workflow overview", "Key settings reference", "Publishing checklist summary"]
  if (a.includes("step")) return ["Step 1: Open Settings ⚙️ from dashboard", "Step 2: Configure workspace options", "Step 3: Invite team members", "Step 4: Review and publish"]
  if (a.includes("concise")) return ["Introduction shortened by ~35%", "Redundant phrases removed", "Call-outs tightened", "Action clarity improved"]
  if (a.includes("technical")) return ["API references added", "Keyboard shortcuts documented", "Technical terminology applied", "Configuration schema included"]
  if (a.includes("readab")) return ["Sentence flow improved", "Consistent tone applied throughout", "Active voice used", "Paragraph breaks optimised"]
  if (a.includes("screenshot")) return ["Step 2 could use a clearer screenshot", "Step 4 team panel not yet documented", "Add annotated arrows to Step 3"]
  return ["Structure improved for clarity", "Key actions highlighted", "Reader guidance enhanced"]
}

function pickSuggestions(action: string): string[] {
  const a = action.toLowerCase()
  if (a.includes("faq")) return ["Add troubleshooting section", "Improve readability", "Create executive summary"]
  if (a.includes("troubleshoot")) return ["Generate FAQ", "Improve readability", "Suggest missing screenshots"]
  if (a.includes("summary")) return ["Add troubleshooting section", "Generate FAQ", "Convert into step-by-step guide"]
  if (a.includes("concise")) return ["Rewrite for technical audience", "Improve readability", "Generate FAQ"]
  if (a.includes("technical")) return ["Improve readability", "Generate FAQ", "Add troubleshooting section"]
  return ["Improve readability", "Add troubleshooting section", "Generate FAQ"]
}

// ── Word-level diff helpers ────────────────────────────────────────────────────
// Split on whitespace keeping the whitespace tokens so we can preserve spacing.
function renderDiffOriginal(original: string, suggestion: string): React.ReactNode {
  const suggSet = new Set(
    suggestion.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2)
  )
  return original.trim().split(/(\s+)/).map((token, i) => {
    if (/^\s+$/.test(token)) return <span key={i}>{token}</span>
    const key = token.toLowerCase().replace(/[^a-z0-9]/g, "")
    const removed = key.length > 2 && !suggSet.has(key)
    return removed
      ? <span key={i} className="line-through text-[#E05050]">{token}</span>
      : <span key={i} className="text-[#ACACAC]">{token}</span>
  })
}

function renderDiffSuggestion(original: string, suggestion: string): React.ReactNode {
  const origSet = new Set(
    original.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2)
  )
  return suggestion.trim().split(/(\s+)/).map((token, i) => {
    if (/^\s+$/.test(token)) return <span key={i}>{token}</span>
    const key = token.toLowerCase().replace(/[^a-z0-9]/g, "")
    const added = key.length > 2 && !origSet.has(key)
    return added
      ? <span key={i} className="bg-[#EDFAF3] text-[#1A9E5C] rounded-[2px] px-[1px]">{token}</span>
      : <span key={i}>{token}</span>
  })
}

// ── Trupeer AI Avatar ──────────────────────────────────────────────────────────
function TrupeerAIAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{
        width: size, height: size,
        background: "linear-gradient(145deg, #9B87F5 0%, #6C5DD3 55%, #5448C4 100%)",
        boxShadow: "0 2px 10px rgba(108,93,211,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      <svg width={Math.round(size * 0.52)} height={Math.round(size * 0.52)} viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L12.8 8.2H19L13.9 11.8L15.7 18L11 14.4L6.3 18L8.1 11.8L3 8.2H9.2L11 2Z"
          fill="white" fillOpacity={0.95}
        />
      </svg>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface EditorWorkspaceProps { onBack?: () => void }

export function EditorWorkspace({ onBack }: EditorWorkspaceProps = {}) {
  const [sections, setSections]     = useState<DocSection[]>(INIT_SECTIONS)
  const [slashMenu, setSlashMenu]   = useState<SlashMenu | null>(null)
  const [selTool, setSelTool]       = useState<SelTool | null>(null)
  const [aiRewrite, setAIRewrite]   = useState<AIRewrite | null>(null)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [outlineOpen, setOutlineOpen] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [aiMessages, setAIMessages] = useState<AIMessage[]>([])
  const [aiInputVal, setAIInputVal]  = useState("")
  const [aiCtx, setAICtx]           = useState<AICtx>({})
  const [showDiff, setShowDiff]      = useState<string | null>(null)
  const [aiCustomPrompt, setAICustomPrompt] = useState(false)
  const [aiCustomVal, setAICustomVal]       = useState("")
  const [showShare, setShowShare]   = useState(false)
  const [showPublish, setShowPublish] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [recentCmds, setRecentCmds] = useState<BlockType[]>([])
  const [undoToast, setUndoToast] = useState<{
    sectionId: string; blockIdx: number; block: DocBlock
  } | null>(null)

  const editorRef      = useRef<HTMLDivElement>(null)
  const sectionsRef    = useRef(sections)
  const slashRef       = useRef(slashMenu)
  const filteredRef    = useRef<typeof SLASH_CMDS>(SLASH_CMDS)
  const selectedImgRef = useRef(selectedImage)
  const undoTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const aiScrollRef    = useRef<HTMLDivElement>(null)

  useEffect(() => { sectionsRef.current = sections }, [sections])
  useEffect(() => { slashRef.current = slashMenu }, [slashMenu])
  useEffect(() => { selectedImgRef.current = selectedImage }, [selectedImage])

  // Auto-scroll AI panel to latest message
  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight
    }
  }, [aiMessages])

  // Reset custom prompt state when selection toolbar closes
  useEffect(() => {
    if (!selTool) { setAICustomPrompt(false); setAICustomVal("") }
  }, [selTool])

  type SlashDisplayGroup = { label: string; items: { cmd: typeof SLASH_CMDS[0]; flatIdx: number }[] }

  const { navCmds, displayGroups } = useMemo(() => {
    const q = slashMenu?.query?.trim().toLowerCase() ?? ""

    if (q) {
      const matched = SLASH_CMDS.filter(c =>
        c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      )
      filteredRef.current = matched
      return {
        navCmds: matched,
        displayGroups: matched.length > 0
          ? [{ label: "", items: matched.map((cmd, i) => ({ cmd, flatIdx: i })) }] as SlashDisplayGroup[]
          : [] as SlashDisplayGroup[],
      }
    }

    // No query: recent at top, then grouped
    const groups: SlashDisplayGroup[] = []
    const nav: typeof SLASH_CMDS = []

    if (recentCmds.length > 0) {
      const recItems = recentCmds
        .map(t => SLASH_CMDS.find(c => c.type === t))
        .filter((c): c is typeof SLASH_CMDS[0] => !!c)
      groups.push({
        label: "Recent",
        items: recItems.map(cmd => { nav.push(cmd); return { cmd, flatIdx: nav.length - 1 } }),
      })
    }

    for (const gLabel of SLASH_GROUP_ORDER) {
      const items = SLASH_CMDS.filter(c => c.group === gLabel)
      if (!items.length) continue
      groups.push({
        label: gLabel,
        items: items.map(cmd => { nav.push(cmd); return { cmd, flatIdx: nav.length - 1 } }),
      })
    }

    filteredRef.current = nav
    return { navCmds: nav, displayGroups: groups }
  }, [slashMenu?.query, recentCmds])

  // ── Selection toolbar ───────────────────────────────────────────────────────
  useEffect(() => {
    function onSelChange() {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        setSelTool(prev => prev ? null : prev)
        setAICtx(prev => ({ ...prev, selectedWords: undefined }))
        return
      }
      if (!sel.rangeCount) return
      const range = sel.getRangeAt(0)
      if (!editorRef.current?.contains(range.commonAncestorContainer)) {
        setSelTool(null)
        return
      }
      const rect = range.getBoundingClientRect()
      if (!rect.width && !rect.height) return

      // Walk up to find block id
      let node: Node | null = range.commonAncestorContainer
      while (node && !(node instanceof HTMLElement && node.id?.startsWith("block-")))
        node = node.parentElement
      const blockId = node ? (node as HTMLElement).id.replace("block-", "") : null
      const sectionId = blockId
        ? sectionsRef.current.find(s => s.blocks.some(b => b.id === blockId))?.id ?? null
        : null
      if (!blockId || !sectionId) return

      // Update AI context with selection word count
      const selectedWords = sel.toString().trim().split(/\s+/).filter(Boolean).length
      setAICtx(prev => ({ ...prev, selectedWords }))

      setSelTool({
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
        text: sel.toString(),
        blockId,
        sectionId,
        aiMore: false,
      })
    }
    document.addEventListener("selectionchange", onSelChange)
    return () => document.removeEventListener("selectionchange", onSelChange)
  }, [])

  // Global Backspace/Delete for selected image
  useEffect(() => {
    function onGlobalKey(e: KeyboardEvent) {
      const imgId = selectedImgRef.current
      if (!imgId) return
      if (e.key !== "Backspace" && e.key !== "Delete") return
      // Don't intercept if a contentEditable is focused
      const active = document.activeElement
      if (active && (active as HTMLElement).contentEditable === "true") return
      e.preventDefault()
      const sec = sectionsRef.current.find(s => s.blocks.some(b => b.id === imgId))
      if (!sec) return
      const block = sec.blocks.find(b => b.id === imgId)!
      const blockIdx = sec.blocks.findIndex(b => b.id === imgId)
      setSections(prev => prev.map(s =>
        s.id !== sec.id ? s : { ...s, blocks: s.blocks.filter(b => b.id !== imgId) }
      ))
      setSelectedImage(null)
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
      setUndoToast({ sectionId: sec.id, blockIdx, block })
      undoTimerRef.current = setTimeout(() => setUndoToast(null), 5000)
    }
    document.addEventListener("keydown", onGlobalKey)
    return () => document.removeEventListener("keydown", onGlobalKey)
  }, [])

  // ── Block operations ────────────────────────────────────────────────────────
  function updateBlock(sectionId: string, blockId: string, updates: Partial<DocBlock>) {
    setSections(prev => prev.map(s =>
      s.id !== sectionId ? s : {
        ...s, blocks: s.blocks.map(b => b.id !== blockId ? b : { ...b, ...updates }),
      }
    ))
  }

  function insertBlockAfter(sectionId: string, afterId: string, type: BlockType, newId: string, html = "", extra: Partial<DocBlock> = {}) {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s
      const idx = s.blocks.findIndex(b => b.id === afterId)
      const nb: DocBlock = { id: newId, type, html, ...(type === "callout" ? { emoji: "💡" } : {}), ...extra }
      return { ...s, blocks: [...s.blocks.slice(0, idx + 1), nb, ...s.blocks.slice(idx + 1)] }
    }))
  }

  function deleteBlock(sectionId: string, blockId: string) {
    setSections(prev => prev.map(s =>
      s.id !== sectionId ? s : { ...s, blocks: s.blocks.filter(b => b.id !== blockId) }
    ))
  }

  function handleDeleteImage(sectionId: string, blockId: string, block: DocBlock) {
    const sec = sectionsRef.current.find(s => s.id === sectionId)
    const blockIdx = sec?.blocks.findIndex(b => b.id === blockId) ?? 0
    deleteBlock(sectionId, blockId)
    setSelectedImage(null)
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
    setUndoToast({ sectionId, blockIdx, block })
    undoTimerRef.current = setTimeout(() => setUndoToast(null), 5000)
  }

  function undoDelete() {
    if (!undoToast) return
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current)
    setSections(prev => prev.map(s => {
      if (s.id !== undoToast.sectionId) return s
      const blocks = [...s.blocks]
      blocks.splice(Math.min(undoToast.blockIdx, blocks.length), 0, undoToast.block)
      return { ...s, blocks }
    }))
    setUndoToast(null)
  }

  function getPrevId(sectionId: string, blockId: string): string | null {
    const s = sectionsRef.current.find(s => s.id === sectionId)
    const idx = s?.blocks.findIndex(b => b.id === blockId) ?? -1
    return idx > 0 ? (s!.blocks[idx - 1].id) : null
  }

  // ── AI Panel functions ──────────────────────────────────────────────────────
  function submitAIMessage(content: string) {
    if (!content.trim()) return
    const loadingId = uid()
    const userMsg: AIMessage  = { id: uid(), type: "user",  content: content.trim(), time: "Just now" }
    const loadingMsg: AIMessage = { id: loadingId, type: "ai", content: "", time: "Just now", status: "loading" }
    setAIMessages(prev => [...prev, userMsg, loadingMsg])
    setAIInputVal("")
    if (!copilotOpen) setCopilotOpen(true)

    const isProposal = /troubleshoot|faq|section|generate|add|create|rewrite|concise|technical|readab|summary|step[\s-]by[\s-]step|screenshot/i.test(content)

    setTimeout(() => {
      if (isProposal) {
        const proposal = {
          title: pickProposalTitle(content),
          preview: pickProposalPreview(content),
          wordDelta: Math.floor(Math.random() * 90) + 40,
          applied: false,
          dismissed: false,
          suggested: pickAIResponse(content),
        }
        setAIMessages(prev => prev.map(m =>
          m.id !== loadingId ? m : {
            id: loadingId, type: "proposal" as const, content: "", time: "Just now",
            status: "done" as const, proposal, suggestions: pickSuggestions(content),
          }
        ))
      } else {
        setAIMessages(prev => prev.map(m =>
          m.id !== loadingId ? m : {
            ...m, status: "done" as const,
            content: pickAIResponse(content),
            suggestions: pickSuggestions(content),
          }
        ))
      }
    }, 1200 + Math.random() * 500)
  }

  function applyProposal(msgId: string) {
    setAIMessages(prev => prev.map(m =>
      m.id === msgId && m.proposal
        ? { ...m, proposal: { ...m.proposal, applied: true } }
        : m
    ))
  }

  function dismissProposal(msgId: string) {
    setAIMessages(prev => prev.map(m =>
      m.id === msgId && m.proposal
        ? { ...m, proposal: { ...m.proposal, dismissed: true } }
        : m
    ))
  }

  function renderAIMessage(msg: AIMessage) {
    if (msg.type === "user") {
      return (
        <div key={msg.id} className="flex justify-end">
          <div className="max-w-[86%]">
            <div className="px-3 py-2 rounded-[9px] rounded-br-[3px] bg-[#F0F0F2] text-[13px] leading-relaxed text-[#111]">
              {msg.content}
            </div>
            <p className="text-[10px] text-[#C0C0C0] mt-1 text-right">{msg.time}</p>
          </div>
        </div>
      )
    }

    if (msg.status === "loading") {
      return (
        <div key={msg.id} className="flex items-end gap-2">
          <TrupeerAIAvatar size={24} />
          <div className="bg-[#F8F6FF] border border-[#EDE9FF] rounded-[13px] rounded-bl-[4px] px-4 py-3">
            <div className="flex items-center gap-1.5">
              {[0, 150, 300].map((delay, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#6C5DD3]/50 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (msg.type === "proposal" && msg.proposal) {
      const p = msg.proposal
      return (
        <div key={msg.id} className="flex items-start gap-2">
          <TrupeerAIAvatar size={24} />
          <div className="flex-1 min-w-0">
            <div className={cn(
              "rounded-[13px] border overflow-hidden transition-all",
              p.applied
                ? "border-[#10B981]/25 bg-[#F6FEF9]"
                : p.dismissed
                  ? "border-[#F0F0F0] bg-[#FAFAFA] opacity-50"
                  : "border-[#6C5DD3]/20 bg-[#FAFAFF]",
            )}>
              {/* Card header */}
              <div className="px-3.5 pt-3 pb-2.5 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-2">
                  {p.applied ? (
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#F0EEFF] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-[#6C5DD3]" strokeWidth={1.5} />
                    </div>
                  )}
                  <span className="text-[12.5px] font-semibold text-[#1A1A1A] leading-tight">{p.title}</span>
                </div>
                {p.applied && (
                  <p className="text-[10px] text-[#10B981] font-medium mt-1 ml-7">Applied to document ✓</p>
                )}
              </div>
              {/* Preview */}
              {!p.dismissed && (
                <div className="px-3.5 pt-2.5 pb-3">
                  <p className="text-[9.5px] font-bold text-[#C0C0C0] uppercase tracking-wider mb-2">Preview</p>
                  <ul className="space-y-1.5">
                    {p.preview.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#3A3A3A] leading-snug">
                        <span className="text-[#6C5DD3] font-bold text-[10px] mt-[3px] shrink-0">·</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-2.5 border-t border-[#F0F0F0] flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#6C5DD3] bg-[#F0EEFF] px-2 py-0.5 rounded-full">
                      +{p.wordDelta} words
                    </span>
                  </div>
                </div>
              )}
              {/* Actions */}
              {!p.applied && !p.dismissed && (
                <div className="px-3.5 pb-3 flex items-center gap-2">
                  <button
                    onClick={() => applyProposal(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white rounded-[8px] transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(145deg, #8B6FE8, #6C5DD3)" }}
                  >
                    <Check className="w-3 h-3" strokeWidth={3} />Apply
                  </button>
                  <button
                    onClick={() => setShowDiff(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#6C5DD3] bg-white border border-[#6C5DD3]/25 rounded-[8px] hover:bg-[#F0EEFF] transition-all"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => dismissProposal(msg.id)}
                    className="ml-auto p-1.5 text-[#C8C8C8] hover:text-[#888] rounded-[6px] transition-all"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
            {/* Follow-up suggestions */}
            {msg.suggestions && msg.suggestions.length > 0 && !p.dismissed && (
              <div className="mt-2.5 space-y-1">
                {msg.suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => submitAIMessage(s)}
                    className="flex items-center gap-2 text-[11.5px] text-[#8B8B8B] hover:text-[#6C5DD3] transition-colors py-0.5 w-full text-left"
                  >
                    <ArrowRight className="w-3 h-3 shrink-0" strokeWidth={2} />{s}
                  </button>
                ))}
              </div>
            )}
            <p className="text-[9.5px] text-[#C8C8C8] mt-1.5">{msg.time}</p>
          </div>
        </div>
      )
    }

    // Regular AI message
    return (
      <div key={msg.id} className="flex items-start gap-2">
        <TrupeerAIAvatar size={24} />
        <div className="flex-1 min-w-0">
          <div className="bg-[#F8F6FF] border border-[#EDE9FF] rounded-[13px] rounded-bl-[4px] px-3.5 py-2.5">
            <p className="text-[13px] text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
          {msg.suggestions && msg.suggestions.length > 0 && (
            <div className="mt-2 space-y-1">
              {msg.suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => submitAIMessage(s)}
                  className="flex items-center gap-2 text-[11.5px] text-[#8B8B8B] hover:text-[#6C5DD3] transition-colors py-0.5 w-full text-left"
                >
                  <ArrowRight className="w-3 h-3 shrink-0" strokeWidth={2} />{s}
                </button>
              ))}
            </div>
          )}
          <p className="text-[9.5px] text-[#C8C8C8] mt-1.5">{msg.time}</p>
        </div>
      </div>
    )
  }

  // ── Slash command ───────────────────────────────────────────────────────────
  function applySlash(type: BlockType) {
    setRecentCmds(prev => [type, ...prev.filter(t => t !== type)].slice(0, 3))
    const sm = slashRef.current
    if (!sm) return
    const { sectionId, blockId, query } = sm
    const el = document.getElementById(`block-${blockId}`)
    // Remove the /query text from block content
    const rawText = el?.textContent ?? ""
    const slashIdx = rawText.lastIndexOf("/" + query)
    const cleanText = slashIdx >= 0 ? rawText.slice(0, slashIdx) : rawText
    setSlashMenu(null)
    const extras = type === "callout" ? { emoji: "💡" } : {}
    updateBlock(sectionId, blockId, { type, html: type === "divider" ? "" : cleanText, ...extras })
    setTimeout(() => {
      const target = document.getElementById(`block-${blockId}`)
      if (target && type !== "divider") { target.focus(); moveCaretToEnd(target) }
    }, 20)
  }

  // ── Formatting ──────────────────────────────────────────────────────────────
  function fmt(cmd: string, value?: string) {
    document.execCommand(cmd, false, value)
  }

  function fmtLink() {
    const url = window.prompt("Enter URL:")
    if (url) fmt("createLink", url)
  }

  function fmtInlineCode() {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return
    const text = sel.toString()
    fmt("insertHTML", `<code style="font-family:monospace;background:#F0EEFF;color:#6C5DD3;padding:1px 5px;border-radius:4px;font-size:0.9em">${text}</code>`)
  }

  // ── AI rewrite ──────────────────────────────────────────────────────────────
  function triggerAI(action: string, blockId?: string, sectionId?: string, text?: string) {
    const bId = blockId ?? selTool?.blockId
    const sId = sectionId ?? selTool?.sectionId
    const txt = text ?? selTool?.text
    if (!bId || !sId || !txt) return
    setSelTool(null)
    setAIRewrite({ sectionId: sId, blockId: bId, original: txt, suggestion: "", status: "loading" })
    setTimeout(() => {
      setAIRewrite(r => r ? { ...r, suggestion: pickAIResponse(action), status: "done" } : null)
    }, 1400)
  }

  function acceptAI() {
    if (!aiRewrite || aiRewrite.status !== "done") return
    updateBlock(aiRewrite.sectionId, aiRewrite.blockId, { html: aiRewrite.suggestion })
    setAIRewrite(null)
  }

  function refineAI(action: string) {
    if (!aiRewrite || aiRewrite.status !== "done") return
    setAIRewrite(prev => prev ? { ...prev, status: "loading" } : null)
    setTimeout(() => {
      setAIRewrite(prev => prev ? { ...prev, suggestion: pickAIResponse(action), status: "done" } : null)
    }, 1000 + Math.random() * 400)
  }

  // ── Keyboard handler per block ──────────────────────────────────────────────
  function makeKeyDown(sectionId: string, block: DocBlock) {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      const sm = slashRef.current

      // Slash menu navigation
      if (sm?.blockId === block.id) {
        const cmds = filteredRef.current
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSlashMenu(m => m ? { ...m, selectedIdx: Math.min(m.selectedIdx + 1, cmds.length - 1) } : null)
          setTimeout(() => document.getElementById(`slash-item-${Math.min(sm.selectedIdx + 1, cmds.length - 1)}`)?.scrollIntoView({ block: "nearest" }), 0)
          return
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSlashMenu(m => m ? { ...m, selectedIdx: Math.max(m.selectedIdx - 1, 0) } : null)
          setTimeout(() => document.getElementById(`slash-item-${Math.max(sm.selectedIdx - 1, 0)}`)?.scrollIntoView({ block: "nearest" }), 0)
          return
        }
        if (e.key === "Enter") { e.preventDefault(); applySlash(cmds[sm.selectedIdx]?.type ?? "p"); return }
        if (e.key === "Tab")   { e.preventDefault(); applySlash(cmds[sm.selectedIdx]?.type ?? cmds[0]?.type ?? "p"); return }
        if (e.key === "Escape") { setSlashMenu(null); return }
      }

      // Enter → new block
      if (e.key === "Enter" && !e.shiftKey && block.type !== "code") {
        e.preventDefault()
        const newId = uid()
        const newType = (block.type === "ul" || block.type === "ol") ? block.type : "p"
        insertBlockAfter(sectionId, block.id, newType, newId)
        setTimeout(() => {
          const el = document.getElementById(`block-${newId}`)
          if (el) { el.focus(); moveCaretToEnd(el) }
        }, 0)
        return
      }

      // Backspace on empty → delete or convert
      if (e.key === "Backspace") {
        const el = e.currentTarget
        const isEmpty = !el.textContent && el.innerHTML === ""
        if (isEmpty && (block.type === "ul" || block.type === "ol" || block.type === "blockquote")) {
          e.preventDefault()
          updateBlock(sectionId, block.id, { type: "p", html: "" })
          return
        }
        if (isEmpty && block.type !== "p") {
          e.preventDefault()
          updateBlock(sectionId, block.id, { type: "p", html: "" })
          return
        }
        if (isEmpty) {
          e.preventDefault()
          const prevId = getPrevId(sectionId, block.id)
          deleteBlock(sectionId, block.id)
          setTimeout(() => {
            const prevEl = prevId ? document.getElementById(`block-${prevId}`) : null
            if (prevEl) { prevEl.focus(); moveCaretToEnd(prevEl) }
          }, 0)
          return
        }
      }

      // Tab → prevent leaving editor
      if (e.key === "Tab") e.preventDefault()
    }
  }

  // ── Input handler per block (slash detection) ───────────────────────────────
  function makeOnInput(sectionId: string, blockId: string) {
    return (_html: string) => {
      const el = document.getElementById(`block-${blockId}`)
      const text = el?.textContent ?? ""
      const slashIdx = text.lastIndexOf("/")
      if (
        slashIdx !== -1 &&
        (slashIdx === 0 || /[\s\n]/.test(text[slashIdx - 1]))
      ) {
        const query = text.slice(slashIdx + 1)
        const sel = window.getSelection()
        if (sel?.rangeCount) {
          const rect = sel.getRangeAt(0).getBoundingClientRect()
          setSlashMenu({ sectionId, blockId, query, selectedIdx: 0, top: rect.bottom + 6, left: rect.left })
          return
        }
      }
      setSlashMenu(null)
    }
  }

  // ── Block renderer ──────────────────────────────────────────────────────────
  function renderBlock(section: DocSection, block: DocBlock) {
    const isAI = aiRewrite?.blockId === block.id
    const base = {
      blockId: block.id,
      html: block.html,
      onKeyDown: makeKeyDown(section.id, block),
      onInput: makeOnInput(section.id, block.id),
    }
    const editCls = "text-[15px] text-[#374151] leading-[1.65] w-full"
    const blockSpacing: Record<string, string> = {
      p: "mb-1", ul: "mb-0.5", ol: "mb-0.5",
      h1: "mt-8 mb-3", h2: "mt-6 mb-2", h3: "mt-5 mb-1.5",
      image: "mt-5 mb-4", code: "mt-4 mb-4",
      blockquote: "mt-3 mb-3", callout: "mt-3 mb-3", warning: "mt-3 mb-3",
      divider: "mt-5 mb-5",
    }

    let blockEl: React.ReactNode

    if (block.type === "h1") {
      blockEl = <Editable {...base} placeholder="Heading 1" className="text-[21px] font-semibold text-[#111] leading-[1.3] tracking-[-0.018em] w-full" />
    } else if (block.type === "h2") {
      blockEl = <Editable {...base} placeholder="Heading 2" className="text-[17px] font-semibold text-[#1A1A1A] leading-[1.4] tracking-[-0.01em] w-full" />
    } else if (block.type === "h3") {
      blockEl = <Editable {...base} placeholder="Heading 3" className="text-[14.5px] font-medium text-[#1A1A1A] leading-[1.5] w-full" />
    } else if (block.type === "ul") {
      blockEl = (
        <div className="flex items-start gap-3">
          <span className="text-[#9CA3AF] text-[15px] leading-[1.72] shrink-0 select-none mt-[1px]">·</span>
          <Editable {...base} placeholder="List item" className={editCls} />
        </div>
      )
    } else if (block.type === "ol") {
      const n = getOlNumber(section, block.id)
      blockEl = (
        <div className="flex items-start gap-3">
          <span className="text-[#9CA3AF] text-[13px] font-medium leading-[1.8] min-w-[16px] shrink-0 select-none tabular-nums">{n}.</span>
          <Editable {...base} placeholder="List item" className={editCls} />
        </div>
      )
    } else if (block.type === "blockquote") {
      blockEl = (
        <div className="border-l-[2px] border-[#D4D4D8] pl-4 py-0.5">
          <Editable {...base} placeholder="Quote…" className="text-[15px] text-[#6B7280] italic leading-[1.65] w-full" />
        </div>
      )
    } else if (block.type === "code") {
      blockEl = (
        <div className="rounded-[11px] overflow-hidden border border-[#2A2A3C]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1E1E2E] border-b border-[#2A2A3C]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <button
              onMouseDown={e => {
                e.preventDefault()
                const el = document.getElementById(`block-${block.id}`)
                if (el) navigator.clipboard.writeText(el.textContent ?? "")
              }}
              className="text-[#6E6C7E] hover:text-[#CDD6F4] transition-colors">
              <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <Editable {...base} placeholder="// Write code here…"
            className="p-5 bg-[#1E1E2E] text-[13px] font-mono text-[#CDD6F4] leading-relaxed whitespace-pre-wrap" />
        </div>
      )
    } else if (block.type === "callout") {
      blockEl = (
        <div className="flex items-start gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3.5">
          <span className="text-[15px] shrink-0 mt-0.5 select-none">{block.emoji ?? "💡"}</span>
          <Editable {...base} placeholder="Callout text" className="flex-1 text-[14.5px] text-[#374151] leading-[1.65]" />
        </div>
      )
    } else if (block.type === "warning") {
      blockEl = (
        <div className="flex items-start gap-3 bg-[#FFFDF0] border border-[#FEF08A]/50 rounded-[8px] px-4 py-3.5">
          <AlertTriangle className="w-[14px] h-[14px] text-[#CA8A04] shrink-0 mt-[3px]" strokeWidth={1.75} />
          <Editable {...base} placeholder="Warning text" className="flex-1 text-[14.5px] text-[#854D0E] leading-[1.65]" />
        </div>
      )
    } else if (block.type === "divider") {
      blockEl = <hr className="border-[#EBEBEB] my-2" />
    } else if (block.type === "image") {
      const isSelected = selectedImage === block.id
      blockEl = (
        <div className="relative group/img">
          {/* Drag handle */}
          <div
            draggable
            onDragStart={e => {
              e.dataTransfer.setData("blockId", block.id)
              e.dataTransfer.setData("sectionId", section.id)
              e.dataTransfer.effectAllowed = "move"
            }}
            className="absolute left-[-28px] top-1/2 -translate-y-1/2 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-grab active:cursor-grabbing p-1"
            title="Drag to reorder">
            <GripVertical className="w-4 h-4 text-[#C0C0C0]" strokeWidth={1.5} />
          </div>

          {/* Image container */}
          <div
            className={cn(
              "relative rounded-[10px] transition-all cursor-pointer select-none overflow-hidden",
              isSelected
                ? "ring-2 ring-[#3B82F6]/60 ring-offset-2"
                : "ring-0"
            )}
            style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}
            onClick={e => { e.stopPropagation(); setSelectedImage(isSelected ? null : block.id) }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              const draggedId = e.dataTransfer.getData("blockId")
              const draggedSec = e.dataTransfer.getData("sectionId")
              if (!draggedId || draggedId === block.id || draggedSec !== section.id) return
              setSections(prev => prev.map(s => {
                if (s.id !== section.id) return s
                const dragged = s.blocks.find(b => b.id === draggedId)!
                const rest = s.blocks.filter(b => b.id !== draggedId)
                const targetIdx = rest.findIndex(b => b.id === block.id)
                rest.splice(targetIdx, 0, dragged)
                return { ...s, blocks: rest }
              }))
            }}
          >
            {/* Actual image or empty state */}
            {block.src ? (
              <div className="aspect-[16/9] relative bg-[#F5F5F5]">
                <Image src={block.src} alt="Screenshot" fill className="object-cover" sizes="1120px" />
                {block.hotspot && (
                  <div
                    className="absolute w-5 h-5 rounded-full bg-white/90 border border-[#6C5DD3]/40 shadow-sm flex items-center justify-center z-10 pointer-events-none"
                    style={{ top: `${block.hotspot.y}%`, left: `${block.hotspot.x}%`, transform: "translate(-50%,-50%)" }}>
                    <span className="text-[9px] text-[#6C5DD3] font-semibold">{block.hotspot.step}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[16/9] bg-[#FAFAFA] border border-dashed border-[#E0E0E0] rounded-[10px] flex flex-col items-center justify-center gap-2.5">
                <ImageIcon className="w-8 h-8 text-[#D8D8D8]" strokeWidth={1} />
                <span className="text-[13px] text-[#C8C8C8]">
                  Type <kbd className="text-[#6C5DD3] bg-[#F0EEFF] px-1.5 py-0.5 rounded text-[11px] font-mono">/image</kbd> to insert
                </span>
              </div>
            )}

            {/* Floating action bar — appears on hover */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-all z-20">
              {/* Quick × delete */}
              <button
                onMouseDown={e => e.preventDefault()}
                onClick={e => { e.stopPropagation(); handleDeleteImage(section.id, block.id, block) }}
                className="w-6 h-6 flex items-center justify-center bg-black/50 hover:bg-red-500/90 text-white rounded-[5px] transition-all"
                title="Delete image">
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>

              {/* Action pill */}
              <div className="flex items-center gap-px bg-black/50 backdrop-blur-sm rounded-[7px] px-1 py-0.5">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/15 rounded-[5px] transition-all whitespace-nowrap">
                  <RefreshCw className="w-3 h-3" strokeWidth={1.5} />Replace
                </button>
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => {
                    e.stopPropagation()
                    updateBlock(section.id, block.id, { caption: block.caption ?? "" })
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/15 rounded-[5px] transition-all whitespace-nowrap">
                  <MessageSquare className="w-3 h-3" strokeWidth={1.5} />Caption
                </button>
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => {
                    e.stopPropagation()
                    const newId = uid()
                    insertBlockAfter(section.id, block.id, "image", newId, "", {
                      src: block.src, hotspot: block.hotspot, caption: block.caption
                    })
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/15 rounded-[5px] transition-all whitespace-nowrap">
                  <Copy className="w-3 h-3" strokeWidth={1.5} />Duplicate
                </button>
              </div>
            </div>

            {/* Selection corner handles */}
            {isSelected && (
              <>
                {(["tl", "tr", "bl", "br"] as const).map(p => (
                  <div key={p} className={cn(
                    "absolute w-2.5 h-2.5 bg-white border-[2px] border-[#3B82F6] rounded-[2px] z-20 pointer-events-none",
                    p === "tl" && "top-0 left-0",
                    p === "tr" && "top-0 right-0",
                    p === "bl" && "bottom-0 left-0",
                    p === "br" && "bottom-0 right-0",
                  )} />
                ))}
              </>
            )}
          </div>

          {/* Caption field */}
          {block.caption !== undefined && (
            <div className="mt-2">
              <p
                contentEditable suppressContentEditableWarning
                onBlur={e => updateBlock(section.id, block.id, { caption: (e.target as HTMLElement).textContent ?? "" })}
                onKeyDown={e => { if (e.key === "Enter") e.preventDefault() }}
                className="text-[12px] text-[#9CA3AF] text-center outline-none mt-1.5 empty:before:content-['Add_a_caption…'] empty:before:text-[#D4D4D8]"
              >
                {block.caption}
              </p>
            </div>
          )}
        </div>
      )
    } else {
      // paragraph
      blockEl = (
        <Editable {...base} placeholder="Type '/' for commands, or just start writing…"
          className={editCls} />
      )
    }

    return (
      <div key={block.id} className={blockSpacing[block.type] ?? "mb-2"}>
        {blockEl}
        {/* AI inline rewrite */}
        {isAI && (
          <div className="mt-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
            {aiRewrite!.status === "loading" ? (
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-[#F8F6FF] rounded-[11px] border border-[#EDE9FF]">
                <div className="w-3.5 h-3.5 border-2 border-[#6C5DD3]/20 border-t-[#6C5DD3] rounded-full animate-spin shrink-0" />
                <span className="text-[12px] text-[#6C5DD3] font-medium">Rewriting…</span>
                <span className="text-[11px] text-[#C8C8C8] ml-auto">Trupeer AI</span>
              </div>
            ) : (
              <div
                className="rounded-[12px] overflow-hidden border border-[#E4E4E4]"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                {/* Original with diff */}
                <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#F0F0F0]">
                  <p className="text-[9px] font-bold text-[#C8C8C8] uppercase tracking-wider mb-1.5">
                    Original
                  </p>
                  <p className="text-[13.5px] leading-relaxed">
                    {renderDiffOriginal(aiRewrite!.original, aiRewrite!.suggestion)}
                  </p>
                </div>
                {/* Suggestion with diff */}
                <div className="px-4 py-3 bg-white border-b border-[#F0F0F0]">
                  <p className="text-[9px] font-bold text-[#6C5DD3] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" strokeWidth={1.5} />Suggestion
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-[#1A1A1A]">
                    {renderDiffSuggestion(aiRewrite!.original, aiRewrite!.suggestion)}
                  </p>
                </div>
                {/* Actions + Refinement chips */}
                <div className="px-4 py-2.5 bg-white flex items-center gap-2 flex-wrap">
                  <button
                    onClick={acceptAI}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5B4EC2] rounded-[8px] transition-all"
                  >
                    <Check className="w-3 h-3" strokeWidth={2.5} />Accept
                  </button>
                  <button
                    onClick={() => setAIRewrite(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#555] border border-[#E4E4E4] hover:border-[#C0C0C0] rounded-[8px] transition-all"
                  >
                    <X className="w-3 h-3" strokeWidth={2} />Reject
                  </button>
                  <button
                    onClick={() => {
                      setAIRewrite(prev => prev ? { ...prev, status: "loading" } : null)
                      setTimeout(() => setAIRewrite(prev => prev ? { ...prev, suggestion: pickAIResponse("improve"), status: "done" } : null), 1100)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#9B9B9B] hover:text-[#4A4A4A] rounded-[8px] transition-all"
                  >
                    <RefreshCw className="w-3 h-3" strokeWidth={1.5} />Regenerate
                  </button>
                  {/* Multi-step refinement chips */}
                  <div className="ml-auto flex items-center gap-1.5">
                    {[
                      { label: "Shorter",    action: "simplify"     },
                      { label: "Technical",  action: "technical"    },
                      { label: "Expand",     action: "expand"       },
                      { label: "Friendlier", action: "friendly"     },
                    ].map(({ label, action }) => (
                      <button
                        key={label}
                        onClick={() => refineAI(action)}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#777] bg-[#F7F7F7] border border-[#E8E8E8] rounded-full hover:border-[#6C5DD3]/40 hover:text-[#6C5DD3] hover:bg-[#F0EEFF] transition-all whitespace-nowrap"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden" onClick={() => { setSlashMenu(null) }}>

      {/* ── TOP BAR ── */}
      <header className="h-[46px] flex items-center justify-between px-4 border-b border-[#F2F2F2] shrink-0 bg-white z-10">
        <div className="flex items-center gap-2.5">
          <button onClick={onBack}
            className="p-1.5 text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[6px] transition-all">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="w-px h-4 bg-[#EFEFEF]" />
          <button onClick={() => setOutlineOpen(!outlineOpen)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium rounded-[6px] transition-all",
              outlineOpen ? "text-[#6C5DD3] bg-[#F0EEFF]" : "text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
            )}>
            <LayoutList className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Outline</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <span className="text-[13px] font-medium text-[#1A1A1A] truncate max-w-[320px]">
            Product Walkthrough Documentation
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#B0B0B0] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />Saved
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowHistory(true)}
            className="p-1.5 text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[6px] transition-all" title="Version history">
            <History className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button onClick={() => setShowShare(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#3D3D3D] border border-[#E8E8E8] rounded-[7px] hover:border-[#D0D0D0] transition-all">
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />Share
          </button>
          <button onClick={() => setShowPublish(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#6C5DD3] rounded-[7px] hover:bg-[#5B4EC2] transition-all">
            <Zap className="w-3.5 h-3.5" strokeWidth={1.5} />Publish
          </button>
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-[7px] transition-all",
              copilotOpen ? "text-[#6C5DD3] bg-[#F0EEFF]" : "text-[#A0A0A0] hover:text-[#6C5DD3] hover:bg-[#F0EEFF]"
            )}
          >
            <TrupeerAIAvatar size={16} />
            <span className="hidden sm:inline">AI</span>
          </button>
          <button className="p-1.5 text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[6px] transition-all">
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Outline */}
        <aside
          className="border-r border-[#EDEDED] bg-white shrink-0 flex flex-col overflow-hidden"
          style={{
            width: outlineOpen ? 240 : 0,
            minWidth: outlineOpen ? 240 : 0,
            transition: "width 0.22s cubic-bezier(0.16,1,0.3,1), min-width 0.22s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F5F5F5] shrink-0">
            <span className="text-[10px] font-semibold text-[#C8C8C8] uppercase tracking-[0.08em]">Outline</span>
            <button onClick={() => setOutlineOpen(false)} className="p-1 text-[#D4D4D4] hover:text-[#555] rounded-[5px] transition-all">
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
          <nav className="py-2 flex-1 overflow-auto">
            {sections.map(s => {
              const isActive = aiCtx.sectionId === s.id
              return (
                <button key={s.id}
                  onClick={() => document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3.5 py-2 text-left transition-all group",
                    isActive ? "bg-[#F8F7FF]" : "hover:bg-[#FAFAFA]"
                  )}>
                  <span className={cn(
                    "text-[10.5px] font-medium tabular-nums shrink-0 w-4 text-right transition-colors",
                    isActive ? "text-[#6C5DD3]" : "text-[#D0D0D0]"
                  )}>{s.step}</span>
                  <span className={cn(
                    "text-[12px] truncate leading-snug flex-1 transition-colors",
                    isActive ? "text-[#6C5DD3] font-medium" : "text-[#6B6B6B] group-hover:text-[#1A1A1A]"
                  )}>{s.heading}</span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-[#6C5DD3] shrink-0 ml-1" />}
                </button>
              )
            })}
          </nav>
          <div className="px-4 py-3 border-t border-[#F5F5F5] shrink-0">
            <p className="text-[10px] text-[#C8C8C8] font-medium">{sections.length} sections</p>
          </div>
        </aside>

        {/* ── CANVAS ── */}
        <div ref={editorRef} className="flex-1 overflow-auto" onClick={e => { e.stopPropagation(); setSelectedImage(null) }}>
          <div className="max-w-[900px] mx-auto px-8 pt-12 pb-28">

            {/* Title */}
            <div className="mb-10">
              <div
                contentEditable
                suppressContentEditableWarning
                className="text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.022em] outline-none cursor-text mb-2.5 w-full"
                onKeyDown={e => { if (e.key === "Enter") e.preventDefault() }}
              >
                Product Walkthrough Documentation
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-[#9CA3AF]">
                <span>Created just now</span><span>·</span>
                <span>{sections.length} sections</span><span>·</span>
                <span className="text-[#34D399]">Saved</span>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section, si) => (
              <article
                key={section.id}
                id={`section-${section.id}`}
                className="mb-10 group/section"
                onFocus={() => setAICtx(prev => ({
                  ...prev,
                  sectionId: section.id,
                  sectionName: section.heading,
                  sectionStep: section.step,
                }))}
              >

                {/* Section heading */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[11px] font-medium text-[#C4C4C4] tabular-nums shrink-0 select-none tracking-wide">
                    {String(section.step).padStart(2, "0")}
                  </span>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="text-[17px] font-semibold text-[#111] leading-snug tracking-[-0.01em] outline-none cursor-text flex-1"
                    onKeyDown={e => { if (e.key === "Enter") e.preventDefault() }}
                  >
                    {section.heading}
                  </div>
                </div>

                {/* Blocks */}
                <div>
                  {section.blocks.map(block => renderBlock(section, block))}
                </div>

                {/* Add block button — reveals on section hover */}
                <button
                  onClick={e => {
                    e.stopPropagation()
                    const lastBlock = section.blocks[section.blocks.length - 1]
                    if (lastBlock) {
                      const newId = uid()
                      insertBlockAfter(section.id, lastBlock.id, "p", newId)
                      setTimeout(() => {
                        const el = document.getElementById(`block-${newId}`)
                        if (el) el.focus()
                      }, 0)
                    }
                  }}
                  className="flex items-center gap-2 mt-3 py-1.5 px-2 -mx-2 w-full rounded-[6px] opacity-0 group-hover/section:opacity-100 transition-opacity duration-150">
                  <Plus className="w-3.5 h-3.5 text-[#C8C8C8] shrink-0" strokeWidth={2} />
                  <span className="text-[12px] text-[#C4C4C4]">
                    Add block · type <kbd className="font-mono not-italic text-[#9CA3AF]">/</kbd> for commands
                  </span>
                </button>

                {si < sections.length - 1 && <div className="mt-8 border-t border-[#F2F2F2]" />}
              </article>
            ))}

            <div className="py-12 flex items-center justify-center">
              <div className="flex items-center gap-4 text-[11px] text-[#D4D4D8]">
                <div className="h-px w-12 bg-[#F0F0F0]" />
                <span>End of document</span>
                <div className="h-px w-12 bg-[#F0F0F0]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUPEER AI PANEL ── */}
        {copilotOpen && (
          <aside
            className="w-[360px] shrink-0 flex flex-col border-l border-[#EBEBEB] animate-in slide-in-from-right-2 duration-250 ease-out"
            style={{ background: "#FEFEFE", boxShadow: "-6px 0 32px rgba(0,0,0,0.05)" }}
          >
            {/* Header */}
            <div
              className="px-4 py-3.5 shrink-0 border-b border-[#F2F2F2]"
              style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F9F8FF 100%)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TrupeerAIAvatar size={32} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13.5px] font-semibold text-[#111]">Trupeer AI</span>
                      <span
                        className="text-[8.5px] font-bold text-white px-1.5 py-0.5 rounded-full leading-none tracking-wide uppercase"
                        style={{ background: "linear-gradient(135deg, #9B87F5, #6C5DD3)" }}
                      >
                        Beta
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                        style={{ boxShadow: "0 0 5px #10B981" }}
                      />
                      <span className="text-[10px] text-[#10B981] font-medium">Ready</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {aiMessages.length > 0 && (
                    <button
                      onClick={() => setAIMessages([])}
                      className="p-1.5 text-[#C8C8C8] hover:text-[#6C5DD3] hover:bg-[#F0EEFF] rounded-[7px] transition-all"
                      title="Clear conversation"
                    >
                      <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    onClick={() => setCopilotOpen(false)}
                    className="p-1.5 text-[#C8C8C8] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[7px] transition-all"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Context chips */}
            {(aiCtx.sectionName || (aiCtx.selectedWords !== undefined && aiCtx.selectedWords > 0)) && (
              <div className="px-3.5 py-2 border-b border-[#F5F5F5] flex items-center gap-1.5 flex-wrap bg-[#FAFAFA]">
                <span className="text-[9.5px] font-bold text-[#C0C0C0] uppercase tracking-wider shrink-0">Context</span>
                {aiCtx.sectionName && (
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#6C5DD3] bg-[#F0EEFF] border border-[#E8E3FF] px-2 py-0.5 rounded-full leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6C5DD3] shrink-0" />
                    Step {aiCtx.sectionStep} · {aiCtx.sectionName}
                  </span>
                )}
                {aiCtx.selectedWords !== undefined && aiCtx.selectedWords > 0 && (
                  <span className="inline-flex items-center text-[10.5px] font-medium text-[#555] bg-white border border-[#E8E8E8] px-2 py-0.5 rounded-full leading-none">
                    {aiCtx.selectedWords} {aiCtx.selectedWords === 1 ? "word" : "words"} selected
                  </span>
                )}
              </div>
            )}

            {/* Messages / Empty state */}
            <div ref={aiScrollRef} className="flex-1 overflow-auto p-4">
              {aiMessages.length === 0 ? (
                <div className="flex flex-col h-full">
                  {/* Welcome */}
                  <div className="flex flex-col items-center text-center pt-5 pb-5">
                    <div className="relative mb-4">
                      <TrupeerAIAvatar size={52} />
                      <div
                        className="absolute flex items-center justify-center border-2 border-white rounded-full"
                        style={{ width: 18, height: 18, bottom: -2, right: -2, background: "#10B981" }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#111] leading-snug mb-2">
                      Hi, I&apos;m Trupeer AI
                    </h3>
                    <p className="text-[12.5px] text-[#808080] leading-relaxed max-w-[232px]">
                      I can improve, expand, rewrite, structure and make your documentation publish-ready.
                    </p>
                  </div>

                  {/* Suggested actions */}
                  <div className="mt-1">
                    <p className="text-[9.5px] font-bold text-[#C8C8C8] uppercase tracking-wider mb-2.5 px-0.5">
                      Suggested actions
                    </p>
                    <div className="space-y-1.5">
                      {AI_SUGGESTIONS.map(s => (
                        <button
                          key={s.label}
                          onClick={() => submitAIMessage(s.label)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left rounded-[11px] border border-[#F0F0F0] hover:border-[#D8D3FF] hover:bg-[#FAFAFF] transition-all group"
                        >
                          <span className="text-[14px] shrink-0 leading-none">{s.icon}</span>
                          <span className="text-[12.5px] font-medium text-[#3A3A3A] group-hover:text-[#6C5DD3] transition-colors leading-snug flex-1">
                            {s.label}
                          </span>
                          <ArrowRight
                            className="w-3 h-3 text-[#D8D8D8] group-hover:text-[#6C5DD3] shrink-0 transition-all group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {aiMessages.map(msg => renderAIMessage(msg))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 pt-2.5 pb-3 border-t border-[#F2F2F2] shrink-0 bg-white">
              <div className="relative">
                <textarea
                  value={aiInputVal}
                  onChange={e => setAIInputVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      if (aiInputVal.trim()) submitAIMessage(aiInputVal)
                    }
                  }}
                  placeholder="Ask Trupeer AI anything…"
                  rows={1}
                  className="w-full pl-3.5 pr-12 py-2.5 text-[13px] bg-[#F7F7F9] border border-[#EBEBEB] rounded-[11px] text-[#1A1A1A] placeholder:text-[#C4C4C4] focus:outline-none focus:bg-white focus:border-[#6C5DD3]/50 transition-all resize-none leading-relaxed"
                  style={{ minHeight: 44, maxHeight: 130, overflowY: "auto" }}
                />
                <button
                  onClick={() => { if (aiInputVal.trim()) submitAIMessage(aiInputVal) }}
                  disabled={!aiInputVal.trim()}
                  className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center rounded-[8px] transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{ background: aiInputVal.trim() ? "linear-gradient(145deg, #9B87F5, #6C5DD3)" : "#E8E8E8" }}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </button>
              </div>
              <p className="text-[9.5px] text-[#D4D4D4] mt-1.5 text-center tracking-wide">
                ↵ Send · ⇧↵ New line
              </p>
            </div>
          </aside>
        )}
      </div>

      {/* ── FLOATING AI ENTRY POINT ── */}
      {!copilotOpen && (
        <button
          onClick={() => setCopilotOpen(true)}
          className="fixed bottom-7 right-7 z-40 flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(145deg, #9B87F5 0%, #6C5DD3 100%)",
            boxShadow: "0 4px 20px rgba(108,93,211,0.5), 0 2px 8px rgba(108,93,211,0.3)",
          }}
        >
          <TrupeerAIAvatar size={28} />
          <span className="text-[13px] font-semibold text-white">Ask AI</span>
          <Sparkles className="w-3.5 h-3.5 text-white/65 ml-0.5" strokeWidth={1.5} />
        </button>
      )}

      {/* ── SLASH MENU ── */}
      {slashMenu && (
        <div
          key={`${slashMenu.sectionId}-${slashMenu.blockId}`}
          className="fixed z-50 bg-white rounded-[13px] w-[320px] border border-[#EBEBEB] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
          style={{
            top: slashMenu.top,
            left: slashMenu.left,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            transformOrigin: "top left",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Search query indicator */}
          {slashMenu.query && (
            <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider">
                Searching
              </span>
              <span className="text-[10px] font-mono text-[#6C5DD3] bg-[#F0EEFF] px-1.5 py-0.5 rounded-[4px]">
                /{slashMenu.query}
              </span>
            </div>
          )}

          {/* Items */}
          <div className="max-h-[340px] overflow-y-auto py-1.5" id="slash-scroll">
            {displayGroups.length === 0 ? (
              /* No results */
              <div className="flex flex-col items-center gap-2 py-8 px-4">
                <div className="w-8 h-8 rounded-[8px] bg-[#F5F5F5] flex items-center justify-center">
                  <Search className="w-4 h-4 text-[#C0C0C0]" strokeWidth={1.5} />
                </div>
                <p className="text-[13px] text-[#B0B0B0]">
                  No results for <span className="font-medium text-[#6C5DD3]">&ldquo;{slashMenu.query}&rdquo;</span>
                </p>
                <p className="text-[11px] text-[#C8C8C8]">Try a different keyword</p>
              </div>
            ) : (
              displayGroups.map(group => (
                <div key={group.label || "search"}>
                  {group.label && (
                    <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-[#B8B8B8] uppercase tracking-wider select-none">
                      {group.label}
                    </p>
                  )}
                  {group.items.map(({ cmd, flatIdx }) => {
                    const isActive = flatIdx === slashMenu.selectedIdx
                    const q = slashMenu.query?.toLowerCase() ?? ""
                    return (
                      <button
                        key={`${cmd.type}-${flatIdx}`}
                        id={`slash-item-${flatIdx}`}
                        onMouseDown={e => { e.preventDefault(); applySlash(cmd.type) }}
                        onMouseEnter={() => setSlashMenu(m => m ? { ...m, selectedIdx: flatIdx } : null)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                          isActive ? "bg-[#F8F6FF]" : "hover:bg-[#FAFAFA]"
                        )}>
                        {/* Icon */}
                        <div className={cn(
                          "w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 transition-colors",
                          isActive ? "bg-[#EAE6FF]" : "bg-[#F5F5F5]"
                        )}>
                          <cmd.icon
                            className={cn("w-4 h-4 transition-colors", isActive ? "text-[#6C5DD3]" : "text-[#888]")}
                            strokeWidth={1.5}
                          />
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#1A1A1A] leading-tight">
                            {q ? <SlashHighlight text={cmd.label} query={q} /> : cmd.label}
                          </p>
                          <p className="text-[11px] text-[#B0B0B0] leading-tight mt-0.5 truncate">
                            {cmd.desc}
                          </p>
                        </div>
                        {/* Active indicator */}
                        {isActive && (
                          <span className="text-[10px] text-[#6C5DD3] font-medium shrink-0">↵</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer hints */}
          <div className="px-3 py-2 border-t border-[#F5F5F5] flex items-center gap-3 text-[10px] text-[#C8C8C8]">
            <span className="flex items-center gap-1">
              <kbd className="border border-[#EBEBEB] px-1 py-0.5 rounded-[3px] font-mono text-[9px]">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-[#EBEBEB] px-1 py-0.5 rounded-[3px] font-mono text-[9px]">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-[#EBEBEB] px-1 py-0.5 rounded-[3px] font-mono text-[9px]">tab</kbd>
              complete
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <kbd className="border border-[#EBEBEB] px-1 py-0.5 rounded-[3px] font-mono text-[9px]">esc</kbd>
              close
            </span>
          </div>
        </div>
      )}

      {/* ── SELECTION TOOLBAR ── */}
      {selTool && (
        <div
          className="fixed z-50 pointer-events-auto"
          style={{
            left: `clamp(260px, ${selTool.x}px, calc(100vw - 260px))`,
            top: selTool.y,
            transform: "translate(-50%, calc(-100% - 8px))",
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          <div
            className="rounded-[12px] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100"
            style={{
              background: "#1A1A1C",
              boxShadow: "0 8px 28px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {aiCustomPrompt ? (
              /* ── Custom prompt mode ── */
              <div className="flex items-center gap-2 px-2.5 py-2.5 min-w-[300px]">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setAICustomPrompt(false); setAICustomVal("") }}
                  className="p-1 text-white/35 hover:text-white/70 rounded-[5px] transition-all shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
                <div className="w-px h-4 bg-white/10 shrink-0" />
                <input
                  autoFocus
                  value={aiCustomVal}
                  onChange={e => setAICustomVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && aiCustomVal.trim()) {
                      e.preventDefault()
                      triggerAI(aiCustomVal)
                      setAICustomPrompt(false)
                      setAICustomVal("")
                    }
                    if (e.key === "Escape") { setAICustomPrompt(false); setAICustomVal("") }
                  }}
                  placeholder="e.g. Rewrite for enterprise IT teams"
                  className="flex-1 bg-transparent text-[12.5px] text-white placeholder:text-white/25 outline-none"
                />
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    if (!aiCustomVal.trim()) return
                    triggerAI(aiCustomVal)
                    setAICustomPrompt(false)
                    setAICustomVal("")
                  }}
                  disabled={!aiCustomVal.trim()}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#9B8EFF] bg-[#9B8EFF]/15 hover:bg-[#9B8EFF]/25 disabled:opacity-30 rounded-[6px] transition-all shrink-0 whitespace-nowrap"
                >
                  Generate <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              /* ── Normal mode ── */
              <>
                {/* Row 1: Formatting */}
                <div className="flex items-center gap-px px-2 py-1.5">
                  {([
                    { cmd: () => fmt("bold"),          Icon: Bold,          title: "Bold" },
                    { cmd: () => fmt("italic"),        Icon: Italic,        title: "Italic" },
                    { cmd: () => fmt("underline"),     Icon: Underline,     title: "Underline" },
                    { cmd: () => fmt("strikeThrough"), Icon: Strikethrough, title: "Strikethrough" },
                    { cmd: () => fmtInlineCode(),      Icon: Code2,         title: "Inline code" },
                    { cmd: () => fmtLink(),            Icon: Link2,         title: "Link" },
                  ] as { cmd: () => void; Icon: React.ElementType; title: string }[]).map(({ cmd, Icon, title }) => (
                    <button
                      key={title}
                      onMouseDown={e => { e.preventDefault(); cmd() }}
                      title={title}
                      className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-[5px] transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  ))}
                </div>

                {/* Separator */}
                <div className="h-px bg-white/[0.07] mx-2" />

                {/* Row 2: AI actions */}
                <div className="flex items-center gap-px px-2 py-1.5">
                  <span className="text-[8px] font-bold text-[#9B8EFF] uppercase tracking-widest px-1 shrink-0 select-none">AI</span>
                  {[
                    { label: "Improve",      action: "improve",      sym: "✦" },
                    { label: "Simplify",     action: "simplify",     sym: "↓" },
                    { label: "Expand",       action: "expand",       sym: "↑" },
                    { label: "Technical",    action: "technical",    sym: "⚙" },
                    { label: "Professional", action: "professional", sym: "◎" },
                    { label: "Friendly",     action: "friendly",     sym: "✉" },
                    { label: "Fix Grammar",  action: "grammar",      sym: "✓" },
                  ].map(({ label, action, sym }) => (
                    <button
                      key={label}
                      onMouseDown={e => { e.preventDefault(); triggerAI(action) }}
                      className="flex items-center gap-[3px] px-2 py-1.5 text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 rounded-[6px] transition-all whitespace-nowrap"
                    >
                      <span className="text-[#9B8EFF] text-[9px]">{sym}</span>{label}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-white/10 mx-0.5 shrink-0" />
                  <button
                    onMouseDown={e => { e.preventDefault(); setAICustomPrompt(true) }}
                    className="flex items-center gap-[3px] px-2 py-1.5 text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/10 rounded-[6px] transition-all whitespace-nowrap"
                  >
                    <span className="text-[#9B8EFF] text-[9px]">✎</span>Custom
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── DIFF PREVIEW MODAL ── */}
      {showDiff && (() => {
        const msg = aiMessages.find(m => m.id === showDiff)
        const p = msg?.proposal
        if (!p) return null
        const beforeText = sections
          .flatMap(s => s.blocks.filter(b => b.type === "p").slice(0, 2))
          .map(b => b.html.replace(/<[^>]+>/g, ""))
          .join(" ")
          .slice(0, 260)
        return (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-8"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowDiff(null)}
          >
            <div
              className="bg-white rounded-[20px] w-full max-w-[680px] flex flex-col shadow-2xl animate-in zoom-in-95 fade-in-0 duration-200"
              style={{ maxHeight: "78vh" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-[#F0F0F0] shrink-0">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-7 h-7 rounded-full bg-[#F0EEFF] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#6C5DD3]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[15.5px] font-semibold text-[#111]">{p.title}</h3>
                  </div>
                  <p className="text-[12px] text-[#9B9B9B] ml-9.5">Review proposed changes before applying</p>
                </div>
                <button
                  onClick={() => setShowDiff(null)}
                  className="p-1.5 text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[7px] transition-all shrink-0 mt-0.5"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              {/* Diff columns */}
              <div className="flex-1 overflow-auto grid grid-cols-2 divide-x divide-[#F0F0F0] min-h-0">
                {/* Before */}
                <div className="p-5 overflow-auto bg-[#FFFAFA]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#FCA5A5]" />
                    <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">Before</span>
                  </div>
                  <p className="text-[13px] text-[#9B9B9B] leading-relaxed line-through decoration-[#FCA5A5]/50">
                    {beforeText || "Current document content will be updated."}
                  </p>
                </div>
                {/* After */}
                <div className="p-5 overflow-auto bg-[#F6FEF9]">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3 h-3 text-[#10B981]" strokeWidth={1.5} />
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">After</span>
                  </div>
                  <ul className="space-y-2.5">
                    {p.preview.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[#1A1A1A] leading-relaxed">
                        <span className="text-[#10B981] font-bold text-[11px] mt-[3px] shrink-0">+</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-[#C6F0DC] flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      +{p.wordDelta} words added
                    </span>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex items-center gap-2.5 px-6 py-4 border-t border-[#F0F0F0] shrink-0">
                <button
                  onClick={() => { applyProposal(showDiff); setShowDiff(null) }}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white rounded-[10px] transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(145deg, #9B87F5, #6C5DD3)" }}
                >
                  <Check className="w-4 h-4" strokeWidth={2.5} />Apply Changes
                </button>
                <button
                  onClick={() => setShowDiff(null)}
                  className="px-4 py-2 text-[13px] font-medium text-[#555] border border-[#E4E4E4] rounded-[10px] hover:border-[#C8C8C8] hover:text-[#1A1A1A] transition-all"
                >
                  Close
                </button>
                <div className="ml-auto flex items-center gap-1.5 text-[10.5px] text-[#B0B0B0]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  +{p.wordDelta} words
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── VERSION HISTORY ── */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setShowHistory(false)}>
          <div className="flex-1" />
          <div className="w-[380px] h-full bg-white border-l border-[#EBEBEB] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB] shrink-0">
              <div>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A]">Version history</h3>
                <p className="text-[12px] text-[#9B9B9B] mt-0.5">Restore or compare previous versions</p>
              </div>
              <button onClick={() => setShowHistory(false)}
                className="p-1.5 text-[#9B9B9B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[7px] transition-all">
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-auto py-3">
              {VERSIONS.map((v, i) => (
                <div key={v.id} className="group relative">
                  {i < VERSIONS.length - 1 && <div className="absolute left-[27px] top-10 w-px h-full bg-[#F0F0F0]" />}
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors mx-1 rounded-[9px]">
                    <div className={cn("w-4 h-4 rounded-full border-2 shrink-0 mt-1 z-10 relative",
                      v.id === 1 ? "bg-[#6C5DD3] border-[#6C5DD3]" : "bg-white border-[#D8D8D8]")} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[13px] font-semibold text-[#1A1A1A]">{v.author}</span>
                        {v.tag && (
                          <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                            v.tag === "Current" ? "bg-[#F0EEFF] text-[#6C5DD3]" : "bg-[#F3F3F3] text-[#9B9B9B]")}>
                            {v.tag}
                          </span>
                        )}
                        <span className="text-[11px] text-[#B0B0B0] ml-auto">{v.time}</span>
                      </div>
                      <p className="text-[12px] text-[#6B6B6B]">{v.desc}</p>
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[11px] font-semibold text-[#6C5DD3] hover:text-[#5B4EC2]">Restore</button>
                        <span className="text-[#E0E0E0]">·</span>
                        <button className="text-[11px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A]">Preview</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SHARE MODAL ── */}
      {showShare && (
        <Modal onClose={() => setShowShare(false)}>
          <div className="p-6">
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-1">Share document</h3>
            <p className="text-[13px] text-[#9B9B9B] mb-5">Anyone with the link can view this guide.</p>
            <div className="flex items-center gap-2 p-3 bg-[#F7F7F7] rounded-[9px] border border-[#EBEBEB] mb-5">
              <Link2 className="w-4 h-4 text-[#9B9B9B] shrink-0" strokeWidth={1.5} />
              <span className="flex-1 text-[12px] text-[#6B6B6B] truncate font-mono">trupeer.ai/docs/product-walkthrough-documentation</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#6C5DD3] rounded-[6px] hover:bg-[#5B4EC2] transition-all shrink-0">
                <Copy className="w-3 h-3" strokeWidth={2} />Copy
              </button>
            </div>
            <div className="space-y-2 mb-5">
              {[
                { icon: Globe, label: "Public",    desc: "Anyone with the link", active: true  },
                { icon: Users, label: "Team only", desc: "Only team members",    active: false },
                { icon: Lock,  label: "Private",   desc: "Only invited people",  active: false },
              ].map(({ icon: Icon, label, desc, active }) => (
                <button key={label} className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-[9px] border transition-all text-left",
                  active ? "border-[#6C5DD3] bg-[#F8F6FF]" : "border-[#EBEBEB] hover:border-[#D8D8D8]"
                )}>
                  <div className={cn("p-2 rounded-[7px]", active ? "bg-[#EAE6FF]" : "bg-[#F5F5F5]")}>
                    <Icon className={cn("w-4 h-4", active ? "text-[#6C5DD3]" : "text-[#9B9B9B]")} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-[#1A1A1A]">{label}</p>
                    <p className="text-[12px] text-[#9B9B9B]">{desc}</p>
                  </div>
                  {active && <Check className="w-4 h-4 text-[#6C5DD3]" strokeWidth={2.5} />}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* ── UNDO TOAST ── */}
      {undoToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1C1C1E] text-white pl-4 pr-2 py-2.5 rounded-[12px] shadow-2xl pointer-events-auto"
          style={{ animation: "fade-in 0.15s ease" }}>
          <span className="text-[13px]">Image deleted</span>
          <button
            onClick={undoDelete}
            className="text-[12px] font-semibold text-[#9B8EFF] hover:text-white px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-[7px] transition-all whitespace-nowrap">
            Undo
          </button>
          <button
            onClick={() => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current); setUndoToast(null) }}
            className="text-white/40 hover:text-white/70 transition-colors p-1">
            <X className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* ── PUBLISH MODAL ── */}
      {showPublish && (
        <Modal onClose={() => setShowPublish(false)} width="max-w-[420px]">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#F0EEFF] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#1A1A1A]">Publish guide</h3>
                <p className="text-[12px] text-[#9B9B9B]">Make it available to your audience</p>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {[
                { label: "All sections complete",    ok: true  },
                { label: "Screenshots attached",     ok: true  },
                { label: "SEO title configured",     ok: false },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                    ok ? "bg-[#ECFDF5]" : "bg-[#FFFBEB]")}>
                    {ok
                      ? <Check className="w-3 h-3 text-[#059669]" strokeWidth={2.5} />
                      : <AlertTriangle className="w-3 h-3 text-[#D97706]" strokeWidth={2} />}
                  </div>
                  <span className="text-[13px] text-[#3A3A3A]">{label}</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 bg-[#F7F7F7] rounded-[9px] border border-[#EBEBEB] mb-5">
              <p className="text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider mb-1">Publish URL</p>
              <p className="text-[13px] text-[#6C5DD3] font-mono">trupeer.ai/docs/product-walkthrough-documentation</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPublish(false)}
                className="flex-1 py-2.5 text-[13px] font-medium text-[#4A4A4A] border border-[#E0E0E0] rounded-[9px] hover:border-[#C8C8C8] transition-all">
                Cancel
              </button>
              <button onClick={() => setShowPublish(false)}
                className="flex-1 py-2.5 text-[13px] font-semibold text-white bg-[#6C5DD3] rounded-[9px] hover:bg-[#5B4EC2] transition-all flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" strokeWidth={1.5} />Publish now
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Modal({ children, onClose, width = "max-w-[500px]" }: {
  children: React.ReactNode; onClose: () => void; width?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/25 backdrop-blur-[3px]" onClick={onClose}>
      <div className={cn("bg-white rounded-[16px] w-full shadow-2xl border border-[#E8E8E8] relative", width)} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-[#A0A0A0] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-[6px] transition-all">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>
  )
}

