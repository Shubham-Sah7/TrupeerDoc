import { Sidebar } from "@/components/sidebar"
import { BrandKitContent } from "@/components/brand-kit-content"

export default function BrandKitPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <BrandKitContent />
    </div>
  )
}
