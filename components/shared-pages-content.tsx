"use client"

import { 
  Share2, Eye, ExternalLink, Link2, Copy,
  BarChart3, TrendingUp, Lock, Globe,
  FileText, Video, BookOpen, GraduationCap,
  MoreHorizontal, Edit, Sparkles
} from "lucide-react"

export function SharedPagesContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Share knowledge effortlessly
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed max-w-[600px]">
                Manage every published page, guide, demo, and document from one place.
              </p>
            </div>
            <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#D85BD6] rounded-lg hover:bg-[#C84AC7] hover:shadow-lg transition-all">
              <Share2 className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
              Create Shared Page
            </button>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-4 gap-4">
            <MetricCard
              icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
              label="Published Pages"
              value="48"
            />
            <MetricCard
              icon={<Eye className="w-5 h-5" strokeWidth={1.5} />}
              label="Total Views"
              value="12.4K"
            />
            <MetricCard
              icon={<BookOpen className="w-5 h-5" strokeWidth={1.5} />}
              label="Shared Guides"
              value="32"
            />
            <MetricCard
              icon={<Video className="w-5 h-5" strokeWidth={1.5} />}
              label="Interactive Demos"
              value="16"
            />
          </div>
        </section>

        {/* Analytics */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Analytics</h2>
            <button className="text-[13px] text-[#71717A] hover:text-[#18181B] transition-colors">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AnalyticsCard
              title="Top Performing Content"
              items={[
                { name: "Product Onboarding Guide", views: "2.4K" },
                { name: "API Documentation", views: "1.8K" },
                { name: "Feature Walkthrough Demo", views: "1.2K" }
              ]}
            />
            <AnalyticsCard
              title="Recent Activity"
              items={[
                { name: "Customer Training Guide", views: "342" },
                { name: "Sales Demo", views: "289" },
                { name: "Help Center Article", views: "156" }
              ]}
            />
            <div className="bg-white border border-[#E8E8E6] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#D85BD6]" strokeWidth={1.5} />
                <h3 className="text-[14px] font-medium text-[#18181B]">Completion Rate</h3>
              </div>
              <div className="text-[32px] font-semibold text-[#18181B] mb-2">78%</div>
              <p className="text-[12px] text-[#71717A]">Average across all shared content</p>
            </div>
          </div>
        </section>

        {/* Sharing Controls */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Sharing Controls</h2>
          <div className="grid grid-cols-3 gap-4">
            <SharingControlCard
              icon={<Globe className="w-5 h-5" strokeWidth={1.5} />}
              title="Public Access"
              description="Anyone with the link can view"
              count={32}
            />
            <SharingControlCard
              icon={<Lock className="w-5 h-5" strokeWidth={1.5} />}
              title="Password Protected"
              description="Requires password to access"
              count={12}
            />
            <SharingControlCard
              icon={<FileText className="w-5 h-5" strokeWidth={1.5} />}
              title="Team Only"
              description="Only team members can view"
              count={4}
            />
          </div>
        </section>

        {/* Main Content */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Shared Pages</h2>
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 text-[13px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D85BD6] focus:border-transparent">
                <option>All Types</option>
                <option>Guides</option>
                <option>Demos</option>
                <option>Documentation</option>
                <option>Training</option>
              </select>
              <select className="px-3 py-1.5 text-[13px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D85BD6] focus:border-transparent">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <SharedPageCard
              type="Guide"
              title="Product Onboarding Guide"
              views="2.4K"
              lastUpdated="2 hours ago"
              status="Published"
              access="Public"
            />
            <SharedPageCard
              type="Demo"
              title="Feature Walkthrough Demo"
              views="1.2K"
              lastUpdated="5 hours ago"
              status="Published"
              access="Public"
            />
            <SharedPageCard
              type="Documentation"
              title="API Documentation"
              views="1.8K"
              lastUpdated="Yesterday"
              status="Published"
              access="Password"
            />
            <SharedPageCard
              type="Training"
              title="Customer Training Guide"
              views="342"
              lastUpdated="2 days ago"
              status="Published"
              access="Public"
            />
            <SharedPageCard
              type="Guide"
              title="Sales Demo Playbook"
              views="289"
              lastUpdated="3 days ago"
              status="Published"
              access="Team"
            />
            <SharedPageCard
              type="Documentation"
              title="Help Center Article"
              views="156"
              lastUpdated="1 week ago"
              status="Published"
              access="Public"
            />
            <SharedPageCard
              type="Demo"
              title="Product Tour"
              views="892"
              lastUpdated="1 week ago"
              status="Published"
              access="Public"
            />
            <SharedPageCard
              type="Guide"
              title="Employee Onboarding"
              views="124"
              lastUpdated="2 weeks ago"
              status="Published"
              access="Team"
            />
            <SharedPageCard
              type="Training"
              title="Advanced Features Training"
              views="67"
              lastUpdated="3 weeks ago"
              status="Draft"
              access="Team"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-[#71717A]">{icon}</div>
        <div className="text-[13px] text-[#71717A]">{label}</div>
      </div>
      <div className="text-[28px] font-semibold text-[#18181B]">{value}</div>
    </div>
  )
}

interface AnalyticsCardProps {
  title: string
  items: Array<{ name: string; views: string }>
}

function AnalyticsCard({ title, items }: AnalyticsCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5">
      <h3 className="text-[14px] font-medium text-[#18181B] mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-[13px] text-[#52525B] flex-1 truncate">{item.name}</div>
            <div className="text-[12px] text-[#71717A] ml-2">{item.views}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SharingControlCardProps {
  icon: React.ReactNode
  title: string
  description: string
  count: number
}

function SharingControlCard({ icon, title, description, count }: SharingControlCardProps) {
  return (
    <button className="bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#D4D4D2] hover:shadow-sm hover:-translate-y-0.5 transition-all text-left">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-[#F5F5F3] rounded-lg text-[#52525B]">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[14px] font-medium text-[#18181B] mb-1">{title}</h3>
          <p className="text-[12px] text-[#71717A]">{description}</p>
        </div>
      </div>
      <div className="text-[12px] text-[#71717A]">{count} pages</div>
    </button>
  )
}

interface SharedPageCardProps {
  type: string
  title: string
  views: string
  lastUpdated: string
  status: string
  access: string
}

function SharedPageCard({ type, title, views, lastUpdated, status, access }: SharedPageCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "Guide":
        return <BookOpen className="w-4 h-4" strokeWidth={1.5} />
      case "Demo":
        return <Video className="w-4 h-4" strokeWidth={1.5} />
      case "Documentation":
        return <FileText className="w-4 h-4" strokeWidth={1.5} />
      case "Training":
        return <GraduationCap className="w-4 h-4" strokeWidth={1.5} />
      default:
        return <FileText className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  const getAccessIcon = () => {
    switch (access) {
      case "Public":
        return <Globe className="w-3 h-3" strokeWidth={1.5} />
      case "Password":
        return <Lock className="w-3 h-3" strokeWidth={1.5} />
      case "Team":
        return <FileText className="w-3 h-3" strokeWidth={1.5} />
      default:
        return <Globe className="w-3 h-3" strokeWidth={1.5} />
    }
  }

  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative">
      {/* Quick Actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors" title="Open">
          <ExternalLink className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors" title="Edit">
          <Edit className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors" title="Share">
          <Share2 className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
        <button className="p-1.5 bg-white/95 backdrop-blur-sm rounded shadow-lg hover:bg-white transition-colors" title="Copy Link">
          <Link2 className="w-3.5 h-3.5 text-[#52525B]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video bg-[#F5F5F3] flex items-center justify-center">
        <div className="text-[#A1A1AA]">
          {getTypeIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-[11px] font-medium text-[#52525B] bg-[#F5F5F3] rounded">
            {type}
          </span>
          <span className={`px-2 py-0.5 text-[11px] font-medium rounded ${
            status === "Published" 
              ? "text-[#059669] bg-[#D1FAE5]" 
              : "text-[#71717A] bg-[#F5F5F3]"
          }`}>
            {status}
          </span>
        </div>

        <h3 className="text-[15px] font-medium text-[#18181B] mb-3 leading-snug">
          {title}
        </h3>

        <div className="flex items-center justify-between text-[12px] text-[#71717A] mb-2">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{views} views</span>
          </div>
          <div className="flex items-center gap-1">
            {getAccessIcon()}
            <span>{access}</span>
          </div>
        </div>

        <div className="text-[11px] text-[#A1A1AA]">
          Updated {lastUpdated}
        </div>
      </div>
    </div>
  )
}
