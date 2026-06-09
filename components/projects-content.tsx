"use client"

import { Plus, Upload, Search, Filter, Play, MoreHorizontal, Users, Clock, Sparkles, Video, FileText, Presentation, Languages, ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Eye } from "lucide-react"
import { useState } from "react"

export function ProjectsContent() {
  const [activeView, setActiveView] = useState<string>("all")

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[42px] font-serif leading-none tracking-tight text-[#18181B] mb-2">
                Projects
              </h1>
              <p className="text-[15px] text-[#71717A]">
                Manage videos, guides, demos, and documentation from one workspace.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] hover:shadow-sm transition-all">
                <Upload className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Import Project
              </button>
              <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
                <Plus className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                New Project
              </button>
            </div>
          </div>
        </header>

        {/* Project Overview */}
        <section className="mb-10">
          <div className="grid grid-cols-4 gap-4">
            <OverviewCard
              label="Total Projects"
              value="24"
              icon={<TrendingUp className="w-4 h-4" strokeWidth={1.5} />}
            />
            <OverviewCard
              label="In Progress"
              value="8"
              icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
              active
            />
            <OverviewCard
              label="Ready to Publish"
              value="5"
              icon={<CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />}
            />
            <OverviewCard
              label="Needs Review"
              value="3"
              icon={<AlertCircle className="w-4 h-4" strokeWidth={1.5} />}
            />
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search projects, videos, documents, demos..."
                className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#A1A1AA] font-mono">⌘K</kbd>
            </div>
            <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] transition-all">
              <Filter className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </section>

        {/* Continue Working */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Continue Working</h2>
          <div className="grid grid-cols-3 gap-5">
            <ContinueWorkingCard
              thumbnail="/images/screenshot-1.png"
              type="Interactive Demo"
              title="Product Onboarding Flow"
              lastEdited="2 hours ago"
              progress={65}
              aiStatus="Processing"
              collaborators={3}
            />
            <ContinueWorkingCard
              thumbnail="/images/screenshot-2.png"
              type="Video"
              title="Feature Walkthrough"
              lastEdited="5 hours ago"
              progress={90}
              aiStatus="Complete"
              collaborators={2}
            />
            <ContinueWorkingCard
              thumbnail="/images/screenshot-3.png"
              type="Document"
              title="API Documentation Guide"
              lastEdited="Yesterday"
              progress={40}
              aiStatus="Generating"
              collaborators={1}
            />
          </div>
        </section>

        {/* AI Insights */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Insights</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <AIInsightCard
              title="Finish Product Walkthrough"
              description="65% complete"
              action="Continue"
            />
            <AIInsightCard
              title="Generate Documentation"
              description="From latest recording"
              action="Generate"
            />
            <AIInsightCard
              title="Translate API Guide"
              description="To Spanish & French"
              action="Translate"
            />
            <AIInsightCard
              title="Improve Narration"
              description="3 videos ready"
              action="Enhance"
            />
          </div>
        </section>

        {/* Smart Views */}
        <section className="mb-8">
          <div className="flex items-center gap-2 border-b border-[#E8E8E6]">
            <ViewTab label="All" count={24} active={activeView === "all"} onClick={() => setActiveView("all")} />
            <ViewTab label="Videos" count={12} active={activeView === "videos"} onClick={() => setActiveView("videos")} />
            <ViewTab label="Documents" count={6} active={activeView === "documents"} onClick={() => setActiveView("documents")} />
            <ViewTab label="Demos" count={4} active={activeView === "demos"} onClick={() => setActiveView("demos")} />
            <ViewTab label="Published" count={8} active={activeView === "published"} onClick={() => setActiveView("published")} />
            <ViewTab label="Drafts" count={10} active={activeView === "drafts"} onClick={() => setActiveView("drafts")} />
          </div>
        </section>

        {/* Main Project Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-4 gap-4">
            <ProjectCard
              thumbnail="/images/screenshot-4.png"
              type="Video"
              title="Product Demo 2024"
              lastModified="2 days ago"
              duration="4:32"
              collaborators={3}
              status="Published"
              progress={100}
            />
            <ProjectCard
              thumbnail="/images/screenshot-5.png"
              type="Document"
              title="Getting Started Guide"
              lastModified="3 days ago"
              duration="6 min read"
              collaborators={2}
              status="Draft"
              progress={75}
            />
            <ProjectCard
              thumbnail="/images/screenshot-6.png"
              type="Demo"
              title="Interactive Feature Tour"
              lastModified="5 days ago"
              duration="3:15"
              collaborators={4}
              status="Review"
              progress={85}
            />
            <ProjectCard
              thumbnail="/images/screenshot-7.png"
              type="Video"
              title="Customer Testimonial"
              lastModified="1 week ago"
              duration="2:45"
              collaborators={1}
              status="Published"
              progress={100}
            />
            <ProjectCard
              thumbnail="/images/screenshot-8.png"
              type="Document"
              title="API Reference"
              lastModified="1 week ago"
              duration="12 min read"
              collaborators={3}
              status="Draft"
              progress={60}
            />
            <ProjectCard
              thumbnail="/images/screenshot-1.png"
              type="Demo"
              title="Onboarding Walkthrough"
              lastModified="2 weeks ago"
              duration="5:20"
              collaborators={2}
              status="Published"
              progress={100}
            />
            <ProjectCard
              thumbnail="/images/screenshot-2.png"
              type="Video"
              title="Feature Announcement"
              lastModified="2 weeks ago"
              duration="3:50"
              collaborators={2}
              status="Review"
              progress={90}
            />
            <ProjectCard
              thumbnail="/images/screenshot-3.png"
              type="Document"
              title="Training Manual"
              lastModified="3 weeks ago"
              duration="15 min read"
              collaborators={1}
              status="Draft"
              progress={45}
            />
          </div>
        </section>

        {/* Templates Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Start From Template</h2>
            <button className="text-[13px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
              Browse all templates
            </button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            <TemplateCard title="Product Demo" image="/images/template/template-1.png" />
            <TemplateCard title="Feature Launch" image="/images/template/template-2.png" />
            <TemplateCard title="Customer Onboarding" image="/images/template/template-3.png" />
            <TemplateCard title="Employee Training" image="/images/template/template-4.png" />
            <TemplateCard title="API Walkthrough" image="/images/template/template-5.png" />
            <TemplateCard title="Release Notes" image="/images/template/template-6.png" />
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Activity</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-lg divide-y divide-[#E8E8E6]">
            <ActivityItem
              user="John Smith"
              action="reviewed"
              target="API Documentation"
              time="1 hour ago"
            />
            <ActivityItem
              user="AI Assistant"
              action="completed translation for"
              target="Product Demo"
              time="3 hours ago"
              aiAction
            />
            <ActivityItem
              user="Sarah Chen"
              action="published"
              target="Feature Walkthrough"
              time="5 hours ago"
            />
            <ActivityItem
              user="AI Assistant"
              action="generated narration for"
              target="Onboarding Video"
              time="Yesterday"
              aiAction
            />
            <ActivityItem
              user="Michael Park"
              action="created"
              target="Training Manual"
              time="2 days ago"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

interface OverviewCardProps {
  label: string
  value: string
  icon: React.ReactNode
  active?: boolean
}

function OverviewCard({ label, value, icon, active }: OverviewCardProps) {
  return (
    <div className={`bg-white border rounded-lg p-5 transition-all ${
      active 
        ? "border-[#6C5DD3] shadow-[0_0_0_3px_rgba(143,140,255,0.1)]" 
        : "border-[#E8E8E6]"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-md ${active ? "bg-[#F5F4FF]" : "bg-[#F5F5F3]"}`}>
          <div className={active ? "text-[#6C5DD3]" : "text-[#52525B]"}>
            {icon}
          </div>
        </div>
      </div>
      <div className="text-[28px] font-semibold text-[#18181B] mb-1">{value}</div>
      <div className="text-[13px] text-[#71717A]">{label}</div>
    </div>
  )
}

interface ContinueWorkingCardProps {
  thumbnail: string
  type: string
  title: string
  lastEdited: string
  progress: number
  aiStatus: string
  collaborators: number
}

function ContinueWorkingCard({ thumbnail, type, title, lastEdited, progress, aiStatus, collaborators }: ContinueWorkingCardProps) {
  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
      <div className="aspect-video bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Play className="w-6 h-6 text-[#6C5DD3] ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#18181B] text-[11px] font-medium px-2.5 py-1 rounded-md">
          {type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[15px] text-[#18181B] mb-3 leading-snug">{title}</h3>
        
        <div className="flex items-center justify-between text-[12px] mb-2.5">
          <span className="text-[#71717A]">{lastEdited}</span>
          <span className="text-[#6C5DD3] font-medium">{progress}%</span>
        </div>
        
        <div className="w-full bg-[#F5F5F3] h-1.5 rounded-full overflow-hidden mb-4">
          <div 
            className="bg-[#6C5DD3] h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6C5DD3]" strokeWidth={1.5} />
            <span className="text-[12px] text-[#6C5DD3] font-medium">{aiStatus}</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(collaborators, 3) }).map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-[#E8E8E6] border-2 border-white -ml-1 first:ml-0" />
            ))}
          </div>
        </div>

        <button className="w-full mt-4 py-2 text-[13px] font-medium text-[#6C5DD3] bg-[#F5F4FF] rounded-md hover:bg-[#E4E1FF] transition-colors">
          Resume Editing
        </button>
      </div>
    </div>
  )
}

interface AIInsightCardProps {
  title: string
  description: string
  action: string
}

function AIInsightCard({ title, description, action }: AIInsightCardProps) {
  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-4 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="mb-3">
        <h3 className="font-medium text-[14px] text-[#18181B] mb-1">{title}</h3>
        <p className="text-[12px] text-[#71717A]">{description}</p>
      </div>
      <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        {action}
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </div>
  )
}

interface ViewTabProps {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

function ViewTab({ label, count, active, onClick }: ViewTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
        active
          ? "text-[#6C5DD3] border-[#6C5DD3]"
          : "text-[#71717A] border-transparent hover:text-[#18181B]"
      }`}
    >
      {label} <span className="text-[#A1A1AA] ml-1">({count})</span>
    </button>
  )
}

interface ProjectCardProps {
  thumbnail: string
  type: string
  title: string
  lastModified: string
  duration: string
  collaborators: number
  status: string
  progress: number
}

function ProjectCard({ thumbnail, type, title, lastModified, duration, collaborators, status, progress }: ProjectCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]",
    Review: "bg-[#F5F4FF] text-[#6C5DD3] border-[#E4E1FF]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions on Hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="p-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg hover:bg-white transition-colors">
          <MoreHorizontal className="w-4 h-4 text-[#52525B]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="aspect-video bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-[#6C5DD3] ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-[#18181B]/80 text-white text-[11px] font-medium px-2 py-1 rounded">
          {duration}
        </div>
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-[#52525B] text-[11px] font-medium px-2 py-1 rounded">
          {type}
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="font-medium text-[14px] text-[#18181B] mb-2.5 leading-snug">{title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] text-[#A1A1AA]">{lastModified}</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColors[status as keyof typeof statusColors]}`}>
            {status}
          </span>
        </div>

        {progress < 100 && (
          <div className="w-full bg-[#F5F5F3] h-1 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-[#6C5DD3] h-full rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(collaborators, 3) }).map((_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-[#E8E8E6] border-2 border-white -ml-1 first:ml-0" />
            ))}
          </div>
          <button className="text-[11px] text-[#6C5DD3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Open →
          </button>
        </div>
      </div>
    </div>
  )
}

interface TemplateCardProps {
  title: string
  image: string
}

function TemplateCard({ title, image }: TemplateCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#6C5DD3] hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="aspect-square bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="p-2">
        <div className="text-[11px] font-medium text-[#18181B] text-center">{title}</div>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  user: string
  action: string
  target: string
  time: string
  aiAction?: boolean
}

function ActivityItem({ user, action, target, time, aiAction }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
          aiAction ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F5F5F3] text-[#52525B]"
        }`}>
          {aiAction ? <Sparkles className="w-4 h-4" strokeWidth={1.5} /> : user.charAt(0)}
        </div>
        <div className="text-[13px]">
          <span className="font-medium text-[#18181B]">{user}</span>
          <span className="text-[#71717A]"> {action} </span>
          <span className="font-medium text-[#18181B]">{target}</span>
        </div>
      </div>
      <div className="text-[12px] text-[#A1A1AA]">{time}</div>
    </div>
  )
}
