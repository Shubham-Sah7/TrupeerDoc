"use client"

import { useState } from "react"
import { Plus, Workflow, Upload, FileText, X } from "lucide-react"

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
      <nav className="sticky top-0 z-20 bg-white border-b border-[#E4E4E7]">
        <div className="px-8 py-3 flex items-center justify-end gap-3">
          {/* Primary CTA */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6C5DD3] hover:bg-[#5B4EC2] text-white font-medium text-[14px] rounded-[10px] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Create
          </button>
        </div>
      </nav>

      {showMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-8">
          <div className="bg-white rounded-[16px] w-full max-w-[480px] shadow-xl border border-transparent">

            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#E4E4E7]">
              <div>
                <h2 className="text-[20px] font-semibold text-[#111111] mb-1">Create new</h2>
                <p className="text-[14px] text-[#71717A]">Choose how you&apos;d like to start</p>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="p-1.5 hover:bg-[#F4F4F5] rounded-[6px] transition-colors"
              >
                <X className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
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
          ? "border-[#6C5DD3] bg-[#FAFAFA]"
          : "border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:bg-[#FAFAFA]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-[8px] flex-shrink-0 ${
          primary ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F4F4F5] text-[#52525B]"
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[15px] font-medium text-[#111111] mb-0.5">{title}</h3>
          <p className="text-[13px] text-[#71717A]">{description}</p>
        </div>
      </div>
    </button>
  )
}
