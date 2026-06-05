import { Sidebar } from "@/components/sidebar"
import { ProjectsContent } from "@/components/projects-content"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <ProjectsContent />
    </div>
  )
}
