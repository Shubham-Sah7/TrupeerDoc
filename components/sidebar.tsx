"use client"

import {
  Home, FolderKanban, BookOpen, BookMarked, LayoutTemplate,
  Workflow, PenLine, Sparkles, FileText, ImageIcon,
  Palette, Bell, ChevronDown, Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const primaryNav = [
  { icon: Home,           label: "Home",          href: "/",             disabled: false },
  { icon: FolderKanban,   label: "Projects",       href: "/projects",     disabled: true  },
  { icon: BookOpen,       label: "Knowledge Base", href: "/knowledge",    disabled: true  },
  { icon: BookMarked,     label: "Guides",         href: "/library",      disabled: true  },
  { icon: LayoutTemplate, label: "Templates",      href: "/shared-pages", disabled: true  },
]

const createNav = [
  { icon: Workflow,  label: "Capture Workflow", href: "/record",    disabled: false },
  { icon: PenLine,   label: "Guide Builder",    href: "/editor",    disabled: true  },
  { icon: FileText,  label: "Document Editor",  href: "/editor",    disabled: false },
  { icon: Sparkles,  label: "AI Copilot",       href: "/ai-studio", disabled: true  },
]

const workspaceNav = [
  { icon: FileText,  label: "Documentation", href: "/documents", disabled: true },
  { icon: ImageIcon, label: "Media Library",  href: "/demos",     disabled: true },
  { icon: Palette,   label: "Brand Kit",      href: "/brand-kit", disabled: true },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] border-r border-[#F0F0F0] bg-white flex flex-col min-h-screen shrink-0">

      {/* Logo */}
      <div className="px-6 pt-7 pb-9">
        <div className="relative h-[28px] w-[100px]">
          <Image
            src="/images/trupeer.jpeg"
            alt="Trupeer"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-10">

        <NavGroup label="Primary">
          {primaryNav.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={!item.disabled && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))}
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
              active={!item.disabled && pathname.startsWith(item.href)}
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
              active={!item.disabled && pathname.startsWith(item.href)}
              disabled={item.disabled}
            />
          ))}
        </NavGroup>

      </nav>

      {/* Bottom */}
      <div className="px-4 pb-6 space-y-4">

        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-[#6C5DD3] hover:text-[#5B4EC2] hover:bg-[#F5F4FF] text-[14px] font-medium rounded-lg transition-all duration-200">
          <Bell className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
          <span>What&apos;s new</span>
        </button>

        {/* Upgrade card */}
        <div className="rounded-xl bg-gradient-to-br from-[#F5F4FF] via-white to-[#F5F4FF] border border-[#E4E1FF] p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-[#6C5DD3]/10 rounded-lg">
              <Zap className="w-4 h-4 text-[#6C5DD3]" strokeWidth={2} fill="#6C5DD3" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#18181B] mb-1">
                Upgrade to Pro
              </div>
              <div className="text-[12px] text-[#71717A] leading-relaxed">
                Unlimited AI docs and advanced features
              </div>
            </div>
          </div>
          <button className="w-full bg-[#6C5DD3] hover:bg-[#5B4EC2] active:bg-[#4A3FB1] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
            Upgrade Now
          </button>
        </div>

        {/* User profile */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAFAFA] rounded-lg transition-all duration-200 group">
          <div className="w-8 h-8 rounded-full bg-[#6C5DD3] flex-shrink-0 flex items-center justify-center text-white text-[13px] font-semibold">
            S
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-[13px] font-semibold text-[#18181B] truncate">
              Shubham Sah
            </div>
            <div className="text-[12px] text-[#71717A]">Free Plan</div>
          </div>
          <ChevronDown
            className="w-4 h-4 text-[#D4D4D8] flex-shrink-0 group-hover:text-[#A1A1AA] transition-colors duration-200"
            strokeWidth={2}
          />
        </button>

      </div>
    </aside>
  )
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-3 mb-3">
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
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[16px] bg-[#6C5DD3] rounded-r-full" />
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
