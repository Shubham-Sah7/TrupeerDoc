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
  { icon: Home,           label: "Home",          href: "/" },
  { icon: FolderKanban,   label: "Projects",       href: "/projects" },
  { icon: BookOpen,       label: "Knowledge Base", href: "/knowledge" },
  { icon: BookMarked,     label: "Guides",         href: "/library" },
  { icon: LayoutTemplate, label: "Templates",      href: "/shared-pages" },
]

const createNav = [
  { icon: Workflow, label: "Capture Workflow", href: "/record" },
  { icon: PenLine,  label: "Guide Builder",   href: "/editor" },
  { icon: Sparkles, label: "AI Copilot",      href: "/ai-studio" },
]

const workspaceNav = [
  { icon: FileText,  label: "Documentation", href: "/documents" },
  { icon: ImageIcon, label: "Media Library",  href: "/demos" },
  { icon: Palette,   label: "Brand Kit",      href: "/brand-kit" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] border-r border-[#F0F0F0] dark:border-[#26262B] bg-white dark:bg-[#111113] flex flex-col min-h-screen shrink-0">

      {/* Logo */}
      <div className="px-6 pt-7 pb-9">
        <div className="relative h-[34px] w-[160px]">
          <Image
            src="/images/Clueso.png"
            alt="Clueso"
            fill
            className="object-contain object-left dark:brightness-[1.1]"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-10">

        <NavGroup label="Primary">
          {primaryNav.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}
            />
          ))}
        </NavGroup>

        <NavGroup label="Create">
          {createNav.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </NavGroup>

        <NavGroup label="Workspace">
          {workspaceNav.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </NavGroup>

      </nav>

      {/* Bottom */}
      <div className="px-4 pb-6 space-y-4">

        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-[#D85BD6] hover:text-[#C84AC7] hover:bg-[#FDF4FD] dark:hover:bg-[#26262B]/60 text-[14px] font-medium rounded-lg transition-all duration-200">
          <Bell className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
          <span>What&apos;s new</span>
        </button>

        {/* Upgrade card */}
        <div className="rounded-xl bg-gradient-to-br from-[#FDF4FD] dark:from-[#1C1C1F] via-white dark:via-[#17171A] to-[#FDF4FD] dark:to-[#1C1C1F] border border-[#F1D6F1] dark:border-[#3A2A3A] p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-[#D85BD6]/10 rounded-lg">
              <Zap className="w-4 h-4 text-[#D85BD6]" strokeWidth={2} fill="#D85BD6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-1">
                Upgrade to Pro
              </div>
              <div className="text-[12px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                Unlimited AI docs and advanced features
              </div>
            </div>
          </div>
          <button className="w-full bg-[#D85BD6] hover:bg-[#C84AC7] active:bg-[#B83AB7] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
            Upgrade Now
          </button>
        </div>

        {/* User profile */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] rounded-lg transition-all duration-200 group">
          <div className="w-8 h-8 rounded-full bg-[#D85BD6] flex-shrink-0 flex items-center justify-center text-white text-[13px] font-semibold">
            S
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-[13px] font-semibold text-[#18181B] dark:text-[#FAFAFA] truncate">
              Shubham Sah
            </div>
            <div className="text-[12px] text-[#71717A] dark:text-[#A1A1AA]">Free Plan</div>
          </div>
          <ChevronDown
            className="w-4 h-4 text-[#D4D4D8] dark:text-[#3A3A40] flex-shrink-0 group-hover:text-[#A1A1AA] transition-colors duration-200"
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
        <span className="text-[11px] font-semibold text-[#A1A1AA] dark:text-[#52525B] uppercase tracking-[0.08em]">
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
}

function NavItem({ icon: Icon, label, href, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 w-full px-3 py-2 rounded-[8px] text-[15px] font-medium transition-all duration-200",
        active
          ? "text-[#18181B] dark:text-[#FAFAFA] bg-[#F8F9FA] dark:bg-[#26262B]"
          : "text-[#18181B] dark:text-[#A1A1AA] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F] hover:text-[#18181B] dark:hover:text-[#FAFAFA]"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[16px] bg-[#D85BD6] rounded-r-full" />
      )}
      <Icon
        className={cn(
          "w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200",
          active ? "text-[#D85BD6]" : "text-[#71717A] group-hover:text-[#18181B] dark:group-hover:text-[#FAFAFA]"
        )}
        strokeWidth={2}
      />
      <span className="flex-1">{label}</span>
    </Link>
  )
}
