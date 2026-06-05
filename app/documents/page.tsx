import { Sidebar } from "@/components/sidebar"
import { DocumentsContent } from "@/components/documents-content"

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <DocumentsContent />
    </div>
  )
}
