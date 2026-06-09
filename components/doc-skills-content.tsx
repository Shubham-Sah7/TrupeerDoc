"use client"

import {
  GraduationCap, HelpCircle, Layers, FileCode2,
  Settings2, ArrowRight, Sparkles,
} from "lucide-react"

const SKILLS = [
  {
    icon: GraduationCap,
    label: "Assessment",
    description: "Generate comprehension checks and quiz questions from your documentation to verify reader understanding.",
    color: "text-[#6C5DD3]",
    bg: "bg-[#F5F4FF]",
    badge: "6 questions",
  },
  {
    icon: HelpCircle,
    label: "FAQs",
    description: "Automatically extract and format the most common questions and answers from your guide.",
    color: "text-[#0891B2]",
    bg: "bg-[#F0FDFE]",
    badge: "8 questions",
  },
  {
    icon: Layers,
    label: "Job Aid",
    description: "Create compact quick-reference cards and cheat sheets designed for on-the-job use.",
    color: "text-[#059669]",
    bg: "bg-[#F0FDF4]",
    badge: "1 page",
  },
  {
    icon: FileCode2,
    label: "PRD",
    description: "Generate structured product requirement documents from your walkthrough recordings.",
    color: "text-[#D97706]",
    bg: "bg-[#FFFBEB]",
    badge: "Draft ready",
  },
]

const APPLIED = [
  { title: "Product Onboarding Guide",    skills: ["Assessment", "Job Aid"] },
  { title: "API Documentation",           skills: ["FAQs", "PRD"]          },
  { title: "Employee Training Guide",     skills: ["Assessment"]            },
]

export function DocSkillsContent() {
  return (
    <main className="flex-1 overflow-auto bg-[#FAFAFA]">
      <div className="max-w-[900px] mx-auto px-12 py-14">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-[7px] bg-[#F5F4FF] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
              </div>
              <h1 className="text-[24px] font-semibold text-[#111] tracking-[-0.015em]">Doc Skills</h1>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[520px]">
              AI-powered tools that transform your documentation into assessments, quick-reference cards, FAQs, and PRDs — without rewriting anything.
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-[#52525B] border border-[#E4E4E7] rounded-[8px] hover:border-[#D0D0D5] transition-colors shrink-0">
            <Settings2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Manage Doc Skills
          </button>
        </div>

        {/* Skill Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-4">
            {SKILLS.map(({ icon: Icon, label, description, color, bg, badge }) => (
              <div
                key={label}
                className="group bg-white border border-[#E4E4E7] rounded-[12px] p-5 hover:border-[#D0D0D5] hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-9 h-9 rounded-[9px] ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-[18px] h-[18px] ${color}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-medium text-[#9CA3AF] bg-[#F4F4F5] px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#111] mb-1.5">{label}</h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{description}</p>
                <button className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#6C5DD3] hover:gap-2.5 transition-all">
                  Generate
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Applied to Documents */}
        <section>
          <h2 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">
            Applied to documents
          </h2>
          <div className="bg-white border border-[#E4E4E7] rounded-[12px] divide-y divide-[#F4F4F5]">
            {APPLIED.map(({ title, skills }) => (
              <div key={title} className="flex items-center justify-between px-5 py-3.5 group hover:bg-[#FAFAFA] transition-colors">
                <div>
                  <p className="text-[14px] font-medium text-[#111]">{title}</p>
                  <p className="text-[12px] text-[#9CA3AF] mt-0.5">{skills.join(" · ")}</p>
                </div>
                <button className="text-[12px] text-[#6C5DD3] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Edit skills <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
