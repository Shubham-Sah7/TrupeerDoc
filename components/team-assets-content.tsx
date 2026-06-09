"use client"

import { 
  Upload, Image, Video, Monitor, Volume2, 
  Sparkles, Search, Eye, Download, Link2, 
  Plus, FileText, MoreHorizontal
} from "lucide-react"

export function TeamAssetsContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-16 py-10">
        
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Assets your team can reuse
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed max-w-[600px]">
                Store and organize screenshots, videos, logos, voiceovers, templates, and media files.
              </p>
            </div>
            <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
              <Upload className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
              Upload Asset
            </button>
          </div>
        </header>

        {/* Asset Categories */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Asset Categories</h2>
          <div className="grid grid-cols-6 gap-4">
            <CategoryCard
              icon={<Image className="w-6 h-6" strokeWidth={1.5} />}
              title="Images"
              count={124}
            />
            <CategoryCard
              icon={<Video className="w-6 h-6" strokeWidth={1.5} />}
              title="Videos"
              count={48}
            />
            <CategoryCard
              icon={<Monitor className="w-6 h-6" strokeWidth={1.5} />}
              title="Screenshots"
              count={86}
            />
            <CategoryCard
              icon={<Volume2 className="w-6 h-6" strokeWidth={1.5} />}
              title="Voiceovers"
              count={32}
            />
            <CategoryCard
              icon={<Sparkles className="w-6 h-6" strokeWidth={1.5} />}
              title="Icons"
              count={156}
            />
            <CategoryCard
              icon={<FileText className="w-6 h-6" strokeWidth={1.5} />}
              title="Templates"
              count={24}
            />
          </div>
        </section>

        {/* Search */}
        <section className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-12 pr-4 py-3 text-[14px] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all"
            />
          </div>
        </section>

        {/* Team Collections */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Team Collections</h2>
          <div className="grid grid-cols-5 gap-4">
            <CollectionCard title="Product Screenshots" count={45} thumbnail="/images/screenshot-1.png" />
            <CollectionCard title="Marketing Assets" count={32} thumbnail="/images/screenshot-2.png" />
            <CollectionCard title="Brand Resources" count={28} thumbnail="/images/screenshot-3.png" />
            <CollectionCard title="Training Material" count={18} thumbnail="/images/screenshot-4.png" />
            <CollectionCard title="Customer Success" count={24} thumbnail="/images/screenshot-5.png" />
          </div>
        </section>

        {/* AI Suggestions */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-5 h-5 text-[#6C5DD3]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-semibold text-[#18181B]">AI Suggestions</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SuggestionCard
              title="Frequently Used"
              description="Assets used across multiple projects"
              count={12}
            />
            <SuggestionCard
              title="Recently Referenced"
              description="Assets added to projects this week"
              count={8}
            />
            <SuggestionCard
              title="Popular This Month"
              description="Most downloaded by your team"
              count={15}
            />
          </div>
        </section>

        {/* Recent Assets */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Recent Assets</h2>
          <div className="grid grid-cols-5 gap-4">
            <AssetCard
              type="Image"
              name="Product Hero"
              uploadedBy="Sarah Chen"
              dateAdded="2 hours ago"
              thumbnail="/images/screenshot-1.png"
            />
            <AssetCard
              type="Video"
              name="Demo Recording"
              uploadedBy="Michael Park"
              dateAdded="5 hours ago"
              thumbnail="/images/screenshot-2.png"
            />
            <AssetCard
              type="Screenshot"
              name="Dashboard View"
              uploadedBy="John Smith"
              dateAdded="Yesterday"
              thumbnail="/images/screenshot-3.png"
            />
            <AssetCard
              type="Voiceover"
              name="Intro Narration"
              uploadedBy="Sarah Chen"
              dateAdded="2 days ago"
              thumbnail="/images/screenshot-4.png"
            />
            <AssetCard
              type="Icon"
              name="Feature Icons"
              uploadedBy="Alex Johnson"
              dateAdded="3 days ago"
              thumbnail="/images/screenshot-5.png"
            />
            <AssetCard
              type="Image"
              name="Brand Logo"
              uploadedBy="Michael Park"
              dateAdded="1 week ago"
              thumbnail="/images/screenshot-6.png"
            />
            <AssetCard
              type="Template"
              name="Email Template"
              uploadedBy="John Smith"
              dateAdded="1 week ago"
              thumbnail="/images/template/template-1.png"
            />
            <AssetCard
              type="Screenshot"
              name="Mobile App"
              uploadedBy="Sarah Chen"
              dateAdded="2 weeks ago"
              thumbnail="/images/screenshot-7.png"
            />
            <AssetCard
              type="Video"
              name="Tutorial Video"
              uploadedBy="Michael Park"
              dateAdded="2 weeks ago"
              thumbnail="/images/screenshot-8.png"
            />
            <AssetCard
              type="Image"
              name="Background"
              uploadedBy="Alex Johnson"
              dateAdded="3 weeks ago"
              thumbnail="/images/screenshot-1.png"
            />
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  count: number
}

function CategoryCard({ icon, title, count }: CategoryCardProps) {
  return (
    <button className="group bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="p-3 bg-[#F5F5F3] rounded-lg inline-flex mb-3 group-hover:bg-[#F5F4FF] transition-colors">
        <div className="text-[#52525B] group-hover:text-[#6C5DD3] transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-[15px] font-semibold text-[#18181B] mb-1">{title}</div>
      <div className="text-[12px] text-[#71717A]">{count} assets</div>
    </button>
  )
}

interface CollectionCardProps {
  title: string
  count: number
  thumbnail: string
}

function CollectionCard({ title, count, thumbnail }: CollectionCardProps) {
  return (
    <button className="bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-sm hover:-translate-y-0.5 transition-all text-left">
      <div className="aspect-video bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="font-medium text-[14px] text-[#18181B] mb-1">{title}</div>
        <div className="text-[12px] text-[#71717A]">{count} items</div>
      </div>
    </button>
  )
}

interface SuggestionCardProps {
  title: string
  description: string
  count: number
}

function SuggestionCard({ title, description, count }: SuggestionCardProps) {
  return (
    <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-lg p-5 hover:border-[#6C5DD3] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-white rounded-md">
          <Sparkles className="w-4 h-4 text-[#6C5DD3]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-semibold text-[#18181B] mb-1">{title}</h3>
          <p className="text-[12px] text-[#71717A]">{description}</p>
        </div>
      </div>
      <div className="text-[12px] text-[#6C5DD3] font-medium">{count} assets</div>
    </div>
  )
}

interface AssetCardProps {
  type: string
  name: string
  uploadedBy: string
  dateAdded: string
  thumbnail: string
}

function AssetCard({ type, name, uploadedBy, dateAdded, thumbnail }: AssetCardProps) {
  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
      {/* Preview */}
      <div className="aspect-video bg-[#F5F5F3] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Quick Actions on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="p-2 bg-white rounded-lg hover:bg-[#F5F5F3] transition-colors">
            <Eye className="w-4 h-4 text-[#18181B]" strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-white rounded-lg hover:bg-[#F5F5F3] transition-colors">
            <Download className="w-4 h-4 text-[#18181B]" strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-white rounded-lg hover:bg-[#F5F5F3] transition-colors">
            <Link2 className="w-4 h-4 text-[#18181B]" strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-white rounded-lg hover:bg-[#F5F5F3] transition-colors">
            <Plus className="w-4 h-4 text-[#18181B]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-[#18181B] truncate mb-1">{name}</div>
            <div className="text-[11px] text-[#71717A]">{type}</div>
          </div>
          <button className="p-1 hover:bg-[#F5F5F3] rounded transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[#A1A1AA]" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#A1A1AA]">
          <span>{uploadedBy}</span>
          <span>{dateAdded}</span>
        </div>
      </div>
    </div>
  )
}

