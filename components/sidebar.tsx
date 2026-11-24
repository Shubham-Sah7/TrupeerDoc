"use client"

import { useState } from "react"
import {
  Home, FolderKanban, BookOpen, BookMarked, LayoutTemplate,
  Workflow, PenLine, Sparkles, FileText, ImageIcon,
  Palette, Bell, ChevronDown, Zap, Users, GraduationCap,
  X, Check, Crown, LogOut, Settings, ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const primaryNav = [
  { icon: Home,           label: "Home",           href: "/",             disabled: false },
  { icon: FolderKanban,   label: "Projects",        href: "/projects",     disabled: false },
  { icon: BookOpen,       label: "Knowledge Base",  href: "/knowledge",    disabled: false },
  { icon: BookMarked,     label: "Guides",          href: "/library",      disabled: false },
  { icon: LayoutTemplate, label: "Templates",       href: "/shared-pages", disabled: false },
]

const createNav = [
  { icon: Workflow,       label: "Capture Workflow", href: "/record",          disabled: false },
  { icon: PenLine,        label: "Guide Builder",    href: "/editor",          disabled: false },
  { icon: FileText,       label: "Document Editor",  href: "/document-editor", disabled: false },
  { icon: Sparkles,       label: "AI Copilot",       href: "/ai-studio",       disabled: false },
]

const workspaceNav = [
  { icon: FileText,       label: "Documentation", href: "/documents",   disabled: false },
  { icon: ImageIcon,      label: "Media Library",  href: "/demos",       disabled: false },
  { icon: Users,          label: "Team Assets",    href: "/team-assets", disabled: false },
  { icon: GraduationCap,  label: "Doc Skills",     href: "/doc-skills",  disabled: false },
  { icon: Palette,        label: "Brand Kit",      href: "/brand-kit",   disabled: false },
]

export function Sidebar() {
  const pathname = usePathname()
  const [showWhatsNew, setShowWhatsNew] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      <aside className="w-[240px] border-r border-[#F0F0F0] bg-white flex flex-col min-h-screen shrink-0 relative">

        {/* Logo */}
        <div className="px-6 pt-7 pb-9">
          <Link href="/" className="inline-block relative h-[28px] w-[100px] cursor-pointer">
            <Image
              src="/images/trupeer.jpeg"
              alt="Trupeer"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto">

          <NavGroup label="Primary">
            {primaryNav.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isItemActive(item.href)}
                disabled={item.disabled}
              />
            ))}
          </NavGroup>

          <NavGroup label="Create">
            {createNav.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isItemActive(item.href)}
                disabled={item.disabled}
              />
            ))}
          </NavGroup>

          <NavGroup label="Workspace">
            {workspaceNav.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isItemActive(item.href)}
                disabled={item.disabled}
              />
            ))}
          </NavGroup>

        </nav>

        {/* Bottom */}
        <div className="px-4 pb-6 pt-4 space-y-4 border-t border-[#F0F0F0] mt-auto">

          {/* What's new */}
          <button
            onClick={() => setShowWhatsNew(true)}
            className="flex items-center gap-3 w-full px-3 py-2 text-[#6C5DD3] hover:text-[#5B4EC2] hover:bg-[#F5F4FF] text-[14px] font-medium rounded-lg transition-all duration-200"
          >
            <Bell className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
            <span className="flex-1 text-left">What&apos;s new</span>
            <span className="w-2 h-2 rounded-full bg-[#6C5DD3]" />
          </button>

          {/* Upgrade card */}
          <div className="rounded-xl bg-gradient-to-br from-[#F5F4FF] via-white to-[#F5F4FF] border border-[#E4E1FF] p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-[#6C5DD3]/10 rounded-lg shrink-0">
                <Zap className="w-4 h-4 text-[#6C5DD3]" strokeWidth={2} fill="#6C5DD3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#18181B] mb-0.5">
                  Upgrade to Pro
                </div>
                <div className="text-[11px] text-[#71717A] leading-relaxed">
                  Unlimited AI docs & 4K exports
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-[#6C5DD3] hover:bg-[#5B4EC2] active:bg-[#4A3FB1] text-white text-[12px] font-semibold py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
            >
              Upgrade Now
            </button>
          </div>

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#FAFAFA] rounded-lg transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#6C5DD3] flex-shrink-0 flex items-center justify-center text-white text-[13px] font-semibold shadow-sm">
                S
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[13px] font-semibold text-[#18181B] truncate">
                  Shubham Sah
                </div>
                <div className="text-[11px] text-[#71717A]">Free Plan</div>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#D4D4D8] flex-shrink-0 group-hover:text-[#A1A1AA] transition-transform duration-200",
                  showUserMenu && "rotate-180"
                )}
                strokeWidth={2}
              />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-[#E4E4E7] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#F0F0F0]">
                  <p className="text-[13px] font-medium text-[#18181B]">shubham@trupeer.ai</p>
                  <span className="inline-block mt-1 text-[11px] text-[#6C5DD3] bg-[#F5F4FF] px-2 py-0.5 rounded font-medium">
                    Personal Workspace
                  </span>
                </div>
                <div className="py-1">
                  <Link
                    href="/brand-kit"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]"
                  >
                    <Settings className="w-4 h-4" />
                    Workspace Settings
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      setShowUpgradeModal(true)
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#6C5DD3] hover:bg-[#F5F4FF]"
                  >
                    <Crown className="w-4 h-4" />
                    Manage Subscription
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#EF4444] hover:bg-[#FEF2F2]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* What's New Modal */}
      {showWhatsNew && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F4FF] flex items-center justify-center text-[#6C5DD3]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[17px] text-[#18181B]">What&apos;s New in Trupeer</h3>
                  <p className="text-[12px] text-[#71717A]">Latest updates and new capabilities</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsNew(false)}
                className="p-1.5 hover:bg-[#F4F4F5] rounded-lg text-[#71717A] hover:text-[#18181B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="p-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-semibold text-[#18181B]">AI Copilot & Doc Skills</span>
                  <span className="text-[11px] bg-[#6C5DD3] text-white px-2 py-0.5 rounded-full font-medium">New</span>
                </div>
                <p className="text-[13px] text-[#71717A] leading-relaxed">
                  Turn walkthroughs into instant assessments, FAQs, PRDs, and localized documentation in 15+ languages.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-semibold text-[#18181B]">Interactive Demo Studio</span>
                  <span className="text-[11px] bg-[#059669] text-white px-2 py-0.5 rounded-full font-medium">Updated</span>
                </div>
                <p className="text-[13px] text-[#71717A] leading-relaxed">
                  Export product demos as clickable iframe embeds, shareable links, and step-by-step interactive tours.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-semibold text-[#18181B]">Unified Team Asset Library</span>
                  <span className="text-[11px] bg-[#0284C7] text-white px-2 py-0.5 rounded-full font-medium">Enhanced</span>
                </div>
                <p className="text-[13px] text-[#71717A] leading-relaxed">
                  Centralize brand logos, screenshots, audio voiceovers, and videos across all your guides and team members.
                </p>
              </div>
            </div>
            <div className="p-4 bg-[#F8F9FA] border-t border-[#F0F0F0] flex justify-end">
              <button
                onClick={() => setShowWhatsNew(false)}
                className="px-4 py-2 bg-[#6C5DD3] text-white text-[13px] font-medium rounded-lg hover:bg-[#5B4EC2] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[540px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6C5DD3]/10 flex items-center justify-center text-[#6C5DD3]">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[18px] text-[#18181B]">Upgrade to Trupeer Pro</h3>
                  <p className="text-[13px] text-[#71717A]">Unlock all capabilities for your entire workspace</p>
                </div>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="p-1.5 hover:bg-[#F4F4F5] rounded-lg text-[#71717A] hover:text-[#18181B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-[#6C5DD3] bg-[#F5F4FF]/50 relative">
                  <span className="text-[11px] font-bold text-[#6C5DD3] uppercase tracking-wider block mb-1">Monthly</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-bold text-[#18181B]">$29</span>
                    <span className="text-[12px] text-[#71717A]">/ month</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border-2 border-[#6C5DD3] bg-[#F5F4FF] relative">
                  <div className="absolute top-2 right-2 bg-[#6C5DD3] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SAVE 20%
                  </div>
                  <span className="text-[11px] font-bold text-[#6C5DD3] uppercase tracking-wider block mb-1">Annual</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] font-bold text-[#18181B]">$24</span>
                    <span className="text-[12px] text-[#71717A]">/ month</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 pt-2">
                {[
                  "Unlimited AI document generations and screen captures",
                  "4K video recordings and crystal-clear voiceovers",
                  "Full interactive demo embeds with customizable domains",
                  "Automated multi-language translations and voice clones",
                  "Collaborative workspaces with roles and permissions",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[13px] text-[#3F3F46]">
                    <div className="w-4 h-4 rounded-full bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-[#F8F9FA] border-t border-[#F0F0F0] flex items-center justify-between">
              <span className="text-[12px] text-[#71717A]">14-day free trial, cancel anytime</span>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-6 py-2.5 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white text-[13px] font-semibold rounded-lg transition-all shadow-sm"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-3 mb-2.5">
        <span className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-[0.08em]">
          {label}
        </span>
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  disabled?: boolean
}

function NavItem({ icon: Icon, label, href, active, disabled }: NavItemProps) {
  if (disabled) {
    return (
      <div className="relative flex items-center gap-3 w-full px-3 py-2 rounded-[8px] text-[15px] font-medium opacity-40 cursor-default select-none">
        <Icon className="w-[18px] h-[18px] flex-shrink-0 text-[#71717A]" strokeWidth={2} />
        <span className="flex-1 text-[#18181B]">{label}</span>
      </div>
    )
  }
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 w-full px-3 py-2 rounded-[8px] text-[15px] font-medium transition-all duration-200",
        active
          ? "text-[#18181B] bg-[#F8F9FA]"
          : "text-[#18181B] hover:bg-[#FAFAFA] hover:text-[#18181B]"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-[18px] bg-[#6C5DD3] rounded-r-full" />
      )}
      <Icon
        className={cn(
          "w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200",
          active ? "text-[#6C5DD3]" : "text-[#71717A] group-hover:text-[#18181B]"
        )}
        strokeWidth={2}
      />
      <span className="flex-1">{label}</span>
    </Link>
  )
}
