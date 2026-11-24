"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Sparkles, ArrowRight, FileText, Presentation, 
  Languages, Zap, Video, BookOpen, Loader2,
  CheckCircle2, Clock, TrendingUp, Lightbulb
} from "lucide-react"

export function AIStudioContent() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")

  const handleGenerate = () => {
    if (!prompt.trim()) return
    if (prompt.toLowerCase().includes("doc") || prompt.toLowerCase().includes("guide")) {
      router.push("/document-editor")
    } else {
      router.push("/editor")
    }
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-16 py-12">
        
        {/* Hero */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5F4FF] text-[#6C5DD3] px-4 py-2 rounded-full text-[13px] font-medium mb-6">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            AI Studio
          </div>
          <h1 className="text-[56px] font-serif leading-none tracking-tight text-[#18181B] mb-4">
            Create with AI
          </h1>
          <p className="text-[17px] text-[#71717A] max-w-[700px] mx-auto leading-relaxed">
            Generate videos, documentation, demos, scripts, translations, and training materials from a single workspace.
          </p>
        </header>

        {/* Large AI Input */}
        <section className="mb-12">
          <div className="bg-white border-2 border-[#E8E8E6] rounded-2xl p-8 hover:border-[#6C5DD3] transition-all shadow-sm">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask AI to help you create documentation, interactive tours, or video scripts..."
                className="w-full h-32 text-[16px] bg-transparent resize-none focus:outline-none text-[#18181B] placeholder:text-[#A1A1AA]"
              />
              <button
                onClick={handleGenerate}
                className="absolute bottom-0 right-0 px-5 py-2.5 bg-[#6C5DD3] text-white text-[14px] font-medium rounded-lg hover:bg-[#5B4EC2] transition-all shadow-sm cursor-pointer"
              >
                Generate
                <ArrowRight className="w-4 h-4 inline ml-2" strokeWidth={2} />
              </button>
            </div>
          </div>
          
          {/* Example Prompts */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
            <span className="text-[12px] text-[#A1A1AA]">Try:</span>
            <ExamplePrompt text="Generate onboarding documentation" onSelect={(t) => setPrompt(t)} />
            <ExamplePrompt text="Create a sales demo" onSelect={(t) => setPrompt(t)} />
            <ExamplePrompt text="Translate this guide" onSelect={(t) => setPrompt(t)} />
            <ExamplePrompt text="Improve narration" onSelect={(t) => setPrompt(t)} />
          </div>
        </section>

        {/* AI Actions */}
        <section className="mb-12">
          <h2 className="text-[22px] font-semibold text-[#18181B] mb-6">AI Actions</h2>
          <div className="grid grid-cols-3 gap-5">
            <AIActionCard
              icon={<FileText className="w-6 h-6" strokeWidth={1.5} />}
              title="Generate Documentation"
              description="Create guides from videos and recordings"
              onClick={() => router.push("/document-editor")}
            />
            <AIActionCard
              icon={<Presentation className="w-6 h-6" strokeWidth={1.5} />}
              title="Create Interactive Demo"
              description="Build product walkthroughs automatically"
              onClick={() => router.push("/demos")}
            />
            <AIActionCard
              icon={<Zap className="w-6 h-6" strokeWidth={1.5} />}
              title="Improve Narration"
              description="Enhance voice quality and clarity"
              onClick={() => setPrompt("Improve voiceover narration clarity and professional tone")}
            />
            <AIActionCard
              icon={<Languages className="w-6 h-6" strokeWidth={1.5} />}
              title="Translate Content"
              description="Convert to multiple languages"
              onClick={() => setPrompt("Translate content into Spanish, French, and German")}
            />
            <AIActionCard
              icon={<Video className="w-6 h-6" strokeWidth={1.5} />}
              title="Generate Script"
              description="Create video scripts from outlines"
              onClick={() => setPrompt("Write a structured 2-minute product walkthrough video script")}
            />
            <AIActionCard
              icon={<BookOpen className="w-6 h-6" strokeWidth={1.5} />}
              title="Create Training Guide"
              description="Build educational materials"
              onClick={() => router.push("/document-editor")}
            />
          </div>
        </section>

        {/* AI Workspace */}
        <section className="mb-12">
          <h2 className="text-[22px] font-semibold text-[#18181B] mb-6">AI Workspace</h2>
          <div className="space-y-3">
            <AIJobCard
              title="Generating Documentation"
              source="Product Demo Video"
              progress={65}
              status="processing"
            />
            <AIJobCard
              title="Creating Demo"
              source="Onboarding Recording"
              progress={40}
              status="processing"
            />
            <AIJobCard
              title="Translating Content"
              source="API Guide"
              progress={100}
              status="complete"
            />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <Lightbulb className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[22px] font-semibold text-[#18181B]">AI Recommendations</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <RecommendationCard
              title="Your onboarding video can become a guide"
              description="Convert Product Onboarding into step-by-step documentation"
              action="Generate Guide"
              onClick={() => router.push("/document-editor")}
            />
            <RecommendationCard
              title="Your API documentation needs updating"
              description="Refresh outdated content with latest information"
              action="Update Now"
              onClick={() => router.push("/document-editor")}
            />
            <RecommendationCard
              title="Translate your top-performing content"
              description="Product Demo has 3.4k views - add Spanish & French"
              action="Translate"
              onClick={() => setPrompt("Translate Product Demo documentation into Spanish & French")}
            />
            <RecommendationCard
              title="Create a demo from your latest recording"
              description="Feature Walkthrough can become an interactive demo"
              action="Create Demo"
              onClick={() => router.push("/demos")}
            />
          </div>
        </section>

        {/* AI Playground */}
        <section className="mb-12">
          <h2 className="text-[22px] font-semibold text-[#18181B] mb-6">AI Playground</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-xl p-6">
            <p className="text-[14px] text-[#71717A] mb-4">
              Experiment with AI capabilities. Try different prompts to discover what&apos;s possible.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <PlaygroundPrompt text="Turn this into a customer onboarding guide" onSelect={(t) => setPrompt(t)} />
              <PlaygroundPrompt text="Generate FAQ from this recording" onSelect={(t) => setPrompt(t)} />
              <PlaygroundPrompt text="Create a product walkthrough" onSelect={(t) => setPrompt(t)} />
              <PlaygroundPrompt text="Summarize documentation" onSelect={(t) => setPrompt(t)} />
            </div>
          </div>
        </section>

        {/* Generated Content */}
        <section className="mb-12">
          <h2 className="text-[22px] font-semibold text-[#18181B] mb-6">Generated Content</h2>
          <div className="grid grid-cols-4 gap-4">
            <GeneratedContentCard
              type="Documentation"
              title="API Integration Guide"
              date="2 hours ago"
              onClick={() => router.push("/document-editor")}
            />
            <GeneratedContentCard
              type="Script"
              title="Product Demo Script"
              date="5 hours ago"
              onClick={() => router.push("/editor")}
            />
            <GeneratedContentCard
              type="Demo"
              title="Onboarding Walkthrough"
              date="Yesterday"
              onClick={() => router.push("/demos")}
            />
            <GeneratedContentCard
              type="Translation"
              title="Spanish Guide"
              date="2 days ago"
              onClick={() => router.push("/document-editor")}
            />
            <GeneratedContentCard
              type="Training"
              title="Employee Training"
              date="3 days ago"
              onClick={() => router.push("/document-editor")}
            />
            <GeneratedContentCard
              type="Documentation"
              title="Feature Overview"
              date="1 week ago"
              onClick={() => router.push("/document-editor")}
            />
            <GeneratedContentCard
              type="Script"
              title="Sales Presentation"
              date="1 week ago"
              onClick={() => router.push("/editor")}
            />
            <GeneratedContentCard
              type="Demo"
              title="Product Tour"
              date="2 weeks ago"
              onClick={() => router.push("/demos")}
            />
          </div>
        </section>

        {/* AI Activity */}
        <section>
          <h2 className="text-[22px] font-semibold text-[#18181B] mb-6">AI Activity</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-lg divide-y divide-[#E8E8E6]">
            <ActivityItem
              action="Documentation Generated"
              target="API Integration Guide"
              time="2 hours ago"
            />
            <ActivityItem
              action="Demo Published"
              target="Product Walkthrough"
              time="5 hours ago"
            />
            <ActivityItem
              action="Translation Completed"
              target="Spanish Customer Guide"
              time="Yesterday"
            />
            <ActivityItem
              action="Narration Improved"
              target="Onboarding Video"
              time="2 days ago"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface ExamplePromptProps {
  text: string
  onSelect: (text: string) => void
}

function ExamplePrompt({ text, onSelect }: ExamplePromptProps) {
  return (
    <button
      onClick={() => onSelect(text)}
      className="text-[12px] text-[#71717A] bg-white border border-[#E8E8E6] px-3 py-1.5 rounded-full hover:border-[#6C5DD3] hover:text-[#6C5DD3] transition-all cursor-pointer"
    >
      {text}
    </button>
  )
}

interface AIActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick?: () => void
}

function AIActionCard({ icon, title, description, onClick }: AIActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border border-[#E8E8E6] rounded-xl p-6 hover:border-[#6C5DD3] hover:shadow-lg hover:-translate-y-1 transition-all text-left cursor-pointer"
    >
      <div className="p-3 bg-[#F5F5F3] rounded-lg inline-flex mb-4 group-hover:bg-[#F5F4FF] transition-colors">
        <div className="text-[#52525B] group-hover:text-[#6C5DD3] transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-[16px] font-semibold text-[#18181B] mb-2">{title}</h3>
      <p className="text-[13px] text-[#71717A] leading-relaxed">{description}</p>
    </button>
  )
}

interface AIJobCardProps {
  title: string
  source: string
  progress: number
  status: "processing" | "complete"
}

function AIJobCard({ title, source, progress, status }: AIJobCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-[#18181B]">{title}</h3>
            {status === "processing" && (
              <Loader2 className="w-4 h-4 text-[#6C5DD3] animate-spin" strokeWidth={1.5} />
            )}
            {status === "complete" && (
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" strokeWidth={1.5} />
            )}
          </div>
          <p className="text-[13px] text-[#71717A]">From: {source}</p>
        </div>
        <span className="text-[13px] font-medium text-[#6C5DD3]">{progress}%</span>
      </div>
      <div className="w-full bg-[#F5F5F3] h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${
            status === "complete" ? "bg-[#10B981]" : "bg-[#6C5DD3]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  title: string
  description: string
  action: string
  onClick?: () => void
}

function RecommendationCard({ title, description, action, onClick }: RecommendationCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-white rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-[#18181B] mb-1">{title}</h3>
          <p className="text-[13px] text-[#71717A] leading-relaxed">{description}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        {action}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  )
}

interface PlaygroundPromptProps {
  text: string
  onSelect: (text: string) => void
}

function PlaygroundPrompt({ text, onSelect }: PlaygroundPromptProps) {
  return (
    <button
      onClick={() => onSelect(text)}
      className="text-left p-4 bg-[#F5F5F3] rounded-lg hover:bg-[#F5F4FF] hover:border hover:border-[#6C5DD3] transition-all group cursor-pointer"
    >
      <p className="text-[13px] text-[#52525B] group-hover:text-[#18181B]">{text}</p>
    </button>
  )
}

interface GeneratedContentCardProps {
  type: string
  title: string
  date: string
  onClick?: () => void
}

function GeneratedContentCard({ type, title, date, onClick }: GeneratedContentCardProps) {
  const getIcon = () => {
    switch (type) {
      case "Documentation": return <FileText className="w-4 h-4" strokeWidth={1.5} />
      case "Script": return <Video className="w-4 h-4" strokeWidth={1.5} />
      case "Demo": return <Presentation className="w-4 h-4" strokeWidth={1.5} />
      case "Translation": return <Languages className="w-4 h-4" strokeWidth={1.5} />
      case "Training": return <BookOpen className="w-4 h-4" strokeWidth={1.5} />
      default: return <FileText className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E8E8E6] rounded-lg p-4 hover:border-[#D4D4D2] hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-[#F5F4FF] rounded text-[#6C5DD3]">
          {getIcon()}
        </div>
        <span className="text-[11px] text-[#6C5DD3] font-medium">{type}</span>
      </div>
      <h3 className="text-[14px] font-medium text-[#18181B] mb-2 leading-snug">{title}</h3>
      <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA]">
        <Clock className="w-3 h-3" strokeWidth={1.5} />
        {date}
      </div>
    </div>
  )
}

interface ActivityItemProps {
  action: string
  target: string
  time: string
}

function ActivityItem({ action, target, time }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F5F4FF] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="text-[13px]">
          <span className="font-medium text-[#18181B]">{action}</span>
          <span className="text-[#71717A]"> · </span>
          <span className="text-[#71717A]">{target}</span>
        </div>
      </div>
      <div className="text-[12px] text-[#A1A1AA]">{time}</div>
    </div>
  )
}
