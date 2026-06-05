import { Sidebar } from "@/components/sidebar"
import { KnowledgeContent } from "@/components/knowledge-content"

export default function KnowledgePage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <KnowledgeContent />
    </div>
  )
}
