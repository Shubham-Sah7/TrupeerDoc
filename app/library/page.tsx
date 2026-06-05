import { Sidebar } from "@/components/sidebar"
import { LibraryContent } from "@/components/library-content"

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0B]">
      <Sidebar />
      <LibraryContent />
    </div>
  )
}
