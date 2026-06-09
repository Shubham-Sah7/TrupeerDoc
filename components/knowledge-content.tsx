"use client"

import { useState } from "react"
import { 
  Plus, Upload, Search, Sparkles, ArrowRight, 
  BookOpen, FileText, HelpCircle, Zap, TrendingUp,
  Eye, Clock, Users, Globe, CheckCircle2, AlertCircle,
  Video, Presentation, MessageSquare, Share2, Edit,
  Copy, MoreHorizontal, Star, Brain, Network
} from "lucide-react"

export function KnowledgeContent() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Knowledge Base
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed max-w-[600px]">
                Turn videos, demos, and product knowledge into a living, searchable workspace.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] hover:shadow-sm transition-all">
                <Upload className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Import Docs
              </button>
              <button className="px-4 py-2.5 text-[13px] font-medium text-[#52525B] bg-white border border-[#E8E8E6] rounded-lg hover:border-[#D4D4D2] hover:shadow-sm transition-all">
                <Plus className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Create Article
              </button>
              <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
                <Sparkles className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                Generate With AI
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section - AI Knowledge Assistant */}
        <section className="mb-12">
          <div className="bg-white border border-[#E8E8E6] rounded-2xl p-10">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#F5F4FF] text-[#6C5DD3] px-4 py-2 rounded-full text-[13px] font-medium mb-4">
                <Brain className="w-4 h-4" strokeWidth={1.5} />
                Ask Your Workspace
              </div>
              <h2 className="text-[32px] font-serif text-[#18181B] mb-3 leading-tight">
                Search knowledge or ask AI anything
              </h2>
              <p className="text-[15px] text-[#71717A]">
                Get instant answers from your videos, demos, guides, and documentation
              </p>
            </div>

            {/* Large Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Ask anything about your content..."
                className="w-full pl-14 pr-14 py-4 text-[15px] bg-[#F5F5F3] border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:bg-white focus:border-[#6C5DD3] transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#6C5DD3] text-white rounded-lg hover:bg-[#5B4EC2] transition-colors">
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Example Queries */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[12px] text-[#A1A1AA]">Try:</span>
              <ExampleQuery text="How does onboarding work?" />
              <ExampleQuery text="Show API authentication guide" />
              <ExampleQuery text="Find sales demo documentation" />
            </div>
          </div>
        </section>

        {/* Knowledge Overview */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Knowledge Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            <OverviewCard
              icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
              label="Articles"
              count={124}
              growth="+12 this week"
            />
            <OverviewCard
              icon={<BookOpen className="w-5 h-5" strokeWidth={1.5} />}
              label="Guides"
              count={48}
              growth="+5 this week"
            />
            <OverviewCard
              icon={<HelpCircle className="w-5 h-5" strokeWidth={1.5} />}
              label="FAQs"
              count={86}
              growth="+8 this week"
            />
            <OverviewCard
              icon={<Sparkles className="w-5 h-5" strokeWidth={1.5} />}
              label="AI Generated"
              count={67}
              growth="+15 this week"
              active
            />
          </div>
        </section>

        {/* Smart Collections */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Smart Collections</h2>
          <div className="grid grid-cols-4 gap-3">
            <CollectionCard
              icon={<Clock className="w-4 h-4" strokeWidth={1.5} />}
              title="Recently Updated"
              count={24}
              active={activeCollection === "recent"}
              onClick={() => setActiveCollection("recent")}
            />
            <CollectionCard
              icon={<Eye className="w-4 h-4" strokeWidth={1.5} />}
              title="Most Viewed"
              count={18}
              active={activeCollection === "viewed"}
              onClick={() => setActiveCollection("viewed")}
            />
            <CollectionCard
              icon={<Sparkles className="w-4 h-4" strokeWidth={1.5} />}
              title="AI Generated"
              count={67}
              active={activeCollection === "ai"}
              onClick={() => setActiveCollection("ai")}
              highlight
            />
            <CollectionCard
              icon={<AlertCircle className="w-4 h-4" strokeWidth={1.5} />}
              title="Needs Review"
              count={8}
              active={activeCollection === "review"}
              onClick={() => setActiveCollection("review")}
            />
          </div>
        </section>

        {/* Auto Generated Knowledge */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">Auto Generated Knowledge</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AutoGeneratedCard
              source="Product Demo Video"
              title="Complete Product Walkthrough Guide"
              type="Documentation"
              generatedFrom="video"
              views={1243}
            />
            <AutoGeneratedCard
              source="Onboarding Demo"
              title="Step-by-Step Onboarding Instructions"
              type="Guide"
              generatedFrom="demo"
              views={856}
            />
            <AutoGeneratedCard
              source="Feature Recording"
              title="API Authentication FAQ"
              type="FAQ"
              generatedFrom="recording"
              views={2104}
            />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Zap className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Recommendations</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AIRecommendationCard
              title="Generate docs from Product Demo"
              description="Create comprehensive documentation"
              action="Generate"
            />
            <AIRecommendationCard
              title="Create FAQ from onboarding video"
              description="Extract common questions"
              action="Create"
            />
            <AIRecommendationCard
              title="Update outdated guide"
              description="API Guide needs refresh"
              action="Update"
            />
          </div>
        </section>

        {/* Topic Explorer */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Browse Topics</h2>
          <div className="grid grid-cols-5 gap-3">
            <TopicCard title="Product" count={45} />
            <TopicCard title="API" count={32} />
            <TopicCard title="Customer Support" count={28} />
            <TopicCard title="Onboarding" count={24} />
            <TopicCard title="Training" count={18} />
            <TopicCard title="Internal Processes" count={15} />
            <TopicCard title="Sales" count={12} />
            <TopicCard title="Marketing" count={10} />
            <TopicCard title="Design" count={8} />
            <TopicCard title="Engineering" count={22} />
          </div>
        </section>

        {/* Documentation Hub */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Documentation Hub</h2>
            <button className="text-[13px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
              View all articles
            </button>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <DocumentationCard
              title="Getting Started with Clueso"
              description="Learn the basics of creating videos, guides, and demos with AI assistance"
              category="Product"
              owner="Sarah Chen"
              lastUpdated="2 days ago"
              views={3421}
              status="Published"
              aiGenerated={false}
              language="English"
              readingTime="8 min"
            />
            <DocumentationCard
              title="API Authentication Guide"
              description="Complete guide to implementing OAuth 2.0 authentication in your application"
              category="API"
              owner="Michael Park"
              lastUpdated="5 days ago"
              views={2104}
              status="Published"
              aiGenerated={true}
              language="English, Spanish"
              readingTime="12 min"
            />
            <DocumentationCard
              title="Customer Onboarding Best Practices"
              description="Step-by-step guide to creating effective onboarding experiences"
              category="Customer Support"
              owner="John Smith"
              lastUpdated="1 week ago"
              views={1876}
              status="Review"
              aiGenerated={true}
              language="English"
              readingTime="10 min"
            />
          </div>
        </section>

        {/* Popular Knowledge */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Popular Knowledge</h2>
          <div className="grid grid-cols-4 gap-4">
            <PopularCard
              title="Product Demo Guide"
              views={5234}
              badge="Most Read"
            />
            <PopularCard
              title="API Quick Start"
              views={4102}
              badge="Most Shared"
            />
            <PopularCard
              title="Onboarding Checklist"
              views={3876}
              badge="Trending"
            />
            <PopularCard
              title="Feature Release Notes"
              views={2945}
              badge="Recently Published"
            />
          </div>
        </section>

        {/* Knowledge Graph */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Network className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">Knowledge Graph</h2>
          </div>
          <div className="bg-white border border-[#E8E8E6] rounded-lg p-6">
            <div className="grid grid-cols-3 gap-6">
              <KnowledgeConnection
                from="Product Demo Video"
                to="Documentation"
                type="Generated"
              />
              <KnowledgeConnection
                from="Onboarding Demo"
                to="FAQ"
                type="Related"
              />
              <KnowledgeConnection
                from="Feature Guide"
                to="Training Material"
                type="Referenced"
              />
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Activity</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-lg divide-y divide-[#E8E8E6]">
            <ActivityItem
              user="AI Assistant"
              action="generated new guide"
              target="API Authentication"
              time="1 hour ago"
              type="ai"
            />
            <ActivityItem
              user="Sarah Chen"
              action="published"
              target="Product Documentation"
              time="3 hours ago"
              type="publish"
            />
            <ActivityItem
              user="Michael Park"
              action="updated"
              target="Onboarding Guide"
              time="5 hours ago"
              type="edit"
            />
            <ActivityItem
              user="AI Assistant"
              action="completed translation for"
              target="Customer Support FAQ"
              time="Yesterday"
              type="ai"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface ExampleQueryProps {
  text: string
}

function ExampleQuery({ text }: ExampleQueryProps) {
  return (
    <button className="text-[12px] text-[#71717A] bg-white border border-[#E8E8E6] px-3 py-1.5 rounded-full hover:border-[#6C5DD3] hover:text-[#6C5DD3] transition-all">
      {text}
    </button>
  )
}

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
        <div className="text-[11px] text-[#71717A]">{count} articles</div>
      </div>
    </button>
  )
}

interface AutoGeneratedCardProps {
  source: string
  title: string
  type: string
  generatedFrom: "video" | "demo" | "recording"
  views: number
}

function AutoGeneratedCard({ source, title, type, generatedFrom, views }: AutoGeneratedCardProps) {
  const getIcon = () => {
    switch (generatedFrom) {
      case "video": return <Video className="w-4 h-4" strokeWidth={1.5} />
      case "demo": return <Presentation className="w-4 h-4" strokeWidth={1.5} />
      case "recording": return <Video className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-white rounded-md text-[#6C5DD3]">
          <Sparkles className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#6C5DD3] font-medium">Generated from</span>
            <div className="text-[#6C5DD3]">{getIcon()}</div>
          </div>
          <div className="text-[11px] text-[#71717A]">{source}</div>
        </div>
      </div>
      <h3 className="font-medium text-[15px] text-[#18181B] mb-2 leading-snug">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-[11px] bg-white text-[#52525B] px-2 py-1 rounded border border-[#E8E8E6]">
          {type}
        </span>
        <div className="flex items-center gap-1 text-[11px] text-[#71717A]">
          <Eye className="w-3 h-3" strokeWidth={1.5} />
          {views.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

interface AIRecommendationCardProps {
  title: string
  description: string
  action: string
}

function AIRecommendationCard({ title, description, action }: AIRecommendationCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-[#F5F4FF] rounded-md text-[#6C5DD3]">
          <Zap className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[14px] text-[#18181B] mb-1">{title}</h3>
          <p className="text-[12px] text-[#71717A]">{description}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6C5DD3] group-hover:gap-2 transition-all">
        {action}
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </div>
  )
}

interface TopicCardProps {
  title: string
  count: number
}

function TopicCard({ title, count }: TopicCardProps) {
  return (
    <button className="bg-white border border-[#E8E8E6] rounded-lg p-4 hover:border-[#6C5DD3] hover:shadow-sm hover:-translate-y-0.5 transition-all text-left group">
      <div className="font-medium text-[14px] text-[#18181B] mb-1 group-hover:text-[#6C5DD3] transition-colors">
        {title}
      </div>
      <div className="text-[12px] text-[#71717A]">{count} articles</div>
    </button>
  )
}

interface DocumentationCardProps {
  title: string
  description: string
  category: string
  owner: string
  lastUpdated: string
  views: number
  status: string
  aiGenerated: boolean
  language: string
  readingTime: string
}

function DocumentationCard({
  title, description, category, owner, lastUpdated,
  views, status, aiGenerated, language, readingTime
}: DocumentationCardProps) {
  const statusColors = {
    Published: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    Draft: "bg-[#F5F5F3] text-[#52525B] border-[#E8E8E6]",
    Review: "bg-[#F5F4FF] text-[#6C5DD3] border-[#E4E1FF]"
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <Star className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-start gap-2 mb-3">
        <span className="text-[11px] bg-[#F5F5F3] text-[#52525B] px-2 py-1 rounded font-medium">
          {category}
        </span>
        {aiGenerated && (
          <span className="text-[11px] bg-[#F5F4FF] text-[#6C5DD3] px-2 py-1 rounded font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" strokeWidth={1.5} />
            AI
          </span>
        )}
      </div>

      <h3 className="font-semibold text-[16px] text-[#18181B] mb-2 leading-snug">{title}</h3>
      <p className="text-[13px] text-[#71717A] leading-relaxed mb-4">{description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#71717A]">By {owner}</span>
          <span className="text-[#A1A1AA]">{lastUpdated}</span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-[#71717A]">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" strokeWidth={1.5} />
            {views.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" strokeWidth={1.5} />
            {language}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            {readingTime}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-medium px-2 py-1 rounded border ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
        <button className="text-[12px] text-[#6C5DD3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Open →
        </button>
      </div>
    </div>
  )
}

interface PopularCardProps {
  title: string
  views: number
  badge: string
}

function PopularCard({ title, views, badge }: PopularCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-4 hover:border-[#D4D4D2] hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-[14px] text-[#18181B] leading-snug flex-1">{title}</h3>
        <TrendingUp className="w-4 h-4 text-[#10B981] flex-shrink-0" strokeWidth={1.5} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] bg-[#F5F4FF] text-[#6C5DD3] px-2 py-1 rounded font-medium">
          {badge}
        </span>
        <div className="flex items-center gap-1 text-[11px] text-[#71717A]">
          <Eye className="w-3 h-3" strokeWidth={1.5} />
          {views.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

interface KnowledgeConnectionProps {
  from: string
  to: string
  type: string
}

function KnowledgeConnection({ from, to, type }: KnowledgeConnectionProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-[#F5F5F3] rounded-lg p-3">
        <div className="text-[12px] font-medium text-[#18181B]">{from}</div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ArrowRight className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        <span className="text-[10px] text-[#A1A1AA] font-medium">{type}</span>
      </div>
      <div className="flex-1 bg-[#F5F4FF] rounded-lg p-3 border border-[#E4E1FF]">
        <div className="text-[12px] font-medium text-[#18181B]">{to}</div>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  user: string
  action: string
  target: string
  time: string
  type: "ai" | "publish" | "edit"
}

function ActivityItem({ user, action, target, time, type }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case "ai": return <Sparkles className="w-4 h-4" strokeWidth={1.5} />
      case "publish": return <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
      case "edit": return <Edit className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  const isAI = type === "ai"

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
