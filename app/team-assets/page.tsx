import { Sidebar } from "@/components/sidebar"
import { TeamAssetsContent } from "@/components/team-assets-content"

export default function TeamAssetsPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <TeamAssetsContent />
    </div>
  )
}
