import { Sidebar } from "@/components/sidebar"
import { RecordContent } from "@/components/record-content"

export default function RecordPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <RecordContent />
    </div>
  )
}
