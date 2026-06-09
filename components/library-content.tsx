"use client"

import { useState } from "react"
import { 
  Plus, Upload, Search, Filter, Play, MoreHorizontal, 
  Video, FileText, Presentation, Image, Sparkles, 
  TrendingUp, Clock, Eye, Users, Star, ArrowRight,
  CheckCircle2, AlertCircle, Globe, Download, Share2,
  Edit, Copy, Trash2, Pin, Heart, Zap, Languages
} from "lucide-react"

export function LibraryContent() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [activeCollection, setActiveCollection] = useState<string | null>(null)

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[42px] font-serif leading-none tracking-tight text-[#18181B] mb-2">
                Library
              </h1>
              <p className="text-[15px] text-[#71717A]">
                Manage videos, guides, demos, assets, and AI-generated content from one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] hover:shadow-sm transition-all">
                <Upload className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Import Content
              </button>
              <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
                <Plus className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                New Content
              </button>
            </div>
          </div>

          {/* Smart Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search videos, guides, demos, assets, or ask AI..."
              className="w-full pl-12 pr-20 py-3.5 text-[15px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all shadow-sm"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <kbd className="text-[11px] text-[#A1A1AA] font-mono bg-[#F5F5F3] px-2 py-1 rounded">⌘K</kbd>
              <button className="p-1.5 hover:bg-[#F5F5F3] rounded transition-colors">
                <Filter className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <section className="mb-10">
          <div className="grid grid-cols-5 gap-4">
            <OverviewCard
              icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
              label="Videos"
              count={24}
              growth="+3 this week"
            />
            <OverviewCard
              icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
              label="Documentation"
              count={18}
              growth="+5 this week"
            />
            <OverviewCard
              icon={<Presentation className="w-5 h-5" strokeWidth={1.5} />}
              label="Interactive Demos"
              count={12}
              growth="+2 this week"
            />
            <OverviewCard
              icon={<Image className="w-5 h-5" strokeWidth={1.5} />}
              label="Assets"
              count={156}
              growth="+12 this week"
            />
            <OverviewCard
              icon={<CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />}
              label="Published Content"
              count={32}
              growth="+4 this week"
              active
            />
          </div>
        </section>

        {/* Smart Collections */}
        <section className="mb-10">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Smart Collections</h2>
          <div className="grid grid-cols-4 gap-3">
            <CollectionCard
              icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
              title="Recently Created"
              count={8}
              active={activeCollection === "recent"}
              onClick={() => setActiveCollection("recent")}
            />
            <CollectionCard
              icon={<AlertCircle className="w-4 h-4" strokeWidth={1.5} />}
              title="Needs Review"
              count={5}
              active={activeCollection === "review"}
              onClick={() => setActiveCollection("review")}
            />
            <CollectionCard
              icon={<CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />}
              title="Ready To Publish"
              count={7}
              active={activeCollection === "ready"}
              onClick={() => setActiveCollection("ready")}
            />
            <CollectionCard
              icon={<Eye className="w-4 h-4" strokeWidth={1.5} />}
              title="Most Viewed"
              count={12}
              active={activeCollection === "viewed"}
              onClick={() => setActiveCollection("viewed")}
            />
            <CollectionCard
              icon={<Sparkles className="w-4 h-4" strokeWidth={1.5} />}
              title="AI Generated"
              count={15}
              active={activeCollection === "ai"}
              onClick={() => setActiveCollection("ai")}
              highlight
            />
            <CollectionCard
              icon={<Users className="w-4 h-4" strokeWidth={1.5} />}
              title="Team Shared"
              count={9}
              active={activeCollection === "shared"}
              onClick={() => setActiveCollection("shared")}
            />
            <CollectionCard
              icon={<Star className="w-4 h-4" strokeWidth={1.5} />}
              title="Favorites"
              count={6}
              active={activeCollection === "favorites"}
              onClick={() => setActiveCollection("favorites")}
            />
            <CollectionCard
              icon={<Pin className="w-4 h-4" strokeWidth={1.5} />}
              title="Pinned"
              count={4}
              active={activeCollection === "pinned"}
              onClick={() => setActiveCollection("pinned")}
            />
          </div>
        </section>

        {/* Continue Working */}
        <section className="mb-10">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Continue Working</h2>
          <div className="grid grid-cols-4 gap-4">
            <QuickAccessCard
              thumbnail="/images/screenshot-1.png"
              type="Video"
              title="Product Onboarding"
              lastEdited="2 hours ago"
              progress={65}
            />
            <QuickAccessCard
              thumbnail="/images/screenshot-2.png"
              type="Document"
              title="API Documentation"
              lastEdited="5 hours ago"
              progress={80}
            />
            <QuickAccessCard
              thumbnail="/images/screenshot-3.png"
              type="Demo"
              title="Feature Walkthrough"
              lastEdited="Yesterday"
              progress={45}
            />
            <QuickAccessCard
              thumbnail="/images/screenshot-4.png"
              type="Video"
              title="Customer Training"
              lastEdited="2 days ago"
              progress={90}
            />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Recommendations</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AIRecommendationCard
              title="Generate documentation for Product Demo"
              action="Generate"
            />
            <AIRecommendationCard
              title="Translate onboarding guide to Spanish"
              action="Translate"
            />
            <AIRecommendationCard
              title="Create interactive version of Feature Tour"
              action="Create"
            />
          </div>
        </section>

        {/* Main Library Navigation */}
        <section className="mb-8">
          <div className="flex items-center gap-2 border-b border-[#E8E8E6]">
            <LibraryTab label="All" count={210} active={activeTab === "all"} onClick={() => setActiveTab("all")} />
            <LibraryTab label="Videos" count={24} active={activeTab === "videos"} onClick={() => setActiveTab("videos")} />
            <LibraryTab label="Guides" count={18} active={activeTab === "guides"} onClick={() => setActiveTab("guides")} />
            <LibraryTab label="Documentation" count={32} active={activeTab === "documentation"} onClick={() => setActiveTab("documentation")} />
            <LibraryTab label="Demos" count={12} active={activeTab === "demos"} onClick={() => setActiveTab("demos")} />
            <LibraryTab label="Assets" count={156} active={activeTab === "assets"} onClick={() => setActiveTab("assets")} />
            <LibraryTab label="Templates" count={28} active={activeTab === "templates"} onClick={() => setActiveTab("templates")} />
            <LibraryTab label="Published" count={32} active={activeTab === "published"} onClick={() => setActiveTab("published")} />
          </div>
        </section>

        {/* Content Grid */}
        <section className="mb-10">
          <div className="grid grid-cols-4 gap-4">
            <ContentCard
              thumbnail="/images/screenshot-5.png"
              type="Video"
              title="Product Demo 2024"
              status="Published"
              lastEdited="2 days ago"
              owner="Sarah Chen"
              language="English"
              views={1243}
              duration="4:32"
              aiGenerated={false}
            />
            <ContentCard
              thumbnail="/images/screenshot-6.png"
              type="Document"
              title="Getting Started Guide"
              status="Draft"
              lastEdited="3 days ago"
              owner="Michael Park"
              language="English"
              views={856}
              duration="8 min read"
              aiGenerated={true}
            />
            <ContentCard
              thumbnail="/images/screenshot-7.png"
              type="Demo"
              title="Interactive Feature Tour"
              status="Review"
              lastEdited="5 days ago"
              owner="John Smith"
              language="English"
              views={2104}
              duration="3:15"
              aiGenerated={false}
            />
            <ContentCard
              thumbnail="/images/screenshot-8.png"
              type="Video"
              title="Customer Testimonial"
              status="Published"
              lastEdited="1 week ago"
              owner="Sarah Chen"
              language="English, Spanish"
              views={3421}
              duration="2:45"
              aiGenerated={false}
            />
            <ContentCard
              thumbnail="/images/screenshot-1.png"
              type="Document"
              title="API Reference"
              status="Draft"
              lastEdited="1 week ago"
              owner="Alex Johnson"
              language="English"
              views={645}
              duration="12 min read"
              aiGenerated={true}
            />
            <ContentCard
              thumbnail="/images/screenshot-2.png"
              type="Demo"
              title="Onboarding Walkthrough"
              status="Published"
              lastEdited="2 weeks ago"
              owner="Michael Park"
              language="English, French"
              views={1876}
              duration="5:20"
              aiGenerated={false}
            />
            <ContentCard
              thumbnail="/images/screenshot-3.png"
              type="Video"
              title="Feature Announcement"
              status="Review"
              lastEdited="2 weeks ago"
              owner="Sarah Chen"
              language="English"
              views={987}
              duration="3:50"
              aiGenerated={false}
            />
            <ContentCard
              thumbnail="/images/screenshot-4.png"
              type="Document"
              title="Training Manual"
              status="Draft"
              lastEdited="3 weeks ago"
              owner="John Smith"
              language="English"
              views={432}
              duration="15 min read"
              aiGenerated={true}
            />
          </div>
        </section>

        {/* Template Library */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Template Library</h2>
            <button className="text-[13px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
              Browse all templates
            </button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            <TemplateCard title="Product Demo" uses="2.4k" thumbnail="/images/template/template-1.png" />
            <TemplateCard title="Feature Walkthrough" uses="1.8k" thumbnail="/images/template/template-2.png" />
            <TemplateCard title="Employee Training" uses="1.5k" thumbnail="/images/template/template-3.png" />
            <TemplateCard title="Customer Onboarding" uses="1.2k" thumbnail="/images/template/template-4.png" />
            <TemplateCard title="API Guide" uses="980" thumbnail="/images/template/template-5.png" />
            <TemplateCard title="Release Notes" uses="756" thumbnail="/images/template/template-6.png" />
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Activity</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-lg divide-y divide-[#E8E8E6]">
            <ActivityItem
              user="Sarah Chen"
              action="published"
              target="API Guide"
              time="1 hour ago"
              type="publish"
            />
            <ActivityItem
              user="AI Assistant"
              action="completed translation for"
              target="Product Demo"
              time="3 hours ago"
              type="ai"
            />
            <ActivityItem
              user="Michael Park"
              action="shared"
              target="Feature Walkthrough"
              time="5 hours ago"
              type="share"
            />
            <ActivityItem
              user="John Smith"
              action="updated"
              target="Documentation"
              time="Yesterday"
              type="edit"
            />
            <ActivityItem
              user="AI Assistant"
              action="generated narration for"
              target="Onboarding Video"
              time="2 days ago"
              type="ai"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface OverviewCardProps {
  icon: React.ReactNode
  label: string
  count: number
  growth: string
  active?: boolean
}

function OverviewCard({ icon, label, count, growth, active }: OverviewCardProps) {
  return (
    <div className={`bg-white border rounded-lg p-5 transition-all ${
      active 
        ? "border-[#6C5DD3] shadow-[0_0_0_3px_rgba(143,140,255,0.1)]" 
        : "border-[#E8E8E6] hover:border-[#D4D4D2]"
    }`}>
      <div className={`p-2.5 rounded-lg inline-flex mb-3 ${active ? "bg-[#F5F4FF]" : "bg-[#F5F5F3]"}`}>
        <div className={active ? "text-[#6C5DD3]" : "text-[#52525B]"}>
          {icon}
        </div>
      </div>
      <div className="text-[28px] font-semibold text-[#18181B] mb-1">{count}</div>
      <div className="text-[13px] text-[#71717A] mb-1">{label}</div>
      <div className="text-[11px] text-[#10B981] font-medium">{growth}</div>
    </div>
  )
}

interface CollectionCardProps {
  icon: React.ReactNode
  title: string
  count: number
  active?: boolean
  onClick?: () => void
  highlight?: boolean
}

function CollectionCard({ icon, title, count, active, onClick, highlight }: CollectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
        active
          ? "bg-[#F5F4FF] border-[#6C5DD3] shadow-sm"
          : highlight
          ? "bg-[#F5F4FF] border-[#E4E1FF] hover:border-[#6C5DD3]"
          : "bg-white border-[#E8E8E6] hover:border-[#D4D4D2]"
      }`}
    >
      <div className={`p-2 rounded-md ${active || highlight ? "bg-white" : "bg-[#F5F5F3]"}`}>
        <div className={active || highlight ? "text-[#6C5DD3]" : "text-[#52525B]"}>
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-[#18181B] mb-0.5">{title}</div>
        <div className="text-[11px] text-[#71717A]">{count} items</div>
      </div>
    </button>
  )
}

interface QuickAccessCardProps {
  thumbnail: string
  type: string
  title: string
  lastEdited: string
  progress: number
}

function QuickAccessCard({ thumbnail, type, title, lastEdited, progress }: QuickAccessCardProps) {
  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
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
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-[#52525B] text-[11px] font-medium px-2 py-1 rounded">
          {type}
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-medium text-[14px] text-[#18181B] mb-2 leading-snug">{title}</h3>
        <div className="text-[11px] text-[#A1A1AA] mb-2">{lastEdited}</div>
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
    </div>
  )
}

interface AIRecommendationCardProps {
  title: string
  action: string
}

function AIRecommendationCard({ title, action }: AIRecommendationCardProps) {
  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-4 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-white rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <p className="text-[13px] text-[#18181B] leading-relaxed flex-1">{title}</p>
      </div>
      <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        {action}
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </div>
  )
}

interface LibraryTabProps {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

function LibraryTab({ label, count, active, onClick }: LibraryTabProps) {
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

interface ContentCardProps {
  thumbnail: string
  type: string
  title: string
  status: string
  lastEdited: string
  owner: string
  language: string
  views: number
  duration: string
  aiGenerated: boolean
}

function ContentCard({ 
  thumbnail, type, title, status, lastEdited, 
  owner, language, views, duration, aiGenerated 
}: ContentCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]",
    Review: "bg-[#F5F4FF] text-[#6C5DD3] border-[#E4E1FF]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <Heart className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
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
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="bg-white/95 backdrop-blur-sm text-[#52525B] text-[11px] font-medium px-2 py-1 rounded">
            {type}
          </span>
          {aiGenerated && (
            <span className="bg-[#F5F4FF]/95 backdrop-blur-sm text-[#6C5DD3] text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              AI
            </span>
          )}
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="font-medium text-[14px] text-[#18181B] mb-2.5 leading-snug">{title}</h3>
        
        <div className="flex items-center justify-between mb-2.5">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColors[status as keyof typeof statusColors]}`}>
            {status}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA]">
            <Eye className="w-3 h-3" strokeWidth={1.5} />
            {views.toLocaleString()}
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] text-[#71717A]">
          <div className="flex items-center justify-between">
            <span>By {owner}</span>
            <span>{lastEdited}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" strokeWidth={1.5} />
            {language}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TemplateCardProps {
  title: string
  uses: string
  thumbnail: string
}

function TemplateCard({ title, uses, thumbnail }: TemplateCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#6C5DD3] hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="aspect-square bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="text-[12px] font-medium text-[#18181B] mb-0.5">{title}</div>
        <div className="text-[11px] text-[#A1A1AA]">{uses} uses</div>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  user: string
  action: string
  target: string
  time: string
  type: "publish" | "ai" | "share" | "edit"
}

function ActivityItem({ user, action, target, time, type }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case "publish": return <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
      case "ai": return <Sparkles className="w-4 h-4" strokeWidth={1.5} />
      case "share": return <Share2 className="w-4 h-4" strokeWidth={1.5} />
      case "edit": return <Edit className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  const isAI = type === "ai"

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
          isAI ? "bg-[#F5F4FF] text-[#6C5DD3]" : "bg-[#F5F5F3] text-[#52525B]"
        }`}>
          {getIcon()}
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
