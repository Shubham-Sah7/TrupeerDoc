import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#F8F8F7] dark:bg-[#0A0A0B]">
      <Sidebar />
      <MainContent />
    </div>
  )
}
