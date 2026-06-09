"use client"

import { 
  Plus, Video, FileText, FolderOpen, Play, 
  Edit, Share2, CheckCircle2, Eye, Clock, 
  TrendingUp, Sparkles, ArrowRight, MoreHorizontal
} from "lucide-react"

export function DemosContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Create interactive demos
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed">
                Convert recordings and guides into engaging product walkthroughs.
              </p>
            </div>
            <button className="px-5 py-3 text-[14px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
              <Plus className="w-4 h-4 inline mr-2" strokeWidth={2} />
              Create Demo
            </button>
          </div>
        </header>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Quick Start</h2>
          <div className="grid grid-cols-3 gap-5">
            <QuickStartCard
              icon={<Video className="w-6 h-6" strokeWidth={1.5} />}
              title="From Video"
              description="Turn recordings into demos"
            />
            <QuickStartCard
              icon={<FileText className="w-6 h-6" strokeWidth={1.5} />}
              title="From Documentation"
              description="Convert guides to interactive"
            />
            <QuickStartCard
              icon={<FolderOpen className="w-6 h-6" strokeWidth={1.5} />}
              title="From Existing Project"
              description="Build on previous work"
            />
          </div>
        </section>

        {/* Demo Templates */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Demo Templates</h2>
          <div className="grid grid-cols-3 gap-4">
            <TemplateCard
              title="Product Tour"
              description="Showcase key features"
              uses="2.4k"
              thumbnail="/images/template/template-1.png"
            />
            <TemplateCard
              title="Customer Onboarding"
              description="Guide new users"
              uses="1.8k"
              thumbnail="/images/template/template-2.png"
            />
            <TemplateCard
              title="Feature Walkthrough"
              description="Explain new features"
              uses="1.5k"
              thumbnail="/images/template/template-3.png"
            />
            <TemplateCard
              title="Sales Demo"
              description="Convert prospects"
              uses="1.2k"
              thumbnail="/images/template/template-4.png"
            />
            <TemplateCard
              title="Employee Training"
              description="Train your team"
              uses="980"
              thumbnail="/images/template/template-5.png"
            />
            <TemplateCard
              title="Help Center Walkthrough"
              description="Self-service support"
              uses="756"
              thumbnail="/images/template/template-6.png"
            />
          </div>
        </section>

        {/* Demo Analytics */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Demo Analytics</h2>
          <div className="grid grid-cols-3 gap-4">
            <AnalyticsCard
              icon={<Eye className="w-5 h-5" strokeWidth={1.5} />}
              label="Total Views"
              value="12,453"
              change="+18% this week"
            />
            <AnalyticsCard
              icon={<TrendingUp className="w-5 h-5" strokeWidth={1.5} />}
              label="Completion Rate"
              value="78%"
              change="+5% this week"
            />
            <AnalyticsCard
              icon={<Clock className="w-5 h-5" strokeWidth={1.5} />}
              label="Avg Watch Time"
              value="3:24"
              change="+12s this week"
            />
          </div>
        </section>

        {/* AI Suggestions */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Suggestions</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AISuggestionCard
              title="Convert Product Walkthrough into Demo"
              source="From recent recording"
            />
            <AISuggestionCard
              title="Create Interactive Onboarding"
              source="From documentation"
            />
            <AISuggestionCard
              title="Build Sales Demo"
              source="From feature guide"
            />
          </div>
        </section>

        {/* Recent Demos */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Demos</h2>
          <div className="grid grid-cols-4 gap-4">
            <DemoCard
              title="Product Onboarding Flow"
              status="Published"
              views={2104}
              lastEdited="2 days ago"
              thumbnail="/images/screenshot-1.png"
            />
            <DemoCard
              title="Feature Tour 2024"
              status="Draft"
              views={0}
              lastEdited="5 hours ago"
              thumbnail="/images/screenshot-2.png"
            />
            <DemoCard
              title="API Integration Guide"
              status="Published"
              views={1543}
              lastEdited="1 week ago"
              thumbnail="/images/screenshot-3.png"
            />
            <DemoCard
              title="Customer Success Demo"
              status="Published"
              views={3421}
              lastEdited="2 weeks ago"
              thumbnail="/images/screenshot-4.png"
            />
            <DemoCard
              title="Sales Presentation"
              status="Draft"
              views={0}
              lastEdited="Yesterday"
              thumbnail="/images/screenshot-5.png"
            />
            <DemoCard
              title="Training Walkthrough"
              status="Published"
              views={876}
              lastEdited="3 days ago"
              thumbnail="/images/screenshot-6.png"
            />
            <DemoCard
              title="Help Center Tour"
              status="Published"
              views={1234}
              lastEdited="1 week ago"
              thumbnail="/images/screenshot-7.png"
            />
            <DemoCard
              title="Mobile App Demo"
              status="Draft"
              views={0}
              lastEdited="4 days ago"
              thumbnail="/images/screenshot-8.png"
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
    <button className="group flex items-start gap-4 p-6 bg-white border border-[#E8E8E6] rounded-xl hover:border-[#6C5DD3] hover:shadow-lg hover:-translate-y-1 transition-all text-left">
      <div className="p-3 bg-[#F5F5F3] rounded-lg group-hover:bg-[#F5F4FF] transition-colors">
        <div className="text-[#52525B] group-hover:text-[#6C5DD3] transition-colors">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-[#18181B] mb-1">{title}</h3>
        <p className="text-[13px] text-[#71717A]">{description}</p>
      </div>
    </button>
  )
}

interface TemplateCardProps {
  title: string
  description: string
  uses: string
  thumbnail: string
}

function TemplateCard({ title, description, uses, thumbnail }: TemplateCardProps) {
  return (
    <button className="group bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all text-left">
      <div className="aspect-video bg-[#F5F5F3] rounded-lg mb-4 relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-[#6C5DD3] ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <h3 className="text-[15px] font-semibold text-[#18181B] mb-1">{title}</h3>
      <p className="text-[13px] text-[#71717A] mb-3">{description}</p>
      <div className="text-[12px] text-[#A1A1AA]">{uses} uses</div>
    </button>
  )
}

interface AnalyticsCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change: string
}

function AnalyticsCard({ icon, label, value, change }: AnalyticsCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5">
      <div className="p-2.5 bg-[#F5F5F3] rounded-lg inline-flex mb-3">
        <div className="text-[#52525B]">
          {icon}
        </div>
      </div>
      <div className="text-[28px] font-semibold text-[#18181B] mb-1">{value}</div>
      <div className="text-[13px] text-[#71717A] mb-1">{label}</div>
      <div className="text-[11px] text-[#10B981] font-medium">{change}</div>
    </div>
  )
}

interface AISuggestionCardProps {
  title: string
  source: string
}

function AISuggestionCard({ title, source }: AISuggestionCardProps) {
  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-white rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-medium text-[#18181B] mb-1 leading-snug">{title}</h3>
          <p className="text-[12px] text-[#71717A]">{source}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        Create Demo
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </div>
  )
}

interface DemoCardProps {
  title: string
  status: "Published" | "Draft"
  views: number
  lastEdited: string
  thumbnail: string
}

function DemoCard({ title, status, views, lastEdited, thumbnail }: DemoCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-[#6C5DD3] ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-[14px] text-[#18181B] mb-3 leading-snug">{title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColors[status]}`}>
            {status}
          </span>
          {status === "Published" && (
            <div className="flex items-center gap-1 text-[11px] text-[#71717A]">
              <Eye className="w-3 h-3" strokeWidth={1.5} />
              {views.toLocaleString()}
            </div>
          )}
        </div>

        <div className="text-[11px] text-[#A1A1AA] mb-3">{lastEdited}</div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex-1 py-1.5 text-[11px] font-medium text-[#52525B] bg-[#F5F5F3] rounded hover:bg-[#ECECEA] transition-colors">
            <Edit className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
            Edit
          </button>
          <button className="flex-1 py-1.5 text-[11px] font-medium text-[#52525B] bg-[#F5F5F3] rounded hover:bg-[#ECECEA] transition-colors">
            <Share2 className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
            Share
          </button>
          {status === "Draft" && (
            <button className="flex-1 py-1.5 text-[11px] font-medium text-white bg-[#6C5DD3] rounded hover:bg-[#5B4EC2] transition-colors">
              <CheckCircle2 className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
