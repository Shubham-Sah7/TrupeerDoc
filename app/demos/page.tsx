import { Sidebar } from "@/components/sidebar"
import { DemosContent } from "@/components/demos-content"

export default function DemosPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <DemosContent />
    </div>
  )
}
