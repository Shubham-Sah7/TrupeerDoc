import { Sidebar } from "@/components/sidebar"
import { DocSkillsContent } from "@/components/doc-skills-content"

export default function DocSkillsPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <DocSkillsContent />
    </div>
  )
}
