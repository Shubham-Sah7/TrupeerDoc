"use client"

import { 
  Plus, FileText, Video, Upload, Play, Edit, 
  Share2, CheckCircle2, Eye, Clock, Sparkles,
  ArrowRight, MoreHorizontal, Filter, Search
} from "lucide-react"

export function DocumentsContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Create documentation in minutes
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed max-w-[600px]">
                Turn recordings, videos, and demos into clear step-by-step documentation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] hover:shadow-sm transition-all">
                <Sparkles className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Generate From Recording
              </button>
              <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
                <Plus className="w-4 h-4 inline mr-2" strokeWidth={2} />
                Create Document
              </button>
            </div>
          </div>
        </header>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Quick Start</h2>
          <div className="grid grid-cols-4 gap-4">
            <QuickStartCard
              icon={<FileText className="w-6 h-6" strokeWidth={1.5} />}
              title="Blank Document"
              description="Start from scratch"
            />
            <QuickStartCard
              icon={<Video className="w-6 h-6" strokeWidth={1.5} />}
              title="From Video"
              description="Generate from recording"
            />
            <QuickStartCard
              icon={<Upload className="w-6 h-6" strokeWidth={1.5} />}
              title="From Recording"
              description="Upload and convert"
            />
            <QuickStartCard
              icon={<FileText className="w-6 h-6" strokeWidth={1.5} />}
              title="Use Template"
              description="Start with a template"
            />
          </div>
        </section>

        {/* Continue Working */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Continue Working</h2>
          <div className="grid grid-cols-4 gap-4">
            <ContinueWorkingCard
              title="Product Onboarding Guide"
              type="Onboarding"
              lastUpdated="2 hours ago"
              status="Draft"
              readingTime="8 min"
              progress={65}
            />
            <ContinueWorkingCard
              title="API Integration Documentation"
              type="API Docs"
              lastUpdated="Yesterday"
              status="Review"
              readingTime="12 min"
              progress={90}
            />
            <ContinueWorkingCard
              title="Feature Walkthrough"
              type="Product Guide"
              lastUpdated="2 days ago"
              status="Draft"
              readingTime="6 min"
              progress={45}
            />
            <ContinueWorkingCard
              title="Customer Training Manual"
              type="Training"
              lastUpdated="3 days ago"
              status="Published"
              readingTime="15 min"
              progress={100}
            />
          </div>
        </section>

        {/* Templates */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Templates</h2>
          <div className="grid grid-cols-6 gap-3">
            <TemplateCard title="Product Guide" thumbnail="/images/template/template-1.png" />
            <TemplateCard title="SOP" thumbnail="/images/template/template-2.png" />
            <TemplateCard title="Onboarding Guide" thumbnail="/images/template/template-3.png" />
            <TemplateCard title="API Documentation" thumbnail="/images/template/template-4.png" />
            <TemplateCard title="Training Material" thumbnail="/images/template/template-5.png" />
            <TemplateCard title="Release Notes" thumbnail="/images/template/template-6.png" />
          </div>
        </section>

        {/* AI Generated Documents */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Generated Documents</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AIGeneratedCard
              title="Complete Setup Guide"
              source="Product Walkthrough Video"
              readingTime="10 min"
            />
            <AIGeneratedCard
              title="Feature Documentation"
              source="Screen Recording"
              readingTime="7 min"
            />
            <AIGeneratedCard
              title="Interactive Demo Guide"
              source="Product Demo"
              readingTime="5 min"
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
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all"
              />
            </div>
            <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] transition-all">
              <Filter className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </section>

        {/* AI Suggestions */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">AI Suggestions</h2>
          <div className="grid grid-cols-3 gap-4">
            <AISuggestionCard
              title="Generate document from latest recording"
              description="Product Demo (4:32)"
            />
            <AISuggestionCard
              title="Update outdated guide"
              description="API Documentation needs refresh"
            />
            <AISuggestionCard
              title="Create onboarding version"
              description="From Feature Walkthrough"
            />
          </div>
        </section>

        {/* Main Documents Section */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">All Documents</h2>
          <div className="grid grid-cols-4 gap-4">
            <DocumentCard
              title="Getting Started with Clueso"
              category="Product Guide"
              lastUpdated="2 days ago"
              owner="Sarah Chen"
              readingTime="8 min"
              status="Published"
            />
            <DocumentCard
              title="API Authentication Guide"
              category="API Docs"
              lastUpdated="5 days ago"
              owner="Michael Park"
              readingTime="12 min"
              status="Published"
            />
            <DocumentCard
              title="Customer Onboarding Checklist"
              category="Onboarding"
              lastUpdated="1 week ago"
              owner="John Smith"
              readingTime="6 min"
              status="Review"
            />
            <DocumentCard
              title="Feature Release Notes"
              category="Release Notes"
              lastUpdated="2 weeks ago"
              owner="Sarah Chen"
              readingTime="4 min"
              status="Published"
            />
            <DocumentCard
              title="Internal SOP Documentation"
              category="SOP"
              lastUpdated="3 days ago"
              owner="Alex Johnson"
              readingTime="10 min"
              status="Draft"
            />
            <DocumentCard
              title="Training Manual v2"
              category="Training"
              lastUpdated="1 week ago"
              owner="Michael Park"
              readingTime="15 min"
              status="Published"
            />
            <DocumentCard
              title="Help Center Article"
              category="Support"
              lastUpdated="4 days ago"
              owner="John Smith"
              readingTime="5 min"
              status="Draft"
            />
            <DocumentCard
              title="Product Walkthrough"
              category="Product Guide"
              lastUpdated="2 days ago"
              owner="Sarah Chen"
              readingTime="9 min"
              status="Review"
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Activity</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-lg divide-y divide-[#E8E8E6]">
            <ActivityItem
              action="published"
              target="API Authentication Guide"
              user="Michael Park"
              time="2 hours ago"
            />
            <ActivityItem
              action="updated"
              target="Product Onboarding Guide"
              user="Sarah Chen"
              time="5 hours ago"
            />
            <ActivityItem
              action="completed translation for"
              target="Customer Training Manual"
              user="AI Assistant"
              time="Yesterday"
            />
            <ActivityItem
              action="requested review on"
              target="Feature Walkthrough"
              user="John Smith"
              time="2 days ago"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface QuickStartCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function QuickStartCard({ icon, title, description }: QuickStartCardProps) {
  return (
    <button className="group flex flex-col items-center justify-center p-6 bg-white border border-[#E8E8E6] rounded-lg hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="p-3 bg-[#F5F5F3] rounded-lg mb-3 group-hover:bg-[#F5F4FF] transition-colors">
        <div className="text-[#52525B] group-hover:text-[#6C5DD3] transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-[14px] font-semibold text-[#18181B] mb-1">{title}</h3>
      <p className="text-[12px] text-[#71717A]">{description}</p>
    </button>
  )
}

interface ContinueWorkingCardProps {
  title: string
  type: string
  lastUpdated: string
  status: string
  readingTime: string
  progress: number
}

function ContinueWorkingCard({ title, type, lastUpdated, status, readingTime, progress }: ContinueWorkingCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]",
    Review: "bg-[#F5F4FF] text-[#6C5DD3] border-[#E4E1FF]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg p-4 hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] bg-[#F5F5F3] text-[#52525B] px-2 py-1 rounded font-medium">
          {type}
        </span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>
      
      <h3 className="font-medium text-[15px] text-[#18181B] mb-3 leading-snug">{title}</h3>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#71717A]">{lastUpdated}</span>
          <span className="text-[#A1A1AA]">{readingTime}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-[#71717A]">Progress</span>
          <span className="text-[#6C5DD3] font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-[#F5F5F3] h-1 rounded-full overflow-hidden">
          <div 
            className="bg-[#6C5DD3] h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button className="w-full py-1.5 text-[12px] font-medium text-[#6C5DD3] bg-[#F5F4FF] rounded hover:bg-[#E4E1FF] transition-colors opacity-0 group-hover:opacity-100">
        Continue Editing
      </button>
    </div>
  )
}

interface TemplateCardProps {
  title: string
  thumbnail: string
}

function TemplateCard({ title, thumbnail }: TemplateCardProps) {
  return (
    <button className="bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#6C5DD3] hover:shadow-sm hover:-translate-y-0.5 transition-all group">
      <div className="aspect-square bg-[#FAFAF9] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-3 bg-white">
        <div className="text-[12px] font-medium text-[#18181B] text-center">{title}</div>
      </div>
    </button>
  )
}

interface AIGeneratedCardProps {
  title: string
  source: string
  readingTime: string
}

function AIGeneratedCard({ title, source, readingTime }: AIGeneratedCardProps) {
  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-white rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-[#6C5DD3] font-medium mb-1">Generated from</div>
          <div className="text-[11px] text-[#71717A]">{source}</div>
        </div>
      </div>
      <h3 className="font-medium text-[15px] text-[#18181B] mb-3 leading-snug">{title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[12px] text-[#71717A]">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {readingTime}
        </div>
        <button className="text-[12px] font-medium text-[#6C5DD3] opacity-0 group-hover:opacity-100 transition-opacity">
          Open →
        </button>
      </div>
    </div>
  )
}

interface AISuggestionCardProps {
  title: string
  description: string
}

function AISuggestionCard({ title, description }: AISuggestionCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-[#F5F4FF] rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-medium text-[#18181B] mb-1">{title}</h3>
          <p className="text-[12px] text-[#71717A]">{description}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        Generate
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </div>
  )
}

interface DocumentCardProps {
  title: string
  category: string
  lastUpdated: string
  owner: string
  readingTime: string
  status: string
}

function DocumentCard({ title, category, lastUpdated, owner, readingTime, status }: DocumentCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]",
    Review: "bg-[#F5F4FF] text-[#6C5DD3] border-[#E4E1FF]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg p-4 hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] bg-[#F5F5F3] text-[#52525B] px-2 py-1 rounded font-medium">
          {category}
        </span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>

      <h3 className="font-medium text-[15px] text-[#18181B] mb-3 leading-snug">{title}</h3>

      <div className="space-y-1.5 text-[12px] mb-4">
        <div className="flex items-center justify-between text-[#71717A]">
          <span>By {owner}</span>
          <span className="text-[#A1A1AA]">{lastUpdated}</span>
        </div>
        <div className="flex items-center gap-1 text-[#71717A]">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {readingTime}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="flex-1 py-1.5 text-[11px] font-medium text-[#52525B] bg-[#F5F5F3] rounded hover:bg-[#ECECEA] transition-colors">
          <Edit className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
          Open
        </button>
        <button className="flex-1 py-1.5 text-[11px] font-medium text-[#52525B] bg-[#F5F5F3] rounded hover:bg-[#ECECEA] transition-colors">
          <Share2 className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
          Share
        </button>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  action: string
  target: string
  user: string
  time: string
}

function ActivityItem({ action, target, user, time }: ActivityItemProps) {
  const isAI = user === "AI Assistant"

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
          isAI ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F5F5F3] text-[#52525B]"
        }`}>
          {isAI ? <Sparkles className="w-4 h-4" strokeWidth={1.5} /> : user.charAt(0)}
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
