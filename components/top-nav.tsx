"use client"

import { useState } from "react"
import { Plus, Workflow, Upload, FileText, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface TopNavProps {
  onRecordClick: () => void
  onUploadClick: () => void
  onTemplateClick: () => void
}

export function TopNav({ onRecordClick, onUploadClick, onTemplateClick }: TopNavProps) {
  const [showMenu, setShowMenu] = useState(false)

  const handleOptionClick = (action: () => void) => {
    action()
    setShowMenu(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-20 bg-white dark:bg-[#111113] border-b border-[#E4E4E7] dark:border-[#26262B]">
        <div className="px-8 py-3 flex items-center justify-end gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Primary CTA */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D85BD6] hover:bg-[#C84AC7] text-white font-medium text-[14px] rounded-[10px] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Create
          </button>
        </div>
      </nav>

      {showMenu && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-8">
          <div className="bg-white dark:bg-[#17171A] rounded-[16px] w-full max-w-[480px] shadow-xl border border-transparent dark:border-[#26262B]">

            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#E4E4E7] dark:border-[#26262B]">
              <div>
                <h2 className="text-[20px] font-semibold text-[#111111] dark:text-[#FAFAFA] mb-1">Create new</h2>
                <p className="text-[14px] text-[#71717A] dark:text-[#A1A1AA]">Choose how you&apos;d like to start</p>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="p-1.5 hover:bg-[#F4F4F5] dark:hover:bg-[#26262B] rounded-[6px] transition-colors"
              >
                <X className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA]" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <CreateOption
                icon={<Workflow className="w-5 h-5" strokeWidth={1.5} />}
                title="Capture Workflow"
                description="Record your screen and turn it into documentation"
                onClick={() => handleOptionClick(onRecordClick)}
                primary
              />
              <CreateOption
                icon={<Upload className="w-5 h-5" strokeWidth={1.5} />}
                title="Upload Screenshots"
                description="Build a guide from existing images or recordings"
                onClick={() => handleOptionClick(onUploadClick)}
              />
              <CreateOption
                icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
                title="Create Documentation"
                description="Start from a proven template"
                onClick={() => handleOptionClick(onTemplateClick)}
              />
            </div>

          </div>
        </div>
      )}
    </>
  )
}

interface CreateOptionProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  primary?: boolean
}

function CreateOption({ icon, title, description, onClick, primary }: CreateOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-[12px] border transition-all ${
        primary
          ? "border-[#D85BD6] bg-[#FAFAFA] dark:bg-[#1C1C1F]"
          : "border-[#E4E4E7] dark:border-[#26262B] bg-white dark:bg-[#17171A] hover:border-[#D4D4D8] dark:hover:border-[#3A3A40] hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1F]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-[8px] flex-shrink-0 ${
          primary ? "bg-[#FDF4FD] text-[#D85BD6]" : "bg-[#F4F4F5] dark:bg-[#26262B] text-[#52525B] dark:text-[#A1A1AA]"
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[15px] font-medium text-[#111111] dark:text-[#FAFAFA] mb-0.5">{title}</h3>
          <p className="text-[13px] text-[#71717A] dark:text-[#A1A1AA]">{description}</p>
        </div>
      </div>
    </button>
  )
}
