"use client"

import { 
  Upload, Image, Type, Palette, Volume2, 
  CheckCircle2, Plus, Edit
} from "lucide-react"

export function BrandKitContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-16 py-10">
        
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[48px] font-serif leading-none tracking-tight text-[#18181B] mb-3">
                Keep every asset on brand
              </h1>
              <p className="text-[16px] text-[#71717A] leading-relaxed max-w-[600px]">
                Manage logos, colors, fonts, voiceovers, and brand guidelines in one place.
              </p>
            </div>
            <button className="px-4 py-2.5 text-[13px] font-medium text-white bg-[#6C5DD3] rounded-lg hover:bg-[#5B4EC2] hover:shadow-lg transition-all">
              <Upload className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
              Upload Brand Assets
            </button>
          </div>
        </header>

        {/* Brand Overview */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Brand Overview</h2>
          <div className="grid grid-cols-5 gap-4">
            <BrandOverviewCard
              label="Logo"
              value="Uploaded"
              preview={
                <div className="w-full h-16 flex items-center justify-center">
                  <img src="/images/trupeer.jpeg" alt="Trupeer Logo" className="max-w-full max-h-full object-contain" />
                </div>
              }
            />
            <BrandOverviewCard
              label="Primary Color"
              value="#6C5DD3"
              preview={<div className="w-full h-16 bg-[#6C5DD3] rounded-lg shadow-sm"></div>}
            />
            <BrandOverviewCard
              label="Secondary Color"
              value="#18181B"
              preview={<div className="w-full h-16 bg-[#18181B] rounded-lg shadow-sm"></div>}
            />
            <BrandOverviewCard
              label="Typography"
              value="Inter"
              preview={<div className="text-[32px] font-semibold text-[#18181B]">Aa</div>}
            />
            <BrandOverviewCard
              label="Brand Voice"
              value="Professional"
              preview={<div className="text-[13px] text-[#71717A] leading-relaxed">Clear, direct, and expert</div>}
            />
          </div>
        </section>

        {/* Assets */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] font-semibold text-[#18181B]">Assets</h2>
            <button className="text-[13px] font-medium text-[#6C5DD3] hover:text-[#5B4EC2] transition-colors">
              <Plus className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
              Add Asset
            </button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <AssetCard type="Logo" name="Primary Logo" thumbnail="/images/trupeer.jpeg" />
            <AssetCard type="Logo" name="Logo Mark" thumbnail="/images/trupeer.jpeg" />
            <AssetCard type="Icon" name="App Icon" thumbnail="/images/trupeer.jpeg" />
            <AssetCard type="Image" name="Hero Image" thumbnail="/images/screenshot-1.png" />
            <AssetCard type="Image" name="Background" thumbnail="/images/screenshot-2.png" />
            <AssetCard type="Illustration" name="Empty State" thumbnail="/images/screenshot-3.png" />
          </div>
        </section>

        {/* Theme Settings */}
        <section className="mb-12">
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">Theme Settings</h2>
          <div className="bg-white border border-[#E8E8E6] rounded-xl p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Colors */}
              <div>
                <h3 className="text-[15px] font-semibold text-[#18181B] mb-4">Colors</h3>
                <div className="space-y-3">
                  <ColorSetting label="Primary" color="#6C5DD3" />
                  <ColorSetting label="Secondary" color="#18181B" />
                  <ColorSetting label="Accent" color="#10B981" />
                  <ColorSetting label="Background" color="#FAFAF8" />
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-[15px] font-semibold text-[#18181B] mb-4">Typography</h3>
                <div className="space-y-3">
                  <TypographySetting label="Heading Font" value="Instrument Serif" />
                  <TypographySetting label="Body Font" value="Inter" />
                  <TypographySetting label="Monospace Font" value="Geist Mono" />
                </div>
              </div>

              {/* Button Style */}
              <div>
                <h3 className="text-[15px] font-semibold text-[#18181B] mb-4">Button Style</h3>
                <div className="space-y-3">
                  <StyleSetting label="Corner Radius" value="8px" />
                  <StyleSetting label="Button Size" value="Medium" />
                </div>
              </div>

              {/* Corner Radius */}
              <div>
                <h3 className="text-[15px] font-semibold text-[#18181B] mb-4">Corner Radius</h3>
                <div className="space-y-3">
                  <StyleSetting label="Cards" value="12px" />
                  <StyleSetting label="Buttons" value="8px" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Branding */}
        <section>
          <h2 className="text-[20px] font-semibold text-[#18181B] mb-5">AI Branding</h2>
          <div className="bg-[#F5F4FF] border border-[#E4E1FF] rounded-xl p-8">
            <p className="text-[15px] text-[#52525B] mb-6">
              AI automatically applies your brand settings across all generated content
            </p>
            <div className="grid grid-cols-2 gap-4">
              <AIBrandingFeature text="Apply brand colors to demos" />
              <AIBrandingFeature text="Use approved terminology" />
              <AIBrandingFeature text="Generate brand-compliant documentation" />
              <AIBrandingFeature text="Use company voice" />
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

// Helper Components

interface BrandOverviewCardProps {
  label: string
  value: string
  preview: React.ReactNode
}

function BrandOverviewCard({ label, value, preview }: BrandOverviewCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E6] rounded-lg p-5 hover:border-[#D4D4D2] hover:shadow-sm transition-all cursor-pointer group">
      <div className="flex items-center justify-end mb-3">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
        </button>
      </div>
      <div className="mb-4">
        {preview}
      </div>
      <div className="text-[12px] text-[#71717A] mb-1">{label}</div>
      <div className="text-[13px] font-medium text-[#18181B]">{value}</div>
    </div>
  )
}

interface AssetCardProps {
  type: string
  name: string
  thumbnail: string
}

function AssetCard({ type, name, thumbnail }: AssetCardProps) {
  const isLogo = type === "Logo" || type === "Icon"
  
  return (
    <div className="group bg-white border border-[#E8E8E6] rounded-lg overflow-hidden hover:border-[#D4D4D2] hover:shadow-sm transition-all cursor-pointer">
      <div className="aspect-square bg-[#FAFAF9] flex items-center justify-center relative overflow-hidden p-4">
        <img 
          src={thumbnail} 
          alt={name}
          className={`max-w-full max-h-full ${isLogo ? 'object-contain' : 'object-cover w-full h-full'}`}
        />
        <button className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit className="w-5 h-5 text-white" strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-3 bg-white">
        <div className="text-[11px] text-[#A1A1AA] mb-1">{type}</div>
        <div className="text-[13px] font-medium text-[#18181B]">{name}</div>
      </div>
    </div>
  )
}

interface ColorSettingProps {
  label: string
  color: string
}

function ColorSetting({ label, color }: ColorSettingProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#F5F5F3] rounded-lg hover:bg-[#ECECEA] transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded border border-[#E8E8E6]"
          style={{ backgroundColor: color }}
        />
        <span className="text-[13px] font-medium text-[#18181B]">{label}</span>
      </div>
      <span className="text-[12px] text-[#71717A] font-mono">{color}</span>
    </div>
  )
}

interface TypographySettingProps {
  label: string
  value: string
}

function TypographySetting({ label, value }: TypographySettingProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#F5F5F3] rounded-lg hover:bg-[#ECECEA] transition-colors cursor-pointer">
      <span className="text-[13px] font-medium text-[#18181B]">{label}</span>
      <span className="text-[13px] text-[#71717A]">{value}</span>
    </div>
  )
}

interface StyleSettingProps {
  label: string
  value: string
}

function StyleSetting({ label, value }: StyleSettingProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#F5F5F3] rounded-lg hover:bg-[#ECECEA] transition-colors cursor-pointer">
      <span className="text-[13px] font-medium text-[#18181B]">{label}</span>
      <span className="text-[13px] text-[#71717A]">{value}</span>
    </div>
  )
}

interface AIBrandingFeatureProps {
  text: string
}

function AIBrandingFeature({ text }: AIBrandingFeatureProps) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircle2 className="w-5 h-5 text-[#6C5DD3] flex-shrink-0" strokeWidth={2} />
      <span className="text-[14px] text-[#18181B]">{text}</span>
    </div>
  )
}
