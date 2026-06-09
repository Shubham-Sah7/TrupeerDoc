"use client"

import { useState } from "react"
import { 
  ArrowLeft, MoreHorizontal, Share2, Clock, Sparkles,
  Check, X, ChevronDown, FileText, Video, History,
  Zap, Languages, Eye, Download, Link2, Users
} from "lucide-react"

interface DocumentEditorProps {
  onBack?: () => void
}

export function DocumentEditor({ onBack }: DocumentEditorProps) {
  const [documentMode, setDocumentMode] = useState<"doc" | "video">("doc")
  const [showAICopilot, setShowAICopilot] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <header className="h-14 border-b border-[#F0F0F0] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <div className="h-6 w-px bg-[#F0F0F0]" />
          
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#71717A]" strokeWidth={1.5} />
            <input
              type="text"
              defaultValue="Product Onboarding Guide"
              className="text-[15px] font-medium text-[#18181B] bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Document/Video Toggle */}
          <div className="flex items-center bg-[#F8F9FA] rounded-lg p-1">
            <button
              onClick={() => setDocumentMode("doc")}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-all ${
                documentMode === "doc"
                  ? "bg-white text-[#18181B] shadow-sm"
                  : "text-[#71717A] hover:text-[#18181B]"
              }`}
            >
              <FileText className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={1.5} />
              Document
            </button>
            <button
              onClick={() => setDocumentMode("video")}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-all ${
                documentMode === "video"
                  ? "bg-white text-[#18181B] shadow-sm"
                  : "text-[#71717A] hover:text-[#18181B]"
              }`}
            >
              <Video className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={1.5} />
              Video
            </button>
          </div>

          <div className="h-5 w-px bg-[#E4E4E7]" />

          <button className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-lg transition-all" title="Version History">
            <History className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button className="px-3 py-2 text-[13px] font-medium text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-lg transition-all">
            <Share2 className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={1.5} />
            Share
          </button>

          <button className="px-4 py-2 text-[13px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5B4EC2] rounded-lg transition-all">
            Publish
          </button>

          <button className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F8F9FA] rounded-lg transition-all">
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="max-w-[800px] mx-auto px-24 py-16">
            <input
              type="text"
              defaultValue="Product Onboarding Guide"
              className="w-full text-[48px] font-serif leading-tight text-[#18181B] bg-transparent border-none focus:outline-none mb-8 placeholder:text-[#D4D4D8]"
              placeholder="Untitled"
            />
            <div className="prose prose-lg max-w-none">
              <p className="text-[18px] leading-relaxed text-[#52525B] mb-6">
                Welcome to our comprehensive product onboarding guide.
              </p>
            </div>
          </div>
        </main>

        {showAICopilot && (
          <aside className="w-[360px] border-l border-[#F0F0F0] bg-white p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
              <h2 className="text-[15px] font-semibold text-[#18181B]">AI Copilot</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg hover:border-[#6C5DD3] transition-all">
                <div className="text-[13px] font-medium text-[#18181B] mb-1">Generate FAQs</div>
                <div className="text-[12px] text-[#71717A]">Add common questions</div>
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
